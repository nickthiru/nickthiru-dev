---
description: How to compile user intent into content-distributor parameters.
index:
  - Intent Compilation
  - Reasoning Boundaries
  - Guardrails
---

# Intent

## Intent Compilation

| User says                        | Parameter        | Value                       |
| -------------------------------- | ---------------- | --------------------------- |
| "distribute this post"           | source_post      | path to published blog post |
| "create LinkedIn version"        | target_platforms | linkedin                    |
| "create all platform versions"   | target_platforms | all                         |
| "compile this week's newsletter" | routine_type     | newsletter                  |
| "schedule for tomorrow"          | scheduling       | next-day                    |

## Reasoning Boundaries

The agent MAY reason about:

- Which insight from the blog post is most compelling for each platform
- How to structure the hook for maximum engagement per platform
- What engagement question to ask at the end of a LinkedIn post
- How to break a blog post into a thread structure
- What "exclusive" insight to include in the newsletter

The agent MUST NOT reason about:

- What topic to write about (delegate to `weekly-planner`)
- How to write the blog post (delegate to `blog-writer`)
- Voice or style definitions (delegate to `voice-and-style`)
- SEO strategy (delegate to `blog-writer`)

## Guardrails

- Never create platform content without a published blog post as source
- Always include the blog link in the LinkedIn post body before hashtags (not in a comment)
- Never copy-paste the same text across platforms
- Never skip the quality checklist before presenting platform versions
- Never bypass `voice-and-style` privacy framework
