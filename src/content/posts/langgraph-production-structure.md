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

```python
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
import operator

class AgentState(TypedDict):
    messages: Annotated[list, operator.add]
    context: dict
    metadata: dict

def create_agent():
    graph = StateGraph(AgentState)

    # Add nodes
    graph.add_node("understand", understand_intent)
    graph.add_node("plan", create_plan)
    graph.add_node("execute", execute_step)
    graph.add_node("validate", validate_output)

    # Add edges
    graph.add_edge("understand", "plan")
    graph.add_conditional_edges("plan", should_execute)
    graph.add_edge("execute", "validate")
    graph.add_conditional_edges("validate", is_complete)

    return graph.compile()
```

The key insight is separating concerns into distinct nodes. Each node has one job, making debugging much simpler.

## State management

The `AgentState` is where most complexity lives. I keep it flat and explicit:

```python
class AgentState(TypedDict):
    # Core conversation
    messages: Annotated[list, operator.add]

    # Task tracking
    current_step: int
    total_steps: int
    plan: list[str]

    # Context accumulation
    gathered_context: dict
    tool_results: list[dict]

    # Error handling
    retry_count: int
    last_error: str | None

    # Observability
    trace_id: str
    step_timings: list[float]
```

Resist the urge to nest deeply. Flat state is easier to inspect and serialize.

## Error handling that works

Every production agent needs graceful degradation. Here's my pattern:

```python
def execute_with_retry(state: AgentState) -> AgentState:
    max_retries = 3

    for attempt in range(max_retries):
        try:
            result = do_the_thing(state)
            return {**state, "tool_results": state["tool_results"] + [result]}
        except RecoverableError as e:
            if attempt == max_retries - 1:
                return {**state, "last_error": str(e), "retry_count": attempt + 1}
            continue
        except FatalError as e:
            # Don't retry, fail fast
            return {**state, "last_error": str(e)}

    return state
```

The distinction between recoverable and fatal errors is crucial. Don't waste tokens retrying the unretryable.

## Observability from day one

I add tracing before I add features:

```python
import time
from functools import wraps

def traced_node(name: str):
    def decorator(func):
        @wraps(func)
        def wrapper(state: AgentState) -> AgentState:
            start = time.time()
            result = func(state)
            duration = time.time() - start

            # Log to your observability platform
            log_step(
                trace_id=state["trace_id"],
                step_name=name,
                duration_ms=duration * 1000,
                input_tokens=count_tokens(state),
                output_tokens=count_tokens(result)
            )

            return result
        return wrapper
    return decorator

@traced_node("understand")
def understand_intent(state: AgentState) -> AgentState:
    # ... implementation
```

You can't improve what you can't measure. Token usage, latency, and error rates should be visible from the start.

## Testing strategy

Unit test nodes in isolation, integration test the full graph:

```python
def test_understand_intent_extracts_task():
    state = {
        "messages": [{"role": "user", "content": "Schedule a meeting for tomorrow at 3pm"}],
        "context": {}
    }

    result = understand_intent(state)

    assert result["context"]["intent"] == "schedule_meeting"
    assert result["context"]["time"] == "tomorrow 3pm"

def test_full_agent_completes_task():
    agent = create_agent()

    result = agent.invoke({
        "messages": [{"role": "user", "content": "Schedule a meeting for tomorrow at 3pm"}],
        "context": {},
        "trace_id": "test-123"
    })

    assert result["current_step"] == result["total_steps"]
    assert result["last_error"] is None
```

The isolation makes debugging failures much faster.

## What I'm still figuring out

- **Memory across sessions**: LangGraph's checkpointing helps, but long-term memory patterns are still evolving
- **Multi-agent coordination**: When agents need to collaborate, the complexity grows fast
- **Cost optimization**: Knowing when to use a smaller model vs GPT-4 is still more art than science

These patterns have held up well across several production systems. They're not perfect, but they make the inevitable debugging sessions much less painful.

---

_Have questions or different patterns that work for you? I'd love to hear about them—reach out on [Twitter](https://twitter.com/nickthiru)._
