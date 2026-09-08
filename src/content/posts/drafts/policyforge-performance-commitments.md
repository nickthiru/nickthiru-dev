---
subtitle: "The exact numbers PolicyForge commits to"
description: "Here are the exact latency, cost-per-unit, and uptime numbers PolicyForge holds itself to, and why loose budget language wasn't good enough."
publishedAt: "2026-09-07"
slug: "policyforge-performance-commitments"
image: "/posts/policyforge-performance-commitments.png"
image_size: "lg"
draft: false
hashtags:
  ["#CMMC", "#NIST800-171", "#CybersecurityCompliance", "#DFARS", "#Compliance"]
track: "product"
series_name: "PolicyForge"
series_slug: "policy-forge"
series_phase: "design"
series_position: 14
linkedin_url: "https://lnkd.in/p/gAG8fME2"
x_url: ""
pinned: false
pinned_order:
newsletter_hook: "Saying a product will be 'fast' and 'affordable' is easy. Saying exactly how fast, at what percentile, and what happens the moment it isn't, is a different commitment entirely. This week I turned PolicyForge's budget language into numbers a user could actually hold me to, and found out how many decisions were hiding inside 'it'll be fine.'"
summary_two_sentence: "PolicyForge had cost and speed budgets in loose language, not enforceable numbers a reader could verify. Turning that language into exact latency, cost, and availability thresholds forced decisions I'd been avoiding, and gave the product hard floors it can't quietly cross."
build_logs:
  - "thiru-ai-labs/apps/secure-stack/policy-forge/docs/build/phase-3/step-3-3/build-log.md"
newsletter_sent: false
newsletter_date: ""
---

## The User Moment

Picture someone about to trust PolicyForge with a compliance deadline that isn't moving. They don't want to hear "it's usually pretty fast" or "we try to keep costs down." They want to know: if I start a policy draft right now, how long until I have something to review, and what happens if that takes twice as long as usual? If I run this fifty times this month, what does that cost me, and does the tool tell me before the bill surprises me? If the system goes down while I'm mid-approval, do I lose my place, or does someone silently approve something on my behalf?

Those aren't edge-case questions. They're the first questions any serious buyer asks before they let a tool touch a compliance workflow. And for most of this build, my honest answer was still "it depends." Not because I didn't care, but because "affordable" and "fast" had never been forced into numbers specific enough to fail on.

## The Design Problem

The tricky part wasn't inventing numbers from scratch. Earlier work had already sketched rough budgets and a way of classifying incidents by severity. The problem was that those were still directional, not enforceable. "Keep infrastructure costs low" isn't something a user, or an engineer at 2am, can check against reality. Neither is "policies should generate reasonably quickly."

So the real design problem was this: how do you convert existing budget intentions into concrete, checkable commitments without accidentally rewriting decisions that had already been settled? It's tempting, when you finally sit down to define hard numbers, to just make up whatever sounds reasonable. I didn't want to do that. If a number had already been recommended somewhere upstream and just never formally locked, the honest move was to carry it forward and build on it, not quietly replace it with something that felt more convenient today.

There was also a timing pressure that made this more than an academic exercise. A known, date-anchored demand spike was coming, tied to a renewal cycle outside my control. If the cost and performance logic didn't already account for that spike, I'd be improvising a policy exception under pressure instead of having decided the trade-off in advance.

## The Options

The first real fork was on latency: define fresh percentile targets from scratch, or extend the existing recommendation into a full band. Defining fresh numbers would have been faster and let me pick whatever felt achievable. I rejected that. The existing P95 recommendations weren't casual guesses; they'd already been reasoned through once. Redefining them now, just because it was convenient during this design phase, would have quietly erased that earlier work. Instead, I extended the single existing number into a full P50/P95/P99 band per workflow step, retrieval, generation, approval-gate rendering, and the full end-to-end cycle, with the original recommendation kept intact rather than adjusted.

On cost, the tempting shortcut was to lock a single ceiling number, something like "under $X per generation," because a single number is easy to communicate. I rejected that too. A single ceiling hides the fact that raw API cost and the cost after semantic caching are genuinely different numbers with different implications: raw cost tells you what the model itself is doing, effective cost tells you what caching is actually buying you. Planning against raw cost alone would have let a caching regression go unnoticed for a long time, because the raw number would look unchanged even as the effective savings quietly evaporated. So both numbers get tracked and projected together, with the caching-driven reduction itself treated as a target, somewhere between thirty and eighty percent, rather than an afterthought.

The other real option, and the one I keep coming back to as the most important thing I got right, was how to define the actual floor beneath cost optimization. The obvious floor is "don't let output quality drop." I considered that, and rejected it as too vague to act on. Instead, the floor is behavioral: if more than three in ten beta users still end up hiring a human consultant after using the product, the cost-savings claim is void, full stop, regardless of what any accuracy metric says. That reframes "quality" from an internal metric I could rationalize into a real-world outcome a user experiences directly.

