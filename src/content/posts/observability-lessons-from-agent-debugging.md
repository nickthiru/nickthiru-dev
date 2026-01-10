---
title: "What debugging AI agents taught me about observability"
slug: "observability-lessons-from-agent-debugging"
description: "Three months of production agent incidents changed how I think about logging, tracing, and the data you actually need when things go wrong."
publishedAt: "2025-12-08"
track: "technical"
tags: ["observability", "debugging", "agents", "langgraph"]
draft: false
---

Three months ago, I shipped my first production LangGraph agent. Since then, I've spent more time debugging than building.

That's not a complaint—it's where the real learning happens. Here's what I've learned about observability when your "code" includes an LLM that makes decisions you can't fully predict.

## The problem with traditional logging

Standard application logging assumes deterministic behavior:

```
INFO: User requested action X
INFO: Fetched data from API
INFO: Returned result Y
```

With agents, this tells you almost nothing:

```
INFO: Agent received task
INFO: Agent called tool
INFO: Agent returned response
```

What's missing? Everything that matters:

- Why did the agent choose that tool?
- What was in the context when it made that decision?
- What alternatives did it consider?

## What you actually need

After dozens of debugging sessions, I've settled on logging three things religiously:

### 1. Full state at decision points

Every time the agent makes a choice, log the complete state:

```ts
type AgentState = {
  traceId: string;
  context: Record<string, unknown>;
  messages: Array<{ role: string; content: string }>;
};

export function logDecisionPoint(params: {
  logger: { info: (obj: unknown) => void };
  state: AgentState;
  decision: string;
  alternatives: string[];
  tokenBudgetRemaining: number;
}) {
  const { logger, state, decision, alternatives, tokenBudgetRemaining } =
    params;

  logger.info({
    event: "decision",
    traceId: state.traceId,
    decision,
    alternatives,
    contextKeys: Object.keys(state.context),
    messageCount: state.messages.length,
    lastMessagePreview: state.messages.at(-1)?.content.slice(0, 200) ?? "",
    tokenBudgetRemaining,
  });
}
```

This sounds expensive. It is. But when something goes wrong at 2 AM, you'll thank yourself.

### 2. Tool inputs and outputs (verbatim)

Don't summarize. Log exactly what went into the tool and what came out:

```ts
type Logger = {
  info: (obj: unknown) => void;
  error: (obj: unknown) => void;
};

export async function tracedToolCall<
  TInput extends Record<string, unknown>,
  TOutput
>(params: {
  logger: Logger;
  toolName: string;
  toolInput: TInput;
  execute: (toolName: string, toolInput: TInput) => Promise<TOutput>;
}): Promise<TOutput> {
  const { logger, toolName, toolInput, execute } = params;
  const start = performance.now();

  logger.info({ event: "tool_call_start", tool: toolName, input: toolInput });

  try {
    const output = await execute(toolName, toolInput);
    logger.info({
      event: "tool_call_success",
      tool: toolName,
      output,
      durationMs: performance.now() - start,
    });
    return output;
  } catch (e) {
    logger.error({
      event: "tool_call_error",
      tool: toolName,
      error: e instanceof Error ? e.message : String(e),
      errorType: e instanceof Error ? e.name : "Unknown",
    });
    throw e;
  }
}
```

### 3. The prompt (every time)

The prompt is code. Log it like code:

```ts
export async function logLLMCall(params: {
  logger: Logger;
  prompt: string;
  response: string;
  model: string;
  usage: { inputTokens: number; outputTokens: number };
  costUsd: number;
  store: (data: {
    prompt: string;
    response: string;
    metadata: Record<string, unknown>;
  }) => Promise<void>;
}) {
  const { logger, prompt, response, model, usage, costUsd, store } = params;

  logger.info({
    event: "llm_call",
    model,
    promptLength: prompt.length,
    responseLength: response.length,
    inputTokens: usage.inputTokens,
    outputTokens: usage.outputTokens,
    costUsd,
  });

  await store({
    prompt,
    response,
    metadata: { model, usage, costUsd },
  });
}
```

## The debugging workflow

When something breaks, I follow this process:

1. **Find the trace ID** from the error or user report
2. **Reconstruct the state timeline** from decision point logs
3. **Identify the divergence point** where behavior went wrong
4. **Replay with the exact prompt** that caused the issue

Step 4 is the key. With deterministic code, you can reproduce bugs with inputs. With LLMs, you need the exact prompt and often the exact model version.

## Tools that help

- **LangSmith**: Great for tracing LangChain/LangGraph specifically
- **Weights & Biases**: Good for tracking experiments and model behavior over time
- **Simple JSON logs + Loki/Elasticsearch**: Sometimes the best tool is the boring one

I use a combination: LangSmith for development, JSON logs + Grafana for production.

## The cost question

Yes, this level of logging is expensive:

- Storage costs for full prompts/responses
- Ingestion costs for high-cardinality data
- Query costs when you're debugging

But compare that to:

- Hours spent debugging without context
- Customer trust lost to unexplained failures
- The cost of shipping a broken agent fix

For me, the observability investment pays for itself after one serious incident.

## What I'm still figuring out

- **Sampling strategies**: Can't log everything forever. What's the right retention policy?
- **Privacy concerns**: Full logging means logging user data. How to balance observability with privacy?
- **Alert fatigue**: What actually deserves a page vs. what's just noise?

These are open problems. If you've got good solutions, I'd love to hear them.

---

_Building something similar? Let's compare notes—find me on [Twitter](https://twitter.com/nickthiru) or [email me](mailto:nick@nickthiru.dev)._
