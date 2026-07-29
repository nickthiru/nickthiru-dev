---
subtitle: "Defining what success actually means"
description: "PolicyForge's next milestone: turning business goals into numbers that can actually be tested."
publishedAt: "2026-07-29"
slug: "policyforge-defining-success"
image: "/posts/policyforge-defining-success.png"
image_size: "lg"
draft: false
hashtags:
  ["#CMMC", "#NIST800-171", "#CybersecurityCompliance", "#DFARS", "#Compliance"]
track: "product"
series_name: "PolicyForge"
series_slug: "policy-forge"
series_phase: "strategy"
series_position: 5
linkedin_url: "https://lnkd.in/p/gcJ2yXRH"
x_url: ""
pinned: false
pinned_order:
newsletter_hook: "How do you know if a product is actually working before you have real customers? PolicyForge's answer wasn't a gut feeling — it was four testable claims about cost, trust, and compliance, each with a number attached that could prove the whole idea wrong. Here's what those numbers are, and the one assumption that's riskier than all the rest."
summary_two_sentence: "Before writing another line of code, the real question for PolicyForge wasn't 'does it work' but 'how would anyone know if it worked.' Turning vague goals into testable numbers surfaced one risk bigger than all the others combined."
build_logs:
  - "thiru-ai-labs/apps/secure-stack/policy-forge/docs/build/phase-1/step-1-3/build-log.md"
newsletter_sent: false
newsletter_date: ""
---

## The User Moment

Picture Michael. He runs a small company that just landed a customer contract requiring SOC 2 compliance. He has two options: pay a consultant somewhere in the $5,000–$15,000 range to write his security policies, or figure it out himself and hope an auditor doesn't tear it apart later. PolicyForge is betting there's a third option: answer a guided set of questions and walk away with a policy an auditor will actually accept, without ever picking up the phone to call a consultant.

It's a compelling pitch. Founders pitch compelling things all day. The uncomfortable question that comes right after the pitch is: how would anyone actually know if this works? Not "does it feel like it's working", but what specific, checkable outcome would have to happen, on what date, for the bet to be considered won? And just as important, what outcome would have to happen for the bet to be considered lost?

That question is what this stage of building PolicyForge was actually about. Not a new feature. Not a new screen. A definition of success precise enough to fail.

## The Design Problem

"It'll save people money" and "auditors will accept it" sound like goals, but they aren't testable claims; they're hopes dressed up as strategy. A hope can survive indefinitely without ever being wrong. A testable claim can't. It has to specify a number, a deadline, and a threshold below which the whole premise collapses.

The hard part here wasn't believing in the product. Believing in a product you're building is the easy part — almost everyone building something believes in it, that's usually why they're building it. The hard part was being disciplined enough to write down, in advance, the exact numbers that would prove the idea wrong if it didn't hold up, rather than numbers that could quietly flex to accommodate whatever happened.

There were four separate goals sitting underneath PolicyForge's premise: it should be cheaper than hiring a consultant, it should get customers through insurance renewal on time, auditors should accept the output without a lot of rework, and the policies should stay valid over time rather than going stale six months after generation. Each of those needed to be converted from a belief into something falsifiable — a specific number, tied to a specific date, with a floor below which the claim is simply wrong.

## The Options

There were a few different ways to approach defining success at this stage:

- **Ship first, measure later.** Tempting, because it gets something in front of users faster. But it risks building a year's worth of features on a foundation nobody has actually tested; measuring after the fact means discovering the premise was wrong only once it's expensive to unwind.
- **Measure everything, all at once.** Thorough on paper, but paralyzing this early. Most of those metrics would be pure noise before there's a real, engaged user base generating meaningful signal. Instrumenting for a hundred things when only a handful actually matter yet is a good way to drown the signal that does exist.
- **Pick the smallest set of numbers that would actually kill the idea if they came back bad.** This is the path taken. Rather than trying to measure the product broadly, the focus stayed narrow: which specific numbers, if they landed below a certain threshold, would mean the core premise doesn't hold — regardless of how polished anything else turned out to be.

