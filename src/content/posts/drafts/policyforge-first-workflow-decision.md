---
subtitle: "Why the first workflow we build determines everything after"
description: "Choosing the one workflow to build first in PolicyForge, and why dependency-free beats impressive."
publishedAt: "2026-07-31"
slug: "policyforge-first-workflow-decision"
image: "/posts/policyforge-first-workflow-decision.png"
image_size: "lg"
draft: false
hashtags:
  ["#CMMC", "#NIST800-171", "#CybersecurityCompliance", "#DFARS", "#Compliance"]
track: "product"
series_name: "PolicyForge"
series_slug: "policy-forge"
series_phase: "strategy"
series_position: 6
linkedin_url: "https://lnkd.in/p/g_JSMR8r"
x_url: ""
pinned: false
pinned_order:
newsletter_hook: "Three workflows looked equally important. Only one could go first, and picking wrong meant building something impressive that couldn't actually be tested. Here's how I chose the workflow that everything else in PolicyForge now depends on."
summary_two_sentence: "PolicyForge had three candidate workflows competing for first-build priority, each solving a real problem. I picked the one I could test without waiting on anyone else, and it's already shaping every decision after it."
build_logs:
  - "thiru-ai-labs/apps/secure-stack/policy-forge/docs/build/phase-1/step-1-4/build-log.md"
newsletter_sent: false
newsletter_date: ""
---

## The User Moment

Michael gets the notice on a Tuesday. Insurance renewal, seventeen days out, and buried in the fine print is a list of security controls he has to prove he's already meeting. He doesn't have a security team. He has a laptop, a deadline, and a vague sense that "compliance" is something other people have already figured out.

This isn't a hypothetical. It's the exact scenario PolicyForge is built to answer, and it's specific on purpose: a 17-day insurance renewal window, or sometimes a 60-to-90-day audit notice instead. Either way, the clock starts the moment the notice lands, and Michael's problem is never really "I don't understand security." His problem is "I don't have time to translate what I actually do into language an auditor will accept."

That's the moment PolicyForge exists for: turning a scramble into a guided conversation that ends with a policy document Michael can actually hand over.

But before I could build anything for Michael, I had to answer a much less glamorous question, one that doesn't show up in any pitch deck: which piece do I build first?

## The Design Problem

PolicyForge isn't one feature. It's a chain of three distinct workflows, and each one is a real product on its own.

The first turns Michael's plain-language answers into a policy document that's actually mapped to a compliance framework, reasoning chain visible, gaps flagged instead of hidden. The second takes that finished draft and gets it in front of a carrier or auditor for pre-validation and formal submission. The third is the long game: keeping Michael's policies current over a rolling twelve-month cycle, so the next renewal notice isn't a scramble at all.

Here's the tradeoff: I could only build one of these first, and whichever one I picked would become the foundation everything else sits on. Pick wrong, and I'd spend weeks building something that looks like progress on a demo but can't actually be validated until a second workflow, or worse, a third party, exists to test it against.

So before writing a line of implementation, I forced myself to inventory all three candidates properly: who the actor is, what triggers them, what capabilities each one spans, where the decision points live, and, critically, what each one depends on to even be testable.

## The Options

**Option one** is the guided-interview-to-draft-policy workflow. Michael answers questions in plain language, and the system has to reason its way from those answers to a document that's actually mapped to a real compliance framework, complete with a visible reasoning chain and any gaps or unreviewed sections clearly flagged rather than quietly smoothed over. The decision points here are genuinely hard: is Michael's response even sufficient to generate policy language, and can the system be trusted to know when it isn't? Is the framework mapping itself accurate, something the system can propose but shouldn't get to unilaterally decide? This workflow has no dependency. It's the entry point. Nothing else in the product can run before it.

**Option two** takes that draft and moves it toward the outside world: pre-validation and submission to a carrier or auditor. It layers in things like cost-comparison context and a pre-validation confidence signal meant to tell Michael how likely his draft is to be accepted before he actually sends it. On paper, this is the workflow that gets Michael his renewal, the actual finish line. But it can't run at all until a finished draft exists, and worse, its real measure of success depends entirely on how a carrier or auditor reacts, something no amount of good engineering on my end can guarantee. The pre-validation signal is explicitly advisory only, never a guarantee, and the actual submission stays a human action, Michael's, not the system's. That's a deliberate design choice, but it also means this workflow's success criteria live outside my control.

