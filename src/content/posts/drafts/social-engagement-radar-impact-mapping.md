---
title: "Social Engagement Radar — What Impact Mapping Told Us Before We Wrote Single Line of Code"
description: "How impact mapping turned three business goals into a ranked build plan, and exposed our riskiest assumptions."
publishedAt: "2026-07-20"
slug: "social-engagement-radar-impact-mapping"
image: "/posts/social-engagement-radar-impact-mapping.png"
image_size: "lg"
draft: false
tags: ["product-strategy", "impact-mapping", "mvp-planning"]
track: "product"
series_name: "Social Engagement Radar"
series_slug: "social-engagement-radar"
series_phase: "strategy"
series_position: 2
linkedin_url: "https://www.linkedin.com/posts/nick-thiru_socialengagementradar-productstrategy-buildinpublic-share-7484977145086132225-p8zI/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAArlnX4BlgP7Imj9jDqmmDropzzOvYwJoaY"
x_url: "https://x.com/nickthiru/status/2078193579412078679"
pinned: false
pinned_order:
newsletter_hook: "Before I wrote a single line of code for Social Engagement Radar, I sat down with three fuzzy business goals and tried to answer one uncomfortable question: which of these ideas would actually work, and which were just things I wanted to be true? The answers weren't what I expected."
summary_two_sentence: "I ran an impact-mapping exercise against Social Engagement Radar's three core business goals to figure out what to build first. It turned three vague aspirations into a ranked list of capabilities, and forced me to admit which parts of the plan were guesses dressed up as strategy."
build_logs:
  - "impact-map.md"
newsletter_sent: false
newsletter_date: ""
---

## The User Moment

Picture someone scrolling X or LinkedIn at 11pm, trying to catch a conversation in their niche before it goes cold. They find it. By the time they've read the thread, decided what to say, and typed a reply that doesn't sound generic, the conversation has moved on. Someone else got there first. The moment that made the thread worth joining, the window where a reply reads as timely instead of stale, has already closed.

Multiply that by every day, every platform, every thread worth joining, and you get the actual shape of the problem Social Engagement Radar exists to solve: not "people don't engage enough," but "engaging well takes more time and judgment than most people have to spare." Nobody wakes up wanting to spend forty minutes scanning timelines for the right conversation to join. They want the outcome of that scanning: a good reply, sent while it still matters, to someone worth replying to. The scanning itself is just the tax you pay to get there, and most people are paying more of that tax than they realize.

That's the moment I was designing for. But "help people engage faster" is not a plan, it's a wish. Wishes don't tell you what to build first, what to defer, or what could quietly sink the entire product if it turned out to be wrong. I needed to know exactly _whose_ behavior had to change, _what_ had to be true for that change to happen, and _which_ of my assumptions were actually load-bearing versus which ones were just comfortable to believe.

That distinction, between an assumption you're confident in and one you're merely hoping holds up, turned out to be the entire exercise. Everything downstream, every prioritization call, every sequencing decision, traced back to being honest about which category each piece of the plan actually belonged to.

## The Design Problem

Here's what made this genuinely hard: I had three separate business goals I cared about, reducing the time it takes someone to find and act on a good conversation, helping those actions actually turn into something (a reply, a lead, a connection), and making sure the tool never publishes anything a user didn't explicitly approve. On paper, these sound compatible. In practice, they pull in different directions the moment you try to build for all three at once.

Each of those goals could spawn a dozen plausible features. Speed alone could justify keyword search, smart filtering, notification triggers, a browser extension, a mobile-first workflow, and half a dozen other ideas that all sound reasonable in a brainstorm. Outcome-driven engagement could justify scoring, personalization, timing intelligence, and reply coaching. Trust and safety could justify approval flows, audit logs, granular permissions, and rollback mechanisms. Left unchecked, I'd have built all of them at once, poorly, and discovered which ones mattered only after shipping something bloated and unfocused.

The real design problem wasn't "what should we build." It was "what has to be _true_ for each of these business goals to actually move, and how confident am I in that truth?" That reframing changed everything about how I approached the next few weeks of planning. Instead of listing features I liked, I had to list beliefs I was betting on, then rate how nervous each belief made me.

Some of my assumptions were nearly certain: a workflow that fits on one screen instead of ten tabs is obviously less friction, almost by definition. Nobody needed convincing that fewer clicks and fewer context switches would save time. Others were genuinely uncertain: would an algorithm actually be able to tell the difference between a conversation worth joining and noise? That one is much harder to be confident about in the abstract. It depends on signal quality, on how "worth joining" even gets defined, and on whether the definition holds up once real, messy, human conversations start flowing through it.

If that one assumption was wrong, the entire product's value proposition would collapse, regardless of how polished everything else was. You could have the fastest, most elegant workflow in the category, and it wouldn't matter if the thing at the center of it kept surfacing conversations that weren't actually worth anyone's time. That asymmetry, between assumptions that were nearly free to get wrong and assumptions that were existential if wrong, is what impact mapping was built to expose.

## The Options

I mapped out, for each business goal, who needed to behave differently and what capability would need to exist to make that behavior change happen, then attached an explicit assumption to each one, along with how risky that assumption was. Doing this forced a kind of honesty that a normal feature-brainstorming session doesn't. It's easy to say "we'll add scoring" in a planning meeting. It's harder to write down, in plain language, exactly what has to be true for that scoring to actually work, and then sit with how uncertain that statement makes you feel.

