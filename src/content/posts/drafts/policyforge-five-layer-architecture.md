---
subtitle: "Inside the five-layer architecture"
description: "How PolicyForge splits ingestion, ranking, generation, approval, and observability into five layers, and why that split keeps failures readable."
publishedAt: "2026-09-08"
slug: "policyforge-five-layer-architecture"
image: "/posts/policyforge-five-layer-architecture.png"
image_size: "lg"
draft: false
hashtags:
  ["#CMMC", "#NIST800-171", "#CybersecurityCompliance", "#DFARS", "#Compliance"]
track: "product"
series_name: "PolicyForge"
series_slug: "policy-forge"
series_phase: "design"
series_position: 15
linkedin_url: ""
x_url: ""
pinned: false
pinned_order:
newsletter_hook: "A policy draft came back wrong, and the only honest answer to why was a shrug. That shrug is what the five-layer architecture exists to kill. Splitting retrieval, ranking, generation, approval, and observability into separate layers costs a little speed, but it buys something better: when PolicyForge fails, the failure has an address. Here is how the split works, and what it cost."
summary_two_sentence: "When a compliance draft comes back wrong, the useless answer is that the AI got it wrong, because it hides which part of the system actually broke. PolicyForge splits the pipeline into five layers so every failure has an owner and a recovery path, which matters more than raw speed for a product people sign their name to."
build_logs:
  - "thiru-ai-labs/apps/secure-stack/policy-forge/docs/build/phase-4/step-4-1/build-log.md"
newsletter_sent: false
newsletter_date: ""
---

## The User Moment

Picture a security lead with an insurance carrier questionnaire open on one screen and a generated policy draft on the other. One control mapping is wrong. Not catastrophically wrong, just confidently wrong in the way that gets caught in an audit six months later. She asks the only question that matters: where did that come from?

If the answer is "the AI generated it," the product has already failed her. Not because the mapping was wrong (wrong mappings are survivable), but because nothing in the system can tell her which part of the pipeline produced the error. Was the wrong framework text pulled in? Was the right text pulled in and then prioritized badly? Was everything correct going in and the reasoning step misjudged it? Did the reasoning step get it right and the review screen mislabel it?

Those are four different problems with four different fixes. A system that answers all four with the same shrug is a system nobody should sign their name to. And in compliance, signing your name is the entire job.

That question is what the architecture had to answer before anything got built on top of it.

## The Design Problem

Compliance software has an unusual property: the output is not the product... the defensibility of the output is the product. A policy document that is 95% correct and fully traceable is more valuable than one that is 99% correct and opaque, because the traceable one can be defended in a room with an auditor and the opaque one cannot.

That inverts the normal instinct. The normal instinct is to fuse steps together for speed and coherence: retrieve, rank, and generate in one pass, with one prompt doing the heavy lifting. Fewer moving parts, fewer handoffs, lower latency. It is a genuinely good instinct for most products.

But it is the wrong instinct here, and the reason is diagnostic, not aesthetic. A single fused step produces a single failure mode called "it was wrong." Separate steps produce distinguishable failure modes. The whole point of drawing boundaries between extraction, reasoning, and presentation is that a framework-mapping judgment error is a different animal from a context-assembly error, which is a different animal again from a labeling error on the review screen, and each one needs its own recovery path.

So the design problem was not "what is the fastest pipeline." It was "what is the smallest set of boundaries that makes every plausible failure attributable to exactly one owner."

There was a second constraint sitting underneath it. Everything in the stack had to stay swappable. Early-stage products make infrastructure bets with incomplete information, and the honest planning assumption is that some of those bets will be wrong. An architecture that cannot survive replacing its own retrieval strategy or its own model provider is an architecture that quietly converts a vendor decision into a rewrite.

(See: _[PolicyForge — Inside the MVP Technical Stack](/writing/policyforge-locking-the-foundation)_)

## The Options

**Option one: one intelligent pipeline.** Take the interview answers, hand them to a capable model along with the relevant framework material, and let it retrieve, prioritize, and draft in one reasoning pass. Fastest to build. Fewest schemas to maintain. Genuinely competitive output quality.

I rejected this option on diagnosability. When this pipeline is wrong, there is no seam to inspect. You cannot tell a retrieval miss from a judgment miss, which means you cannot fix the class of problem, only the instance. For a product whose value proposition is defensibility, that is a foundational defect, not a tuning issue.

**Option two: split retrieval from generation, keep prioritization inside the reasoning step.** This is a halfway house. Assemble context deliberately, then let the reasoning step decide both what matters most and how to draft it.

This option was rejected, and this happened to be the closest call of the five. Folding prioritization into reasoning saves a schema and a handoff. But it makes the choice of drafting approach exploratory rather than explainable. Keeping the prioritization signals separate lets the drafting approach be selected deterministically from those signals, which preserves a single auditable reasoning chain instead of a reasoning chain plus an invisible judgment about what deserved attention. Prioritization owns signals. Reasoning owns the drafting chain. Neither borrows from the other.

**Option three: one giant templated prompt covering every drafting variation.** Mapping, gap-filling, and precedent-informed drafting all handled by conditional branches inside a single prompt.

This was also rejected because auditability degrades with every branch added. The separate approaches were kept as separate prompts specifically so each one stays independently auditable, and that decision was made with eyes open about the cost: more prompts to maintain, more surface to keep consistent.

**Option four: microservices per layer, with independent deployment.** Full physical separation. Maximum isolation.

