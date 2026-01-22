---
title: "How I structure LangGraph agents for production"
slug: "langgraph-production-structure-v2"
description: "The patterns I use to keep LangGraph agents maintainable, testable, and observable in production (including what I got wrong at first)."
publishedAt: "2025-12-15"
track: "technical"
tags: ["langgraph", "architecture", "agents"]
draft: true
---

The first time I shipped a LangGraph agent “to production,” I thought I was done.

Then the incident happened.

Not a catastrophic one. Just enough weird behavior to make me realize something uncomfortable: a demo agent can be impressive, but a production agent has to be _boringly dependable_.

This post is the structure I’ve landed on after building a few of these. It’s not perfect, but it keeps me sane.

## The Problem

LangGraph makes it easy to create a graph. The trap is thinking “I have a graph” means “I have a system.”

In production, your pain points show up fast:

- You need to understand _why_ the agent chose a path
- You need to replay failures with enough context
- You need to ship changes safely without breaking everything

## What I Tried First (and Why It Didn’t Hold Up)

My first versions were basically:

- A couple nodes
- A state object that grew organically
- Logging sprinkled where I remembered

It worked… until I needed to debug something at 2 AM.

The missing piece was structure: clear node responsibilities, explicit state, and built-in observability.

## The Core Pattern

Every production agent I build follows the same high-level shape:

- **Understand**: interpret the request
- **Plan**: decide the steps
- **Execute**: call tools / do work
- **Validate**: check quality, decide whether to loop or finish

Here’s the skeleton:

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

The boring but powerful idea here: **each node has one job**.

When a node fails, you don’t debug “the agent.” You debug “validateOutput” or “executeStep.”

## State Management (Keep It Flat)

If you take one thing away from this post, make it this:

**Flat state is easier to inspect, log, serialize, and reason about.**

I aim for explicit fields over nested structures:

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

Is it verbose? Yes.

Is it easier to debug? Also yes.

## Error Handling That Doesn’t Waste Tokens

Retries are essential — but blind retries are expensive.

This is the pattern I use:

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

The key is distinguishing “retryable” from “not worth retrying.”

## Observability From Day One

I used to treat tracing like a nice-to-have.

Now I treat it like a feature.

The pattern is simple: wrap node execution so every step logs timing and token usage.

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
```

If you can’t answer “where did the time/tokens go?” you can’t improve anything.

## Testing Strategy

My rule of thumb:

- Unit test nodes in isolation
- Integration test the full graph

That’s it. Simple, but it keeps the surface area manageable.

## What I’m Still Figuring Out

A few things I still don’t have perfect answers for:

- Long-term memory across sessions
- Multi-agent coordination without complexity explosions
- Cost optimization that doesn’t degrade quality

If you’ve found patterns that work, I’d genuinely love to learn from you.

## Your Turn

If you’re building LangGraph agents:

- What part of production has surprised you most?
- What’s the one debugging lesson you learned the hard way?

If you want more posts like this, I send a weekly note with the real wins/fails from building production AI systems:

https://nickthiru.dev/subscribe
