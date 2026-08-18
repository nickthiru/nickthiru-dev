---
subtitle: "Choosing the first workflow to build, and mapping it"
description: "Why I picked one daily workflow first, and what mapping it revealed about the judgment calls sellers actually make."
publishedAt: "2026-08-17"
slug: "govcon-radar-first-workflow-mapped"
image: "/posts/govcon-radar-first-workflow-mapped.png"
image_size: "lg"
draft: false
hashtags:
  ["#GovCon", "#FederalContracting", "#SalesIntelligence", "#B2B", "#AI"]
track: "product"
series_name: "GovCon Leads Radar"
series_slug: "govcon-leads-radar"
series_phase: "strategy"
series_position: 4
linkedin_url: ""
x_url: ""
pinned: false
pinned_order:
newsletter_hook: "Every AI product promises to save you time. Almost none of them can show you the exact moment that happens. I picked one daily habit to build first, mapped it step by step, and found four unwritten judgment calls sellers make without realizing it, including one I genuinely couldn't answer."
summary_two_sentence: "Instead of building broadly, I picked the one daily habit worth automating first and walked through it step by step. That walk-through surfaced judgment calls sellers make without realizing it, including one real gap in what I know about trust."
build_logs:
  - "thiru-ai-labs/apps/govcon-leads-radar/docs/build/phase-1/step-1-4/build-log.md"
  - "thiru-ai-labs/apps/govcon-leads-radar/docs/build/phase-1/step-1-5/build-log.md"
newsletter_sent: false
newsletter_date: ""
---

## The User Moment

Picture a GovCon seller opening their laptop. It's morning, before the coffee's finished. There's no scheduled task reminding them to do this, it's just what they do, the way some people check the weather before they check anything else. They pull up a stack of newly surfaced government contracting leads and start scanning.

In under a minute, they'll silently rank each one. Not out loud, not on paper, in their head. This one's worth ten minutes. That one's a maybe. This other one, despite looking promising on paper, gets skipped because something about the buyer's history feels off, though they couldn't fully explain why if you asked them.

Then they check whether the company behind the lead is actually allowed to do business with the government right now. Then they try to figure out who to actually call, because half the time, the listed contact left that job two years ago. Only after all of that does a real decision get made: pursue, or don't.

This entire sequence happens dozens of times a week, for every seller doing this job, and none of it is written down anywhere. It's the single most repeated, most cognitively loaded moment in a GovCon seller's day, and it's exactly where I decided to start building.

### The Design Problem

Here's the tradeoff I was sitting with: I had seven candidate workflows I could have built first. Export tools. Search configuration. Referral loops. Compliance monitoring. Each one solves something real. But building all seven at once, or picking randomly, would have meant guessing at what actually matters to a seller's day, and shipping something nobody opens twice.

The design problem wasn't "what can I build." It was "what's the one thing, built well, that proves the whole premise of the product." My earlier discovery work had already told me that GovCon sellers don't struggle with a lack of data, they're drowning in it. What they lack is a fast, trustworthy way to interpret that data under time pressure, without a working memory of what worked last time. That's a judgment problem, not an access problem.

So the harder question became: which single workflow sits closest to that judgment bottleneck, is small enough for me to build with confidence, and tells me the most about whether AI-assisted tiering actually changes what a seller does with their morning? Get that wrong, and every subsequent workflow inherits a shaky foundation.

### The Options

I weighed the seven candidates against a shared set of criteria: how much real cognitive load each one lifts, how directly it serves the top revenue goal, how much technical risk it carries, and how much it would teach me about the riskiest assumptions in the product.

The runner-up was the data-ingestion and compliance-governance workflow, the plumbing that keeps SAM.gov and USAspending.gov data fresh and reliable. It scored well on risk reduction, and honestly, the lead-triage workflow can't fully run without it. But its governance tooling isn't something a seller ever touches directly, and it doesn't teach me anything about whether people trust or use the product day to day. It got queued right after, not first.

I also looked seriously at outcome tracking, the mechanism that would later tell me whether AI-tiered leads actually convert better than untiered ones. Tempting, because it's the piece that eventually proves the AI works. But I can't track outcomes for a workflow that doesn't exist yet. It had to wait its turn.

Export and CRM handoff, persistent search configuration, trust calibration, and peer referral all had their moments in the discussion, each solves something real for a seller further along in their relationship with the product. None of them touch the raw daily decision a seller makes before any of those other things become relevant.

That left the daily triage and qualification workflow as the only candidate that hit every mark simultaneously: highest cognitive-load reduction, direct line to the top revenue goal, and the fastest path to testing my two highest-risk assumptions about how sellers actually behave once tiered leads are put in front of them.

### The Build

Once I knew which workflow, the next task was walking through it end to end, not designing screens yet, just tracing what a seller actually does, moment by moment, and being honest with myself about where AI helps and where it has to stay out of the way entirely.

It breaks into five moments. The seller opens the dashboard, which is the trigger, no search bar, no setup, just a daily habit. Behind that opening, tier labels have already been computed from cross-referenced contracting data, so the first thing the seller sees is a ranked queue, not raw data.

