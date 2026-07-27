---
subtitle: "The problem wasn't what we thought it was"
description: "We almost built a faster paperwork tool. Then we mapped the real workflow and found a trust problem instead."
publishedAt: "2026-07-25"
slug: "policyforge-real-problem"
image: "/posts/policyforge-real-problem.png"
image_size: "lg"
draft: false
hashtags:
  ["#CMMC", "#NIST800-171", "#CybersecurityCompliance", "#DFARS", "#Compliance"]
track: "product"
series_name: "PolicyForge"
series_slug: "policy-forge"
series_phase: "strategy"
series_position: 3
linkedin_url: ""
x_url: ""
pinned: false
pinned_order:
newsletter_hook: "We were about to build a faster way to produce compliance paperwork. Then we sat down and actually mapped how the work happens today — and found out the paperwork speed was never the problem. Here's what we found instead, and why it changed the whole direction of PolicyForge."
summary_two_sentence: "PolicyForge started from the assumption that compliance documents just take too long to produce. Mapping the real workflow revealed the actual bottleneck is a trust and translation problem between an operations lead and the auditors and carriers who have to believe his paperwork."
build_logs:
  - "build-log.md"
newsletter_sent: false
newsletter_date: ""
---

## The User Moment

Picture someone running operations at a growing company. He's not a compliance specialist — that's not his job title, and it's never been his job title. But an email lands in his inbox anyway: a security audit has been scheduled, or an insurance renewal window just opened, and buried in the fine print is a deadline that gives him a matter of weeks to produce a stack of compliance policy documents that will actually hold up under scrutiny.

He opens a blank document. He has a laptop, a general sense of his company's tech stack, a vague memory of what "least privilege access" means from a webinar he half-watched a year ago, and a deadline that isn't moving.

So he does what almost everyone in his position eventually does: he hires a consultant. What follows is weeks of discovery calls, clarifying emails, drafts that come back full of questions he didn't know he needed to answer, more drafts, and a final invoice that runs into the thousands of dollars — for paperwork. Not for a new product feature, not for infrastructure, not for anything that shows up on a roadmap. For documents that exist purely so that someone else, somewhere else, will sign off and say "yes, this company takes security seriously enough."

By the time it's over, he's relieved it's done and slightly resentful of how much it cost to get there. That resentment is the seed of almost every compliance-tech product pitch you've ever heard, including, honestly, our first one.

When we set out to build PolicyForge, that story was the entire pitch, and it was a good pitch. The problem looked obvious, measurable, and immediately sympathetic: **compliance documents take too long and cost too much to produce.** Build a tool that generates them faster and cheaper, and the problem disappears. Ship a faster typewriter, basically, and everyone goes home happy.

It's a clean story. It's also, we eventually found, the wrong one.

## The Design Problem

Here's the tradeoff we didn't see coming until we went looking for it: if we had built to that original framing, we would have shipped a very fast, very confident, and very wrong product.

The mistake would have been subtle, which is exactly what makes it dangerous. A "generate documents faster" tool would have tested well in early conversations. People would have said yes, this is annoying, yes, faster would help, yes, I'd try that. All of that feedback would have been true and none of it would have told us whether we were solving the problem that actually determines whether the documents work.

Before writing a line of code, we did something that's easy to skip when you're excited to start building: we slowed down and mapped out how the work actually happens today, for everyone touched by it — not just the person who feels the pain most directly, but everyone downstream of him too. Who else touches this process. Who has to be satisfied by the end result. Who has veto power over whether any of it counts.

That's where the story started to come apart in a useful way.

## The Options

Once we had that fuller picture in front of us, we were left with two ways to interpret it.

**Option one** was to trust the original framing at face value. The operations lead says documents take too long, so speed is the product to build. This option is tempting for good reasons. It's simple. It's measurable — you can literally time how long document generation takes, before and after. And it matches, word for word, what the person in pain would tell you if you interviewed him directly. There's a real comfort in building toward a problem statement that came straight from a real person's mouth.

**Option two** was harder and less comfortable: separate what people _do_ from what they're actually _struggling with underneath_ the doing. `[ARTIFACT: user to confirm format and content before publishing]` This meant not taking "it takes too long" as the final answer, but treating it as a symptom and asking what's actually causing the delay. Is the bottleneck really the mechanics of assembling a document? Or is something upstream of that — something harder to name — the real source of the drag?

When we pushed on this, a different picture emerged, and it wasn't subtle once we saw it. The operations lead in our scenario doesn't lack the ability to type words into a document quickly. Given a template and a checklist, he could probably produce a first draft of most of these policies in an afternoon. What he lacks is the expertise to translate raw, messy facts about his own company's actual practices into language that a skeptical outsider — an auditor doing a formal review, an insurance carrier deciding whether to underwrite a policy — will accept as credible evidence of real compliance.

