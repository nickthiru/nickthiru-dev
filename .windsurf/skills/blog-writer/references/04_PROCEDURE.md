---
description: Canonical execution path for blog-writer.
index:
  - Procedure Overview
  - Common Steps
  - Track: Engineering
  - Track: Business
  - Track: Product
  - Publication and Distribution
---

# Procedure

## Procedure Overview

```text
1. Topic Validation     → Confirm topic, track, and source material
2. Create Outline       → Use track-specific template structure
3. Write First Draft    → Follow outline with real content
4. Apply Voice Rewrite  → Use voice-and-style Step 3 process
5. Track Enhancement    → Apply track-specific standards
6. SEO Optimization     → Apply SEO policies from 03_POLICIES.md
7. Add Engagement       → CTA, related links, questions
8. Publication Setup    → Frontmatter, quality checklist
9. Distribution         → Multi-platform repurposing
```

## Common Steps

### Step 1: Topic Validation

1. Identify the track: engineering, business, or product.
2. Confirm source material exists (build log, idea, experience).
3. Validate the topic has personal experience behind it.
4. Check top search results for gaps and unique angles.

### Step 2: Create Outline

Select template based on track:

| Track       | Template             | Location                                                  |
| ----------- | -------------------- | --------------------------------------------------------- |
| engineering | Engineering template | `references/05_TEMPLATES.md` → Engineering Track Template |
| business    | Business template    | `references/05_TEMPLATES.md` → Business Track Template    |
| product     | Product template     | `references/05_TEMPLATES.md` → Product Track Template     |

Follow the track-specific outline structure below.

### Step 3: Write First Draft

1. Follow outline exactly.
2. Apply voice from `voice-and-style` policies.
3. Include specific numbers, dates, and details.
4. Target 800–1500 words.

### Step 4: Apply Voice & Style Rewrite

Use `voice-and-style` 4-step pipeline Step 3:

1. Rewrite using casual, conversational language.
2. Add personal stories and specific details.
3. Apply signature phrases and analogies.
4. Check against "Always" and "Never" policies.

### Step 5: Track Enhancement

Apply the track-specific enhancement below.

### Step 6: SEO Optimization

Apply all SEO requirements from `03_POLICIES.md`.

### Step 7: Add Engagement Elements

1. Engagement question at the end.
2. Newsletter CTA: `[Subscribe](https://nickthiru.dev/subscribe)`.
3. Links to 2–3 related posts.
4. FAQ section for featured snippets (optional).

### Step 8: Publication Setup

Set frontmatter:

```markdown
---
title: ""
slug: ""
description: ""
publishedAt: ""
updatedAt: ""
tags: []
draft: true
track: ""
image: ""
---
```

Run quality checklist from `03_POLICIES.md`.

## Track: Engineering

### Outline Structure

1. **Hook**: Personal struggle or moment of realization.
2. **The Problem**: What was being accomplished, specific technical challenges.
3. **Failed Attempts**: First approach + why it failed, second attempt + lessons, "aha!" moment.
4. **Step-by-Step Solution**: Clear actionable steps with real code examples.
5. **Results & Metrics**: Actual outcomes, performance improvements.
6. **Lessons Learned**: Technical insights, broader principles.
7. **What I'd Do Differently**: Specific advice to help others avoid pitfalls.

### Track Enhancement

- Verify all code examples are tested and functional.
- Include imports and dependencies.
- Add error handling and edge cases.
- Specify library/framework versions.
- Add explanatory comments for complex code.
- Show debugging process, not just final solution.
- Explain WHY something works, not just THAT it works.
- Connect technical topics to business benefits.

## Track: Business

### Outline Structure

1. **Hook**: The scary/exciting decision point.
2. **Transparency Decision**: What was decided to share publicly and why.
3. **What I Shared (The Data)**: Specific metrics with context.
4. **Business Impact**: What happened after sharing.
5. **The Scary Part**: What made me nervous, what could have gone wrong.
6. **What Actually Happened**: Real outcomes (good and bad).
7. **Guidelines for Others**: Framework or mental model, practical advice.

### Track Enhancement

- Include specific metrics and data points throughout.
- Provide frameworks and mental models.
- Share both successes and failures transparently.
- Apply privacy decision framework before publishing.
- Revenue numbers rounded (e.g., "$5K MRR" not "$5,234.12").

## Track: Product

### Outline Structure

1. **Hook**: User problem or personal motivation.
2. **What I Built**: Clear description, what it does, technical approach at high level.
3. **How It Works**: User-facing explanation, step-by-step UX, behind-the-scenes insight.
4. **Why It Matters**: User problems solved, business impact, bigger vision.
5. **The Challenge**: Technical hurdles, unexpected difficulties, creative solutions.
6. **Development Progress**: Current status, what's working, known limitations.
7. **Next Up**: What's coming, user feedback being incorporated, how users can get involved.

### Track Enhancement

- Focus on user value and problem solving.
- Show progress and momentum.
- Include technical details without overwhelming.
- Be honest about challenges and limitations.
- Be clear about what's real vs. planned.

## Publication and Distribution

### Step 9: Hand Off to Distribution

After publication, delegate to `content-distributor` for multi-platform repurposing:

- LinkedIn post (150–300 words)
- X/Twitter thread (7–10 tweets)
- Newsletter segment (blog summary + link)

See `content-distributor` skill for the full distribution procedure.