That surfaced a real tension. On one side: capabilities that were obviously useful and low-risk, a single-page workflow, straightforward keyword-based discovery, a way to organize conversations by topic. These weren't controversial. Nobody on the team, including the version of me arguing with myself at midnight, doubted that they'd help. Easy calls. Build them, and don't spend more time debating something that's already settled.

On the other side: the capabilities that were actually the _point_ of the product, automatically scoring which conversations were worth a reply, and figuring out whether a given person was likely to engage back, were also the riskiest. These weren't nice-to-haves bolted onto a working product. They were the reason the product existed in the first place. If a tool just helps you scroll faster, that's marginal. If it helps you find the right five conversations out of five hundred, that's transformative. But that transformative version only works if the underlying judgment is actually good. If the scoring turned out to be noisy or unconvincing, users would stop trusting the tool almost immediately, and no amount of polish elsewhere would save it. Trust, once lost on the core promise of a product, is brutally hard to win back.

And then a third category entirely: the trust and safety layer. Requiring explicit approval before anything gets published, keeping a verifiable log of every action, showing an exact preview before confirming. None of this was glamorous. Nobody was going to see a screenshot of an approval gate and think "wow, that's impressive." It doesn't demo well. It doesn't show up in a highlight reel. And yet, all of it turned out to be foundational, because the moment a tool posts something a user didn't intend, the relationship is over, no matter how good the rest of the product is. A single unauthorized publish, even a small, harmless one, is the kind of failure that doesn't get forgiven the way a slow load time or a clunky menu does. It reads as a betrayal of control over your own voice and your own public presence, and users don't stick around to see if it happens twice.

Seeing these three categories laid out side by side, low-risk-and-obvious, high-risk-and-core, and unglamorous-but-non-negotiable, was the moment the plan stopped being a wishlist and started being a strategy.

## The Build

The decision I landed on was to treat these three categories differently rather than build everything at once:

- **Ship the obvious wins immediately.** Anything with low uncertainty and clear value, the streamlined workflow, keyword-based discovery, topic organization, went straight into the MVP without further debate. There was no value in litigating decisions that were already settled just because they felt less exciting than the riskier bets.
- **Validate the risky, high-value bets before committing fully.** Conversation-quality scoring and audience-relevance scoring were too central to skip, but too uncertain to fully build out blind. Building a fully-featured version of something this uncertain, before knowing whether the core premise even holds, would have been expensive in the worst possible way: expensive to build, expensive to unwind, and expensive in the trust it would cost if it launched and underdelivered. The plan became: build a working version, put it in front of real users early, and watch whether the surfaced conversations actually led anywhere before investing further.
- **Treat trust infrastructure as non-negotiable, not a nice-to-have.** Explicit approval gates, a full audit trail, and pre-publish previews got prioritized even though they don't demo well, because the cost of getting this wrong (a single unintended publish) was disproportionate to almost anything else on the list. This is the category that's easiest to underinvest in precisely because it's invisible when it's working. Nobody praises a tool for not accidentally posting something. But everybody notices, loudly, the one time it does.
- **Explicitly defer what depends on data we don't have yet.** Features like a feedback loop that learns from reply outcomes only make sense once there's actual outcome data flowing through the system. Building them first would mean guessing twice: guessing at the model, and guessing at the data it would eventually need, without any real signal to check either guess against. It was tempting to build toward that future capability early, since it's genuinely exciting to think about. But excitement isn't sequencing logic.

What surprised me was how much this reframed "priority." It wasn't really about impact vs. effort, which is the tradeoff most planning frameworks default to. It was about impact vs. _how sure I was I was right_. The highest-impact idea in the whole map was also the one I trusted the least, and that changed how I sequenced everything. Under a naive impact-first prioritization, that capability would have been built first and built big. Under this framing, it became the thing to validate smallest and fastest, precisely because being wrong about it would cost the most.

## The Verdict

Does this solve the problem? Partially, and honestly, that's the right amount for this stage. What impact mapping gave me wasn't certainty; it gave me a _ranked list of what I don't yet know_, which turned out to be more useful than a ranked list of what I want to build. Certainty was never on the table this early. What was on the table was clarity about where the real risk actually lived, instead of vague anxiety spread evenly across the whole plan.

I now have a concrete plan for what ships first, what gets validated with real users before further investment, and what simply isn't worth building yet. That's a meaningfully different starting position than the one I had a few weeks ago, when the plan was really just a list of features I felt good about, in no particular order, with no explicit accounting for how much I was betting on each one.

The honest risk I'm carrying forward: the single biggest bet in this whole plan, that an algorithm can reliably distinguish a conversation worth replying to from noise, is still unproven. Everything downstream depends on that being true. The workflow speed, the trust infrastructure, the whole premise of saving people time on judgment they'd otherwise have to exercise themselves, all of it assumes that judgment can be approximated well enough to be useful. I'd rather know that now, in a document, than find it out three months into building the wrong thing, after sinking real engineering time into a version of the product that was never going to earn user trust in the first place.

## Your Turn

Have you ever gone through a structured prioritization exercise and had it tell you something uncomfortable about your own plan, something you suspected but hadn't admitted yet? What did you do with that information?