That translation work is not clerical. It's a judgment call, repeated dozens of times across a single document: _does this internal practice, described honestly, actually satisfy this specific external requirement, in language this specific type of reviewer will trust?_ Get that judgment wrong in either direction — overstate what the company does, or describe it in a way that reads as evasive or templated — and the document fails at the one job it exists to do, regardless of how quickly it was produced.

Today, that judgment call is made by a consultant. And the consultant isn't expensive because writing sentences is hard. Sentences are cheap. The consultant is expensive because making a judgment call that has to survive outside scrutiny is hard, and right now that judgment lives entirely inside one person's head, accumulated through years of having seen what auditors push back on and what carriers accept without a second look. There is no way to buy that judgment faster. You can only buy more hours of the person who has it.

We chose option two. It meant walking away from the simpler, more comfortable story we'd started with — the one where speed was the whole answer — and accepting that the real problem was going to be harder to describe, harder to test for, and much harder to build a confident roadmap around in the short term.

## The Build

Once we reframed the problem this way, one supporting fact became impossible to ignore, and it reshaped how seriously we had to take this pivot. `[ARTIFACT: user to confirm format and content before publishing]` Most of the outside parties whose approval this whole process ultimately depends on aren't yet on board with an automated approach to producing this kind of documentation. It's worth sitting with who exactly is, and isn't, currently convinced.

The person requesting the documents — our operations lead — wants this to work, badly. He's the one absorbing the cost and the deadline pressure, so he's an easy yes. The person who approves the budget for a tool like this is cautiously supportive too, in the way anyone is supportive of something that might reduce a recurring line-item expense, provided it doesn't introduce new risk in the process.

But the auditors and insurance carriers who ultimately decide whether any of this paperwork actually counts for anything start from a very different place: skepticism. Not hostility, necessarily, but a professional, structural wariness toward anything that reads as templated, generic, or machine-produced. Their entire job, in a sense, is to be suspicious of documentation that looks too easy to produce. And the consultants who currently sit in the middle of this process, doing the translation work by hand, have essentially no incentive to make that translation easier to automate — their livelihood depends on being the ones who can do it.

That's not a minor footnote to file away for later. That is the actual shape of the product risk sitting at the center of PolicyForge. A tool that generates documents faster does nothing, by itself, to solve a trust problem between a company and the people who have to believe its paperwork. In the worst case, it could actively make that trust problem worse — a beautifully formatted, instantly generated policy document might read, to a skeptical auditor's eye, as even less credible than a slower, more obviously human-labored one. Speed, in this context, can be a liability disguised as a feature.

So the actual build, at this stage of the project, wasn't code at all. It was the harder, less glamorous work of refusing to let the easy framing stand — of sitting with an uncomfortable, half-formed reframing until it hardened into something we could act on. What we landed on was this: PolicyForge isn't a document-speed product. It's a trust-building product that happens to be wearing the shape of a document-generation tool. Everything downstream of that distinction — what we prioritize, what we measure, how we talk to the auditors and carriers who currently have no reason to trust us yet — changes because of it.

## The Verdict

Does any of this solve the problem? Not yet, and that's the honest answer, and it's worth being honest about it rather than dressing up a mid-course correction as a finished victory.

What this exercise did accomplish was stop us from spending months — and a meaningful chunk of a limited budget — building confidently toward the wrong target. We now know, with far more clarity than we had a few weeks ago, that the real work ahead is convincing skeptical third parties that generated documentation reflects genuine, specific understanding of a company's actual controls, not just plausible-sounding boilerplate assembled from a template. That's a fundamentally harder and slower thing to prove than "we generate documents fast." It requires building credibility with an audience — auditors, carriers — who never asked to be sold anything and have every professional incentive to remain unconvinced. But it's the thing that actually determines whether anyone downstream of the operations lead ever accepts what gets produced. Speed without trust produces documents nobody signs off on. Trust without speed is just... consulting, which is the thing we were trying to replace in the first place. We need both, but only one of them was ever actually the hard part.

The deeper lesson, and probably the one that will stick with us longest past this specific product decision, was this: the person who feels a given pain most acutely isn't always the best narrator of what's actually broken underneath it. Our operations lead knows, with total certainty, that the paperwork takes too long. He's lived it. Nobody needed to convince him of that. But he genuinely can't see — because he's never had to sit on the other side of the table — that the slowness he experiences is a symptom of a trust gap, not the disease itself. Asking him to diagnose the root cause of his own frustration would have been asking him to do a job that isn't his. It's a job that had to fall to us.

## Your Turn

If you've ever built something based on the first explanation a user gave you for their pain, only to discover a completely different problem underneath once you actually mapped the real workflow end-to-end — what was the detail that first tipped you off that the original explanation wasn't the whole truth?
