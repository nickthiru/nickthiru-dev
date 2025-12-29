---
title: "What debugging AI agents taught me about observability"
slug: "observability-lessons-from-agent-debugging"
description: "Three months of production agent incidents changed how I think about logging, tracing, and the data you actually need when things go wrong."
publishedAt: "2025-01-10"
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

```python
def log_decision_point(state: AgentState, decision: str, alternatives: list[str]):
    logger.info({
        "event": "decision",
        "trace_id": state["trace_id"],
        "decision": decision,
        "alternatives": alternatives,
        "context_keys": list(state["context"].keys()),
        "message_count": len(state["messages"]),
        "last_message_preview": state["messages"][-1]["content"][:200],
        "token_budget_remaining": calculate_remaining_tokens(state)
    })
```

This sounds expensive. It is. But when something goes wrong at 2 AM, you'll thank yourself.

### 2. Tool inputs and outputs (verbatim)

Don't summarize. Log exactly what went into the tool and what came out:

```python
def traced_tool_call(tool_name: str, tool_input: dict) -> dict:
    start = time.time()

    logger.info({
        "event": "tool_call_start",
        "tool": tool_name,
        "input": tool_input  # Full input, not summarized
    })

    try:
        result = execute_tool(tool_name, tool_input)

        logger.info({
            "event": "tool_call_success",
            "tool": tool_name,
            "output": result,  # Full output
            "duration_ms": (time.time() - start) * 1000
        })

        return result
    except Exception as e:
        logger.error({
            "event": "tool_call_error",
            "tool": tool_name,
            "error": str(e),
            "error_type": type(e).__name__
        })
        raise
```

### 3. The prompt (every time)

The prompt is code. Log it like code:

```python
def log_llm_call(prompt: str, response: str, model: str, usage: dict):
    logger.info({
        "event": "llm_call",
        "model": model,
        "prompt_hash": hashlib.md5(prompt.encode()).hexdigest(),
        "prompt_length": len(prompt),
        "response_length": len(response),
        "input_tokens": usage["input_tokens"],
        "output_tokens": usage["output_tokens"],
        "cost_usd": calculate_cost(model, usage)
    })

    # Store full prompt/response separately (too large for log aggregators)
    store_llm_interaction(
        prompt=prompt,
        response=response,
        metadata={...}
    )
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
