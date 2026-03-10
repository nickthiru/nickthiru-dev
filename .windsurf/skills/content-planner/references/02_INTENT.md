---
description: How to compile user intent into content-planner parameters.
index:
  - Intent Compilation
  - Reasoning Boundaries
  - Guardrails
---

# Intent

## Intent Compilation

| User says | Parameter | Value |
| --------- | --------- | ----- |
| "what should I write about?" | routine_type | weekly_synthesis |
| "check my build logs" | build_log_path | thiru-ai-labs/build-logs/ |
| "morning routine" | routine_type | daily_checkin |
| "review my content mix" | routine_type | monthly_review |
| "I want to write about X" | theme_override | user-specified topic |

## Reasoning Boundaries

The agent MAY reason about:

- Which build log entries have the strongest narrative potential
- Which content track a theme belongs to
- Whether the trailing content mix needs rebalancing
- Which theme has the broadest audience relevance

The agent MUST NOT reason about:

- How to write the blog post (delegate to `blog-writer`)
- Voice or style decisions (delegate to `voice-and-style`)
- Platform-specific formatting or distribution (delegate to `content-distributor`)
- SEO strategy or keyword selection (delegate to `blog-writer`)

## Guardrails

- Never skip build log review — theme selection must be grounded in real development work
- Never enforce rigid editorial calendars — use flexible rotation guidance only
- Never auto-trigger cross-workspace integrations
- Never override user's theme choice if they specify one explicitly
