---
subtitle: "Locking the stack, closing the first phase"
description: "How I closed out the strategy phase for GovCon Leads Radar by locking the stack, budgets, and a risk register before writing a line of build code."
publishedAt: "2026-08-18"
slug: "govcon-locking-the-foundation-for-build"
image: "/posts/govcon-locking-the-foundation-for-build.png"
image_size: "lg"
draft: false
hashtags:
  ["#GovCon", "#FederalContracting", "#SalesIntelligence", "#B2B", "#AI"]
track: "product"
series_name: "GovCon Leads Radar"
series_slug: "govcon-leads-radar"
series_phase: "strategy"
series_position: 5
linkedin_url: "https://lnkd.in/p/gb9AyZax"
x_url: ""
pinned: false
pinned_order:
newsletter_hook: "I almost let a two-word tag from an early planning doc slip through unquestioned — the kind of thing that looks harmless until you realize it quietly waives a legal obligation. Here's how closing out the planning stretch for GovCon Leads Radar meant catching that, locking the stack, and finally writing 'go' next to my own project."
summary_two_sentence: "Before writing a line of build code for GovCon Leads Radar, I had to lock the technical stack, the cost ceilings, and a full risk register — and in doing so, caught a data-classification assumption that had quietly been wrong since the very first planning doc. Fixing it, and writing the final decision log, is what actually unlocked the build phase."
build_logs:
  - "thiru-ai-labs/apps/govcon-leads-radar/docs/build/phase-1/step-1-6/build-log.md"
  - "thiru-ai-labs/apps/govcon-leads-radar/docs/build/phase-1/step-1-7/build-log.md"
  - "thiru-ai-labs/apps/govcon-leads-radar/docs/build/phase-1/step-1-8/build-log.md"
newsletter_sent: false
newsletter_date: ""
---

## The User Moment

Picture the moment right before you're allowed to start building: everything is decided, the spec is locked, and all that's left is to open the terminal and start typing. Except that moment doesn't arrive cleanly. It arrives with a list of loose threads that have been quietly accumulating since the very first day of planning, the kind of things you tell yourself you'll "deal with later." I was at that point with GovCon Leads Radar. The product shape was settled. The first workflow was fully mapped. All that remained was to answer four boring, unglamorous questions: what's the stack, what does it cost, what can break, and what would make me stop.

Boring, until one of those questions turned up something I didn't expect.

## The Design Problem

I'd already decided, weeks earlier, that this product doesn't touch personal data in any meaningful way; it processes federal contract records and business filings, not people's private lives. That assessment made sense at the time, because at the level I was looking at, "who's the data about" really did look like "organizations," not "individuals."

The problem is that assumption gets copied forward. It shows up in later documents as a settled fact, referenced instead of re-checked. By the time I sat down to lock the technical stack and the cost budget, that same "no personal data" tag had already influenced downstream thinking about caching, logging, and how loosely the system could be allowed to store and reuse information.

Then I got to the risk-mapping pass, and had to look at the actual workflow at a more granular level than before. Two specific moments in the product — flagging a compliance issue on a vendor, and surfacing a point of contact for outreach — both involve a _named individual_: an officer or principal tied to a compliance record, or a contracting officer whose name shows up as a point of contact. That's a person, not just an organization. And under how personal data is generally defined in privacy law, a named individual tied to identifiable information counts as personal data, even in a business-to-business context, even when the record is nominally "about a company."

So the earlier "no personal data" assumption wasn't wrong at the top level. It was wrong at the level that actually matters for architecture: two specific capabilities in the product do handle personal data, and every downstream decision about caching, logging, and retention needed to reflect that before I could responsibly lock a stack.

## The Options

I had three ways to handle it.

**Option one: ignore it and move on.** The original classification was already written down elsewhere, referenced by multiple documents, and re-litigating it felt like scope creep this late in planning. This was tempting for about five minutes. It's also exactly how a founder ends up with a data-handling architecture built on a false premise, discovered only after real user data is already flowing through it.

**Option two: quietly patch the two documents that needed it and move on without flagging the change.** Faster, but it hides the fact that an earlier decision was wrong, and it removes the paper trail that would let me, or anyone else, understand why the caching and logging rules ended up the way they did.

**Option three: treat it as a first-class correction.** Write it down explicitly: what was assumed, what the more detailed analysis found, why the two disagree, and what changes as a result. Slower in the moment. But it's the only option that leaves behind something I can actually trust later, when I've forgotten the reasoning and just see the rule.

I went with option three. It cost me an afternoon, but it probably saved me a much worse afternoon three months from now.

## The Build

With that corrected, the rest of the planning work moved faster than I expected, because a lot of it turned out to be about drawing boundaries rather than making open-ended choices.

**Locking the stack.** I locked a lightweight, boring combination on purpose. The frontend is SvelteKit with TypeScript throughout — I like it for the same reason I like fewer moving parts in general: less framework magic to fight later. It's deployed on Vercel for the MVP, with one deliberate constraint: no Vercel-specific APIs anywhere in the codebase. That's not paranoia, it's optionality; it keeps a future migration to AWS CDK a swap instead of a rebuild, if and when the product outgrows a single-vendor hosting setup. Supabase handles Postgres, pgvector, and auth in a shared-schema multi-tenant model, which is the right level of complexity for an MVP with a handful of customers, not hundreds. For the AI-orchestration layer — the multi-step logic behind lead tiering and compliance flagging — I picked LangGraph.js, because the workflow genuinely needs multi-step state, not just a single request/response call to a model. And routing to the actual models goes through Requesty.ai as an LLM gateway, which currently points to Claude Haiku for classification-type tasks and Claude Sonnet for anything closer to generation. None of these choices are exotic, and that's the point. Boring on purpose means fewer 2 a.m. surprises later.

