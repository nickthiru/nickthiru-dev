---
title: "Designing the Conversation Detection System"
slug: "test-ser-design"
description: "How I'm approaching the design of a system that detects relevant conversations across social platforms."
publishedAt: "2026-06-08"
draft: true
track: "product"
tags: ["social-engagement-radar", "product", "building-in-public"]
series_name: "Social Engagement Radar"
series_slug: "social-engagement-radar"
series_phase: "design"
series_position: 2
linkedin_url: ""
x_url: ""
---

# Designing the Conversation Detection System

In my last post, I shared why I'm building Social Engagement Radar. Today, I want to talk about how I'm approaching the core challenge: detecting relevant conversations.

## The Design Challenge

The system needs to understand not just keywords, but context. Someone asking "What's the best tool for X?" is very different from someone saying "I hate tool X." Both might mention the same keywords, but the engagement approach should be completely different.

## Key Design Decisions

1. **Semantic search over keyword matching** — I'm using embeddings to capture meaning, not just terms
2. **Intent classification** — Is the user asking, complaining, recommending, or sharing?
3. **Recency weighting** — A conversation from 3 hours ago is more valuable than one from 3 days ago

## What's Next

In the next post, I'll dive into the engineering of the AI response generation pipeline.
