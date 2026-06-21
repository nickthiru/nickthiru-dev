---
description: Canonical execution path for post-writer.
index:
  - Procedure Overview
  - Steps
  - Templates
---

# Procedure

## Procedure Overview

```text
1. Read Build Log  → Load today's log from thiru-ai-labs
2. Privacy Gate    → Apply voice-and-style privacy framework; stop if fails
3. Evaluate        → Check post-worthiness; stop if nothing qualifies
4. Draft X Post    → Use X Post Template
5. Draft LinkedIn  → Use LinkedIn Post Template
6. Present         → Show both drafts; wait for user approval
```

## Step 1: Read Build Log

```bash
cat thiru-ai-labs/build-logs/$(date +%Y/%m)/$(date +%Y-%m-%d).md
```

If file missing: "No build log found for [date]. Run `build-logger` first." Stop.

Extract: main problem, breakthroughs, concrete results, decisions with tradeoffs.

## Step 2: Privacy Gate

Apply `voice-and-style` privacy framework. Check for secrets, customer data, proprietary IP.

- Element fails → redact and note.
- Entire post fails → report and stop.

## Step 3: Evaluate Post-Worthiness

Requires at least one (see `03_POLICIES.md`): clear problem, breakthrough, decision with tradeoffs, surprising outcome, or concrete result.

If none: "Nothing post-worthy in today's build log — [reason]." Stop.

## Step 4: Draft X Post

1–3 short paragraphs. Hook + insight + optional takeaway. Casual, direct, personal.

**Template:**

```
[Hook: one punchy line — the problem or insight]

[2–4 lines: what you tried, what happened, what you learned]

[Optional: one-line takeaway or contrarian close]
```

## Step 5: Draft LinkedIn Post

150–300 words. Hook + context + what happened + takeaway. No blog link (daily posts are standalone).

**Template:**

```
[Hook: 1–2 lines — state the problem or insight]

[Context: what you were building and why it mattered]

[What happened: struggle, breakthrough, or result]

[Takeaway: what this means for others building similar things]

[Optional engagement question]
```

## Step 6: Present for Review

Output both drafts clearly labelled as **X Post** and **LinkedIn Post**. Wait for explicit user approval before any further action.
