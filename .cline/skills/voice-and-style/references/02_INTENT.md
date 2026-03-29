---
description: How to compile user intent into voice-and-style parameters.
index:
  - Intent Compilation
  - Reasoning Boundaries
  - Guardrails
---

# Intent

## Intent Compilation

| User says | Parameter | Value |
| --------- | --------- | ----- |
| "write a post about..." | content_category | engineering / business / product |
| "based on this build log..." | source_material | path to build log or notes |
| "for LinkedIn / blog / X..." | target_platform | platform name |
| "for developers / founders..." | audience_segment | segment identifier |

## Reasoning Boundaries

The agent MAY reason about:

- Which voice characteristics to emphasize based on content category
- How to apply the teaching style for the given topic
- Privacy classification of specific details in source material

The agent MUST NOT reason about:

- SEO strategy or keyword selection
- Content scheduling or distribution timing
- Editorial calendar planning
- Platform-specific formatting (handled by downstream skills)

## Guardrails

- Never create content independently — always operate as a dependency of another skill
- Never bypass the 4-step content creation pipeline
- Never override privacy framework decisions
- Never invent voice characteristics not defined in policies
