---
subtitle: "Catching a blind spot before it broke our roadmap"
description: "How a self-audit caught a misclassified AI capability before it quietly reshaped our whole approval model."
publishedAt: "2026-07-27"
slug: "policyforge-classification-blind-spot"
image: "/posts/policyforge-classification-blind-spot.png"
image_size: "lg"
draft: false
hashtags:
  ["#CMMC", "#NIST800-171", "#CybersecurityCompliance", "#DFARS", "#Compliance"]
track: "product"
series_name: "PolicyForge"
series_slug: "policy-forge"
series_phase: "strategy"
series_position: 4
linkedin_url: "https://www.linkedin.com/posts/nick-thiru_cmmc-nist800-cybersecuritycompliance-activity-7487849673903407104-m-lv?utm_source=share&utm_medium=member_desktop&rcm=ACoAAArlnX4BlgP7Imj9jDqmmDropzzOvYwJoaY"
x_url: "https://x.com/nickthiru/status/2082090486140219462"
pinned: false
pinned_order:
newsletter_hook: "We thought we'd already answered the hardest question: what kind of AI product is this, actually? Turns out we'd answered it too fast. A routine self-check surfaced a capability we'd quietly filed under the wrong bucket, and unpicking it changed how much control we were willing to hand the AI. Here's what almost slipped through."
summary_two_sentence: "During a routine self-check, we found a capability we'd misclassified when locking down what kind of AI product PolicyForge actually is. Fixing it before moving forward changed where we drew the line between what the AI can decide and what a human has to."
build_logs:
  - "thiru-ai-labs/apps/secure-stack/policy-forge/docs/build/phase-1/step-1-2/build-log.md"
newsletter_sent: false
newsletter_date: ""
---

## The User Moment

Picture the person PolicyForge is actually built for: Michael, VP of Operations at a 30-person manufacturing subcontractor that supplies parts for a DoD prime. His company just found out it needs to demonstrate CMMC compliance to keep bidding on contracts, and the deadline is set by the contract cycle, not by him. He's technically sharp, but he's not a compliance expert, there's no in-house compliance team, and the obvious alternative, hiring a consultant, costs $5,000 to $15,000 and takes longer than the bid window allows. Get the policies wrong and the company loses eligibility to bid, or fails an assessment it can't afford to redo. Get them right, quickly and without an expert on staff, and the contract stays on the table.

That's the moment PolicyForge is supposed to live in: the point where someone like Michael would normally have to either become a compliance expert overnight or pay someone else to be one for him, and instead the product runs him through a guided interview and does the first pass itself, fast, consistent, and mapped to the framework his prime contractor or assessor actually expects.

Getting to that moment cleanly depends on answering a question I thought I'd already settled going into this stage: what kind of AI product is this? Not a chat companion you argue with. Not something that plans multi-step work and acts on its own while you're not watching. An assistant, something that does one bounded thing well and hands the result back for a human to check before it goes anywhere near an assessor, a prime contractor, or an insurer. Simple enough, on paper.

Except when I actually went back through the full list of things the product needs to do, not the summary version, the whole list, one item didn't fit the box I'd already put it in. And it wasn't a minor one.

## The Design Problem

Here's the tradeoff that makes this harder than it sounds: the category you choose for an AI product isn't a label you slap on after the fact, something you can quietly adjust later without consequence. It decides almost everything downstream. How much autonomy the AI gets before a human has to step in. What the interface looks like: does it show a draft waiting for approval, or does it just act? How you'd even measure whether the product is doing its job, since "assistant that proposes" and "system that decides" get judged by completely different standards.

Pick "the AI acts on its own" when the real shape of the work is "the AI proposes, a human confirms," and you've built the wrong approval flow, the wrong trust signals, the wrong error-handling story, the wrong everything, really, because all of those downstream decisions inherit the assumption baked into the category.

So before locking that category in for good, I did what should have been a simple, almost mechanical sanity check: walk every single capability on the list, one at a time, no skipping the ones that "obviously" fit, and ask whether it actually belonged where I'd put it. Most of it did. The pattern held for the bulk of the list without much friction. But one capability didn't. Something I'd been quietly treating as fully automatable, a thing the AI could just handle and move on from, turned out, under closer inspection, to be closer to a judgment call. The kind of thing that looks automatable right up until you sit with what happens when it's wrong.

That's the uncomfortable part of building fast: categories feel obvious right up until you go looking, deliberately, for the one thing that doesn't fit. And if you never go looking, you never find it. You just ship the assumption and discover the mismatch later, usually at a worse time than now.

## The Options

I had three real ways to handle it once I spotted the mismatch.

Option one: leave it. It was one entry on a much longer list, and reclassifying it meant re-checking everything downstream that depended on the original category assumption: the autonomy boundaries, the interface implications, the trust model, all of it. There's a real temptation, when you're mid-build and moving fast, to treat a single outlier as noise and just ship past it.

Option two: quietly patch it in isolation. Fix the one capability, leave the surrounding reasoning untouched, move on. Efficient, low-friction, and exactly the kind of fix that feels responsible while actually just deferring the harder question.

Option three: treat the mismatch as a signal, not an isolated error. Re-run the check properly, not just fix the one item, but ask what else might have slipped through the same gap, and more importantly, why it slipped through in the first place. Was it a one-off, or a symptom of how I'd been reasoning about the whole list?

