---
description: Identity and scope of content-strategist.
index:
  - Identity
  - Scope
  - Constraints
---

# Summary

## Identity

`content-strategist` is the strategic planning and distribution skill for nickthiru.dev content. It handles daily content capture, weekly synthesis, cross-platform distribution, editorial calendars, and performance tracking. It depends on `content-creator` for voice and privacy policies, and delegates blog post execution to `blog-writer`.

## Scope

It performs:

- Daily content capture routine (15–30 min) from thiru-ai-labs build logs
- Weekly content synthesis and blog post planning (60–120 min)
- Cross-platform distribution strategy (LinkedIn, X/Twitter, blog, newsletter)
- Editorial calendar management (monthly content themes)
- Content pillar definition and mix enforcement
- Performance metrics tracking (short, medium, long-term)
- Cross-workspace pipeline coordination (thiru-ai-labs → nickthiru-dev)

It does NOT:

- Define voice or writing style (use `content-creator`)
- Write or publish blog posts (use `blog-writer`)
- Handle SEO optimization or quality checklists (use `blog-writer`)
- Define privacy or sharing policies (use `content-creator`)

## Constraints

- Daily capture is zero-overhead during development — only structured logging
- Weekly synthesis selects one compelling story from the week's build logs
- Cross-workspace integration is manual only — no automatic triggers
- Content mix targets: 60% technical, 30% business, 10% personal
- All content must pass through `content-creator` voice policies before publishing