Rejected as premature. The requirement was independent swappability, not independent deployment. Logical layers with stable contracts deliver the swappability without paying distributed-systems tax at a stage where the team is small (just me at moment) and the traffic is not the constraint.

**Option five, selected: five logical layers with fixed contracts at each boundary.** Ingestion and retrieval assembles context. Processing and ranking prioritizes. Reasoning and generation drafts. Approval blocks on human review. Observability captures, classifies, and routes signals.

With this option, each layer is independently replaceable as long as its contract holds. A different retrieval strategy or vector store can go in without touching the other four, provided the structured context object it hands forward keeps its shape. A different ranking algorithm can go in provided the prioritization signals it emits keep their shape. A different model or orchestration framework can go in provided it accepts context plus signals and emits a draft with its reasoning chain and confidence flags. A different approval workflow can go in provided the four permitted reviewer actions and the audit event shape survive. A different monitoring platform can go in provided the signal ingestion shape survives.

That is the whole trick, and it is not a clever trick. The contracts are the architecture. The layers are just what the contracts imply.

## The Build

Five things taken extra note of once the layers were actually specified.

**Observability is a layer, not a feature.** The instinct is to treat monitoring as instrumentation sprinkled across a system. Specifying it as its own layer, with its own responsibility, inputs, processing, outputs, and its own failure behavior, changed how detection got designed. Every layer emits error and guardrail signals into a shared failure-detection log where they get severity-classified and routed. That only works as a contract, and contracts only exist between named layers.

**The detection layer needs a story for its own failure.** This is the question that separates real observability design from an aspiration. If the thing that notices problems stops working, what happens? The answer landed on containment: detection failing does not stop any other layer from operating, raw signals keep landing in logs, and creating an incident manually stays available. Degraded, visible, and recoverable beats a monitoring system whose outage looks identical to a healthy quiet period.

**Routing wants to be boring exactly where judgment is expensive.** Coordination between layers ended up sequential first, with hard dependencies enforced so a sufficiency check cannot be skipped, and then deterministic once the prioritization signals exist. The drafting approach for each item follows from the signals rather than from a fresh judgment call. Boring routing is a feature when the reasoning chain has to be explainable afterward.

**State had to be sorted before failure handling made sense.** Some state persists, because an audit trail that evaporates is not an audit trail. Some state is deliberately transient, because assembled run context containing personal data has no business outliving the run that needed it. Failure handling reads completely differently depending on which side of that line the data sits on, so the classification had to come first.

**Fallbacks are mostly about refusing to guess.** Two rows from the fault-tolerance work taught me more than the rest combined. When the model gateway is systematically unavailable, the system surfaces a blocking "generation temporarily unavailable" state rather than silently stalling or substituting a lower-confidence draft. And no approval gate has a default-approved path anywhere in the design. When a gate cannot resolve, human escalation is the fallback of record, because auto-approval as a degraded mode is not degradation, it is a compliance incident with a friendly loading spinner.

There was also a near-miss worth naming. Partway through, the layer coverage looked wrong. Later workflows appeared to have gaps at the retrieval and prioritization layers, which read like an oversight. It was not. Those workflows consume the first workflow's output package rather than performing fresh retrieval or a fresh prioritization pass. The gaps were sequencing decisions already made deliberately, and the fix was to document them as intentional rather than to invent coverage that would have duplicated work and created two sources of truth for the same mapping.

<!-- `[ARTIFACT: user to confirm format and content before publishing]` The layer view is worth showing as a single diagram, and what makes it useful is not the boxes. It is that every arrow crossing a boundary is a named contract, and every one of those arrows is a place where a failure can be attributed. The diagram is really a map of accountability. -->

<!-- `[ALT: Five stacked layers, ingestion, ranking, generation, approval, and observability, with labeled contracts on each boundary and signal arrows from every layer into observability]`   -->

<!-- `[INTERNAL LINK: relevant post on the human approval gates]`   -->

## The Verdict

Does it solve the problem? Mostly, with two honest gaps.

It solves the diagnostic problem. Each of the four questions from the opening now has a distinct address in the system, and each address has a different recovery path. That was the actual requirement, and it is met.

It solves the swappability problem at the cost of latency. Loose coupling between layers adds overhead compared to a fused pipeline. That tradeoff was accepted explicitly against the performance targets set earlier in the series, which is the only way to accept a tradeoff honestly i.e. against a number already committed to in public.

The first gap is a single point of failure. The managed database platform holding assembled context and audit state has no fallback in the first release. If it is down, the workflow is blocked, and it is recorded as an accepted risk rather than dressed up as graceful degradation. Blocking loudly is the right behavior. Having no alternative is still a gap.

The second gap is dependency concentration. Mapping every external dependency with its health check and failure behavior made the lock-in picture uncomfortably clear, particularly where one provider supplies several bundled services at once. Migration triggers are defined against measurable conditions rather than vibes, which is better than nothing, but it is a plan to leave rather than freedom to leave.

What I would do differently: formalize layer versioning from the start. Contracts are the load-bearing element of this design, and contracts without version numbers drift silently. That recommendation came out of the composability work and it should have been an input to it.

<!-- `[INTERNAL LINK: relevant post on naming failure modes before writing code]`   -->

The unglamorous part is that none of this makes the product feel better on the first click. It makes the product survivable on the hundredth failure. Compliance buyers do not pay for the first click.

## Your Turn

When a generated compliance artifact turns out wrong, which layer do you want to be able to point at first: the retrieval that assembled the context, the prioritization that decided what mattered, or the reasoning that drafted it? I picked retrieval as the boundary to make sharpest, and I am not certain that was the right first pick.
