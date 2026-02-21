---
description: How to compile user intent into content-strategist parameters.
index:
  - Compilation
  - Guardrails
---

# Intent

## Compilation

When the user invokes content strategy, derive the following parameters:

| Parameter | How to Derive | Default |
|---|---|---|
| `routine` | Extract from request: "daily" or "weekly" | Required, no default |
| `build_log_path` | Path to thiru-ai-labs build logs | `thiru-ai-labs/build-logs/` |
| `target_platforms` | Which platforms to distribute to | All (LinkedIn, X, blog, newsletter) |
| `content_pillar` | Technical, business, building-in-public, practical, or trends | Derived from source material |

**Source of truth**: The daily and weekly procedures in `04_PROCEDURE.md`.

## Guardrails

- This skill handles strategy and planning only. Reject requests for blog post writing or voice definition.
- Daily routine must be completable in 15–30 minutes.
- Weekly routine must be completable in 60–120 minutes.
- Cross-workspace pipeline is manual — never automate triggers between repos.
- Content pillar selection must align with the 60/30/10 mix over time.
