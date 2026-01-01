---
title: "How I structure LangGraph agents for production"
slug: "langgraph-production-structure"
description: "A walkthrough of the patterns I use to keep LangGraph agents maintainable, testable, and observable in production."
publishedAt: "2025-01-20"
track: "technical"
tags: ["langgraph", "architecture", "agents"]
draft: false
---

Building a demo agent is easy. Building one that runs reliably in production is a different challenge entirely.

After shipping several LangGraph-based systems, I've settled on a structure that keeps things maintainable. Here's what works for me.

## The core pattern

Every production agent I build follows this basic structure:

```ts
import { END, StateGraph } from "@langchain/langgraph";

type Message = {
  role: "user" | "assistant" | "tool";
  content: string;
};

type AgentState = {
  messages: Message[];
  context: Record<string, unknown>;
  metadata: Record<string, unknown>;
};

export function createAgent() {
  const graph = new StateGraph<AgentState>({
    channels: {
      messages: {
        value: [],
        reducer: (a: Message[], b: Message[]) => a.concat(b),
      },
      context: {
        value: {},
        reducer: (a, b) => ({ ...a, ...b }),
      },
      metadata: {
        value: {},
        reducer: (a, b) => ({ ...a, ...b }),
      },
    },
  });

  graph.addNode("understand", understandIntent);
  graph.addNode("plan", createPlan);
  graph.addNode("execute", executeStep);
  graph.addNode("validate", validateOutput);

  graph.addEdge("understand", "plan");
  graph.addConditionalEdges("plan", shouldExecute);
  graph.addEdge("execute", "validate");
  graph.addConditionalEdges("validate", isComplete);
  graph.addEdge("validate", END);

  return graph.compile();
}
```

The key insight is separating concerns into distinct nodes. Each node has one job, making debugging much simpler.

## State management

The `AgentState` is where most complexity lives. I keep it flat and explicit:

```ts
type AgentState = {
  messages: Message[];

  currentStep: number;
  totalSteps: number;
  plan: string[];

  gatheredContext: Record<string, unknown>;
  toolResults: Array<Record<string, unknown>>;

  retryCount: number;
  lastError: string | null;

  traceId: string;
  stepTimingsMs: number[];
};
```

Resist the urge to nest deeply. Flat state is easier to inspect and serialize.

## Error handling that works

Every production agent needs graceful degradation. Here's my pattern:

```ts
export async function executeWithRetry(state: AgentState): Promise<AgentState> {
  const maxRetries = 3;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await doTheThing(state);
      return {
        ...state,
        toolResults: [...state.toolResults, result],
      };
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      if (isFatalError(e)) {
        return { ...state, lastError: message };
      }

      if (attempt === maxRetries - 1) {
        return { ...state, lastError: message, retryCount: attempt + 1 };
      }
    }
  }

  return state;
}
```

The distinction between recoverable and fatal errors is crucial. Don't waste tokens retrying the unretryable.

## Observability from day one

I add tracing before I add features:

```ts
type NodeFn = (state: AgentState) => Promise<AgentState> | AgentState;

export function tracedNode(name: string, fn: NodeFn): NodeFn {
  return async (state) => {
    const start = performance.now();
    const result = await fn(state);
    const durationMs = performance.now() - start;

    logStep({
      traceId: state.traceId,
      stepName: name,
      durationMs,
      inputTokens: countTokens(state),
      outputTokens: countTokens(result),
    });

    return result;
  };
}

export const understandIntent: NodeFn = tracedNode(
  "understand",
  async (state) => {
    return state;
  }
);
```

You can't improve what you can't measure. Token usage, latency, and error rates should be visible from the start.

## Testing strategy

Unit test nodes in isolation, integration test the full graph:

```ts
import { describe, expect, it } from "vitest";

describe("agent nodes", () => {
  it("understandIntent extracts task context", async () => {
    const state: AgentState = {
      messages: [
        { role: "user", content: "Schedule a meeting for tomorrow at 3pm" },
      ],
      context: {},
      metadata: {},
      currentStep: 0,
      totalSteps: 0,
      plan: [],
      gatheredContext: {},
      toolResults: [],
      retryCount: 0,
      lastError: null,
      traceId: "test-123",
      stepTimingsMs: [],
    };

    const result = await understandIntent(state);
    expect(result.context).toBeDefined();
  });

  it("full agent completes task", async () => {
    const agent = createAgent();

    const result = await agent.invoke({
      messages: [
        { role: "user", content: "Schedule a meeting for tomorrow at 3pm" },
      ],
      context: {},
      metadata: {},
      currentStep: 0,
      totalSteps: 1,
      plan: [],
      gatheredContext: {},
      toolResults: [],
      retryCount: 0,
      lastError: null,
      traceId: "test-123",
      stepTimingsMs: [],
    });

    expect(result.lastError).toBeNull();
  });
});
```

The isolation makes debugging failures much faster.

## What I'm still figuring out

- **Memory across sessions**: LangGraph's checkpointing helps, but long-term memory patterns are still evolving
- **Multi-agent coordination**: When agents need to collaborate, the complexity grows fast
- **Cost optimization**: Knowing when to use a smaller model vs GPT-4 is still more art than science

These patterns have held up well across several production systems. They're not perfect, but they make the inevitable debugging sessions much less painful.

---

_Have questions or different patterns that work for you? I'd love to hear about them—reach out on [Twitter](https://twitter.com/nickthiru)._
