---
subtitle: "The bottleneck wasn't data. It was judgment."
description: "How I figured out GovCon Leads Radar's real bottleneck, locked its product category, and turned goals into metrics."
publishedAt: "2026-08-14"
slug: "govcon-radar-problem-to-product-shape"
image: "/posts/govcon-radar-problem-to-product-shape.png"
image_size: "lg"
draft: false
hashtags:
  ["#GovCon", "#FederalContracting", "#SalesIntelligence", "#B2B", "#AI"]
track: "product"
series_name: "GovCon Leads Radar"
series_slug: "govcon-leads-radar"
series_phase: "strategy"
series_position: 3
linkedin_url: "https://lnkd.in/p/dKMg9qJu"
x_url: ""
pinned: false
pinned_order:
newsletter_hook: "I thought GovCon Leads Radar's problem was data access. It wasn't. The real bottleneck was buried in how sellers make judgment calls under time pressure, and finding it changed what the product actually is. Here's how I locked the product's identity and figured out how I'd know if it's actually working."
summary_two_sentence: "I went looking for a data-access problem in GovCon Leads Radar and found a judgment problem instead. That discovery decided what kind of product this is and what success actually has to look like."
build_logs:
  - "thiru-ai-labs/apps/govcon-leads-radar/docs/build/phase-1/step-1-1/build-log.md"
  - "thiru-ai-labs/apps/govcon-leads-radar/docs/build/phase-1/step-1-2/build-log.md"
  - "thiru-ai-labs/apps/govcon-leads-radar/docs/build/phase-1/step-1-3/build-log.md"
  - "01-current-state-narrative.md"
  - "02-enriched-impact-map.md"
  - "03-problem-statement.md"
  - "04-product-classification.md"
  - "05-architectural-implications.md"
  - "06-success-metrics-scorecard.md"
  - "07-measurement-strategy.md"
  - "08-assumption-register.md"
newsletter_sent: false
newsletter_date: ""
---

## The User Moment

Picture a GovCon seller at 8 a.m., coffee in hand, opening yet another browser tab to USAspending.gov. They're not short on information. Federal contract awards are public. Buyer profiles are public. The problem sitting in front of them isn't a locked door, it's a firehose.

They pull up a fresh batch of award records, and now the real work starts: which of these forty leads are actually worth a call today? Is this contract value a signal of a growing program or a one-off anomaly? Does this award pattern suggest the agency is about to issue a related RFP, or is it noise? None of that is written down anywhere. It lives in the seller's head, built from years of watching what worked and what didn't, and it has to get re-applied, lead by lead, every single morning, with no memory tool to lean on beyond their own recall.

That's the moment I kept coming back to when I sat down to figure out, for real, what GovCon Leads Radar needed to be. Not "what feature should we build first," but "what is actually costing this person the most, every day, and is it even solvable with data?"

## The Design Problem

Here's the tradeoff I didn't expect to run into: I had assumed, going in, that the core problem was access. Sellers were manually cross-referencing two different government data sources by hand, so surely the fix was "make that easier." Automate the fetch, automate the join, ship a clean list.

But when I actually mapped out what a seller does after they get that list, access wasn't the bottleneck at all. The bottleneck was interpretation. A seller can have every data point in front of them, contract value, award date, incumbent history, agency, and still spend the bulk of their time doing something no dataset does for them: deciding what it means. Is this a good lead? Is this compliance flag a dealbreaker or a footnote? Is the contact information sitting in front of them actually reliable? All four of the sharpest pain points I found traced back to the same root cause, judgment performed with no aid and no memory, not to a lack of raw information.

That reframing mattered enormously, because it meant the product I was about to design couldn't just be "faster data." If I built a slicker pipe for the same firehose, I'd be solving a problem the seller didn't actually have. The real design problem was: how do you build something that helps a person make a better call, faster, without pretending you can make the call for them? Get that framing wrong, and every downstream decision, the interface, the AI's role, the metrics I'd use to judge success, would be aimed at the wrong target.

There was a second wrinkle underneath that first one. Not every seller trusts a score the same way. Some sellers will happily lean on an AI-generated ranking. Others treat any algorithmic score as suspect until proven otherwise, and will manually re-verify everything regardless of what the system tells them. That's not a minor UX detail, it's a structural fact about the product: trust in the tool is itself something that has to be earned and measured, not assumed.

## The Options

Once I knew the bottleneck was judgment, not access, I had to answer a much sharper question: what role should the AI actually play here? I laid out the options honestly, including the ones I didn't take.

One option was to build something closer to a classifier: a fast, invisible scoring engine that ranks leads in the background and the seller just trusts the output. I considered this seriously, because tiering leads by quality does resemble classification on the surface. But the value this product delivers isn't a high-volume, never-inspected pipeline. It's the seller reviewing a signal and making their own call with it, every day. A pure classifier model would have meant designing for a use case that doesn't match how sellers actually work, and it would have quietly encouraged exactly the over-trust problem I'd just identified as a risk.

