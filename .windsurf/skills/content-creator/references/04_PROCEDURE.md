---
description: Canonical execution path for content-creator.
index:
  - Pipeline Overview
  - Steps
  - Content Categories
  - Teaching Style
---

# Procedure

## Pipeline Overview

```text
Step 1: Ideation & Outline (User + Model)
Step 2: Model Draft (Model)
Step 3: Style Rewrite (Model + Voice Policies)
Step 4: Your Edits (User)
```

## Steps

### Step 1: Ideation & Outline

**Actor**: User + Model

1. Identify source material: What problem was recently solved? What struggle might others face? What mistake can be helped to avoid?
2. Select content category: engineering, business, or product.
3. Select target platform: blog, newsletter, LinkedIn, or X/Twitter.
4. Use the appropriate template from `src/content/templates/`:
   - Engineering: `src/content/templates/engineering-template.md`
   - Business: `src/content/templates/business-template.md`
   - Product: `src/content/templates/product-template.md`
5. Outline using universal post structure: Hook → Problem → Failed Attempts → Solution → Results → Lessons → CTA.
6. Ensure the hook has a personal story element.

### Step 2: Model Draft

**Actor**: Model

1. Generate content with accuracy for the selected category.
2. Include category-specific elements:
   - Engineering: code snippets, architecture decisions, debugging steps.
   - Business: metrics, pricing data, strategy frameworks.
   - Product: feature descriptions, user feedback, progress updates.
3. Cover all aspects of the outline.
4. Ensure technical/business accuracy.
5. Do not apply voice yet — that is Step 3.

### Step 3: Style Rewrite

**Actor**: Model + Voice Policies (03_POLICIES.md)

1. Rewrite using casual, conversational language.
2. Add personal stories and specific details.
3. Include vulnerability and learning moments.
4. Apply signature phrases and analogies from `03_POLICIES.md`.
5. Check against "Always" and "Never" policies.
6. Verify universal post structure is intact.

### Step 4: Your Edits

**Actor**: User

1. Add actual metrics, dates, and numbers.
2. Include real mistakes and their consequences.
3. Add specific business context and outcomes.
4. Verify accuracy from personal experience.
5. Enhance storytelling with genuine details.
6. Apply privacy decision framework from `03_POLICIES.md`.

## Content Categories

### Engineering (track: "technical", 60% of content)

**Focus**: Technical deep-dives, architecture, debugging, production systems.
**Voice**: Technical precision + educational focus + honest about complexity.

### Business (track: "business", 30% of content)

**Focus**: Pricing, growth, building in public, strategy, solo founder operations.
**Voice**: Strategic yet practical + data-informed + framework-oriented.

### Product (track: "product", 10% of content)

**Focus**: Build logs, feature launches, product updates, user feedback.
**Voice**: Development-focused + user-centric + progress-oriented.

## Teaching Style

- **Start with why**: Explain the problem before the solution.
- **Use simple language**: Avoid jargon, or explain it immediately.
- **Progressive disclosure**: Introduce concepts step by step.
- **Real examples**: Use actual code, metrics, or features from your work.
- **Admit knowledge gaps**: "I'm still learning this, but here's what I know so far."
