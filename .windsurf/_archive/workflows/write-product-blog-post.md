---
name: write-product-blog-post
description: Write a complete product blog post with development focus, user-centric messaging, and progress-oriented storytelling. This is the product content engine that transforms thiru-ai-labs build log development progress into compelling user stories. Use when creating content from workspace build logs (thiru-ai-labs/BUILD_LOG.md), feature launches, product updates, or user feedback.
---

# Write Product Blog Post

## Prerequisites

- Clear product update or feature to share
- Understanding of user problem being solved
- Development progress or milestones achieved
- User feedback or usage data (if available)

## Steps

### 1. Product Story Validation

- What problem does this solve for users?
- What's the "before and after" for users?
- What milestone does this represent?
- What technical challenges were overcome?
- What did I learn building this?

### 2. User-Centric Framing

- Primary benefit: main user problem solved
- Secondary benefits: additional improvements
- Time/effort saved: quantify if possible
- New capabilities: what users can now do

### 3. Create Outline

Use `src/content/templates/product-template.md` structure:

1. **Hook**: User problem or personal motivation ("I kept hearing from users that...")
2. **What I Built**: Clear description, what it does, technical approach at high level
3. **How It Works**: User-facing explanation, step-by-step UX, behind-the-scenes insight
4. **Why It Matters**: User problems solved, business impact, how it fits bigger vision
5. **The Challenge**: Technical hurdles, unexpected difficulties, creative solutions
6. **Development Progress**: Current status, what's working, known limitations
7. **Next Up**: What's coming, user feedback being incorporated, how users can get involved

### 4. Write First Draft

- Follow outline exactly
- Apply voice from `rules/voice-and-style.md`
- Focus on user value and problem solving
- Show progress and momentum
- Include technical details without overwhelming
- Word count: 800-1500 words

### 5. Apply Voice & Style Rewrite

Use `content-creator` skill Step 3 process:

- Development-focused but user-centric
- Progress-oriented and forward-looking
- Honest about challenges and limitations
- Clear about what's real vs. planned

### 6. SEO Optimization

Apply `rules/seo-and-quality.md` checklist.

### 7. Add Engagement Elements

- Request feedback on the feature
- Invite beta testing for next features
- Share roadmap and ask for input
- Newsletter CTA

### 8. Publication Setup

```markdown
---
title: ""
slug: ""
description: ""
publishedAt: ""
tags: []
draft: false
track: "product"
image: ""
---
```

### 9. Distribution

- **LinkedIn**: Product updates and user value (150-300 words)
- **X/Twitter**: Feature announcements and progress thread
- **Newsletter**: Behind-the-scenes development
- **Product channels**: In-app notifications, user emails (if applicable)