The honest before-and-after here: my first pass classified that capability as something the AI should just do, full autonomy, no checkpoint. The corrected version reclassified it as something the AI proposes, with a person required to sign off before it goes further. Not because the AI is bad at the task itself, but because the cost of being wrong there is too high to hand over quietly, and the signal that it was wrong wouldn't necessarily show up until a client was already affected.

I went with option three. Not because I'm naturally thorough by disposition, but because the entire point of doing this classification step at all was to get the category right before it shaped a dozen other decisions I couldn't easily unwind later. Skipping the deeper check would have defeated the purpose of doing the check in the first place.

## The Build

The audit itself was unglamorous, almost tedious by design: cross-check every capability against the source material, one at a time, in order, resisting the urge to wave through the ones that "obviously" fit the pattern. No shortcuts, no batching similar-looking items together and assuming they'd all land the same way just because they sounded alike on first read.

I started by writing out, plainly, what "fits the assistant category" actually meant in practice, because I realized partway through that I'd never pinned that down precisely enough to test against. It meant: the AI produces something, and nothing happens with that output until a person looks at it and actively approves it. No silent forwarding. No default-on autonomy where a lack of objection counts as approval. That definition became the yardstick for every single item on the list, including the ones I was fairly confident about going in.

Most capabilities passed that test cleanly and quickly. Drafting language against a framework's requirements, mapping a described technical control to the right compliance clause, flagging where information seemed to be missing from what the user had provided: all of it produced something for a person to look at, and nothing moved forward without that look. Those were easy to confirm and move past.

The capability that failed the test was subtler than I expected, precisely because it didn't look like a decision at first glance. It looked like formatting. It looked like the AI simply organizing information that had already been reviewed, a step that felt downstream of the real judgment calls rather than a judgment call itself. But when I traced through what actually happened if that organizing step got something wrong, quietly reordering priority or emphasis in a way that shifted how a reviewer read the rest of the document, the consequence wasn't cosmetic. It could change what a person approved without them realizing the framing itself had shifted. That's not formatting. That's a decision wearing formatting's clothes.

Once I saw that, I went back through the rest of the list specifically looking for other capabilities that might be making the same disguise work: things that read as mechanical but were quietly making a judgment call underneath. I found one more borderline case that, on reflection, stayed on the automated side of the line, but only after I could clearly articulate why its downstream consequence was low-stakes and easily reversible, unlike the one that moved.

What came out of the full pass was a fuller, corrected map of exactly where a human has to step in, not a vague "review before publishing" gesture tacked onto the end of a workflow, but named checkpoints, tied to specific moments where the product hands something back and waits for a person to actively confirm it before continuing. Each checkpoint got a plain description of what a reviewer is actually being asked to confirm, not just "review this," but the specific judgment being deferred to them.

The category itself held up: this is an assistant, not something that plans and acts across multiple steps unsupervised, and not a simple yes/no classifier either. What changed wasn't the label. It was my confidence in why the label was correct. I'd actually stress-tested it against the one capability that almost broke the pattern, instead of assuming the pattern applied evenly across the whole list just because it applied to most of it.

What surprised me most was how far that one correction rippled outward. It wasn't contained to "this one thing now needs a human." It reshaped how the interface itself has to present unfinished, AI-generated content versus something a person has actually reviewed and confirmed. That distinction now needs to be visible everywhere in the product, a clear, consistent line between "the AI drafted this" and "a human signed off on this," not just at the final step where a document ships to a client, but at every intermediate point where the AI hands something back.

<!-- `[INTERNAL LINK: relevant post on why category choice shapes AI product architecture]` -->

That's the part that made the extra audit worth the time it cost. A single misclassified capability, left uncorrected, wouldn't have just been one wrong checkbox. It would have quietly undermined the trust model the entire interface depends on, without anyone noticing until a client did.

## The Verdict

Does the fix actually hold up under scrutiny? So far, yes, and here's what I'd do differently if I were starting today: run this kind of audit before you're emotionally attached to the category you've already picked, not after you've built three decisions on top of it. It's much easier to admit a capability doesn't fit the pattern when you haven't already invested effort in assuming it does. Attachment to a decision, even a small one, makes you a worse auditor of your own work.

The real lesson here wasn't about this one capability at all. It was that "locking" a product category isn't a single decision you make once and move past. It's a claim you have to go back and test against the actual details, one at a time, including the boring, unglamorous ones that don't feel like they need scrutiny.

I also checked, separately, whether any of this touched personal data in a way that would trigger stricter handling requirements. It doesn't, since everything here runs on a person's own organizational and technical setup, not on anyone else's personal information. That's a relief, but it's also exactly the kind of check I now run by habit rather than by memory, precisely because this stage reminded me how easy it is to assume something's fine without actually verifying it.

<!-- `[INTERNAL LINK: relevant post on privacy-by-design checks for AI products]` -->

I won't pretend this audit was fun to sit through. It felt like busywork right up until the exact moment it wasn't, and that gap between "this feels unnecessary" and "this just saved the whole approval model" is narrower than I'd like to admit.

## Your Turn

Have you ever caught a categorization decision that quietly shaped a dozen other choices before you noticed it was wrong? What tipped you off?
