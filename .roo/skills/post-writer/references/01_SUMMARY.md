---
description: Identity and scope of post-writer.
index:
  - Identity
  - Scope
  - Constraints
---

# Summary

## Identity

`post-writer` is the daily social post skill. It reads the current day's build log from `thiru-ai-labs`, evaluates whether the day's work contains post-worthy content, and drafts a standalone X post and LinkedIn post for human review before posting. It handles the daily content track — short-form social updates derived directly from development work, independent of the weekly blog track.

## Scope

It performs:

- Reading the day's build log (`thiru-ai-labs/build-logs/YYYY/MM/YYYY-MM-DD.md`)
- Evaluating post-worthiness against defined criteria
- Drafting an X post using the X post template
- Drafting a LinkedIn post using the LinkedIn post template
- Applying `voice-and-style` voice characteristics and privacy framework to both drafts
- Presenting both drafts for user review and approval
- Stopping and reporting clearly if the build log contains nothing post-worthy

It does NOT:

- Write blog posts (use `blog-writer`)
- Repurpose blog posts for platforms (use `content-distributor`)
- Select weekly themes or manage content mix (use `weekly-planner`)
- Define voice or privacy policies (defers to `voice-and-style`)
- Post content — drafts only; user posts manually
- Add blog article links — daily posts are standalone; blog links belong in `content-distributor` weekly posts

## Constraints

- Never publish or queue without explicit user approval
- Never invent content not grounded in the actual build log
- Always apply `voice-and-style` privacy framework before drafting — if the build log content cannot pass privacy review, stop and report
- Stop gracefully if nothing is post-worthy — do not force a post from thin material
- Keep daily posts independent — they do not reference or require a blog article
