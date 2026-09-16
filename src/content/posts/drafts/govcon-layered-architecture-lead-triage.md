---
subtitle: "Why a layered architecture keeps leads from vanishing"
description: "A layered architecture sounds like diagram work. I built one so a broken component costs you a feature, never a lead."
publishedAt: "2026-09-16"
slug: "govcon-layered-architecture-lead-triage"
image: "/posts/govcon-layered-architecture-lead-triage.png"
image_size: "lg"
draft: false
hashtags:
  ["#GovCon", "#FederalContracting", "#SalesIntelligence", "#B2B", "#AI"]
track: "product"
series_name: "GovCon Leads Radar"
series_slug: "govcon-leads-radar"
series_phase: "design"
series_position: 10
linkedin_url: "https://lnkd.in/p/gpYgSzT8"
x_url: ""
pinned: false
pinned_order:
newsletter_hook: "A capture manager opens the dashboard at 7:40 a.m. The overnight data pull failed. Does she see an error page, yesterday's ranked list with a date stamp, or nothing at all? That single question forced me to stop drawing boxes and start deciding what each part of the system is allowed to break. Here is how I split the pipeline into four layers so a failure costs a feature, never a lead."
summary_two_sentence: "When one component of a lead-triage pipeline fails, the honest risk isn't a crash, it's a lead quietly disappearing. I split the system into four layers with defined fallbacks so every failure has a known, labeled consequence instead of a silent one."
build_logs:
  - "thiru-ai-labs/apps/govcon-leads-radar/docs/build/phase-4/step-4-1/build-log.md"
  - "thiru-ai-labs/apps/govcon-leads-radar/docs/build/phase-4/step-4-2/build-log.md"
---

## The User Moment

It's 7:40 in the morning and a capture manager opens the dashboard with a cup of coffee she hasn't touched yet. She has maybe twenty minutes before her first call. Overnight, the data pull from the federal award feeds failed.

What does she see?

That was the question I could not answer cleanly, and it bothered me more than any architecture diagram ever has. There were three plausible answers. An error page. An empty list. Or yesterday's ranked leads, clearly stamped with the date the data came from. Those are not three cosmetic variations of the same screen. They are three different products, and only one of them respects the fact that she has twenty minutes.

Until I could answer that question for every part of the system, I did not have an architecture. Instead, I had a drawing.

Here is what the product promises: raw federal contracting data goes in, and a ranked, explained shortlist of pursuable leads comes out, with a human making every real decision. The seller's whole reason for using it is that she does not have to hold the pipeline in her head.

Which means the failure she fears is not a crash. A crash is loud and she knows to distrust the screen. The failure she fears is the quiet one. A lead that should have been at the top of the list is missing, and nothing on the screen tells her that anything went wrong. She acts on a list that looks complete and isn't.

I keep coming back to a phrase that has shaped almost every decision in this product: the system proposes, the human decides. If the human is deciding, the system owes her an honest picture of what it knows and how stale that knowledge is. Silence is the one thing it is never allowed to offer.

So the design question stopped being "how do the components connect" and became "when this component breaks, what exactly does she lose, and does she know she lost it?"

## The Design Problem

The pipeline does four genuinely different kinds of work, and I had been treating them as one long process because that is how the data physically moves.

The first kind of work is fetching and cleaning. Pull award data on a daily cycle, figure out which records refer to the same real-world entity, and normalize everything into one shape.

The second is deterministic scoring. Compute the signals, assign a tier. No model involvement, no judgment, just arithmetic and rules.

The third is language. Explain why a lead sits in the tier it does, narrate what a compliance flag actually means, frame how confident the system is.

The fourth is decision capture. A human toggles a compliance flag, marks a lead as pursue or no-pursue, and that decision gets written to a trail that cannot be edited afterward.

Four kinds of work with four completely different failure profiles. Cleaning can go stale. Scoring can be miscalibrated. Language can be wrong, or worse, confidently wrong. Decision capture can lose a record, which is the only one of the four that is unrecoverable.

The problem with treating them as one process is that any failure anywhere becomes a failure everywhere. The model gateway hiccups and suddenly there is no ranked list, even though ranking never needed a model in the first place. That is not a resilience problem. That is a boundary problem, and you cannot patch your way out of a boundary problem.

So the real design problem was this: where do I draw the lines so that each line is also a firewall?

## The Options

