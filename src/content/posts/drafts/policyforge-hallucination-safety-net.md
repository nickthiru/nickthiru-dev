---
subtitle: "Turning AI hallucinations into a manageable process, not a hidden risk"
description: "How PolicyForge catches AI compliance mistakes before they reach a submission, and routes them to the right human, every time."
publishedAt: "2026-09-07"
slug: "policyforge-hallucination-safety-net"
image: "/posts/policyforge-hallucination-safety-net.png"
image_size: "lg"
draft: false
hashtags:
  ["#CMMC", "#NIST800-171", "#CybersecurityCompliance", "#DFARS", "#Compliance"]
track: "product"
series_name: "PolicyForge"
series_slug: "policy-forge"
series_phase: "design"
series_position: 13
linkedin_url: "https://lnkd.in/p/g7rfDD-v"
x_url: ""
pinned: false
pinned_order:
newsletter_hook: "An AI that generates compliance policy is only trustworthy if you know exactly how it can be wrong. I mapped out every way mine could hallucinate, then built the tripwires, the human handoffs, and the recovery steps for each one, before a single line of that risk ever touched a real submission."
summary_two_sentence: "Building an AI that drafts compliance policy meant confronting, in detail, every way it could quietly generate something wrong. So I built a layer that catches each failure the moment it happens and hands it straight to a human who can fix it."
build_logs:
  - "thiru-ai-labs/apps/secure-stack/policy-forge/docs/build/phase-3/step-3-2/build-log.md"
newsletter_sent: false
newsletter_date: ""
---

## The User Moment

Picture the moment a small business owner opens PolicyForge, answers a handful of questions about their tech environment, and watches a draft compliance policy assemble itself in front of them, framework citations and all. It feels like magic, right up until they ask themselves the obvious question: what if it's wrong?

That question doesn't have a comfortable answer if you wave it away. A hallucinated citation in a marketing tool is embarrassing. A hallucinated citation in a document meant to satisfy a federal cybersecurity framework is a liability. So before I let myself get excited about generation speed, I forced myself to sit with a much less exciting question: exactly how, specifically, could this thing be wrong, and what happens the instant it is?

## The Design Problem

The hard part wasn't admitting that an AI-assisted tool might make mistakes. Every AI product maker knows that in the abstract. The hard part was refusing to let it stay abstract. A vague acknowledgment that "the AI could hallucinate" doesn't protect anyone. What protects someone is knowing, concretely, which specific outputs are at risk, in which specific moments, and what happens next when one of those risks materializes.

I also had a second constraint sitting on top of the first: PolicyForge already has a firm boundary on what the AI is allowed to do without a human checking it. That boundary exists for good reason, and I wasn't willing to loosen it just to make a safety layer feel more sophisticated. So the challenge became: build a safety net that operates entirely inside a boundary that was already drawn, rather than expanding the AI's authority in the name of "catching problems."

There was also a quieter problem underneath both of those: not every failure looks the same at the moment it happens. Some are obvious the second they're generated. Others only reveal themselves later, after something that looked fine on day one quietly goes stale. I didn't want a safety net that only worked for the loud, immediate failures and missed the slow ones.

## The Options

The first option I seriously considered, and rejected, was building one generic hallucination guardrail: a single confidence-scoring layer that flagged anything the model seemed unsure about. It's the industry-default move, and it would have been faster to build. I rejected it because it treats every kind of mistake the same way, when the actual risks in a compliance tool are not the same at all. A wrong citation and a fabricated technical detail about someone's server environment fail differently, get caught differently, and need to be fixed differently. A single generic flag would have either been too noisy to act on, or too coarse to catch the specific failures that actually mattered here.

The second option was to let the guardrails themselves make final calls, auto-correcting low-confidence output before a human ever saw it. I rejected this one too, and for a reason that mattered more the longer I thought about it: a guardrail that quietly "fixes" something on its own is really just a second AI decision hiding behind the first one. If I don't fully trust the primary output, I have even less reason to trust an automatic patch applied to it without a human's eyes on the correction.

The third option I looked at, and also set aside, was routing everything through a third-party content-moderation API rather than building detection logic myself. It's a reasonable shortcut on paper, and for generic toxicity or policy-violation screening I'd probably reach for exactly that. But it fell apart here for two reasons. First, latency: a compliance draft needs to feel responsive while someone is actively reviewing it, and adding an external round-trip for every generated section wasn't something I was willing to trade away. Second, and more important, opacity: a third-party service can tell you "flagged" or "not flagged," but it can't tell you why in terms that map onto my specific failure types, a bad citation versus a fabricated environment detail look identical to a generic classifier. I needed detection logic that understood the shape of my own product's mistakes, not someone else's definition of a risky output.

The fourth option, and the one I'm actually going with, was to catalog failure modes individually, one at a time, specific to what this product actually does, and pair each one with its own detection signal, its own named escalation path, and its own recovery mechanism. Slower to design, but far more defensible to explain, and far easier to reason about when something actually goes wrong.

## The Build

