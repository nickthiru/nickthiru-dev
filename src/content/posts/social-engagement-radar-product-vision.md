---
title: "Social Engagement Radar — Inside the Product Vision"
description: "I built this product to solve a specific, measurable problem. Here's the vision, and the reasoning behind every constraint."
publishedAt: "2026-07-15"
slug: "social-engagement-radar-product-vision"
image: "/posts/social-engagement-radar-product-vision.png"
image_size: "lg"
draft: false
tags: []
track: "product"
series_name: "Social Engagement Radar"
series_slug: "social-engagement-radar"
series_phase: "strategy"
series_position: 1
linkedin_url: ""
x_url: ""
pinned: false
pinned_order:
newsletter_hook: "I've watched a lot of product ideas collapse at the first real question: what problem are you actually solving, and how would you know if you solved it? For Social Engagement Radar, I wanted to build the product vision differently. Every decision had to trace back to a measurable user outcome. Every constraint had to earn its place. This post lays out what I ended up with: the problem, the product scope, the three things that make it different from every scheduling or content tool out there, and the honest reasoning behind each one. If you're building something and wondering how much rigour to put into vision work before writing a line of code, this one's for you."
summary_two_sentence: "Growing on X requires showing up in the right conversations early, but finding those conversations manually is slow, inconsistent, and easy to skip. Social Engagement Radar is built to solve that specific problem, with a defined scope, measurable success criteria, and a deliberate constraint that no automated tool can match: nothing publishes without you."
---

## The User Moment

Picture the workflow most people use to engage on X. Open the app. Scroll. Maybe a relevant thread appears, maybe it doesn't. By the time it does, the conversation has already peaked and a reply lands in a graveyard. You've spent twenty minutes and added nothing of value, to the conversation or to your own presence.

That's the problem I set out to fix.

I'm building for people who take X and LinkedIn engagement seriously: creators, consultants, founders, people who want to show up in conversations that matter to their niche and build something real over time. The people I have in mind aren't passively hoping the algorithm surfaces the right threads. They're actively trying to reply meaningfully, early, across sometimes several different topics they care about. And they're finding that nothing in their toolkit was built for that.

## The Design Problem

The obvious answer to "I can't find the right conversations" is "build a better search." But that only solves part of the problem, and it misses what makes this genuinely hard.

Three things compound the difficulty. First, timeliness. A conversation that's two hours old and heating up is worth a hundred conversations from yesterday. Any tool that doesn't surface recency and momentum is surfacing noise. Second, drafting. Finding a good thread is step one. Knowing what to say, in your voice and not a generic AI's, is step two. Most tools stop at step one and leave you staring at a blank reply box. Third, control. There are automation tools that claim to solve both problems. They do so by publishing for you. The moment you hand off the approval decision, you've introduced a failure mode that no amount of scoring accuracy can fully eliminate.

The design problem, then, isn't just discovery. It's discovery plus drafting plus a trust model that never makes you nervous.

<!-- [INTERNAL LINK: relevant post on building products with explicit approval constraints] -->

## The Options

Here's the tradeoff that shaped the scope decision early on.

From my observations, every existing tool in this space sits in one of two camps. The first camp, content scheduling and thread-building tools, is optimised for content creation: threads, scheduling, analytics. Engagement is a sidebar. You can do it, but it's not the product. The second camp is automation: bots and mass-action tools that find and reply at scale. They solve the volume problem by removing the human entirely.

I rejected both. Not because they're bad products. They're well-built for what they do, but neither solves the problem I started with. Content tools treat engagement as a secondary action. Automation tools treat trust as an acceptable casualty. Neither was the right frame.

What I landed on: a product that treats discovery as the _primary_ workflow, keeps drafting tightly coupled to the discovered context, and makes explicit human approval non-negotiable. Not "you can review if you want to." You must. Every time.

The second scope decision was harder: when to stop. The temptation with a tool like this is to grow it into an analytics suite, a CRM, a full publishing workflow. I kept the scope narrow deliberately. The core value loop is: find the right conversations, draft something worth saying, let me edit it, approve it, and publish it. That loop has to work and work well before anything else gets built.

## The Build

The product I'm building is a single-page dashboard. On the left, a view of scored conversations discovered by keyword. On the right, reply angle drafts surfaced against the selected thread. At the bottom, an explicit publish action that requires active confirmation.

Three things shape how it works beneath that surface.

The first is opportunity scoring. Not every reply-worthy conversation is equal. The product ranks what it finds by how likely a well-timed reply is to produce real engagement. That score draws on recency, thread activity, and over time, on outcome data from the user's own history. The intelligence compounds. An early user and a user six months in are working with different signal quality.

The second is voice modelling. Every time a user edits a draft before publishing, the delta (what they kept, changed, and rewrote) becomes training signal for future drafts. The goal is that drafts progressively start sounding like the user without them having to restyle every reply from scratch.

The third is outcome capture. After a reply publishes, the product asks a simple question: did anything come of this? An inbound DM. A collaboration. A lead. A follow that mattered. That data feeds back into scoring over time. Nobody tells you this about engagement tools, but the hardest problem isn't surfacing conversations. It's knowing which conversations were actually worth your time. Outcome tracking is how this product gets smarter at that question.

<!-- [INTERNAL LINK: relevant post on feedback loops in product design] -->

## The Verdict

I'm being specific about what success looks like, because vague ambition is how products drift.

In the first four weeks after MVP launch, I want at least 60% of active users to report saving a meaningful amount of time on their weekly engagement workflow. That's a real signal. If the product is working, it should be removing friction that people can feel. If they can't feel it, the discovery and drafting experience isn't good enough yet.

Within eight weeks, I want at least a quarter of active users to be able to point to a real outcome: a DM, a collaboration, a lead, that traced back to a reply they made through the product. Not an assumption. An attributable outcome.

And from day one, and every day after it, I want zero unintended publishes. That one is a hard constraint. The trust model only holds if users never have cause to question whether the product acted without them.

That's the vision: a product that makes meaningful X and LinkedIn engagement fast, repeatable, and safe, with intelligence that gets better the longer you use it.

<!-- [INTERNAL LINK: relevant post on defining measurable success criteria before shipping] -->

## Your Turn

When you're working out the scope of a new product, how do you decide what to build versus what to explicitly _not_ build, especially when the adjacent features feel like natural extensions?
