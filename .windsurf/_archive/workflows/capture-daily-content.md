---
name: daily-content-capture
description: Implement the 15-30 minute daily routine for building in public content creation. This is the critical engine that transforms thiru-ai-labs build logs into consistent content for nickthiru.dev and social platforms. Use for consistent content capture from development work.
---

# Daily Content Capture Workflow

## Overview

15-30 minute daily routine that turns development work into content systematically.

**Pipeline**: `thiru-ai-labs/build-logs/` → capture → transform → publish

**Voice**: see `rules/voice-and-style.md`  
**Privacy**: see `rules/content-strategy.md`  

## Daily Checklist

### Morning (5-10 min)

- [ ] Reply to comments on yesterday's posts (LinkedIn, X, blog)
- [ ] Save 1-3 good posts from your niche for inspiration
- [ ] Add 1 bullet to today's build log (`thiru-ai-labs/build-logs/YYYY-MM-DD.md`): what you're shipping today

### During Development (0 extra min — just capture)

**Capture one artifact:**
- Screenshot, short Loom clip, terminal output, architecture sketch, or before/after comparison

**Add 3 bullets to build log:**
- **Build:** What changed / what you implemented
- **Why:** User value or problem solved
- **Lesson:** What surprised you or what you learned

### End of Day (10-20 min)

- [ ] Choose ONE item from today's build log
- [ ] Draft ONE post (LinkedIn is default platform)
- [ ] Post it or schedule for tomorrow morning
- [ ] Optional: Adapt into short X post/thread

## Build Log Templates

### Feature Entry

```markdown
**Build:** [what changed]
**Proof:** [screenshot/clip link]
**User Value:** [why it matters to users]
**Tradeoff:** [latency/cost/UX/privacy consideration]
**Next:** [next step or milestone]
```

### Bug/Failure Entry

```markdown
**Symptom:** [what broke]
**Root Cause:** [what caused it]
**Fix:** [what you changed]
**Lesson:** [what you'll do differently]
```

### User Insight Entry

```markdown
**Who:** [role + context]
**Problem:** [what they needed]
**Quote:** [paraphrased key insight]
**Implication:** [what you'll build/change]
```

## LinkedIn Post Templates

### "I'm building this" (Re-activation)

```markdown
I'm building [product] that solves [problem].

The challenge:
- [pain point 1]
- [pain point 2]

What I'm building instead:
- [solution approach]
- [key benefit]

If you're in [target audience]: what's your biggest blocker?
```

### Build Log Progress (Daily)

```markdown
Build log: [Product Name]

Today I got [specific milestone] working.

What it does:
• [feature 1]
• [feature 2]

Why it matters: [user benefit]

Next up: [next milestone]

Question: would you rather [option A] or [option B]?
```

### "I thought X, I was wrong" (Learning)

```markdown
I thought [assumption].

I was wrong.

What happened:
• [what you tried]
• [what broke]
• [what you changed]

Lesson: [one sentence key learning]

If you're building with [tech]: what's your hardest challenge right now?
```

## X/Twitter Templates

### Single Tweet

```markdown
Build log: [Product Name]
Shipped [feature] today.
Next: [next milestone].
Biggest surprise: [key lesson].
```

### Short Thread (7-10 tweets)

1. Hook: "I'm building [product]. Here's the workflow + what I learned 🧵"
2-4. Process steps
5-7. Key lessons
8. Mistake/tradeoff
9. What's next
10. CTA: "If you [struggle with problem], reply 'beta'. [link]"

## Timing

| Platform | Best Times | Frequency |
|---|---|---|
| **LinkedIn** | 8-10 AM, 12-1 PM, 5-7 PM | 5x/week |
| **X/Twitter** | 9-11 AM, 2-4 PM, 8-10 PM | 1-3x/day |
| **Blog** | Weekly | 1x/week |
| **Newsletter** | Thursday evening | 1x/week |