That third option meant accepting a tradeoff: some interesting things won't get measured yet, in exchange for making sure the things that matter most get measured rigorously from day one.

One of the resulting bets, stated plainly: PolicyForge needs to meaningfully cut compliance-cycle costs compared to hiring a consultant, and if a large share of early users still feel the need to hire outside help anyway after using the product, the cost-savings pitch fails outright, no matter how technically accurate the generated policy turns out to be. Accuracy and cost savings are being treated as two separate claims, not one.

## The Build

Four business goals became four hypotheses, and each one was given the same shape:

- **A specific number that counts as success.** Not "cheaper" — a defined cost range. Not "fast" — a hard calendar deadline. Not "good enough" — a capped rate of rework requests.
- **A leading indicator.** A signal that shows up early, before the final outcome is even measurable, that gives a preview of which direction things are trending.
- **A floor.** The minimum bar below which the whole premise fails, independent of everything else going right. This is the part that matters most and is easiest to skip: a floor forces an honest answer to "what would make me abandon this belief," rather than letting a goal quietly redefine itself as things unfold.

Behind those four hypotheses sits a measurement plan: what data actually needs to be captured, at what point in the user's journey, and how often. That includes things like whether a user completes the process without reaching for outside consulting help, whether the policies clear a carrier's or auditor's first review without rework requests, and how long it takes a user to go from starting the interview to having something submittable. Rather than building a separate tracking system for each of these, the plan calls for a shared audit-trail and logging layer that multiple metrics can draw from, a decision made specifically so that adding the next metric doesn't mean building the next isolated tracking pipeline from scratch.

Alongside the numbers came something less comfortable to write down: a ranked list of the assumptions those numbers actually depend on. It's one thing to say "90% of policies should be accepted without rework." It's another to admit that claim only holds if a chain of separate, unproven assumptions all turn out to be true at once.

The single riskiest assumption on that list isn't about the product's technical accuracy at all — it's about trust. Will a business owner actually rely on an AI-generated compliance policy for something this consequential, submitting it as-is, without finding an expert to double-check it first? If the honest answer turns out to be no, the rest of the metrics stop mattering, because nobody gets far enough into the funnel to generate any of that data in the first place. A policy can be perfectly accurate and still fail commercially if nobody trusts it enough to use it unassisted.

Close behind it sits a second uncomfortable assumption: will the insurance carriers on the other end of this process actually accept a policy they know was AI-generated, or will they treat it as a red flag regardless of its content? That one isn't fully in PolicyForge's control to fix through better product design — it depends on how a third party chooses to react, which makes it worth validating early rather than discovering it after customers are already relying on the outcome.

To find out honestly rather than guess, the plan is to track this directly rather than infer it indirectly: watching whether early users submit their generated policies as-is, or quietly go find a human to validate them anyway despite having the tool in hand, and then following up with short conversations to ask why. If people keep reaching for a human safety net even after using the product, that's the real signal...far more honest than a satisfaction survey score.

## The Verdict

Nothing here is proven yet, and that's very much the point of doing it in this order. This is what it looks like to define "done" and "worked" before building the next piece of the product, rather than backfilling a definition of success after the fact to match whatever numbers happened to come in. A number chosen after the results are in isn't a test, it's a rationalization.

The most valuable output of this stage wasn't the metrics table itself. It was the process of surfacing that one trust assumption — will Michael actually submit this without getting a human to check it first — as the real bottleneck sitting ahead of everything else on the list. Cost savings, renewal deadlines, audit pass rates: none of them matter if that first assumption doesn't hold. Knowing that now, before more of the product gets built around the assumption that it will, is worth more than any single feature shipped this month.

(See: _[PolicyForge — Catching a blind spot before it broke our roadmap](/writing/policyforge-classification-blind-spot)_)

(See: _[PolicyForge — How Impact Mapping Built the MVP Roadmap](/writing/policy-forge-impact-mapping)_)

## Your Turn

If you were betting on an AI tool for something as consequential as a compliance policy or a legal document, what would it actually take for you to submit it as-is — without finding a human to check it first?