On availability, the option I didn't take was building a separate uptime framework specific to this design phase. It would have been easy to invent new severity language just for availability. I used the same isolated-versus-systematic distinction that already governed other kinds of failures in the system, so an availability incident and, say, a data-write incident get triaged the same way instead of forcing an on-call engineer to learn two mental models under pressure.

## The Build

What actually got designed starts with the latency bands. Retrieval targets a P50 around a second and a half, generation targets ten seconds at P50 and twenty at P95, and the full end-to-end cycle targets thirty seconds typical, sixty at P95. Those numbers come with teeth: if the P95 for any single step stays breached for more than fifteen minutes, that's treated as an operational incident, not a shrug. A single slow request at P99 is just a warning, unless it starts happening often enough to look systematic, in which case it escalates the same way.

On the cost side, the ledger is split into layers rather than flattened into one number. Raw API cost per generation cycle is tracked with no fixed ceiling, because the MVP posture is "keep burning less," not "stay under a magic number." Effective cost, after semantic caching, is tracked as a reduction ratio against raw cost, with the explicit rule that projecting one without the other isn't allowed. Infrastructure spend gets its own simpler rule: alert at eighty percent of free-tier quota. Budget alerts themselves run on three different clocks: daily checks on infrastructure quota, a monthly check that flags anything drifting more than twenty percent from the caching-adjusted cost projection, and event-driven alerts tied to a small set of scale triggers, including that known demand spike, which fire immediately as cost-tier changes rather than waiting for the routine monthly review.

Availability inherited the isolated-versus-systematic split rather than reinventing it. An isolated hiccup in the generation pipeline gets retried quietly and logged as a warning. A systematic failure blocking core generation becomes a real incident, and, this is the part I think matters most, the user gets told directly that generation is temporarily unavailable instead of the request just failing silently. The harder decision was about the human approval steps specifically: there is no automatic fallback that approves something on a user's behalf if a gate is blocked. If a gate can't proceed, the only fallback is escalating to a human, no shortcuts, no matter how tempting it would be to keep the pipeline moving.

All of it feeds into a single real-time view built around one design goal: whoever's on call should be able to answer "what's happening right now" in under thirty seconds, without digging through logs. Underneath that live view sit three slower cadences. Daily rolls up infrastructure quota use, cache hit ratio, the raw-versus-effective cost gap, and per-step latency percentiles. Weekly surfaces trends in how often work needs to be redone and how often users still end up needing a consultant, plus how close the system is running to any of its scale triggers. Monthly rolls up cost variance against projection, a history of SLA breaches, and cumulative incidents by severity.

The last piece is the part that ties everything together: a trade-off framework with floors that nothing is allowed to cross. Cost gets minimized first, but only until doing so would push completion quality toward the point where too many users need a consultant anyway, at which point the cheaper option gets reverted regardless of what it costs. Speed gets optimized within the latency bands already defined, but never by cutting corners, like skipping integrity checks, that would push rework rates toward their own hard limit. And the known demand spike gets a standing exception: cost minimization yields to throughput during that window, decided now, in advance, rather than argued about the day it happens.

## The Verdict

Does this actually solve the problem I opened with? Mostly, yes. A reader can now ask exactly the questions I described at the start and get a real answer instead of a shrug: generation targets twenty seconds at the ninety-fifth percentile, cost is tracked honestly across two layers instead of one comfortable number, and a blocked approval gate escalates to a human rather than resolving itself quietly in the background.

What I'm less settled on is the honesty of calling some of these numbers "locked." The P95 latency figures are carried forward from an earlier recommendation that was never formally approved, which means the promise of exact thresholds is slightly ahead of where the underlying sign-off actually stands. I chose to carry the number forward rather than invent a different one or leave a gap, and I think that was the right call, but it's a real open item, not a finished one.

I also notice that the cost floor, tied to how many beta users still hire a consultant, is a much better test than anything accuracy-based I could have chosen, but it's also a lagging signal. By the time thirty percent of beta users have quietly gone back to a consultant, a fair amount of trust has already been spent. If I were doing this again, I'd want an earlier warning signal sitting upstream of that floor, something that predicts the drift before it shows up in consultant-hiring behavior, rather than only catching it after the fact.

What I'd do differently next time is smaller but nags at me: latency and cost are both measured only in aggregate, with no per-user or per-session attribution, which was the right privacy call for now. But it also means if one specific type of policy request is quietly slower or pricier than the rest, that pattern is currently invisible until it's large enough to move the aggregate. That's a trade I'm comfortable with today, and one I expect to revisit once there's enough real usage to justify it.

## Your Turn

If a product told you its P95 generation time and its effective cost per run before you signed up, would that actually change whether you trusted it, or is a number like that just noise until something goes wrong?
