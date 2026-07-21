---
subtitle: "How Impact Mapping Built the MVP Roadmap"
description: "How turning a product vision into an impact map exposed the real risk to PolicyForge's launch, and reshaped what actually made the MVP cut."
publishedAt: "2026-07-21"
slug: "policy-forge-impact-mapping"
image: "/posts/policy-forge-impact-mapping.png"
image_size: "lg"
draft: false
tags: ["product-strategy", "impact-mapping", "mvp", "policyforge"]
track: "product"
series_name: "PolicyForge"
series_slug: "policy-forge"
series_phase: "strategy"
series_position: 2
linkedin_url: "https://www.linkedin.com/posts/nick-thiru_policyforge-productmanagement-mvp-share-7485247365772156930-K3G0/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAArlnX4BlgP7Imj9jDqmmDropzzOvYwJoaY"
x_url: "https://x.com/nickthiru/status/2079481844693873036"
pinned: false
pinned_order:
newsletter_hook: "PolicyForge's pitch was simple: generate compliant policies in minutes instead of paying a consultant $8k–$15k. But 'generate policies' isn't a build plan, it's a slogan. I had to figure out which piece to build first, and which stakeholder's trust would actually make or break the whole thing. The answer wasn't the feature I expected."
summary_two_sentence: "PolicyForge's product vision promised to replace expensive compliance consultants with a self-service tool, but a vision statement doesn't tell you what to build first. Using impact mapping to map out who actually needed to change their behavior, and what could go wrong if they didn't, turned a slogan into a prioritized, risk-aware MVP plan."
build_logs:
  - "build-logs/2026/05/2026-05-26.md"
newsletter_sent: false
newsletter_date: ""
---

## The User Moment

Picture Michael. He's a VP of Operations at a mid-size company, and it's coming up on renewal season for his company's compliance-linked insurance policy. Somewhere on his desk is a quote from an external compliance consultant: $8,000 to $15,000, plus four to six weeks of back-and-forth, to produce the security and privacy policy documents his insurance carrier and auditor need to see.

He doesn't want to pay that again. He's heard about a new tool, PolicyForge, that claims to generate the same kind of compliant policy documents in minutes instead of weeks, using an AI-guided interview instead of a human consultant. It sounds almost too easy. And that's exactly the problem, because "sounds too easy" is not the same thing as "he'll actually trust it enough to skip the consultant and submit these documents to his insurance carrier."

That's the moment PolicyForge actually has to win. Not the moment someone signs up. The moment someone like Michael decides whether to bet a real deadline, a real audit, and a real insurance renewal on a document an AI generated.

## The Design Problem

The product vision for PolicyForge was clean: let people like Michael generate compliant policies in minutes and save thousands of dollars per cycle. Clean vision statements are great for pitch decks. They are terrible build plans, because they tell you _what_ success looks like without telling you _what to build first_ or _what could quietly sink the whole thing_.

Here's the tradeoff every early-stage product team runs into: you can build in feature order, shipping the parts that look most impressive first, or you can build in risk order, shipping the parts that validate whether anyone will actually use this the way you're hoping. Feature order feels productive. Risk order feels slower. But feature order only pays off if your assumptions about user behavior were correct, and nobody had actually tested that yet.

The real design problem wasn't "how do we generate a policy document." Generating a document was, honestly, the easy part. The real design problem was: whose behavior has to change for this business to work, and what happens if it doesn't? Michael has to trust an AI-generated document enough to submit it in place of consultant work. His finance team has to approve a one-time software purchase instead of a familiar recurring consulting line item. His insurance carrier and his auditor, neither of whom asked to be part of this experiment, have to accept these documents as legitimate compliance evidence without demanding a human expert redo the work. None of that is a feature. All of it is a behavior change, and any one of those people saying no breaks the whole value proposition.

## The Options

I considered a few different ways to turn "generate compliant policies in minutes" into an actual build plan.

**Option one: build the generation engine first, and worry about trust later.** This is the natural engineering instinct. Get the AI interview working, get policy generation working, then figure out adoption. The problem is obvious once you say it out loud: if Michael doesn't trust the output, or if his auditor rejects it, you've built a very sophisticated document generator that nobody will actually submit anywhere. Technical capability was never the bottleneck here. Trust was.

**Option two: build every capability the vision implied, all at once.** Onboarding interview, policy generation, cost comparison display, carrier validation messaging, framework-mapping transparency, version history, refresh reminders, team sign-off workflows. It's tempting to build the whole thing so nothing is missing at launch. But most of that list has nothing to do with whether the MVP succeeds or fails. Some of it is a Year 2 problem wearing a Day 1 costume.

**Option three, the one I went with: Use impact mapping to map out the actual people and behaviors this product depends on, before deciding what to build.** Instead of starting from features, I started from the business goals PolicyForge actually needs to hit, cost reduction, on-time insurance renewal, audit acceptance, and durable compliance over time, and worked backward to the specific people whose behavior determines whether each goal is achievable, then to the smallest capability that could move that behavior.