**Option one: one pipeline, retry everything.** Keep the sequence as a single flow and wrap it in aggressive retries. Attractive because it is almost no work. Rejected because retries only help when the failure is transient. If the upstream feed is down for six hours, retrying does not produce data, it produces a longer wait ending in the same error page. And it gives me exactly one lever, on or off, when the seller needs graded honesty.

**Option two: full microservices with independent state.** Split every capability into its own service with its own store. Genuinely fault-isolating. Rejected because the cost lands entirely on me, a solo builder, while the benefit is theoretical at this stage. There is no traffic to speak of, no team to divide ownership across, and the coordination overhead would eat the schedule that the product actually needs to hit.

**Option three: event-driven, everything asynchronous.** Every stage emits events, every stage subscribes. Elegant on paper. Rejected because it makes the system harder to reason about at precisely the moment I most need to reason about it, and because it optimizes for a real-time interaction model this product does not have. The system is batch-shaped. The binding requirement is that the whole daily cycle finishes before the seller's working day starts, not that any single request returns in milliseconds.

**Option four: logical layers with explicit contracts.** One deployable system, but internally divided into layers, each with a defined input shape, a defined output shape, and a defined fallback. No new infrastructure, but real isolation. This is what I chose.

There was a fifth option I considered and rejected more quietly, and I think it is the most instructive one: **let the model do more of the work.** Have the language layer also compute or adjust the tier, since it already has all the context. It would have removed a whole component. I rejected it because it collapses the one boundary the product cannot afford to lose. Deterministic ranking is what makes the output explainable and reproducible. Handing that to a model would trade a system I can audit for a system I can only observe.

## The Build

What I designed internally is a four-layer spine with a fifth logical layer sitting downstream of it, watching.

Ingestion and discovery handles the daily fetch, entity matching, and normalization. Processing computes the signals and assigns tiers using a rule table rather than a weighted score. Reasoning generates the explanatory angles and routes between models. Approval and execution captures the human judgment and writes the audit trail. Observability and feedback consumes signals from all of the above and never writes back into them.

The part that took the longest was not the list of layers. It was writing down what each layer is forbidden from doing.

Normalization strips raw named-individual fields before the record moves downstream, so scoring only ever sees derived fields. Tier assignment is deterministic, and the language layer narrates the assigned tier without ever recomputing it, which is enforced rather than merely intended. The language layer's output is explicitly labeled a draft judgment, never a decision. And the monitoring layer is a read-only consumer of decisions, which is how the audit trail stays immutable.

Those four prohibitions do more work than the four definitions. A layer you can describe is documentation. A layer with a boundary it cannot cross is architecture.

Between the layers, the handoffs are explicit shapes rather than shared objects. A normalized lead record moves into scoring. The same record plus a tier label and attribution metadata moves into generation. Draft artifacts move into the approval surface only after passing a quality gate. Audit events and failure signals flow out to monitoring. Nothing reaches through a layer to grab what it needs from two layers back, and that constraint is what makes the isolation real instead of aspirational.

<!-- [ALT: Simple four-tier diagram showing ingestion, scoring, reasoning, and human approval as stacked bands, with a monitoring band alongside reading from all four] -->

### What breaks, and what it costs

Then I went back to the 7:40 a.m. question and answered it for every layer.

If the daily data pull fails, the dashboard serves the last successfully computed tier set with a visible "data as of" notice, and the downstream layers keep working on last-good data. No cascade. She sees stale but labeled data instead of an error state, which is the difference between a product with a bad morning and a product she stops trusting.

If the embedding call fails during entity matching, matching degrades to exact and fuzzy string comparison, and the semantic support for compliance-severity retrieval switches off for that cycle only. Her disqualification decision is unaffected, because that decision was always hers.

If generation fails or gets rejected by a guardrail, the system falls back to deterministic default framing, and the approval gate keeps functioning without any AI narrative at all. She sees the raw signal data rather than no data. The freshness notice specifically is string-templated rather than model-generated, which means the one message that tells her how old the data is cannot be taken down by a model outage.

And if the monitoring layer itself goes down, the raw signals stay in the source logs and incidents can still be created manually. Everything upstream continues.

Recovery follows the same logic. Ingestion and scoring self-heal on the next successful cycle. Generation has no corrupted state to recover from, because drafts are transient. And recovering from a bad human decision is a new decision record rather than an edit, because the trail is immutable by design.

### The gap I did not paper over

One layer has no answer yet. If the audit write fails, there is no specified fallback or dead-letter behavior. I found no defined handling for it anywhere in the source material, and it is now carried as an unresolved item that has to be closed before engineering starts.