**Two cost tiers, not one guess.** Instead of inventing a precise dollar ceiling I had no data to justify, I set up an MVP cost tier and a Scale cost tier, with explicit, measurable conditions that move a decision from one to the other. Supabase stays on its free plan until usage consistently exceeds its ceiling across multiple billing cycles,not a single spike, a sustained trend. Vercel stays on its free tier until a build-minute or bandwidth limit gets hit, or until a compliance requirement can't be satisfied on that platform at all. Requesty's spend is the trickiest one to plan for, because it scales with raw token usage from the underlying models, and until real customer traffic exists, any specific dollar figure is an educated guess dressed up as a forecast. So I set an interim monthly ceiling instead, and the trigger isn't "spend feels high" — it's two consecutive months of exceeding that ceiling relative to revenue growth. That's the point where I renegotiate or throttle non-essential features, not the point where I panic and rearchitect overnight.

That structure only works, though, if the cost model itself is honest about where the assumptions break down, and this is where the personal-data correction actually reached back into the numbers. Requesty's pricing has two layers: the raw pass-through token cost, and a discounted cost after semantic caching kicks in, which is estimated to cut costs by 30–80% depending on how repetitive the prompts are. That range is a reasonable planning assumption for most of the product. But it can't apply to the compliance-flagging or point-of-contact prompts, because those are exactly the two capabilities that touch named individuals. Caching those responses would mean storing personal data in a cache layer never designed for it. So those two prompt paths get modeled at full, uncached cost, and caching is explicitly disabled on them at the configuration level — not just assumed away, but switched off and monitored. If that switch were ever silently flipped back on, it isn't treated as a lucky cost optimization. It's treated as a policy violation that gets reviewed immediately.

**Drawing the architecture line.** The constraints document ended up doing something I didn't expect going in: it told me what _not_ to build almost as clearly as it told me what to build. No self-hosted infrastructure at this stage; Supabase and Vercel manage that layer for now. No conversational interface; this is a structured dashboard product built on SvelteKit, not a chat product, and pretending otherwise would be over-building for a stage the product isn't at. No multi-step autonomous planning beyond what LangGraph.js already handles for tiering and flagging, and no real-time interaction model. Each of those exclusions maps to an explicit, measurable trigger for when it's allowed to change: a specific tenant-isolation requirement, a specific data-residency obligation, a specific scale threshold. None of them get revisited on vibes.

**Risk, split into two flavors.** Rather than writing a generic list of "things that could go wrong," I ranked every risk by likelihood times impact, and then split them into two flavors: the ones that fail quietly, with no one noticing unless they go looking, and the ones that demand a person be paged the moment they're detected. A stale data refresh is the first kind — mildly annoying, self-correcting, low stakes if it lingers for a day. Personal data leaking into a log file, or a cross-tenant data boundary breaking in the shared Supabase schema, are squarely the second kind. Those get an explicit escalation trigger and an acceptance criterion that has to hold every single billing cycle, not just at launch.

That distinction did more to clarify what actually needs monitoring than the raw risk list ever could, because it forces a decision at write-time about how much attention each risk deserves in production, instead of leaving that judgment call to whoever happens to be on call when something breaks.

**The go/no-go matrix.** The last piece was translating all of this into something usable at the next real decision point, rather than a document that sits unread. For each of the handful of signals that actually determine whether this product is working — paid-pilot conversion trending toward the revenue target, a measurable gap between how AI-tiered leads convert versus lower-confidence ones, referral rate, compliance-error rate, spend against the Requesty ceiling — there's a defined threshold for "keep going," a separate one for "extend the observation window because the signal is inconclusive," and a separate one for "this isn't working, change course." Having those thresholds written down before the data starts coming in matters more than it sounds like it should. It's much harder to talk yourself into "just a little more time" when you already wrote down, weeks ago and with a clear head, exactly what "not working" looks like.

Finally, all of it got written into a single decision record. . .not a working doc, not a draft, but something closer to a ledger. Each entry states what was decided, why, what would trigger revisiting it, and what the fallback plan is if that trigger fires. It's not exciting to write, but it's the thing I'll actually open in three months when I've forgotten why the database is structured the way it is.

## The Verdict

Does it solve the problem? Yes, and more usefully than I expected going in. I started this stretch of planning worried it would just be paperwork; you know, a formality between "the product is designed" and "now I get to actually build it." Instead it caught a real error before it became load-bearing. If I'd locked the caching and logging architecture on the original "no personal data" assumption, I'd have built something that quietly under-protected exactly the kind of information that carries the most legal and reputational weight to get wrong.

The honest caveat: a decision log is only as good as whether I actually go back and revise it when something changes. Writing "this is reviewable, not fixed in stone" is easy. Actually doing the review, three sprints from now when I'm deep in SvelteKit components and every instinct says "just ship it," is the part I haven't tested yet. Same goes for the Requesty cost thresholds — they're only useful if I actually stop and look at spend against the ceiling instead of assuming it's fine because the product feels fine.

But for now: the stack is locked, the cost tiers have measurable triggers instead of guesses, the architecture has explicit exclusions instead of implicit scope creep, the risk register has teeth, and the thing I almost missed got caught and fixed before it mattered. That's what "planning is done" is supposed to feel like: not the absence of open questions, but every open question having a defined trigger for when it stops being open.

(See: _[GovCon Leads Radar — Turning three business goals into a testable build order](/writing/govcon-goals-into-testable-assumptions)_)

(See: _[GovCon Leads Radar — Choosing the first workflow to build, and mapping it](/writing/govcon-radar-first-workflow-mapped)_)

## Your Turn

Have you ever caught an early assumption that had quietly been treated as settled fact for weeks, only to find it was wrong at exactly the level that mattered? What made you go back and check it?
