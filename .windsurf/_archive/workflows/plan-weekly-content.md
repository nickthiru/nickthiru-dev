---
name: plan-weekly-content
description: Plan and execute weekly content creation for blog posts, social media, and newsletter. This is the strategic engine that synthesizes thiru-ai-labs build logs into high-quality, SEO-optimized content for nickthiru.dev and strategic distribution across platforms. Use for strategic content distribution and audience growth.
---

# Weekly Content Planning Workflow

## Overview

60-120 minute weekly process for creating canonical blog content and repurposing across platforms.

**Voice**: see `rules/voice-and-style.md`  
**SEO & Quality**: see `rules/seo-and-quality.md`  
**Daily capture**: builds on `/capture-daily-content`  

## Steps

### Phase 1: Review & Theme Selection (15-20 min)

1. Scan all build log entries from `thiru-ai-labs/build-logs/` for the week
2. Identify strongest themes or connected insights
3. Note significant milestones or breakthroughs
4. Select one compelling story with broader relevance

**Theme selection questions:**
- What problem did I solve that others might face?
- What mistake could help others avoid wasting time?
- What insight changed my approach to building?

### Phase 2: Outline Creation (10-15 min)

Use the appropriate write-* workflow based on content type:

- Technical topic → `/write-technical-blog-post`
- Business topic → `/write-business-blog-post`
- Product topic → `/write-product-blog-post`

### Phase 3: Content Creation (30-60 min)

Follow the chosen write-* workflow steps 3-6:
- Write draft following outline
- Apply voice from `rules/voice-and-style.md`
- Include specific numbers, dates, details
- Add code/screenshots where relevant
- SEO optimize per `rules/seo-and-quality.md`
- Word count: 800-1500 words

### Phase 4: Multi-Platform Repurposing (15-25 min)

**LinkedIn Post** (150-300 words):
```markdown
I've been [working on X] for [time period].

Here's what I learned about [topic]:

[Insight 1 - paragraph]
[Insight 2 - paragraph]

Key takeaway: [Main lesson]

What's been your experience with [topic]?
```

**X/Twitter Thread** (7-10 tweets):
```markdown
Tweet 1: I [achieved X] in [timeframe]. Here's how 🧵
Tweets 2-4: Process/steps
Tweets 5-7: Key lessons
Tweet 8: Mistake or tradeoff
Tweet 9: What's next
Tweet 10: CTA
```

**Newsletter**: Personal update + blog summary + exclusive insight + reply CTA

### Phase 5: Scheduling & Distribution (5-10 min)

- [ ] Blog post published with all SEO elements
- [ ] LinkedIn post scheduled for 8-10 AM next day
- [ ] X thread scheduled for 9-11 AM next day
- [ ] Newsletter queued (Thursday evening)
- [ ] All links checked and working

## Monthly Content Calendar

- **Week 1**: Technical deep dive or tutorial
- **Week 2**: Business strategy or milestone update
- **Week 3**: Personal story or mindset insights
- **Week 4**: Building in public lessons or community

## Content Theme Ideas

**Technical**: How I solved [problem], Lessons from implementing [tech], Debugging [issue], Architecture decisions, Performance optimization

**Business**: Revenue milestone, Customer discovery, Pricing strategy, Marketing experiments, Time management

**Personal**: Overcoming [challenge], Productivity systems, Founder struggles, Work-life integration

**Building in Public**: Transparency decisions, Audience growth, Content systems, Community building
