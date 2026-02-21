---
description: How to compile user intent into content creation parameters.
index:
  - Compilation
  - Guardrails
---

# Intent

## Compilation

When the user invokes content creation, derive the following parameters:

| Parameter | How to Derive | Default |
|---|---|---|
| `content_category` | Extract from request context: engineering, business, or product | Required, no default |
| `source_material` | Build log entry, idea, problem solved, or experience | Required, no default |
| `target_platform` | Blog, newsletter, LinkedIn, or X/Twitter | `blog` |
| `audience_segment` | Technical founders, solo operators, AI engineers, or developers | All segments |

**Source of truth**: The 4-step pipeline defined in `04_PROCEDURE.md`.

## Guardrails

- This skill defines voice and pipeline only. Reject requests for SEO optimization, content scheduling, or distribution planning.
- All content must pass through the 4-step pipeline — no shortcuts to publishing.
- Content category must be explicitly identified before drafting begins.
- Privacy policies in `03_POLICIES.md` apply to all derived content regardless of platform.
