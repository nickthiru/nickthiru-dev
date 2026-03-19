---
description: How to compile user intent into post-writer parameters.
index:
  - Intent Compilation
  - Reasoning Boundaries
  - Guardrails
---

# Intent

## Intent Compilation

| User says | Parameter | Value |
| --------- | --------- | ----- |
| "write today's posts" | build_log_path | thiru-ai-labs/build-logs/YYYY/MM/YYYY-MM-DD.md (today) |
| "write posts for [date]" | build_log_path | thiru-ai-labs/build-logs/YYYY/MM/YYYY-MM-DD.md (specified date) |
| "is today post-worthy?" | mode | evaluate_only |
| "draft the X post only" | output | x_only |
| "draft the LinkedIn post only" | output | linkedin_only |

When `build_log_path` is not specified, default to today's date. If today's build log does not exist, report this and stop.

## Reasoning Boundaries

The agent MAY reason about:

- Whether the build log content has a clear problem/insight/breakthrough worth sharing
- Which part of the build log provides the strongest narrative hook
- How to condense a technical insight into a compelling short-form post
- Whether the content passes the `voice-and-style` privacy framework

The agent MUST NOT reason about:

- Whether to publish the post (that is always a human decision)
- Weekly theme selection or content mix (use `weekly-planner`)
- Blog post writing or repurposing (use `blog-writer` and `content-distributor`)
- Voice or privacy definitions — always defer to `voice-and-style` policies

## Guardrails

- Never draft posts from build logs that fail privacy review
- Never force a post from weak material — stop and report if nothing is post-worthy
- Never skip user review — always present drafts before any posting action
- Never add blog article links to daily posts — they are standalone
