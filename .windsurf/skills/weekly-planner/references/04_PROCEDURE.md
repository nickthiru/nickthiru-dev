---
description: Canonical execution path for weekly-planner.
index:
  - Weekly Theme Selection
  - Monthly Content Mix Review
  - Cross-Workspace Pipeline
---

# Procedure

## Weekly Theme Selection

**Duration:** 15–20 minutes. Performed at the start of the weekly content session.

### Step 1: Scan Build Logs

Read the scan cursor first:

```bash
cat thiru-ai-labs/build-logs/.scan-state.json
```

Scan entries **newer than** `last_processed_date` (if empty, scan last 7 days). After completing the weekly session, update the cursor:

```bash
echo '{ "last_processed_date": "YYYY-MM-DD" }' > thiru-ai-labs/build-logs/.scan-state.json
```

```bash
ls thiru-ai-labs/build-logs/$(date +%Y/%m)/*.md thiru-ai-labs/build-logs/$(date -d 'last month' +%Y/%m)/*.md 2>/dev/null | sort
# Filter to entries newer than last_processed_date
```

For each entry, note:

- Is it marked "Content Ready: Yes"?
- What is the story arc strength (Problem → Struggle → Breakthrough)?
- What content track does it fit (engineering, business, product)?

### Step 2: Identify Themes

Extract potential blog post themes. Ask:

- What problem did I solve that others might face?
- What mistake could help others avoid wasting time?
- What insight changed my approach to building?

### Step 3: Check Trailing Content Mix

Review the last 10 published posts. Count by track:

- If 3+ consecutive posts are the same track, bias toward a different track this week.
- If one track is significantly under-represented, look for angles in that track from this week's logs.

### Step 4: Select and Route

1. Present 1–3 theme options to the user with track classification.
2. User selects the theme.
3. Route to `blog-writer` with:
   - **Theme summary:** 1–2 sentence description
   - **Content track:** engineering / business / product
   - **Source:** path to the relevant build log entry

## Monthly Content Mix Review

**Duration:** 15 minutes. Performed at the end of each month.

1. Count posts published in the last 3 months by track.
2. Calculate actual percentages vs. 60/30/10 target.
3. Note any significant imbalances.
4. Adjust theme selection bias for the coming month:
   - If engineering is over-represented, actively look for business angles in build logs.
   - If business is under-represented, consider writing about a pricing decision or cost milestone.
5. Record the review in a brief note (optional — not a formal artifact).

## Cross-Workspace Pipeline

```
thiru-ai-labs (Development)
├── build-logs/YYYY/MM/YYYY-MM-DD.md   # Source material
└── artifacts/                    # Screenshots, diagrams
    ↓ (Manual review and selection)
nickthiru-dev (Content)
├── src/content/posts/            # Published blog posts
```

Integration is manual only — no automatic triggers between workspaces. `weekly-planner` reviews build logs from thiru-ai-labs and makes theme selection decisions in nickthiru-dev.

### Theme Ideas by Track

- **Engineering**: How I solved [problem], Lessons from implementing [tech], Debugging [issue], Architecture decisions, Performance optimization, Tool evaluation.
- **Business**: Revenue milestone, Customer discovery, Pricing strategy, Marketing experiments, Time management, Cost optimization.
- **Product**: Feature launch, User feedback, Roadmap decision, Product-market fit experiment, UX decision.
