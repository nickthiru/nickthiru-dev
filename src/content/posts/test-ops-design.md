---
title: "Designing the Unified Data Layer"
slug: "test-ops-design"
description: "How I'm approaching the design of a data aggregation layer that pulls signals from Slack, GitHub, Jira, and more."
publishedAt: "2026-06-09"
draft: true
track: "product"
tags: ["ops-pilot", "product", "building-in-public"]
series_name: "OpsPilot"
series_slug: "ops-pilot"
series_phase: "design"
series_position: 2
linkedin_url: ""
x_url: ""
---

# Designing the Unified Data Layer

After defining the problem OpsPilot solves, the next challenge was designing a data layer that can pull from multiple sources and present them coherently.

## The Design Challenge

Each source has different data models, update frequencies, and authentication patterns. Slack has messages and channels, GitHub has PRs and issues, Jira has tickets and workflows. How do you normalize these into a unified view?

## Key Design Decisions

1. **Event-driven architecture** — Each source emits events, we normalize them into a common schema
2. **Plugin-based connectors** — New sources can be added without changing the core
3. **Real-time + batch hybrid** — Some data needs to be live, some can be polled

## What's Next

In the next post, I'll dive into the engineering of the connector system.
