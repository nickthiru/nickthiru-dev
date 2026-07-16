---
title: "Three Goals Before We Write a Line of Code"
description: "Before building, I mapped three goals the product has to hit — and the assumptions that could sink each one."
publishedAt: "2026-07-16"
slug: "social-engagement-radar-three-goals"
image: "/posts/social-engagement-radar-three-goals.png"
image_size: "lg"
draft: true
tags: []
track: "product"
series_name: "Social Engagement Radar"
series_slug: "social-engagement-radar"
series_phase: "strategy"
series_position: 2
linkedin_url: ""
x_url: ""
pinned: false
pinned_order: "n/a"
newsletter_hook: "Before I write a single line of code for the Social Engagement Radar, I needed to be honest about what the product actually has to do — not in terms of features, but in terms of what it has to change about how people work. I spent two days mapping three goals. Not vague aspirations. Specific, measurable bets: that users save real time, that those time savings turn into actual business outcomes, and that the product never, under any circumstance, publishes something without explicit human approval. Each goal came with a list of assumptions I'm not certain about yet. Some of them are high-risk. I'm publishing them anyway — because if I'm wrong, I'd rather find out early, in public, than late, in private."
summary_two_sentence: "Before building the Social Engagement Radar, I mapped three explicit goals the product needs to hit, along with the assumptions that could undermine each one. The exercise forced me to think in behavioral outcomes rather than features — and surfaced risks I'll need to validate before the product can deliver on any of its promises."
---

I opened a blank document with one question: what does this product actually have to _do_?

Not what features it would have. Not what the tech stack would look like. What behavioral change would it need to produce in the people using it, in a way that was measurable, testable, and honest about the assumptions baked in from the start.

This is where I landed: three goals. Each one distinct. Each one carrying its own risks. I'm sharing all three here — not because they're proven, but because naming them publicly is how I hold myself accountable to them.

**Series note:** This is part of the Social Engagement Radar series, where I'm building in public from strategy through to launch. If you're just joining, we're in the early planning stage — figuring out what this product needs to be before touching any code. You can follow the full series here: [SERIES_TOC_LINK]. The previous post: [PLACEHOLDER: Title and slug of Strategy Post 1].

---

## The User Moment

The person I'm building for is someone who engages on X for professional reasons. Not casually scrolling — deliberately trying to have conversations that lead somewhere: a new connection, an inbound DM, a collaboration, a lead, an opportunity to learn or teach. They already know engagement matters. The problem is the workflow is exhausting.

Right now, finding relevant conversations means manual scrolling through a noisy feed. Writing replies means starting from scratch every time, with no memory of what worked before. There's no system. Just effort, repeated daily, with diminishing returns on time.

That was the starting point. Three things need to change for the product to be worth using.

---

## The Design Problem

The challenge with building a tool like this is that "saves time" is not a goal — it's a vague hope. I needed to be specific enough that I'd know, during beta, whether the product was actually delivering.

So I worked through each goal as a behavioral question: whose behavior needs to change, in what direction, and how would we know it happened? That framing changed what I decided to build. It also forced me to surface the assumptions I was quietly relying on — the ones where I'm not certain, but I'm betting the product on anyway.

Here's what I'm betting on.

---

## The Options (Three Goals, Three Bets)

**Goal one: Save real time on engagement discovery and reply drafting.**

The first thing the product has to do is reduce the time it takes to find good conversations and write replies worth sending. The target I've set for myself: at least 60% of active beta users reporting that they save an hour or more per week on their engagement workflow.

That's a specific number, and I'm not certain I'll hit it. [ARTIFACT: user to confirm format and content before publishing] The biggest risk here isn't the feature set — it's whether the opportunity-scoring algorithm surfaces genuinely reply-worthy conversations rather than noise. If the scoring is off, the whole value proposition falls apart. I'll know within the first two weeks of beta whether that assumption holds.

There's a second risk I thought carefully about: the draft generation. AI-generated replies only save time if they're good enough to edit, not rewrite. If users consistently find the drafts generic, they'll stop using them and revert to writing from scratch. That's the failure mode I'm most focused on avoiding.

**Goal two: Turn timely replies into real business outcomes.**

Saving time is only useful if the time saved goes toward something that matters. The second goal is the harder one: within eight weeks of launch, at least 25% of active users should be able to point to a measurable outcome they attribute to a reply made through the product — an inbound DM, a new collaboration, a lead.

Nobody tells you this, but setting that target honestly required admitting how much I don't control. The causal chain between a reply and a downstream outcome runs through the other person's decision to respond, the quality of the conversation that follows, and a dozen factors that have nothing to do with my product. The most I can do is make the reply timelier and more considered. The outcome still depends on the conversation.

That's why I'm measuring through self-reporting rather than instrumentation. I can't track what happens after the reply leaves the product. But users can tell me. The risk is that fewer than 25% experience a measurable outcome in eight weeks — and if that happens, I need to understand whether it's because the replies weren't good enough, or because eight weeks simply isn't long enough for outcomes to materialize. Those require different responses. [INTERNAL LINK: relevant post on validating outcome-based metrics]

**Goal three: Never publish something the user didn't explicitly approve.**

This one is less a performance goal and more an architectural constraint. The target is absolute: 100% of publish attempts require explicit human approval, and zero unintended publishes occur from system actions in the first eight weeks.

Here's the tradeoff I had to think through carefully: a mandatory approval step for every publish slows the workflow. If the friction is high enough, users will find the tool slower than posting manually — and then the time-saving goal and the trust-protection goal are in direct conflict with each other. The design has to thread that needle.

The answer I landed on is to treat the approval step not as a speed bump, but as a confidence layer. Users see an exact preview of what will be published before they confirm. Every publish attempt is logged with a timestamp and a content snapshot, so the history of what was sent is always verifiable. The goal isn't to slow users down — it's to make the approval fast enough that it doesn't feel like friction, while ensuring no content ever goes out without a deliberate human decision. [INTERNAL LINK: relevant post on trust architecture in product design]

---

## The Build

None of this is built yet. These are the goals I'm building toward — stated before the work begins so that beta users, future readers, and I myself know what "success" looks like before it gets defined retroactively.

What the exercise produced was a clear sense of which capabilities matter most and which assumptions I need to invalidate first. [ARTIFACT: user to confirm format and content before publishing] Not everything needs to be in the first version. Some capabilities are worth building immediately because the assumptions behind them are low-risk. Others need to be validated with early users before committing to the full build.

The priority for MVP is the core loop: find a conversation, draft a reply, review it, approve it. Everything else is in service of making that loop faster, more accurate, and trustworthy enough that users come back to it the next day.

---

## The Verdict

I don't know yet whether these goals are achievable. That's the honest answer.

The time-saving goal feels reachable if the scoring and drafting quality hold up. The outcome goal is the one I'm most uncertain about — not because I don't believe replies drive business outcomes, but because eight weeks is a short window and I'm relying on self-reported data. The trust goal is the one I'm most confident about because it's a design constraint I control directly.

What I do know is that naming these goals before building anything means I can't quietly move the goalposts later. If the beta tells me I was wrong, I'll say so here.

<!-- [INTERNAL LINK: relevant post on setting measurable product goals before building] -->

---

## Your Turn

If you were building a tool like this, which of the three goals would you be most nervous about — the efficiency goal, the outcome goal, or the trust goal? And what would you want to validate first?
