---
title: "How I structure LangGraph agents for production"
description: "The patterns I use to keep LangGraph agents maintainable, testable, and observable in production (including what I got wrong at first)."
publishedAt: "2025-12-15"
slug: "langgraph-production-structure"
draft: false
tags: ["langgraph", "architecture", "agents"]
track: "technical"
series: ""
series_position:
linkedin_url: ""
x_url: ""
---

### Newsletter Hook Paragraph

The first time I shipped a LangGraph agent to production, I thought I was done.  
Then the incident happened. Not catastrophic — just enough weird behavior to make  
me realize the gap between a demo agent and a production agent is enormous. One  
is impressive. The other has to be boringly dependable. In this post I walk  
through the structure I've landed on: four-node graph pattern, flat explicit state,  
retry logic that distinguishes fatal from recoverable errors, and observability  
baked in from day one — not bolted on after a 2 AM debugging session.

### 2-Sentence Summary

Shipping a LangGraph agent that looks good in a demo and one that holds up in  
production are two very different problems. This post covers the architecture  
patterns — node responsibilities, state design, error handling, and observability  
— that make production agents debuggable and maintainable.

---

The first time I shipped a LangGraph agent "to production," I thought I was done.

Then the incident happened.

Not a catastrophic one. Just enough weird behavior to make me realize something  
uncomfortable: a demo agent can be impressive, but a production agent has to be  
_boringly dependable_.

This post is the structure I've landed on after building a few of these. It's not  
perfect, but it keeps me sane.

## The Problem

LangGraph makes it easy to create a graph. The trap is thinking "I have a graph"  
means "I have a system."

In production, your pain points show up fast:

- You need to understand _why_ the agent chose a path
- You need to replay failures with enough context
- You need to ship changes safely without breaking everything

[INTERNAL LINK: relevant post on LangGraph getting started or agent architecture]

## What I Tried First (and Why It Didn't Hold Up)

My first versions were basically:

- A couple nodes
- A state object that grew organically
- Logging sprinkled where I remembered

It worked… until I needed to debug something at 2 AM.

The missing piece was structure: clear node responsibilities, explicit state, and  
built-in observability.

## The Core Pattern

Here's what actually happened when I committed to giving every node exactly one  
job: debugging went from "why is the agent doing this?" to "why is validateOutput  
returning this?" — a very different, much more solvable question.

Every production agent I build follows the same high-level shape:

- **Understand**: interpret the request
- **Plan**: decide the steps
- **Execute**: call tools / do work
- **Validate**: check quality, decide whether to loop or finish

Here's the skeleton:

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

When a node fails, you don't debug "the agent." You debug `validateOutput` or  
`executeStep`.

## State Management (Keep It Flat)

Here's the tradeoff I kept running into: nested state feels clean when you design  
it, but it becomes painful the moment you need to inspect, log, or serialize it  
under pressure.

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

## Error Handling That Doesn't Waste Tokens

Retries are essential — but blind retries are expensive.

Nobody tells you this, but the most important thing your retry logic needs to do  
is distinguish between errors worth retrying and errors that will never resolve.  
If you skip that distinction, you'll burn tokens on problems that have nothing to  
do with transience.

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

The key is distinguishing "retryable" from "not worth retrying."

## Observability From Day One

I used to treat tracing like a nice-to-have.

Now I treat it like a feature.

[INTERNAL LINK: relevant post on AI agent observability or tracing]

The pattern is simple: wrap node execution so every step logs timing and token  
usage.

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

If you can't answer "where did the time/tokens go?" you can't improve anything.

## Testing Strategy

My rule of thumb:

- Unit test nodes in isolation
- Integration test the full graph

That's it. Simple, but it keeps the surface area manageable.

## What I'm Still Figuring Out

A few things I still don't have perfect answers for:

- Long-term memory across sessions
- Multi-agent coordination without complexity explosions
- Cost optimization that doesn't degrade quality

[INTERNAL LINK: relevant post on multi-agent coordination or cost optimization]

If you've found patterns that work, I'd genuinely love to learn from you.

## Your Turn

If you're building LangGraph agents in production: what's the one debugging  
lesson you learned the hard way — and did it change how you structured your  
state or your nodes?

## Join the Discussion

Sharing what I'm building and learning as I go. If this was useful, I'd love  
to hear your take.

[Connect on LinkedIn](LINKEDIN_URL) · [Follow on X](X_URL)