**Option three** is the compliance-refresh workflow: catching control drift, keeping policies current across a twelve-month cycle so Michael isn't back in the Tuesday-notice scramble a year from now. It's genuinely valuable, and it addresses a real gap nothing else in the product currently touches. But its value only materializes after a full cycle has already succeeded once, which means it can't be meaningfully built, let alone tested, until the other two workflows already exist and work.

Weighing them side by side came down to one question: which workflow could I actually prove was working, using only signals I control? The submission workflow depends on a carrier's judgment, an external actor I can't test against on my own timeline. The compliance-refresh workflow depends on the other two already existing and having already gone through at least one full cycle. Only the draft-generation workflow could be tested end-to-end starting today, with nobody but Michael in the loop.

There's a more structural way to say this too. When I ranked all three against business goals, risk exposure, and the cognitive bottlenecks they addressed, the first workflow came out ahead on every axis that mattered. It ties directly to the two goals I actually care about most right now, cost reduction and audit acceptance. It carries real risk, Michael's trust in the output and whether the mapping is accurate enough for an auditor to accept, but both of those risks are things I can test through Michael's behavior alone, without waiting on anyone else. The second workflow carries the single highest-leverage and most fragile assumption in the entire product: whether a carrier will actually accept what we send them. That's not a risk I can retire through good engineering. It's a risk that sits entirely outside the build.

## The Build

I chose the guided-interview-to-draft-policy workflow. It's the one place where the product has to prove its hardest bet: can it take Michael's plain-language answers and reason its way to something that actually maps to a real compliance framework, with its logic visible enough that Michael can trust it and an auditor can follow it.

<!-- [INTERNAL LINK: relevant post on how PolicyForge's mapping engine works] -->

Choosing it was the easy part, on paper. Actually specifying it was messier. Before I could even finish the workflow inventory, I had to confirm which reference materials I actually had on hand, and it turned out one of them, the source I needed to fully understand what the system's mapping engine was supposed to be capable of, wasn't where I expected it to be.

Nobody tells you this, but a lot of "planning" work is really just noticing what's missing before it costs you later. My instinct was not to guess at the missing piece and quietly move forward as if I had full information. Instead, I worked from everything adjacent to it: other documents that referenced the same capabilities indirectly, cross-checking what they implied against what I actually needed to build. I deliberately excluded anything I couldn't support with real evidence rather than filling gaps with assumptions, and I flagged the gap explicitly instead of papering over it in the write-up.

That approach paid off in an unexpected way. Once I went back and directly requested the missing piece of documentation rather than continuing to reconstruct around it, it clarified something I'd had slightly wrong going in: the workflow needed three output artifacts, not two. Small correction, but the kind that's cheap to catch early and expensive to catch after you've already built around the wrong assumption. That single clarification also exposed a second small issue, a naming collision between two of the output files, which I flagged for cleanup before moving into the next phase rather than letting it quietly propagate forward.

None of this changed the underlying decision. It just meant the decision got made on more solid ground than it started on.

## The Verdict

The workflow I picked doesn't touch carriers, auditors, or anyone else's system. It's fully testable against Michael alone, which means I can iterate on it right now instead of waiting for a downstream partner to be ready or cooperative. That's not the most exciting workflow in the product, and it's not the one that actually gets Michael his renewal in hand. But it's the one every other workflow depends on structurally, the literal entry point with nothing upstream of it, and it's the one carrying the product's single riskiest, most falsifiable bet: whether an AI system can reliably map a person's plain-language answers onto a real compliance framework in a way both the person and an auditor can trust.

Building the dependency-free thing first isn't the flashy choice. It's the choice that avoids discovering, three workflows in, that your foundation was never solid enough to hold the rest.

## Your Turn

If you're sequencing your own build, what's your test for "which piece goes first": something you can validate alone, or something closest to the customer's most painful moment?
