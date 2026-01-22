---
title: "What debugging AI agents taught me about observability"
slug: "observability-lessons-from-agent-debugging-v2"
description: "What changed in my logging and tracing after months of production agent incidents (and what I wish I’d logged from day one)."
publishedAt: "2025-12-08"
track: "technical"
tags: ["observability", "debugging", "agents", "langgraph"]
draft: true
---

The first time I got a “your agent did something weird” message from a user, I did the usual thing:

- Pull logs
- Search for an error
- Find nothing useful

And then I hit the wall: agents don’t fail like normal code.

When an LLM is making decisions, “INFO: tool called” is basically the same as saying “something happened.”

This is what debugging agents taught me about observability.

## The Problem with Traditional Logging

Traditional apps are mostly deterministic. You log:

```
INFO: user requested action X
INFO: fetched data from API
INFO: returned result Y
```

That gives you a narrative.

With agents, the naive version looks like:

```
INFO: agent received task
INFO: agent called tool
INFO: agent returned response
```

…and it tells you nothing that helps you answer the question you actually care about:

**Why did it do that?**

## The First Mistake I Made

I treated “agent logging” like normal application logging. I tried to keep it minimal.

I was worried about:

- log volume
- cost
- privacy

Those are real concerns.

But the tradeoff is harsh: when you don’t log enough, you pay for it later in debugging time and customer trust.

## What You Actually Need (My Current Baseline)

After enough incidents, I now log three things religiously.

### 1. Full state at decision points

Every time the agent makes a decision, I want enough data to reconstruct the context.

Here’s a pattern that’s worked well for me:

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

This is expensive. It’s also the difference between:

- “we have no idea what happened”
- “we can replay the exact moment things diverged”

### 2. Tool inputs and outputs (verbatim)

I don’t summarize tool calls anymore.

If a tool call matters, I log:

- the input payload
- the output payload
- timing
- errors

```ts
type Logger = {
  info: (obj: unknown) => void;
  error: (obj: unknown) => void;
};

export async function tracedToolCall<
  TInput extends Record<string, unknown>,
  TOutput,
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

This is the one I avoided the longest.

But the prompt is code.

If you can’t reproduce the prompt, you can’t reproduce the behavior.

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

## The Debugging Workflow

When something breaks, here’s the workflow that prevents me from flailing:

1. Find the trace ID
2. Reconstruct the state timeline from decision logs
3. Identify the divergence point
4. Replay using the exact prompt + model

Step 4 is the real unlock. Inputs alone are not enough.

## The Privacy Tradeoff (And How I Think About It)

Logging prompts and tool payloads can easily become “logging user data.”

My current approach is:

- log everything in dev/staging
- in prod, be deliberate about:
  - retention windows
  - redaction (PII)
  - access controls
  - sampling strategies

It’s not perfect. It’s a moving target.

## Your Turn

If you’re running agents in production:

- What’s the one thing you wish you logged earlier?
- How are you balancing observability vs privacy?

If you want more production agent lessons (including the failures), I share weekly notes here:

https://nickthiru.dev/subscribe
