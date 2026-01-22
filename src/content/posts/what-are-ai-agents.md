---
title: "What are AI agents and agentic systems, anyway?"
slug: "what-are-ai-agents"
description: "A plain-English explanation of AI agents, agentic systems, and what makes them different from chatbots—plus the production lessons people skip."
publishedAt: "2026-01-09"
track: "technical"
tags: ["ai-agents", "explainer", "langgraph"]
draft: false
---

A few times this month someone has asked me, in basically the same tone:

“Wait… what’s an AI agent? Isn’t this just ChatGPT with extra steps?”

Fair question.

Because the internet has done a great job turning the word _agent_ into a vibes-based marketing term.

So let me try to make this simple.

## The short version

- An **AI agent** is an AI system that can take **multi-step actions** to accomplish a goal.
- An **agentic system** is an application built around agents to handle real workflows end-to-end.

Think: less “chatbot,” more “assistant that actually does things.”

## The core difference: questions vs goals

Here’s the mental model that helped me:

### A chatbot

- You ask a question
- It answers
- Done

### An agent

- You give it a goal
- It figures out the steps
- It uses tools
- It handles errors
- It returns a result

## Example: booking a flight

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

The key is that the agent **does the work**, not just the talking.

## Key characteristics of AI agents

### 1. Multi-step reasoning

Agents break down a goal into steps and execute them.

Example: “Generate a LinkedIn post from this voice note”

- Transcribe
- Extract key ideas
- Draft 2-3 versions
- Check quality
- Return the best draft

### 2. Tool use

Agents call APIs and tools.

Examples:

- Search the web
- Query a database
- Send emails
- Trigger workflows

### 3. Decision-making

Agents choose what to do next based on context and results.

Example: “If quality score is less than 7/10, regenerate with a different angle.”

### 4. State management

Agents maintain state so they can resume, loop, and avoid repeating work.

### 5. Error handling

Agents need to recover gracefully.

Because in the real world:

- APIs time out
- tools fail
- users give messy inputs

## Real-world examples

### LinkedIn Ghostwriter (what I’m building)

**Goal:** turn voice notes into authentic LinkedIn posts.

At a high level, it’s an agentic workflow because it:

1. Receives a voice note
2. Transcribes it
3. Analyzes the user’s writing style
4. Generates multiple drafts
5. Scores each draft (hook, readability, style match)
6. Regenerates if the best draft doesn’t meet the bar

### Customer support agent

**Goal:** resolve customer issues autonomously.

A real system might:

- search a knowledge base
- propose a solution
- escalate with context when confidence is low

### Code review agent

**Goal:** review a PR and suggest improvements.

A real workflow:

- reads the diff
- checks for security/performance issues
- runs tests
- writes review comments

## What’s NOT an agent?

A few things people call “agents” that really aren’t:

- simple chatbots
- autocomplete
- classification models
- basic RAG systems (retrieve + generate, but no multi-step action)

Useful tools, but not agentic.

## Why agents matter now

Three shifts made agents practical:

1. LLMs got better at reasoning
2. Tool/function calling became reliable
3. Frameworks like LangGraph made control flow and state manageable

## The production challenge (the part people skip)

This is where most teams get stuck.

**Demo agent:**

- works 80% of the time
- has no observability
- has no quality gates

**Production agent:**

- works 95%+ of the time
- handles errors gracefully
- logs enough to debug
- validates output quality
- keeps an eye on cost

That gap between demo and production is the real work.

## Getting started

If you’re thinking about building an agent, here’s what I’d do if I were starting today:

1. Start with one workflow that’s repetitive and rule-based
2. Define success clearly (what does “good” look like?)
3. Add quality gates before you ship
4. Add observability earlier than feels necessary
5. Iterate with real users

## Your turn

What’s your best definition of an “AI agent”? And what’s the most confusing part of the agent hype right now?

If you want more posts like this (and the unglamorous production lessons), you can subscribe here:

https://nickthiru.dev/subscribe
