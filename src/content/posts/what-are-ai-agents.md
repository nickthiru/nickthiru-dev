---
title: "What are AI agents and agentic systems, anyway?"
slug: "what-are-ai-agents"
description: "A plain-English explanation of AI agents, agentic systems, and why they're different from chatbots—for founders, operators, and anyone curious about what 'agentic AI' actually means."
publishedAt: "2026-01-09"
track: "technical"
tags: ["ai-agents", "explainer", "langgraph"]
draft: false
---

If you've been hearing "AI agents" and "agentic systems" everywhere but aren't quite sure what makes them different from regular AI tools, you're not alone. Let me break it down in plain English.

## The short version

**AI agents** are AI systems that can take multi-step actions to accomplish a goal, make decisions along the way, and use tools—without you micromanaging every step.

**Agentic systems** are applications built around these agents, designed to handle real workflows end-to-end.

Think: less chatbot, more autonomous assistant.

## What makes something "agentic"?

Here's the key difference between a chatbot and an agent:

**A chatbot:**

- You ask a question
- It gives you an answer
- Done

**An agent:**

- You give it a goal
- It figures out the steps needed
- It takes those steps (using tools, making decisions)
- It handles errors and adjusts
- It gives you the result

### Example: Booking a flight

**Chatbot approach:**

```
You: "Find me flights to New York next week"
Chatbot: "Here are some options: [list of flights]"
You: "Book the 2pm one"
Chatbot: "I can't book flights, but here's a link"
```

**Agent approach:**

```
You: "Book me a flight to New York next week,
     afternoon preferred, under $400"
Agent:
  1. Searches flights
  2. Filters by your preferences
  3. Finds best option
  4. Books it
  5. Adds to your calendar
  6. Sends confirmation
Result: "Booked! You're on the 2:15pm flight.
         Confirmation in your email."
```

The agent **does the work**, not just provides information.

## Key characteristics of AI agents

### 1. **Multi-step reasoning**

Agents can break down complex tasks into steps and execute them in sequence.

Example: "Generate a LinkedIn post from this voice note"

- Step 1: Transcribe audio
- Step 2: Extract key ideas
- Step 3: Generate post variations
- Step 4: Check quality
- Step 5: Return best version

### 2. **Tool use**

Agents can call external tools and APIs to get things done.

Examples:

- Search the web
- Query databases
- Send emails
- Make API calls
- Run code
- Access files

### 3. **Decision-making**

Agents make choices based on context and results.

Example: "If the quality score is below 7/10, regenerate the post with different tone"

### 4. **State management**

Agents remember what they've done and adjust based on progress.

Example: An agent building a report might:

- Remember which sections are complete
- Skip redundant API calls
- Resume if interrupted

### 5. **Error handling**

Agents can recover from failures and try alternative approaches.

Example: If an API call fails, retry with exponential backoff, or use a fallback method.

## Real-world examples

### **LinkedIn Ghostwriter (what I'm building)**

**Goal:** Turn voice notes into authentic LinkedIn posts

**What the agent does:**

1. Receives voice note via Telegram
2. Transcribes using Whisper API
3. Analyzes user's writing style (from past posts)
4. Generates 3 post variations
5. Scores each for quality (hook, readability, style match)
6. Regenerates if score too low
7. Returns best options

**Why it's agentic:** Multi-step workflow, quality gates, decision-making, tool use (Whisper, LLM, database).

### **Customer support agent**

**Goal:** Resolve customer issues autonomously

**What the agent does:**

1. Reads incoming ticket
2. Searches knowledge base
3. If found: Sends solution, closes ticket
4. If not found: Escalates to human with context
5. Learns from human responses

**Why it's agentic:** Decision tree, tool use, state tracking, error handling.

### **Code review agent**

**Goal:** Review pull requests and suggest improvements

**What the agent does:**

1. Reads PR diff
2. Checks for common issues (security, performance, style)
3. Runs tests
4. Generates review comments
5. Suggests specific fixes
6. Re-checks after changes

**Why it's agentic:** Multi-step analysis, tool use (linters, tests), iterative feedback.

## What's NOT an agent?

To clarify, these are **not** agentic systems:

- **Simple chatbots** - Just answer questions, no actions
- **Autocomplete** - Predicts text, doesn't take steps
- **Classification models** - Label data, don't execute workflows
- **RAG systems** - Retrieve and generate, but no multi-step actions

These are useful AI tools, but they're not agents because they don't autonomously execute multi-step workflows.

## Why agents matter now

Three things have made agents practical:

### 1. **Better LLMs**

Models like GPT-4 and Claude can reason through complex tasks and use tools reliably.

### 2. **Frameworks like LangGraph**

Purpose-built tools for building agent workflows with state management, loops, and error handling.

### 3. **Function calling**

LLMs can now reliably call external functions/APIs, making tool use practical.

Before these, agents were too unreliable for production. Now they're ready.

## The production challenge

Building a demo agent is easy. Building a **production** agent is hard.

**Demo agent:**

- Works 80% of the time
- No error handling
- No observability
- No quality gates

**Production agent:**

- Works 95%+ of the time
- Handles errors gracefully
- Logs everything for debugging
- Validates quality before returning results
- Costs are monitored and optimized

This gap—between demo and production—is where most teams get stuck. It's also where I focus my work.

## Common patterns

### **Linear agents**

Simple step-by-step workflows. Good for predictable tasks.

Example: Voice note → Transcribe → Generate → Return

### **Branching agents**

Make decisions and take different paths.

Example:

- If quality is greater than 7 → Return result
- If quality is less than 7 → Regenerate with different approach

### **Loop agents**

Iterate until a condition is met.

Example: Keep refining a draft until it passes quality checks (max 3 attempts).

### **Multi-agent systems**

Multiple specialized agents working together.

Example:

- Research agent: Gathers information
- Writing agent: Creates content
- Editor agent: Reviews and refines

## Getting started

If you're thinking about building an agent:

1. **Start simple** - Pick one workflow that's repetitive and rule-based
2. **Define success clearly** - What does "good enough" look like?
3. **Build quality gates** - Don't let bad outputs reach users
4. **Add observability** - Log everything so you can debug
5. **Iterate based on real use** - Agents improve with feedback

## What I'm working on

I'm building production-grade agentic systems using LangGraph and AWS. Currently shipping:

- **LinkedIn Ghostwriter** - Voice notes → authentic LinkedIn posts
- Writing about the engineering and business of making agents work in production

If you're building agents or thinking about it, [follow along](/writing) or [get in touch](/contact).

## Further reading

- [LangGraph documentation](https://langchain-ai.github.io/langgraph/) - Best framework for building agents
- [Anthropic's tool use guide](https://docs.anthropic.com/claude/docs/tool-use) - How LLMs call functions
- My writing on [agent architecture patterns](/engineering) and [building in public](/business)

---

**Questions?** Hit me up on [Twitter](https://twitter.com/nickthiru) or [email me](mailto:contact@nickthiru.dev).