I started by naming the ways this system could actually fail, given what it's specifically allowed to do. Several types stood out as the ones a user could plausibly hit in real use. One is a wrong or outdated citation slipping into a generated policy mapping. Another is advisory language that sounds more certain than the underlying confidence actually supports, tempting someone to skip a validation step they shouldn't skip. A third is generic filler content, used to bridge a gap in someone's answers, accidentally getting treated as verified fact instead of a placeholder that still needs review. A fourth is a fabricated technical detail about someone's own technological environment that was never actually confirmed by the person using the tool.

A fifth type turned out to be sneakier than any of those, and it's worth calling out on its own: citation drift on regeneration. A citation can be perfectly correct the day it's generated, and then quietly go stale the moment someone regenerates part of a draft, if the underlying framework text or clause numbering shifted in between and the reference wasn't re-validated against the current version. It's not a fabrication in the traditional sense, nothing was invented, but it's just as dangerous, because it looks exactly like a trustworthy, previously-verified citation right up until someone relies on it. That failure mode is why I couldn't treat citation-checking as a one-time gate at generation. It had to be a check that re-runs every time content is touched again, not just when it's first created.

Each of these failure types got its own tripwire, tuned to catch that exact problem and nothing else. A citation-integrity check verifies every generated reference against the current version of the framework and the current draft, and critically, re-runs on every regeneration, not just the initial pass, to catch drift. A confidence-labeling rule refuses to let an advisory statement render as a bare claim if it falls below a set certainty threshold, it has to carry a visible "advisory, not a guarantee" flag instead. A template lock prevents any unreviewed filler content from ever reaching a submission, full stop, no override. And an unverified-detail flag catches any environment-specific claim that wasn't traceable back to something the user actually told the system.

Here's the tradeoff I had to accept: most of these tripwires fire in real time, the instant the problem is generated or someone tries to submit it. But one failure type behaves differently. A slow, systemic decline in mapping quality, the kind that shows up gradually as a rising rework rate rather than as a single bad output, can't be caught in the moment. It only becomes visible once you're tracking a rate across a cycle. So that one gets measured continuously and escalates automatically the moment it crosses roughly ten percent, treated as an operational incident rather than a single flagged output.

None of these tripwires were built to make decisions on their own. Every single one routes to a specific human, at a specific point that already existed in how PolicyForge approves things. A citation mismatch on a mapping still pending review means that mapping simply cannot move to accepted status until my domain reviewer re-checks it, corrected or not. A mislabeled confidence signal means the corrected framing has to be visible before that step proceeds. A template-lock violation is a hard stop; there's no fallback approver, no path around it. If my domain reviewer isn't available to clear one of these, the system doesn't quietly default to "approved." It just stays blocked. That was a deliberate choice: an AI compliance tool that defaults to "approved" when nobody's watching isn't a safety net at all.

The one guardrail I built differently from the rest is the one watching for personal data about someone outside the organization showing up in generated text. That risk gets treated at a higher severity than any of the others, and it routes to a dedicated privacy-focused reviewer rather than the same person handling citation or template issues. Even then, that reviewer doesn't get to see the raw exposed content by default, only a sanitized signal that something was caught, with a deliberate extra step required to look deeper if it's actually necessary.

Recovery had to match that same logic. For most of these failures, recovery is boring on purpose: regenerate the flawed output, keep the earlier version around but clearly marked as superseded, done. Nothing destructive, nothing that erases the trail. Personal-data exposure breaks that pattern entirely. There, the recovery goal isn't preservation, it's deletion of the exposed content itself, because keeping a backup "just in case" would just recreate the exact risk the recovery is supposed to close. And if that exposure crosses into an actual unauthorized disclosure, there's a strict notification clock that starts ticking the moment that's confirmed.

## The Verdict

Does this actually solve the trust problem I started with? Honestly, only partly, and I think it's worth being straight about that. What I'm building is a containment-and-recovery system, not a prevention system. I'm not claiming PolicyForge won't hallucinate. I'm claiming that when it does, inside the ways I've already mapped, it gets caught immediately, it goes to a specific human who can act on it, and it gets reversed cleanly before it reaches anything that matters. That's a meaningfully smaller claim than "the AI won't be wrong," and I think it's also a more honest one.

What I'd do if I were starting today: build the failure catalog first, before writing a single line of guardrail logic, exactly the way I ended up doing it here almost by necessity. It's tempting to start with the guardrail and work backward into "what is this actually protecting against," but that order invites generic, one-size-fits-all protections. Naming the specific failure first is what made every downstream decision, detection, escalation, recovery, obviously correct rather than debatable.

The other thing I'd do differently, in hindsight, is treat "regeneration" as its own risk category from day one instead of discovering it midway through, the way citation drift forced me to. It's easy to design detection for the moment content is first created and forget that almost everything in this product gets touched again, edited, regenerated, re-approved. Any safety architecture for a tool like this has to assume content has a second life, not just a first one, or it will miss exactly the kind of quiet failure that doesn't announce itself.

The real lesson was that a safety architecture for an AI product isn't really about the AI at all. It's about making sure every failure has an owner, a moment it gets caught, and a way back. Get those three things right for each specific failure, and the AI's mistakes stop being a hidden liability and start being just another operational process, one that happens to have a human's name attached to every step of it.

## Your Turn

If you're building anything that generates output a user might act on without double-checking it, have you actually written down the specific ways it could be wrong, one at a time, or is your safety plan still living as one general "the AI might make mistakes" disclaimer?
