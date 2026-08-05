---
subtitle: "Running a boundary-table test on a full, AI-enabled workflow"
description: "The five-question boundary test worked on single AI capabilities. Here's what happened when I ran it across a connected workflow instead."
publishedAt: "2026-08-01"
slug: "boundary-table-full-workflow"
image: "/posts/boundary-table-full-workflow.png"
image_size: "lg"
draft: false
hashtags: ["#AIProducts", "#ProductStrategy", "#BuildInPublic", "#CMMC"]
track: "product"
series_name: ""
series_slug: ""
series_phase: ""
series_position:
linkedin_url: "https://lnkd.in/p/g35rcNUH"
# x_url: "https://x.com/nickthiru/status/2084351170882257155"
pinned: false
pinned_order:
newsletter_hook: "The five-question test told me what a single AI capability should be allowed to do without a human. Then I had a full, connected workflow to check, not just one action, and the answers stopped lining up the way I expected. Here's the pattern that emerged once I ran the test end to end."
summary_two_sentence: "A five-question boundary test works cleanly on one AI capability at a time, but a connected workflow raises a harder question: does the same logic hold once decisions depend on each other? Running it end to end surfaced a sharper rule than 'harder tasks need more oversight.'"
build_logs:
  - "thiru-ai-labs/apps/secure-stack/policy-forge/docs/build/phase-1/step-1-5/build-log.md"
newsletter_sent: false
newsletter_date: ""
---

## The Situation

I'd already worked out the fix for a debate I kept running into: instead of arguing whether an AI product is an "agent," a "copilot," or an "assistant," you ask a narrower question, one capability at a time. What is this specific action allowed to do without a human, and what happens if it's wrong. (See: [_The AI product label that's actually three labels!_](/writing/wrong-ai-category-question)),

That framing held up well when I checked it against isolated actions: a churn alert here, a payment retry there, one formatting step in a compliance product that almost slipped through as harmless when it wasn't. Each of those is a single, self-contained decision. Ask the five questions, get an answer, move to the next capability.

Then I had a different kind of test case that I had to deal with: not one capability, but a full workflow...seven connected steps in a single chain, where the guided-interview-to-draft-policy chain actually gets built (See: [_PolicyForge — Why the first workflow we build determines everything after_](/writing/policyforge-first-workflow-decision)). And I had to find out something the single-capability cases never forced me to ask: does the same test still work when the decisions aren't independent, when what happens at step two changes what step five is even capable of catching?

## The Stakes

This mattered for a specific reason. The whole value of the five-question method was that it replaced a stuck, abstract debate with something concrete you could apply and defend, one decision at a time. If it turned out to only work cleanly on isolated actions, and broke down or gave misleading answers once decisions were chained together, that would be a real problem, not just for this one workflow but for the method itself.

The failure mode I was worried about was specific. In a chain of decisions, an early step's mistake doesn't stay contained. If a system autonomously decides something is "good enough" at step two, and it's wrong, that error doesn't just cost you a redo at step two. It becomes an invisible false floor under every step built on top of it. So the real test wasn't "can I answer the five questions for each step." It was "does answering them independently, step by step, still produce a workflow that's safe when you look at it end to end."

## The Thinking

I went in with a hypothesis that turned out to be wrong, and the wrongness is the interesting part. My assumption was that stakes would roughly track position in the sequence: early steps, low stakes, since there's plenty of workflow left to catch a mistake; later steps, high stakes, since a bad output there ships close to the end.

That's not what the four decision points I mapped actually showed. One of the earliest checkpoints in the chain, whether someone's answers to a guided interview are complete enough to proceed, I left fully autonomous. Getting it wrong just means the system asks a few more questions before continuing, a cheap, reversible mistake no matter how early it happens. But a checkpoint sitting in the _middle_ of the chain, whether an AI-proposed mapping of someone's plain-language answers into formal compliance language is actually accurate, is one of the two points I required a human to sign off on, not because it's late, but because the knowledge needed to catch a wrong mapping doesn't exist anywhere except in that person's head. Position in the sequence predicted almost nothing. What predicted the right answer, every time, was a single question: if this step is wrong, does anyone besides the person building it have the specific, situational knowledge to notice?

Once I reframed the question that way, the workflow's other two checkpoints fell into place with the same logic instead of needing separate justification. A step verifying environment-specific technical details stayed human-owned, for the same reason as the mapping check: the accuracy of that detail lives with the person who actually configured their own systems, not with a pattern-matching model. A step handling gaps flagged in the draft stayed human-owned too, but for a slightly different reason. It's not that the knowledge is inaccessible. It's that silently accepting a gap has a cost the whole product exists to prevent, so a human has to actively accept or override it rather than let it pass by default.

## The Decision

I kept the five-question method exactly as it was for each individual decision point. What changed was adding one more thing to check once the whole chain was mapped: after answering the five questions for every step, walk the sequence forward and ask whether any autonomous decision quietly depends on a fact that a later step assumed was already verified. If an early autonomous step and a late human-gated step are both reasoning about the same underlying fact, and only the later step actually has a human checking it, that's a gap worth naming, not something to leave implicit.

In this workflow, that check held. The one place I initially worried about, whether the early interview-completion checkpoint's leniency could let bad information flow all the way to the framework-mapping step, turned out to be fine, because the mapping step doesn't trust the interview's completeness. It re-evaluates from the actual content of the answers, not from whether the earlier step approved them. The decision that came out of this: the five-question method doesn't need to change for chained workflows, but it needs a second pass, applied to the sequence as a whole, checking for silent dependencies between an autonomous step and a step downstream that assumes it was done correctly.

## The Result

Four checkpoints came out of this workflow, each with a specific, defensible reason attached, not a general rule about "important steps get humans." Two are fully autonomous because a wrong call is cheap and self-correcting. Two require a human because the knowledge to catch a mistake genuinely doesn't exist anywhere else, or because the cost of a silent miss is exactly the failure the product is built to prevent.

The sequence check didn't uncover a hidden problem this time, which is itself a useful, if less dramatic, result. It tells me the individual decisions were reasoned about correctly on their own, not just convenient in isolation. That's not something I could have confirmed by looking at any single checkpoint alone; it only shows up once you look at the chain.

## The Lesson

The single-capability version of this method taught me to ask "what happens if this is wrong." The workflow version taught me something the single-capability cases couldn't, because they didn't have a sequence to test it against: sequence position is close to useless as a predictor of where a human belongs, and the question that actually works, every time, is who else besides the system has the specific knowledge to catch a mistake here. That's a sharper, more portable version of the original method, and it's the version I'd start with next time, instead of rediscovering it partway through a workflow.

If you're applying a boundary test to something with more than one connected decision, don't stop once you've answered the questions for each step individually. Walk the chain afterward and ask whether an early autonomous call is quietly propping up a later one that assumes it was already checked.

## Your Turn

If you've had to decide where a human checkpoint belongs across a chain of connected decisions, not just one isolated action, did sequence position turn out to matter as little for you as it did here?
