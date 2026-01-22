---
title: "Building LinkedIn Ghostwriter: From Voice Notes to Authentic Posts"
slug: "building-linkedin-ghostwriter"
description: "How I'm building an AI agent that turns voice notes into authentic LinkedIn posts while preserving your unique voice and style."
publishedAt: "2026-01-15"
track: "product"
tags: ["linkedin-ghostwriter", "product", "building-in-public", "saas"]
draft: false
---

A couple weeks ago I caught myself doing the same ridiculous thing again: staring at the LinkedIn text box, rewriting the first sentence five times, and still not liking it.

Meanwhile, if you asked me the same question on a walk? I'd explain it clearly in two minutes.

That gap is why I’m building **LinkedIn Ghostwriter**.

## What I Built

LinkedIn Ghostwriter is an AI agent that transforms voice notes into LinkedIn posts that still sound like _you_.

The workflow I’m aiming for is simple:

1. Record a voice note (2-5 minutes)
2. Get a draft that sounds like you
3. Make a quick pass (optional)
4. Post or schedule

## How It Works

At a high level, the system is a pipeline with a few “quality gates”:

1. **Transcribe** the voice note
2. **Extract** the key points and intent
3. **Draft** 2-3 candidate posts
4. **Score** each draft for:
   - Hook strength
   - Readability
   - Style match (does this sound like the user?)
   - "AI slop" detection (generic phrases, empty claims)
5. **Refine** if the best draft doesn’t meet the bar

I’m building it in a way that can evolve into a real agentic workflow (not just a one-shot prompt):

- LangGraph for orchestration
- A style analysis layer that learns from prior posts
- Feedback loops so the system improves over time

## Why It Matters

Most people who _should_ be posting consistently don’t have a “writing problem.” They have a:

- **time problem**
- **energy problem**
- **voice problem**

They can explain their ideas out loud. They just don’t want to spend 30 minutes editing a post into something that still feels stiff.

And to be blunt: a lot of AI writing tools solve the time problem by creating a bigger voice problem.

## The Challenge

The hard part isn’t generating a LinkedIn post.

The hard part is generating a post that passes these tests:

- It doesn’t sound corporate
- It doesn’t sound like the internet
- It still sounds like the person who recorded the voice note

The second hardest part is building the quality gates so the agent catches bad drafts _before_ you see them.

## Current Status

The core voice-note to draft loop is working end-to-end.

Right now I’m focused on:

- Improving style learning accuracy
- Tightening quality gates
- Building a lightweight scheduling workflow

## Next Up

Next milestones:

- A "review queue" flow for drafts that don’t meet the bar
- Better feedback capture (so edits make the system smarter)
- A simple waitlist so I can start onboarding early users intentionally

If you want to follow along, I’ll keep sharing build logs, technical decisions, and what I’m learning.

If you want early access when it’s ready, join the waitlist:

https://thiruailabs.com/products