A second option was to lean toward something more autonomous, a tool that doesn't just surface a ranked lead but takes the next step: auto-exporting qualified leads, auto-flagging vendors as disqualified, maybe even auto-sending outreach. I ruled this out just as clearly. Nowhere in this workflow does the system independently execute an action on the world. Every single AI-touched moment, in the interpretation of lead quality or the framing of decision support, ends with the seller reviewing and acting. There's no multi-step planning, no persistent state carried across a chain of tool calls. Calling this an autonomous agent would have been describing a product I wasn't building.

What I locked in was a Copilot: AI that augments a human's interpretation and ranking quality inside a workflow the human still owns end to end. That's a specific, deliberate middle ground, not a compromise between the other two options, but the one that actually matches where the judgment bottleneck lives.

That decision had teeth immediately. It ruled out a conversational chat-style interface in favor of a persistent dashboard, the seller isn't having a conversation with the system, they're reviewing signals attached to leads they already understand. It ruled out real-time, sub-second inference in favor of a daily-refresh cadence, because the underlying data doesn't change fast enough to justify that complexity, and the seller's workflow is already a once-a-day ritual.

Locking the category early also surfaced a risk I hadn't fully appreciated before: a Copilot's most dangerous failure mode isn't a crash, it's silent miscalibration. If the AI's ranking quietly drifts and nobody notices because nothing visibly "breaks," a seller could act on bad signal for weeks before anyone catches it. That's a very different kind of risk than a system going down, and it changes what "monitoring" has to mean for this product.

## The Build

With the category locked, the next piece was making the business goals testable rather than aspirational. It's easy to write "grow revenue" or "prove the AI adds value" on a slide. It's much harder to state those goals in a form you could actually be wrong about.

Here's what actually happened when I forced that: every business goal became a hypothesis with a specific, falsifiable shape. Instead of "we want more revenue," the statement became something closer to: I believe that giving sellers a persistent, tiered dashboard will get them to abandon manual prospecting and pay for daily use, and I'll know that's true when subscription revenue and daily active use both hold at a specific level over time. Instead of "the AI adds value," it became: I believe that surfacing ranked leads with outcome tracking will get sellers converting meaningfully better on top-tier leads than lower-tier ones, and I'll know that's true when that gap is tracked across the majority of active accounts and holds up statistically.

Writing the goals this way forced a decision I would have otherwise avoided: not every metric can be measured the same way. A cycle-time-bounded product, where the real unit of work is a daily review cycle, needs a completion-rate and rework-rate floor, not a response-time target. A response-time target only makes sense for something interactive in real time, and this product isn't that. Applying the wrong shape of threshold to the wrong kind of capability would have produced numbers that look rigorous but measure nothing meaningful.

The one goal that genuinely gave me trouble was the growth-through-referral goal. The underlying belief was that satisfied sellers would organically tell their peers about the tool, no dedicated referral feature required. When I actually pressure-tested that assumption against everything else I knew about the product, I found real tension: the evidence suggested a dedicated referral mechanism might actually be necessary to hit the target I'd set, which directly contradicts the "organic, no intervention needed" premise the goal was built on.

The real lesson was that a contradiction like that doesn't have to kill a goal. I reframed it as a checkpoint instead of a verdict: if the organic-referral trend falls meaningfully behind pace by a defined point, that's the signal to pull a dedicated referral mechanism forward into scope, rather than treating the whole goal as invalidated on day one. Nobody tells you this, but a good goal isn't one you're certain about, it's one you've built an honest way to be wrong about, with a plan for what happens when you are.

## The Verdict

Does this solve the problem? Partially, and I mean that as a genuine milestone, not a hedge. What I have now is a locked identity for the product (a Copilot, not a classifier or an autonomous agent), a clear articulation of the actual bottleneck it exists to relieve (judgment under time pressure, not data access), and a set of business goals that are no longer just intentions, they're statements I can be proven wrong about, with defined thresholds and defined consequences if I am.

What I don't have yet is proof any of it works. These are hypotheses, not results. The MVP hasn't shipped. The trust-calibration risk I identified early, the fact that some sellers won't take an algorithmic score at face value no matter how good it is, hasn't been tested against a real, ranked dashboard in front of real users. And the referral-goal tension is exactly that: a tension, flagged and scheduled for re-examination, not resolved.

What this phase actually delivered is something less visible but arguably more important: it's the difference between building fast and building the right thing fast. If I'd skipped straight to workflow design without pinning down that the bottleneck was judgment, not access, I likely would have built a very polished pipe for the wrong problem. Locking the category before touching UX meant every subsequent design decision, dashboard over chat, daily cadence over real-time, human-owned decisions over automated ones, inherited a reason instead of a guess.

## Your Turn

If you've ever had to make a fast call using information you already had in front of you, not information you were missing, what actually slowed you down: the data itself, or the judgment call sitting on top of it?
