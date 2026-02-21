---
name: write-technical-blog-post
description: Write a complete technical blog post with authentic voice, proper structure, SEO optimization, and engagement elements. This is the technical content engine that transforms thiru-ai-labs build log challenges into comprehensive tutorials. Use when creating new technical content for the blog.
---

# Write Technical Blog Post

## Prerequisites

- Clear topic idea or technical concept to explain
- Personal experience or story related to the topic
- Code examples or practical demonstrations

## Steps

### 1. Topic Validation

- Have I actually used this in production?
- What problems did I face? What mistakes did I make?
- What's missing from existing content on this topic?
- Check top 5 search results for gaps and unique angles

### 2. Create Outline

Use `src/content/templates/engineering-template.md` structure:

1. **Hook**: Personal struggle or moment of realization
2. **The Problem**: What I was trying to accomplish, specific technical challenges
3. **Failed Attempts**: First approach + why it failed, second attempt + lessons, "aha!" moment
4. **Step-by-Step Solution**: Clear actionable steps with real code examples
5. **Results & Metrics**: Actual outcomes, performance improvements
6. **Lessons Learned**: Technical insights, broader principles
7. **What I'd Do Differently**: Specific advice to help others avoid my pitfalls

### 3. Write First Draft

- Follow outline exactly
- Apply voice from `rules/voice-and-style.md`
- Include specific numbers, dates, and details
- Add tested code examples with error handling
- Word count: 800-1500 words

### 4. Apply Voice & Style Rewrite

Use `content-creator` skill Step 3 process:

- Rewrite using conversational, warm language
- Add personal stories and specific details
- Apply signature phrases from `rules/voice-and-style.md`
- Check against "Never Do" and "Always Do" lists

### 5. Technical Enhancement

- Verify all code examples are tested and functional
- Include imports and dependencies
- Add error handling and edge cases
- Specify library/framework versions
- Add explanatory comments for complex code

### 6. SEO Optimization

Apply `rules/seo-and-quality.md` checklist:

- Title under 60 characters with target keyword
- Meta description under 160 characters
- Proper H1 → H2 → H3 hierarchy
- 2-3 internal links to related content
- Image alt text for any visuals

### 7. Add Engagement Elements

- Engagement question at the end
- Newsletter CTA: `[Subscribe](https://nickthiru.dev/subscribe)`
- Links to 2-3 related posts
- FAQ section for featured snippets (optional)

### 8. Publication Setup

```markdown
---
title: ""
slug: ""
description: ""
publishedAt: ""
tags: []
draft: false
track: "technical"
image: ""
---
```

### 9. Distribution

- **LinkedIn**: Professional insights post (150-300 words)
- **X/Twitter**: Thread (7-10 tweets): Hook → Process → Lessons → CTA
- **Newsletter**: Behind-the-scenes + blog summary
