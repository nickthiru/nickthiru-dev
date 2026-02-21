---
description: How to compile user intent into blog-writer parameters.
index:
  - Compilation
  - Guardrails
---

# Intent

## Compilation

When the user invokes blog writing, derive the following parameters:

| Parameter | How to Derive | Default |
|---|---|---|
| `track` | Extract from request: "technical", "business", or "product" | Required, no default |
| `source_material` | Build log entry, idea, topic, or experience | Required, no default |
| `template` | Map from track: engineering-template, business-template, or product-template | Derived from track |
| `draft_mode` | Whether to publish immediately or save as draft | `true` (draft) |

**Source of truth**: The track-specific procedures in `04_PROCEDURE.md`.

## Guardrails

- This skill handles blog post execution only. Reject requests for voice definition, content planning, or distribution strategy.
- Track must be explicitly identified before template selection.
- All posts must pass through the full procedure (validation → outline → draft → voice → SEO → engagement → publication).
- SEO optimization is mandatory, not optional.
- Voice application must reference `content-creator` skill policies.
