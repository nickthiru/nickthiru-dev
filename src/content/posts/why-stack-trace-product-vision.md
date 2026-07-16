---
title: "Stop Asking What. Start Asking Why."
description: "When I built the Social Engagement Radar vision, one technique kept pulling surface requests apart to find the real business problem underneath. Here's how it works."
publishedAt: "2026-07-15"
slug: "why-stack-trace-product-vision"
image: "/posts/why-stack-trace-product-vision.png"
image_size: "lg"
draft: false
tags: []
track: "product"
series_name: ""
series_slug: ""
series_phase: ""
series_position:
linkedin_url: "https://lnkd.in/p/g4XwYRaR"
x_url: "https://x.com/nickthiru/status/2077773969533649284"
pinned: false
pinned_order:
newsletter_hook: "Most product features start life as reasonable requests. 'Make it faster.' 'Track outcomes.' 'Don't publish without my approval.' Each one sounds sensible. The problem is that a sensible request is not the same as a root business outcome — and if you build to the request, you may solve the wrong thing entirely. During the Social Engagement Radar vision session, I used a technique I'd picked up from BDD in Action by John Ferguson Smart and Jan Molak: keep asking 'why?' until the answer stops changing. Three goal chains. Three moments where the surface request dissolved into something more fundamental. That's what this post is about."
summary_two_sentence: "Surface-level product goals are rarely the real problem. They're symptoms of a deeper business need that only becomes visible when you keep asking why. This post walks through the Why Stack Trace technique using three real goal chains from a product vision session, showing how it turns vague requests into measurable outcomes worth building toward."
---

I had three goals written down before I started building the Social Engagement Radar. Reduce effort. Improve outcomes. Protect trust. Clean, sensible, easy to build a backlog around. The problem is that none of them were actually business goals yet.

They were requests.

Here's what I mean. "Reduce effort" tells you someone is spending too much time on something. It does not tell you what changes when you fix it, whether that improvement is worth prioritising over something else, or what success looks like when you get there. You can reduce effort in a dozen ways that still fail the user. The goal sounds complete because it's directionally correct. But it isn't a decision-making tool yet.

Nobody tells you this, but the gap between a directionally correct goal and a useful one is exactly where most product work goes wrong.

So I borrowed a technique from a book I'd found useful during planning work: _BDD in Action_ by John Ferguson Smart and Jan Molak. The idea is simple in principle and ruthless in practice. For each goal you've written down, ask "why?" and keep asking until the answer stops opening into another question. When you reach an outcome you can measure and that clearly links to revenue, cost, or risk, you've found the real goal. Everything above it is a request.

I started calling it the Why Stack Trace because it felt exactly like unwinding a call stack. You see the surface call. You dig down. You find the root.

<!-- [INTERNAL LINK: relevant post on product vision and scoping decisions] -->

## The Effort Problem Runs Deeper Than You Think

The first goal I traced was about reducing the time users spend finding reply-worthy conversations and drafting replies.

<!-- [ARTIFACT: user to confirm format and content before publishing] -->

On the surface: a speed problem. Users spend too long on a manual process. Easy to agree with, easy to build around.

First why: why are they slow? Because manual scanning doesn't reliably surface the right conversations at the right time, and generic writing tools require significant restyling for every draft.

Second why: why does that cost so much? Because when you act late on a social conversation, the engagement value drops sharply, and users pursuing multiple distinct interests have to rebuild their context from scratch every session, multiplying wasted effort across every interest they're active in.

That last piece is what changed my thinking. The root outcome wasn't "make the workflow faster." It was: lower the user's effective cost of engagement to the point where doing this daily becomes sustainable. That's a different brief entirely. It changes what you build, what you measure, and what "done" looks like.

## What You're Really Tracking When You Track Outcomes

The second goal was about improving users' downstream business outcomes from replies: more leads, more collaborations, more visibility.

<!-- [ARTIFACT: user to confirm format and content before publishing] -->

First why: why do some replies produce outcomes and others don't? Timeliness and relevance. A reply that arrives when a conversation has momentum, and adds something real to it, gets noticed. One that arrives late or misses the point doesn't.

Second why: why is that hard to solve? Because the system doesn't know yet which conversations are worth the user's time. It can make educated guesses early on, but the scoring only becomes genuinely useful once it's accumulating real outcome data from real publish events.

The real goal here wasn't "improve reply quality." It was: build a feedback loop where outcome data continuously sharpens the system's ability to surface better opportunities. The improvement compounds over time. That's a different architecture conversation than "generate better drafts."

<!-- [INTERNAL LINK: relevant post on outcome tracking or feedback loops in product design] -->

## Trust Is a Revenue Goal

The third goal was the one that looked most like an engineering requirement: ensure the product never publishes without explicit user approval, and that every publish event is auditable.

<!-- [ARTIFACT: user to confirm format and content before publishing] -->

First why: why does this matter enough to be a top-level goal? Because trust failures in social publishing are immediate and visible. A single unintended post can cause real reputational damage, and users who experience that don't come back.

Second why: why does auditability matter beyond just preventing accidents? Because the combination of an approval gate and a clear record of what was published and when is what makes the product safe enough to adopt as a daily workflow tool.

The root outcome: protect revenue by preserving user trust and eliminating the category of operational mishaps that would cause churn. That reframes what looks like a safety feature into a commercial decision. You're not just avoiding bad outcomes. You're removing the reason a user would ever leave.

## The Pattern Worth Keeping

Here's the tradeoff when you skip this kind of reasoning: you end up building the right features for the wrong definition of success. The goals look coherent. The backlog looks sensible. And then six months later you're surprised that users aren't sticking around, or the metric you were optimising for isn't moving the one that actually matters.

The Why Stack Trace is not complicated. It's disciplined repetition of one question. But that discipline is what separates a product spec from a product strategy.

I picked up the approach from Smart and Molak's work on BDD and discovery: the idea that you should trace a requirement back to its business value before you commit to building it. What I found is that this same principle applies at the vision level, before any features are defined. It's not just useful for requirements. It's how you write goals that are actually buildable.

(See: _[The *Social Engagement Radar* product vision](/writing/social-engagement-radar-product-vision)_)

## Your Turn

When you're defining goals early in a product or project, do you ask "why?" more than once, or does the first plausible answer tend to stick?