I want to be plain about why that one matters most. Every other failure costs a feature for a cycle. This one could cost a record of a human decision, in the one part of the system whose entire job is to prove who decided what. A stale list is annoying. A missing decision is a hole in the accountability story that the product is built on.

Writing it down as a gap rather than inventing a plausible mechanism is, I think, the more useful move. Fake resolution is worse than an open question, because an open question still gets fixed.

### The unglamorous supporting decisions

A few choices around the layers turned out to matter more than expected.

Routing between components is configurable rather than hardcoded, which means changing where work goes does not mean rewriting the flow. State is deliberately split by whether it contains personal data, so the pieces with retention obligations are separated from the pieces without them.

Components were designed to be swapped rather than rewritten. The model provider sits behind a gateway abstraction, so changing providers means changing routing configuration rather than application code. The ranking rules were built for periodic threshold recalibration without redesigning the algorithm. The tradeoff there is real: loose coupling costs some latency, and I accepted that cost in exchange for auditability.

Deployment stays on managed cloud services with no self-hosted infrastructure, and scaling is horizontal via platform auto-scaling, because compute is fully abstracted away at this size. The genuinely interesting insight was that the trigger that matters is not request concurrency, it is batch-cycle completion, since the latency contract is bounded by cycle time rather than per-request speed. Caching follows the same privacy logic as everything else: tier-rationale prompts are cacheable, compliance and confidence outputs are not, because a cache is retention by another name.

On the observability side, logging covers batch and tier-computation status, generation outcomes and guardrail rejections and fallback triggers, the full audit stream, and the failure signals that feed detection. Incidents run through error tracking, incident management, and chat coordination, on a detect, create, triage, communicate, mitigate, resolve, review lifecycle, with error context tags scrubbed of personal information before they leave the system. Severity classification is not left to judgment in the moment: systematic errors and any personal-data exposure escalate automatically.

One accepted risk deserves naming, since a layered design does not make it disappear. The upstream federal data feeds have no substitute. If they change or go dark, the ingestion layer's fallback buys days, not months. That is a dependency I am carrying with open eyes rather than one I have solved.

<!-- [INTERNAL LINK: relevant post on designing an AI that proposes rather than decides]   -->
<!-- [INTERNAL LINK: relevant post on cost and latency budgets for AI features]   -->
<!-- [INTERNAL LINK: relevant post on knowing when the AI is wrong] -->

## The Verdict

Does it solve the problem? For four of the five failure modes I care about, yes, and in a specific way I can defend: the seller loses a feature, temporarily, and she is told about it. The ranked list survives a model outage. The tiers survive a data outage with a date stamp on them. Her decision authority survives all of it, because it never depended on the automated parts working.

For the fifth, no. The audit-write gap is open, and I would rather ship this article with the gap named than with it quietly smoothed over.

What surprised me: making the monitoring layer explicit rather than implicit changed how much I trusted the rest of the design. When failure detection is just "we'll add logging," it is a hope. When it has defined inputs, a classification rule, and defined outputs, it becomes something the other layers can rely on. That shift came out of noticing that a piece of the design existed only as prose in my notes, with nothing structured enough for later work to build on. Prose is where good intentions go to be forgotten.

What I would do differently: I would have started from the failure table instead of the layer table. I built the list of layers first and then asked what happens when each one breaks. Doing it in reverse would have been faster, because the failure modes are what actually determine where the boundaries belong. The layers are the output of that reasoning, not the input to it.

The other thing I would change is the order in which I checked for gaps. I found the audit-write hole late, while filling in a table. If I had run every layer through the same "what does the user see at 7:40 a.m." question from the beginning, that hole would have shown up on day one, because the answer for that layer was never anything but a shrug.

There is a broader lesson I am taking forward. A layered architecture is often presented as a tidiness exercise, a way of making a diagram look organized. It isn't. Layers are only worth the effort if each boundary is a place where failure stops. Every boundary I drew here had to pay for itself by containing something specific. The ones that could not justify themselves that way, I did not draw.

The system now has a shape I can build against, and more importantly, a shape I can explain to the person using it. When something goes wrong, she gets a smaller product for a while, with a note explaining why. She does not get a confident, incomplete list.

## Your Turn

When a component in your pipeline fails, does your user see an honest, degraded version of your product, or a version that still looks complete? I am curious which failure in your own system you have not yet answered that question for.