From there, they scan that ranked queue and decide where to spend attention. This is where the unwritten weighting happens: value, recency, industry-code match, award pattern, the same mental math they've always done, just now sitting next to an AI-generated tier label they may or may not fully trust yet.

For whatever survives that scan, they check compliance flags. And of everything I mapped this week, this is the step I keep coming back to, because it's the most fragile one in the whole flow.

Here's what I mean by fragile. Right now, judging how serious a compliance flag actually is happens purely by feel. A seller sees a flag on a lead: maybe it's a lapsed registration that expired last month and will probably renew on its own, maybe it's an active debarment that makes the entire lead a dead end. Today, those two situations get roughly the same level of scrutiny, because nobody has ever written down a scale for how bad is bad. That's a real risk I'm carrying forward into design, not something I've quietly resolved. If I build a UI that just displays "flag present" without any severity signal, I'm asking sellers to do exactly the same unaided guessing they do today, just with a slightly nicer layout around it. The fix probably isn't AI making the disqualification call, that decision has to stay human. But the fix might be structuring what gets shown: separating a flag that means "double-check this" from a flag that means "walk away," instead of treating every red icon the same. I don't have that structure yet. I know I need it before this step ships.

There's a second layer to this I want to be honest about. Even a plain, deterministic compliance flag, present or absent, currently can't be computed without touching the underlying record of a named individual, an actual officer or registrant tied to a real business entity. That's not a hypothetical privacy concern, it's baked into how the check works today. I've flagged it as a data-minimization opportunity to revisit before this goes further, because "the system had to look at a real person's name to tell you yes or no" is exactly the kind of quiet architectural decision that becomes a real problem later if I don't solve it now.

Then they verify the point of contact, because a perfectly good lead is worthless if the listed contact moved jobs eighteen months ago. Sellers already do this manually today, cross-checking against outside sources when the official record looks stale.

And then, finally, the decision: pursue, or don't. Tier signal, compliance status, and contact confidence all converge into one call, a call that stays entirely human. No AI role at all, by design. That was one of the more surprising realizations of the whole exercise. I built the whole workflow assuming AI would be present at every step, and it turns out the most important moment in the sequence is one where it deliberately isn't.

### The Verdict

Mapping the journey step by step did what I hoped: it turned an abstract "Copilot" into five concrete moments a real seller would recognize. But the more useful outcome wasn't the map itself. It was what the map forced me to notice: four distinct judgment calls sellers make today with no documentation behind them at all.

Three of those four had a shape I could work with. How much a lead is worth pursuing runs on an informal weighting sellers already carry in their heads, nothing mysterious, just uncaptured. Whether a compliance flag disqualifies a lead runs on the inconsistent severity judgment I just walked through. Whether a listed contact is actually the right person runs on manual cross-referencing against outside sources, done the same way today as it would be without any AI involved at all.

The fourth one stopped me cold, and I want to spend real time on it, because it's the one I genuinely can't answer yet: whether a seller trusts a tier label enough to act on it without double-checking everything themselves.

The comfortable version of this story is that trust builds gradually. A seller sees the AI get a few tiers right, confidence grows, they start relying on the label a little more each week, and eventually the dashboard becomes as trustworthy as their own gut. I'd love for that to be true, because it's the version that's easy to design around: show a track record, let the numbers speak, trust accumulates on schedule.

But I don't actually know that's how it works, and I don't have a number for it even if it is. How many correct tiers does it take before a skeptical seller stops re-verifying everything by hand? Ten? Fifty? Does it depend on how much money was riding on the lead that went right, or wrong? Nobody has measured this, because the workflow that would let me measure it doesn't exist yet.

What worries me more is the asymmetry I suspect is hiding underneath that curve. I don't think trust and distrust move at the same speed. My working assumption, and it's only an assumption right now, is that a single high-visibility miss, a Tier 1 lead that turns out to be a dead end after the seller invests real time in it, can wipe out weeks of accumulated trust in one afternoon. If that's true, then the entire design problem isn't "how do I help trust build faster." It's "how do I make sure the very first mistake a skeptical seller sees isn't catastrophic," because that first bad miss might be the only one that matters.

I don't have that answer yet. What I have is an explicit research gap, flagged rather than quietly assumed away, sitting right where the design work would otherwise have papered over it with a comfortable guess. That's the right outcome for this point in the build. Better to know what I don't know before writing a line of interface code than to discover it after a seller stops opening the dashboard.

So: does the workflow solve the problem? Mostly, yes, on paper it compresses a scattered, multi-tab, memory-dependent hour into five sequential steps behind one dashboard. But two real risks are riding along with it into the next phase: an unsolved compliance-flag severity structure that currently asks sellers to make make-or-break lead decisions by feel, and a trust-calibration curve I can describe in outline but can't yet quantify. Both go into the design phase as open items, not resolved ones.

### Your Turn

If you've ever had to decide, in the space of a few seconds, whether to trust a score a machine gave you over your own gut read, what actually made you trust it, or what actually made you stop?
