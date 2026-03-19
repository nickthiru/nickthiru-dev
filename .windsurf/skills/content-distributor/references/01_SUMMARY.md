---
description: Identity and scope of content-distributor.
index:
  - Identity
  - Scope
  - Constraints
---

# Summary

## Identity

`content-distributor` is the distribution skill that adapts published blog posts into platform-specific content versions and manages the scheduling and posting process. It takes a completed blog post from `blog-writer` and creates LinkedIn posts, X/Twitter threads, and newsletter segments. It handles the "how to distribute" decision — not content creation or theme selection.

## Scope

It performs:

- Multi-platform repurposing of blog posts (LinkedIn, X/Twitter, newsletter)
- Platform-specific formatting and adaptation
- Scheduling guidance (timing, sequence, cadence)
- Newsletter compilation (personal note + blog summaries + exclusive insight)
- Quality validation of platform-specific versions

It does NOT:

- Write blog posts (use `blog-writer`)
- Select content themes or manage editorial planning (use `weekly-planner`)
- Define voice or style (use `voice-and-style`)
- Handle SEO optimization (use `blog-writer`)
- Actually post content (manual process — the skill produces ready-to-post text)

## Constraints

- All platform versions must pass `voice-and-style` voice policies
- All platform versions must pass `voice-and-style` privacy framework
- Each platform version must stand alone — it should not require reading the blog post to make sense
- LinkedIn and X posts (weekly repurposed from blog) must include the blog link in the post body before hashtags — not in a comment
- No copy-paste between platforms — each version is genuinely adapted to its format
- Newsletter exclusive content must not duplicate the blog post
