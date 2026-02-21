---
description: Canonical execution path for content-strategist.
index:
  - Overview
  - Daily Capture Routine
  - Weekly Synthesis Routine
  - Cross-Workspace Pipeline
  - Monthly Calendar
---

# Procedure

## Overview

```text
Daily (15-30 min):  Morning check-in → Development logging → End-of-day post
Weekly (60-120 min): Review build logs → Select theme → Create blog post → Distribute
Monthly:            Review calendar → Adjust content mix → Track metrics
```

## Daily Capture Routine

### Morning (5–10 min)

1. Reply to comments on yesterday's posts (LinkedIn, X, blog).
2. Save 1–3 good posts from your niche for inspiration.
3. Add 1 bullet to today's build log (`thiru-ai-labs/build-logs/YYYY-MM-DD.md`): what you're shipping today.

### During Development (0 extra min)

Capture one artifact: screenshot, short Loom clip, terminal output, architecture sketch, or before/after comparison.

Add 3 bullets to build log using the appropriate template:

**Feature Entry:**
```
**Build:** [what changed]
**Proof:** [screenshot/clip link]
**User Value:** [why it matters to users]
**Tradeoff:** [latency/cost/UX/privacy consideration]
**Next:** [next step or milestone]
```

**Bug/Failure Entry:**
```
**Symptom:** [what broke]
**Root Cause:** [what caused it]
**Fix:** [what you changed]
**Lesson:** [what you'll do differently]
```

**User Insight Entry:**
```
**Who:** [role + context]
**Problem:** [what they needed]
**Quote:** [paraphrased key insight]
**Implication:** [what you'll build/change]
```

### End of Day (10–20 min)

1. Choose ONE item from today's build log.
2. Draft ONE post (LinkedIn is default platform).
3. Post it or schedule for tomorrow morning.
4. Optional: Adapt into short X post/thread.

**LinkedIn Post Templates:**

"I'm building" (re-activation):
```
I'm building [product] that solves [problem].

The challenge:
- [pain point 1]
- [pain point 2]

What I'm building instead:
- [solution approach]
- [key benefit]

If you're in [target audience]: what's your biggest blocker?
```

Build log progress (daily):
```
Build log: [Product Name]

Today I got [specific milestone] working.

What it does:
- [feature 1]
- [feature 2]

Why it matters: [user benefit]

Next up: [next milestone]

Question: would you rather [option A] or [option B]?
```

"I thought X, I was wrong" (learning):
```
I thought [assumption].

I was wrong.

What happened:
- [what you tried]
- [what broke]
- [what you changed]

Lesson: [one sentence key learning]

If you're building with [tech]: what's your hardest challenge right now?
```

**X/Twitter Templates:**

Single tweet:
```
Build log: [Product Name]
Shipped [feature] today.
Next: [next milestone].
Biggest surprise: [key lesson].
```

Short thread (7–10 tweets):
1. Hook: "I'm building [product]. Here's the workflow + what I learned"
2–4. Process steps
5–7. Key lessons
8. Mistake/tradeoff
9. What's next
10. CTA: "If you [struggle with problem], reply 'beta'. [link]"

## Weekly Synthesis Routine

### Phase 1: Review & Theme Selection (15–20 min)

1. Scan all build log entries from `thiru-ai-labs/build-logs/` for the week.
2. Identify strongest themes or connected insights.
3. Note significant milestones or breakthroughs.
4. Select one compelling story with broader relevance.

Theme selection questions:
- What problem did I solve that others might face?
- What mistake could help others avoid wasting time?
- What insight changed my approach to building?

### Phase 2: Outline Creation (10–15 min)

Route to `blog-writer` based on content type:
- Technical topic → engineering track
- Business topic → business track
- Product topic → product track

### Phase 3: Content Creation (30–60 min)

Delegate to `blog-writer` for the full blog post procedure (Steps 1–8).

### Phase 4: Multi-Platform Repurposing (15–25 min)

Create platform-specific versions:

**LinkedIn** (150–300 words):
```
I've been [working on X] for [time period].

Here's what I learned about [topic]:

[Insight 1 - paragraph]
[Insight 2 - paragraph]

Key takeaway: [Main lesson]

What's been your experience with [topic]?
```

**X/Twitter Thread** (7–10 tweets):
```
Tweet 1: I [achieved X] in [timeframe]. Here's how
Tweets 2-4: Process/steps
Tweets 5-7: Key lessons
Tweet 8: Mistake or tradeoff
Tweet 9: What's next
Tweet 10: CTA
```

**Newsletter**: Personal update + blog summary + exclusive insight + reply CTA.

### Phase 5: Scheduling & Distribution (5–10 min)

1. Blog post published with all SEO elements.
2. LinkedIn post scheduled for 8–10 AM next day.
3. X thread scheduled for 9–11 AM next day.
4. Newsletter queued (Thursday evening).
5. All links checked and working.

## Cross-Workspace Pipeline

```
thiru-ai-labs (Development)
├── build-logs/YYYY-MM-DD.md     # Source material
└── apps/project/artifacts/      # Development artifacts
    ↓ (Manual integration)
nickthiru-dev (Content)
├── scripts/content-transform.js  # Transformation logic
└── src/content/posts/            # Published content
```

Integration is manual only — no automatic triggers between workspaces.

## Monthly Calendar

- **Week 1**: Technical deep dive or tutorial.
- **Week 2**: Business strategy or milestone update.
- **Week 3**: Personal story or mindset insights.
- **Week 4**: Building in public lessons or community.

Content theme ideas:
- **Technical**: How I solved [problem], Lessons from implementing [tech], Debugging [issue], Architecture decisions, Performance optimization.
- **Business**: Revenue milestone, Customer discovery, Pricing strategy, Marketing experiments, Time management.
- **Personal**: Overcoming [challenge], Productivity systems, Founder struggles, Work-life integration.
- **Building in Public**: Transparency decisions, Audience growth, Content systems, Community building.
