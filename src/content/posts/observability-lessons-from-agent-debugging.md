---
title: "What debugging AI agents taught me about observability"
description: "What changed in my logging and tracing after months of production agent incidents (and what I wish I'd logged from day one)."
publishedAt: "2025-12-08"
slug: "observability-lessons-from-agent-debugging"
draft: false
tags: ["observability", "debugging", "agents", "langgraph"]
track: "engineering"
series: ""
series_position:
linkedin_url: ""
x_url: ""
newsletter_hook:
  "The first time I got a 'your agent did something weird' message
  from a user, I pulled the logs, searched for an error, and found nothing useful.
  Agents don't fail like normal code — and traditional logging doesn't help you
  answer the only question that matters: why did it do that? In this post I walk
  through what actually changed in my observability setup after enough production
  incidents: full state at decision points, verbatim tool payloads, and logging
  the prompt every single time — plus the debugging workflow that stops me from
  flailing when something breaks."
summary_two_sentence:
  "Traditional application logging is useless for debugging AI
  agents because it can't tell you why the agent made a decision. This post covers
  the three things I now log religiously in production and the replay-based debugging
  workflow that lets me reconstruct exactly what went wrong."
---

The first time I got a "your agent did something weird" message from a user, I did the usual thing:

- Pull logs
- Search for an error
- Find nothing useful

And then I hit the wall: agents don't fail like normal code.

When an LLM is making decisions, "INFO: tool called" is basically the same as saying "something happened."

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

[INTERNAL LINK: relevant post on LangGraph agent architecture or production structure]

## The First Mistake I Made

I treated "agent logging" like normal application logging. I tried to keep it minimal.

I was worried about:

- log volume
- cost
- privacy

Those are real concerns.

But the tradeoff is harsh: when you don't log enough, you pay for it later in debugging time and customer trust.

## The Breakthrough

Here's what actually happened when I stopped treating observability as a nice-to-have and started treating it as a first-class feature of the system: debugging went from "we have no idea what happened" to "we can replay the exact moment things diverged." Three things made that shift possible.

## What You Actually Need (My Current Baseline)

After enough incidents, I now log three things religiously.

### 1. Full state at decision points

Every time the agent makes a decision, I want enough data to reconstruct the context. Here's the tradeoff I keep coming back to: verbose logging feels expensive until the first time it saves you from a two-day debugging session.

Here's a pattern that's worked well for me:

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

This is expensive. It's also the difference between being able to replay the exact moment things diverged and having nothing to work with at all.

### 2. Tool inputs and outputs (verbatim)

I don't summarize tool calls anymore.

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

Nobody tells you this, but the prompt is code. If you can't reproduce the prompt, you can't reproduce the behavior.

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

[INTERNAL LINK: relevant post on token cost management or LLM cost optimization]

## The Debugging Workflow

When something breaks, here's the workflow that stops me from flailing:

1. Find the trace ID
2. Reconstruct the state timeline from decision logs
3. Identify the divergence point
4. Replay using the exact prompt + model

Step 4 is the real unlock. Inputs alone are not enough — the prompt at that specific moment, with that specific context, is what you need to reproduce the behavior. Without logging it, step 4 is impossible.

## The Privacy Tradeoff (And How I Think About It)

Logging prompts and tool payloads can easily become "logging user data."

My current approach:

- log everything in dev and staging
- in production, be deliberate about:
  - retention windows
  - PII redaction
  - access controls
  - sampling strategies

It's not perfect. It's a moving target. But the alternative — not logging enough — is a worse tradeoff.

[INTERNAL LINK: relevant post on privacy considerations in AI agent systems]

## Your Turn

If you're running agents in production: what's the one thing you wish you had logged from day one — and did it change how you designed your state or your tracing setup?

## Join the Discussion

Sharing what I'm building and learning as I go. If this was useful, I'd love to hear your take.

[Connect on LinkedIn](LINKEDIN_URL) · [Follow on X](X_URL)
