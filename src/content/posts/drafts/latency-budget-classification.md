---
subtitle: "Your Latency Budget Is Lying to You"
description: "Why cycle-bound products need their own latency model instead of borrowing real-time P95 conventions."
publishedAt: "2026-08-02"
slug: "latency-budget-classification"
image: "/posts/latency-budget-classification.png"
image_size: "lg"
draft: true
hashtags: ["#buildinpublic", "#solofounder", "#softwareengineering"]
track: "engineering"
series_name: ""
series_slug: ""
series_phase: ""
series_position:
linkedin_url: ""
x_url: ""
pinned: false
pinned_order:
newsletter_hook: "I spent an afternoon trying to set a latency budget for my product, using the same P95 conventions every real-time app uses. The numbers didn't lie — they just didn't mean anything. Here's why cycle-bound products need a completely different way to measure 'fast enough,' and the small classification fix that made the problem disappear."
summary_two_sentence: "I tried to set latency targets for PolicyForge using standard real-time P95 conventions, and the numbers came out meaningless. The fix wasn't better numbers — it was recognizing that cycle-bound products need their own latency classification model entirely."
build_logs:
  - "[to be updated by user]"
newsletter_sent: false
newsletter_date: ""
---

I was staring at a blank latency budget document, trying to fill in a P95 target for retrieval, and I couldn't do it. Not because I didn't know how fast my system should respond. Because the question itself was wrong.

## A quick primer, if you haven't set a latency budget before

P95 latency means the response time that 95% of requests fall under, so the slowest 5% are excluded from the number. Teams use it instead of an average because averages hide bad experiences: a system with a one-second average could still leave one in twenty users waiting ten seconds, and an average would never surface that. A P95 target says, in effect, "nineteen out of twenty times, this will feel this fast," which is a much more honest promise than an average. It's the standard way to budget latency for anything with a human watching a screen in the moment: page loads, search results, chat responses. You set a P95 target per component, measure against it continuously, and treat breaches as incidents.

## Why this mattered

I'm building PolicyForge alone, which means every architectural decision I make, I have to defend to myself later with no team to catch what I missed. Latency budgets are one of those decisions that feel like they should be simple: look at similar products, copy their P95 targets, move on. So I started there. Standard practice for anything with a user-facing generation step is to set a P95 target per component and one for the end-to-end request. Three seconds for retrieval. Twenty for generation. A second for approval. Sixty seconds total, end to end.

The moment I wrote those numbers down, they felt wrong. Not wrong as in miscalibrated. Wrong as in they were answering a question nobody asked.

## What I got wrong first

The instinct to borrow P95 conventions comes from real-time products: chat interfaces, live search, anything where a human is sitting there, watching a spinner, and every extra second directly degrades the experience. For those products, P95 is the right lens because the unit of value is the single interaction. If the 95th-percentile response takes too long, the user notices, and the notice happens in real time.

PolicyForge isn't that. A user comes in, works through a structured interview, and gets a mapped policy output at the end of a multi-step cycle. The interaction that matters to them isn't "how fast did any single step respond." It's "how long did the whole cycle take before I had something usable." Those are different units of measurement, and forcing the second one into the first one's box gave me a P95 target for a single node in a pipeline where no user was ever standing there watching that node in isolation.

Once I saw that clearly, I understood why the numbers felt hollow: I'd built a real-time latency budget for a product with a cycle-time outcome. The target wasn't _wrong_, it was _addressed to a different problem_.

## The actual fix

The fix wasn't to find better numbers. It was to stop treating "latency" as one concept. I split it into two questions that I now ask of every product, and every feature inside a product:

Is the thing I'm measuring bound by a single interaction the user is watching, or by an outcome the user is waiting for across multiple steps? If it's the former, real-time P95 conventions are the right tool. If it's the latter, the metric that matters is closer to a deadline than a percentile — did the cycle complete inside a window the user considers acceptable, not did any individual step feel snappy.

That distinction became a permanent field in how I classify parts of the product now: a simple tag on each interaction point, marking whether it's cycle-bound or real-time-bound. It sounds almost too small to matter. But once it existed, every latency conversation after that got easier, because I was no longer trying to force one measurement philosophy onto every part of the system. The retrieval step, for example, still benefits from a tight per-request target, because it happens inside a loop the user can perceive slowing down. The overall interview-to-output cycle doesn't need a P95 at all — it needs a maximum acceptable wait, which is a completely different design constraint with a completely different failure mode.

## A second example, because the two-category model still had a gap

I thought I was done once I had "real-time" and "cycle-bound" as my two buckets. Then I got to the approval step and neither one fit.

An approval gate isn't watched moment-to-moment like a chat response, so real-time P95 conventions don't apply. But it also isn't a pure cycle-deadline, because a cycle deadline assumes the system will eventually produce an outcome on its own timeline. My approval gate can't do that: it's a hard block that requires an actual human decision before anything downstream continues. There's no fallback where the system quietly substitutes a lower-confidence result and moves on if that human takes too long. It waits, or it stops entirely.

That's a third category I hadn't accounted for: not real-time, not cycle-bound, but human-blocking. The "latency" for that step isn't a system performance number at all, it's a statement about who controls the clock. A one-second target on an approval gate was never measuring anything real, because the actual constraint was never processing speed, it was the time it takes a human to make a decision. Once I reclassified it that way, I stopped tracking it against a performance SLA and started treating it as a UX and workflow question instead: how do I make the wait itself feel reasonable, rather than how do I make the system faster.

## Where the old numbers went

The original targets I wrote down at the start weren't wasted. Retrieval and generation retained something close to those figures, because those are the pieces a user actually experiences moment to moment. The end-to-end number stopped being a P95 statistic and became something closer to a service-level promise: the cycle either finishes inside a bounded window or it doesn't, and that binary matters more than any percentile distribution would. The approval-gate number got reclassified entirely, out of the performance-metrics conversation and into the workflow-design conversation, where it actually belonged.

## The generalizable lesson

If you're building anything where the user's unit of value spans multiple steps rather than one request, don't inherit your latency model from products where it doesn't. Ask, for every timed thing in your system, whether a human is watching it happen in the moment, waiting for an outcome that only exists once several things have happened in sequence, or controlling the clock themselves through a decision you can't automate around. The first deserves a percentile. The second deserves a deadline. The third deserves a UX answer, not a performance target at all. Treating all three the same doesn't just produce bad numbers, it produces a latency budget that answers nothing, because it was built to answer a question your product never actually asks its users.

## Your Turn

If you've set a latency or performance target for your own product, was it measuring what the user actually experiences, or was it borrowed from a category your product doesn't quite belong to?

[INTERNAL LINK: relevant post on PolicyForge's technical stack decisions]  
[INTERNAL LINK: relevant post on architecture constraints and human-in-the-loop design]

[ALT: Diagram contrasting a real-time single-interaction latency curve against a cycle-bound multi-step deadline window]
