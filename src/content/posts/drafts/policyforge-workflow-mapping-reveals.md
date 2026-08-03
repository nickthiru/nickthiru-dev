---
subtitle: "What mapping our first workflow actually revealed"
description: "Mapping PolicyForge's first workflow turned an abstract bet on AI-human boundaries into four concrete decisions."
publishedAt: "2026-08-01"
slug: "policyforge-workflow-mapping-reveals"
image: "/posts/policyforge-workflow-mapping-reveals.png"
image_size: "lg"
draft: true
hashtags:
  ["#CMMC", "#NIST800-171", "#CybersecurityCompliance", "#DFARS", "#Compliance"]
track: "product"
series_name: "PolicyForge"
series_slug: "policy-forge"
series_phase: "strategy"
series_position: 7
linkedin_url: ""
x_url: ""
pinned: false
pinned_order:
newsletter_hook: "I picked the one workflow I could test alone, and called it the product's riskiest bet. Then I actually mapped it step by step, and found out exactly where that bet could break. Here's what four hidden failure points taught me about where AI should stop and a human should start."
summary_two_sentence: "After choosing which workflow to build first, I mapped it step by step and found four exact places where the AI-to-human handoff could fail. Each one became a designed checkpoint, not an afterthought."
build_logs:
  - "thiru-ai-labs/apps/secure-stack/policy-forge/docs/build/phase-1/step-1-5/build-log.md"
newsletter_sent: false
newsletter_date: ""
---

## The User Moment

Last time, I told you which workflow I was building first for PolicyForge and why: the guided-interview-to-draft-policy chain, because it was the one piece of the product I could test without waiting on anyone else. (See: [_PolicyForge — Why the first workflow we build determines everything after_](/posts/policyforge-first-workflow-decision.md)).

That decision felt clean on paper. Michael answers questions about his environment, the system reasons its way to a compliance-mapped draft, done. But "build the workflow that tests the riskiest bet" is a sentence you can write in an afternoon. Actually mapping that workflow, step by step, with every decision point named and every AI/human boundary drawn in ink instead of implied, is a different kind of work. It's the difference between saying "I trust the process" and being able to point to exactly where trust has to be earned.

So that's what came next: not a new decision, but the first real test of the one I'd already made.

## The Design Problem

Here's the tradeoff I didn't fully appreciate until I was in the middle of it. It's easy to say "AI handles the parts that don't need judgment, and a human handles the parts that do." It's much harder to say, for a specific seven-step workflow, exactly where that line falls, and to defend that placement when someone asks why.

The workflow itself is straightforward to describe: a deadline notice arrives, Michael answers a guided interview about his organization, the system structures those answers and maps them to compliance-framework language, gaps get flagged, stack-specific details get verified, and a draft package comes out the other end ready for his review. Seven steps, one continuous chain, no external dependency. Exactly what I signed up to build.

What's not straightforward is that almost every one of those steps has a moment where the system has to decide something on its own, and getting that decision wrong in either direction has a real cost. Let the AI decide too much, and you've built something Michael can't actually trust with a compliance filing. Require human sign-off on everything, and you haven't built a product, you've built a very elaborate form that still needs a consultant to finish it.

I couldn't answer this in the abstract. I had to walk the actual workflow, one step at a time, and ask at each point: what judgment is required here, and whose judgment is it?

## The Options

At each decision point in the workflow, there were really only two options on the table: let the system decide autonomously, or require Michael's explicit sign-off before moving forward. The interesting part wasn't picking one of those two options in general. It was that the right answer changed depending on the actual step, and the reasoning behind each choice turned out to be more specific than "AI does easy things, humans do hard things."

Take the very first checkpoint: is Michael's interview response complete enough to generate a policy from? I let the system decide this one autonomously, using a completion threshold, because the output at that stage is still a draft. If it guesses wrong and asks for more information than strictly necessary, the cost is a few extra questions, not a compliance failure. Low stakes, reversible, so autonomy made sense here.

Compare that to a checkpoint much further along: does the framework mapping actually match Michael's real environment? Here I did not let the system decide alone, even though it does the heavy lifting of proposing the mapping and showing its reasoning. The reason isn't that the task is harder computationally. It's that the knowledge required to catch a wrong mapping, real familiarity with your own identity provider configuration, your own access controls, the messy specifics of what you actually run, lives entirely with Michael. No amount of pattern-matching gives the system access to that. So the system proposes, and a human has to be the one who can actually catch it being wrong.

That same question, "who can actually catch this being wrong," turned out to be the real dividing line across the whole workflow, more useful than any general rule about task difficulty.

## The Build

By the end of walking the workflow, I'd found four points where this question mattered enough to become an explicit, designed checkpoint rather than something left implicit and hoped for.

Two of them are worth describing directly, because they show the range. One is the completeness checkpoint I mentioned: the system decides on its own whether Michael's answers are sufficient to proceed, because a wrong call there is cheap and easy to correct. The other is close to its opposite: a point deep in the workflow where the system has flagged a possible gap in coverage, and Michael has to either fill it in or explicitly override the flag before moving forward. I didn't let that one default to autonomous, because a silently accepted gap in a compliance document isn't a minor inconvenience, it's the exact failure mode the whole product exists to prevent.

What surprised me, honestly, was how uneven the reasoning turned out to be once I looked closely. I went in expecting a fairly clean split, roughly "early steps are low-stakes, later steps are high-stakes." That's not actually what happened. The interview-completion checkpoint is early and autonomous, sure. But so is a later step where I let the system's judgment stand on its own, because even though it comes late in the flow, the downside of it being wrong is still small and easy to catch downstream. Meanwhile, one of the highest-stakes checkpoints, the framework-mapping accuracy check, sits in the middle of the workflow, not at the end. Sequence turned out to be a weak predictor. What actually predicted where a human needed to be in the loop was whether the knowledge to catch a mistake existed anywhere outside that one person's head.

That's the real lesson was buried in what looked, going in, like a purely mechanical mapping exercise: something I'd initially logged as "no struggle, no breakthrough, just execution" turned out to contain the single most useful insight from the whole build so far.

## The Verdict

Does the mapped workflow actually solve the problem I set out to solve? Mostly, yes, and I mean that as a genuine assessment, not a hedge. I now have four named, defensible checkpoints instead of a vague sense that "a human should probably look at this somewhere." Each one has a reason attached to it that I can explain to Michael, to an auditor, or to myself six months from now when I've forgotten the original logic.

What I don't have yet is proof that these four checkpoints are the right four, or that I've drawn each line in exactly the right place. That's not something a workflow map can tell you. It's something you find out when a real user hits the boundary and either agrees it makes sense or immediately routes around it in a way you didn't anticipate. The map gives me a testable hypothesis about where AI judgment should stop. It doesn't give me certainty.

What I'd do if I were starting today, knowing what I know now, is skip straight to asking "who can catch this being wrong" at every decision point, instead of starting from "is this task easy or hard for AI to do." The second question is the one that's tempting to ask first, and it's the one that would have led me to a much worse map.

The workflow is mapped. The gates are placed. Now it has to survive contact with an actual guided interview and an actual auditor's expectations, and that's a different kind of test than the one I just ran.

## Your Turn

When you've had to decide where a human checkpoint belongs in an automated process, did you find yourself sorting by how hard the task was, or by who actually held the knowledge to catch a mistake? Which one turned out to matter more once you tested it?