The exercise surfaced something the vision statement never mentioned: an external compliance consultant, who has every incentive to discourage a client from trusting a self-service alternative. Nobody puts "our competitor might badmouth us to our own prospective customer" in a pitch deck, but it's a real obstruction path, and pretending it doesn't exist doesn't make it go away.

Out of that exercise came a small number of concrete decisions, not a giant backlog:

- **Build the guided interview and document generation loop first**, because every other business outcome, cost savings, renewal, audit, depends on this working at all. This was never in question, but the impact map confirmed it deserved to be the entire first slice, not one feature among many.
- **Add an explicit signal that shows the generated policy has been validated against what an insurance carrier or auditor expects**, before Michael submits anything. This wasn't in the original vision at all. It came directly from recognizing that Michael's hesitation, not the AI's capability, was the actual blocker to renewal.
- **Show Michael himself the reasoning behind each policy, not just proof that an auditor would accept it**. A citation view in the review dashboard, mapping specific interview answers to the exact policy language and framework requirement they produced, so Michael isn't just told the document is compliant, he can see why. This is a distinct capability from carrier-acceptance validation: one convinces the auditor, the other convinces Michael, and the impact map made clear the product needs both or the "trust" risk isn't actually addressed.
- **Defer policy versioning and refresh reminders entirely.** They matter for year-two retention and recurring compliance, but they don't affect whether the Feb 1 renewal deadline gets met or whether the first cohort of users ever trusts the product enough to become a second-cycle customer. Building this first would have been effort spent solving a problem the product doesn't have yet.
- **Treat cost comparison as a first-class piece of the experience, not an afterthought.** Seeing "$299 vs. $8k–$15k" at the right moment turns an abstract value proposition into a concrete, checkable number, which matters more for a skeptical buyer than another feature would.

<!-- `[ALT: A simple before/after diagram showing a single product vision statement branching into four business goals, each connected to the specific person whose behavior has to change for that goal to succeed]`   -->

## The Build

What actually got built out of this exercise wasn't code yet, it was a plan: a small, deliberately narrow MVP scope built entirely around the behaviors that had to change for the business to work, and everything else pushed to a later phase without guilt.

The MVP boundary that came out of this: the guided interview and policy generation loop, the cost comparison display, the carrier-acceptance signal, a target of under 10% rework on first submission, and clear framework-mapping so the generated documents visibly correspond to what SOC 2, ISO 27001, or HIPAA actually require, and a citation view that shows Michael exactly which interview answer produced which policy section, so his own trust in the output doesn't depend on taking the tool's word for it. Everything else, version history, changelog features, team sign-off workflows, moved to a later phase, not because they're unimportant, but because none of them determine whether the first cohort of users ever trusts this enough to hit "submit."

What surprised me was how much of the roadmap ended up being about _removing hesitation_ rather than _adding capability_. I expected the hard technical problem to be generating accurate, framework-specific policy language. That part turned out to be tractable. The harder problem was designing for a moment that doesn't show up in any feature list: the moment Michael decides whether to trust the output enough to stake a real deadline on it.

One risk sits above the rest, and it's worth naming honestly rather than burying it in a backlog: if Michael doesn't trust the generated policies enough to skip the consultant, the entire cost-savings pitch collapses, no matter how technically correct the documents are. Every other risk in the plan is downstream of that one. That's exactly why the carrier-acceptance signal made the MVP cut ahead of features that looked, on paper, more impressive.

<!-- `[INTERNAL LINK: relevant post on early product validation approaches]`   -->

## The Verdict

Does this actually solve the problem? Partially, and I want to be honest about where the line is. Mapping business goals to actors to behaviors to capabilities gave me something the vision statement never could: a build order I can defend, and a short, specific list of assumptions that, if wrong, would sink the product regardless of how well it's engineered. That's a real result. It turned "generate compliant policies in minutes" from a slogan into a plan with an actual sequence and an actual list of things to test before writing more code.

What it hasn't done yet is prove any of it. A plan that correctly identifies "user trust" as the biggest risk is only useful if you go validate that risk before betting the launch on it. The next real step isn't more building, it's running the pre-launch checks against the assumptions this exercise surfaced: does seeing the citation view actually make Michael trust the output, does a real insurance carrier actually accept it, does a real auditor sign off without demanding rework. Until those come back, this is a well-reasoned bet, not a proven one, and I'd rather say that plainly than pretend the impact mapping exercise alone de-risked the launch.

<!-- `[INTERNAL LINK: relevant post on prioritizing MVP scope]`   -->

## Your Turn

When you've had to turn a broad product vision into an actual build order, what told you which capability to build first, the one that looked most technically impressive, or the one that removed the most hesitation from the person you were building it for?
