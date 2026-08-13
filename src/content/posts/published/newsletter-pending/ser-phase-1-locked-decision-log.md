---
subtitle: "Sixteen decisions locked before Phase 2 engineering began"
description: "How Social Engagement Radar's strategy phase turned a validated vision into sixteen locked decisions across workflow, capability, stack, and risk."
publishedAt: "2026-08-13"
slug: "ser-phase-1-locked-decision-log"
image: "/posts/ser-phase-1-locked-decision-log.png"
image_size: "lg"
draft: false
hashtags:
  [
    "#SocialListening",
    "#CommunityManagement",
    "#AI",
    "#SocialMedia",
    "#Engagement",
  ]
track: "product"
series_name: "Social Engagement Radar"
series_slug: "social-engagement-radar"
series_phase: "strategy"
series_position: 3
linkedin_url: "https://lnkd.in/p/gDCa5yfy"
x_url: ""
pinned: false
pinned_order:
newsletter_hook: "With the vision validated and the impact map done, I moved into the harder work: turning Social Engagement Radar's open strategic questions into sixteen locked decisions covering workflow, capability, metrics, stack, and risk. Here's what actually got decided before a single line of engineering code was written."
summary_two_sentence: "With the product vision and impact mapping already validated, I spent this stretch of work converging every open strategic question on Social Engagement Radar into sixteen locked decisions spanning workflow, capability, metrics, stack, and risk. The result is a single decision log that lets engineering start with zero unresolved guesses."
build_logs:
  - "thiru-ai-labs/apps/social-engagement-radar/docs/build/phase-1/step-1-1/build-log.md"
  - "thiru-ai-labs/apps/social-engagement-radar/docs/build/phase-1/step-1-2/build-log.md"
  - "thiru-ai-labs/apps/social-engagement-radar/docs/build/phase-1/step-1-3/build-log.md"
  - "thiru-ai-labs/apps/social-engagement-radar/docs/build/phase-1/step-1-4/build-log.md"
  - "thiru-ai-labs/apps/social-engagement-radar/docs/build/phase-1/step-1-5/build-log.md"
  - "thiru-ai-labs/apps/social-engagement-radar/docs/build/phase-1/step-1-6/build-log.md"
  - "thiru-ai-labs/apps/social-engagement-radar/docs/build/phase-1/step-1-7/build-log.md"
  - "thiru-ai-labs/apps/social-engagement-radar/docs/build/phase-1/step-1-8/build-log.md"
newsletter_sent: false
newsletter_date: ""
---

## The User Moment

By the time this stretch of work began, Social Engagement Radar already had a validated shape. The vision was clear: a tool that helps someone active on LinkedIn and X find conversations worth their time and hands them a drafted reply they review before anything goes out, not one that posts on their behalf. The impact mapping had already connected that vision to a concrete actor, the "Engager," and to the behavior changes I was betting the product on.

What I hadn't done yet was the harder, less visible layer underneath the vision: deciding exactly which capabilities were worth building, in what order, against what proof, on what infrastructure, and with what tolerance for things going wrong. So I treated this as its own deliberate stretch of strategic work. Frame the problem precisely enough that engineering design could start clean.

The starting point was going back to how the Engager actually works today, not the tidy version, the real one. I reconstructed the current workflow, then went one layer deeper into where the cognitive effort actually concentrates: deciding whether a conversation is worth engaging with, judging whether it's still timely, generating a reply angle that doesn't sound generic, filtering that reply through a consistent voice already trained on the Engagers past behavior, and managing all of that across multiple topic areas at once without mixing them up. Five distinct judgment tasks, each performed today with no tool support and no consistency. That reframing mattered. This isn't a search problem or a writing problem. It's a cognitive-infrastructure problem: the workflow lacks structured intelligence at the exact moments where the burden is highest.

## The Design Problem

Here's the tradeoff that defines this kind of work: almost every decision depends on another one, so there's no clean order to work through them in. You can't lock a tech stack without knowing your latency tolerance. You can't know your latency tolerance without knowing your autonomy model. You can't set the autonomy model without deciding how much judgment you're willing to hand the AI versus keep for the human.

I started by taking every capability from the impact map, twenty of them, and classifying each one against a simple test: does this genuinely benefit from a model's interpretation, generation, or ranking, or is it deterministic logic dressed up as an AI problem? The split came out close to even. Roughly half turned out to be genuinely AI-fit, capabilities like the conversation discovery layer, the drafting engine, and the opportunity ranking. The other half, things like rate-limit management and audit logging, are better served by ordinary code. Treating every part of a workflow as an AI problem is how projects end up slow, unreliable, and costly. Knowing which half is which up front is what let the architecture stay lean.

That classification is what let me lock the product category. I rejected "Assistant," because that category tolerates autonomous execution of a scoped subset of risky actions, and I wasn't willing to let anything publish without explicit review, full stop. I rejected "Agent," because nothing in this product plans and executes a multi-step action without a human confirming the terminal step. I also rejected "Classifier," because scoring and ranking are only the upstream half of the value here; the real differentiation is in the drafting itself. "Copilot" was the only category where every AI output surfaces as a suggestion the Engager reviews, edits, and decides on, which lines up exactly with the non-negotiable target I'd set for trust and safety: one hundred percent of publish attempts require explicit approval, zero unintended publishes.

## The Options

For each open question, I wrote down the option I rejected, not just the one I picked.

On the architectural pattern, the tempting move would have been to build something that felt more autonomous, closer to a fully hands-off system, because that's the more impressive story to tell. I rejected it. What I locked was an "Overlay" pattern: the product wraps structured intelligence around a workflow that still terminates on LinkedIn and X's own platform through its own publish API, rather than replacing that workflow outright, and rules out any architecture built around real-time, streaming, chat-style interaction, since the locked category runs on a cycle-time-bounded rhythm, not a synchronous one. Every AI-fit capability targets a specific bottleneck inside the existing process instead of trying to reinvent it. The approval gate at every consequential step doubles as a deliberately conservative stand-in for a more autonomous system I might build later, once trust is earned rather than assumed.

On which workflow to build first, I had six realistic candidates on the table, and I rejected the naive instinct to treat each capability as its own workflow. A ranked list of opportunities creates no value on its own without a drafted reply behind it, and a drafted reply creates no value without an approval and publish step behind that, so I grouped capabilities by where value actually lands, not by where they sat in the impact map. That produced six real workflows: setting up the monitoring space, the daily engagement cycle itself, outcome logging once a reply goes out, a performance feedback loop that improves scoring over time, an emergency rollback path for a publish someone regrets, and a background compliance and rate-limit monitor that keeps the whole system inside LinkedIn and X's rules. I ranked all six against consistent factors: business value, how much cognitive load each one actually removed, dependency position, and how much I'd learn by building it first.

The "Daily Engagement Cycle" won clearly, for reasons the other five make obvious by contrast. The feedback loop and outcome logging are real, but they only produce value once the daily cycle has been running long enough to generate data to learn from, so building them first would mean optimizing a workflow that doesn't exist yet. Rollback is a safety net for a publish action that doesn't happen without the daily cycle in place, so it's necessary eventually but not day one. Compliance monitoring is genuinely load-bearing infrastructure, not a workflow the Engager ever sees directly, and setup is a one-time prerequisite rather than a source of recurring value. The Daily Engagement Cycle is the only one of the six that carries the actual MVP wedge, drafting paired with ranking, and touches all three business goals inside a single cycle instead of advancing just one.

I then mapped that workflow in full: ten steps, several genuine decision points, and defined error paths at each one. At the first real decision point, where the Engager decides whether a conversation is a genuine dialogue worth joining or just a broadcast post, the judgment is built on rapid pattern recognition accumulated over months, and it degrades under time pressure or in an unfamiliar niche. The second decision point turned out to be just as tacit: judging whether a conversation still has "oxygen" left in it depends on niche-specific decay rates (tech conversations cool faster than political ones), and on reading structured freshness signals like last-reply timestamp and reply velocity, but even those signals leave a residue of human intuition the tool doesn't fully replace. I documented both, along with the two decision points that follow them, reply-angle selection and the final approve-to-publish gate, so that whatever gets built later has something concrete to be measured against, instead of me trying to describe it from memory mid-sprint. That last gate, notably, has no bypass path for any capability combination. It's the literal architectural expression of the zero-unintended-publish target, not a nice-to-have.

On infrastructure, the fork was build-versus-buy, twice: once for the data layer, once for the model-access layer. I locked Supabase, Postgres with pgvector, as the MVP database. It bundles auth and row-level security, which matches the multi-tenant model I need, and it has a documented, low-risk migration path to AWS RDS if I outgrow the free tier. For getting to the models themselves, I locked Requesty.ai as the gateway layer rather than integrating directly with any single provider, routing lightweight, high-volume work like candidate scoring to a faster, cheaper model, while reserving a stronger model specifically for the reply drafts a person actually reads and decides whether to publish. Locking that gateway also meant confronting what it doesn't give me for free: no defined rate limits or timeouts on the provider side, and no fallback strategy yet for what happens to a half-drafted reply if the gateway goes down mid-generation. I logged both as open items to close before engineering leans on the dependency, rather than discovering them the first time a call actually fails.

I also had to walk back an early assumption that a cost-saving caching layer could apply uniformly across every model call. It can't, not when some of those calls touch other people's public posts and personal data that shouldn't be cached the same way everything else is. And the hosting choice, Vercel on its free tier, carries its own hard boundary worth naming plainly: no long-running background processes, which rules out anything like a long-poll discovery pull and forces that work into short, cycle-bounded jobs by design rather than by accident. I wrote down explicit, numeric triggers for when each of these choices needs to be revisited, a specific storage ceiling for the database, a specific spend threshold sustained for two straight months for the model gateway, so that "we'll deal with scale later" has an actual line in the sand instead of being a permanent excuse.

## The Build

The risk work is where this paid off most concretely. I built a full risk register spanning technical, product, adoption, business, and privacy categories, plus a dedicated section for incident handling, because a tool that reads other people's public conversations and drafts responses about them carries privacy exposure a generic risk framework won't catch. Several risks landed in the most serious tier. The one I spent the most time on was the possibility of cross-tenant data leakage through a row-level-security bypass in the shared database, low likelihood, but critical impact if it ever happened, so it got a specific mitigation tied directly into the architecture rather than deferred to "we'll handle it later." Alongside the register, I built a taxonomy that separates ordinary expected errors and transient failures from a true incident: something that needs a human to step in and coordinate a response, like a credential leak or a cross-tenant exposure, rather than an automated retry. Without that boundary, every minor API hiccup would page a human and erode trust in the whole alerting system before it's even built.

I also locked the metrics this product actually has to hit before I'd call it working, framed as testable hypotheses instead of vague aspirations. At least sixty percent of active users need to self-report saving real time within the beta window, and at least a quarter need to self-report a measurable outcome, an inbound message, a collaboration, a lead, attributable to a reply, within eight weeks. Trust and safety carry a harder line: one hundred percent approval compliance, zero unintended publishes, with no partial credit.

That last piece is where I locked something I hadn't fully appreciated the value of until I wrote it down: a go/no-go decision matrix that turns those metrics into an explicit Proceed, Delay, or Pivot call at the beta gate, rather than a gut feeling I'd have to defend after the fact. A strong result on time-saved can't buy back a trust-and-safety failure. That's stated as a rule, not left to interpretation: the trust and safety signal and the core privacy risks are gating, not averaging, so a great discovery number can't offset a single unintended publish or a confirmed data-isolation failure. Delay is the default response to any single ambiguous signal; pivot is reserved for a repeated, root-cause-confirmed, or zero-tolerance breach. And a few genuinely open items, like the exact monthly spend ceiling for the model gateway, are deliberately kept out of that gate entirely. They're engineering-readiness gaps to close before scaling, not signals about whether the product hypothesis itself is working, and conflating the two would have let an unrelated open question stall a decision that didn't need to wait on it.

All of it, capability classification, workflow selection, tech stack, metrics, and risk, converged into a single decision log: sixteen core strategic decisions, each with its own rationale, review trigger, and contingency, plus four additional entries specifically covering how incidents get escalated and who owns the response. Closing that log wasn't purely mechanical. I found that the shared taxonomy for incident severity, something I needed to reference rather than reinvent, hadn't actually been locked yet either. The right move was to name the gap and go get it resolved before calling the phase closed, not to paper over them with a guess.

## The Verdict

Does this get me what I actually needed, a fully specified product ready for engineering with no open strategic questions? Largely, yes. I now have one document I can point to for almost any "why did we build it this way" question, instead of reconstructing my own reasoning from memory weeks into the build. The real lesson was that locking decisions this early doesn't prevent every future change. It prevents _accidental_ drift, the kind where you end up somewhere you never actually chose to be because nobody stopped to decide.

I'll be direct about the limits, too. A decision log is only as good as the assumptions underneath it, and a few of mine are still educated guesses rather than settled facts, particularly around real usage volume and the exact cost ceiling I'm willing to tolerate once actual traffic starts hitting the model gateway. I flagged those explicitly and moved forward anyway, because holding the next phase hostage to perfect certainty would have been its own kind of failure.

What I'd do if I were starting today: pull the risk and privacy work earlier in the sequence. It reshaped more downstream decisions than any other single piece of work here, and I'd rather have that lens active from session one than from session seven.

<!-- [INTERNAL LINK: relevant post on product category and copilot design] -->

<!-- [INTERNAL LINK: relevant post on choosing a managed tech stack for an AI MVP] -->

**Table 1 — Resolved Strategic Decisions (D-01 through D-16)**

| #    | Decision                                                                                     | Rationale (short)                                                                                                   | Review Trigger                                                       |
| ---- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| D-01 | Target cognitive problem, not capability gap                                                 | Bottlenecks are cognitive (relevance triage, timing, voice filtering), not feature gaps                             | MVP beta gate                                                        |
| D-02 | GDPR as baseline (strictest regime)                                                          | Global users, no geo-restriction; conversation participants may be EU/UK/CA residents                               | Before Phase 5                                                       |
| D-04 | Product category locked: **Copilot**                                                         | Every AI capability surfaces recommendations; Engager reviews, edits, and decides — 0 unintended publishes required | Phase 4 gate, or if autonomous capability (Cap 19) pulled into scope |
| D-05 | Architecture: Overlay with proxy-pattern approval gates                                      | Copilot UX demands review-and-edit, not chat-first or silent automation                                             | Phase 2 design review                                                |
| D-06 | Tech stack locked: SvelteKit, LangGraph.js, Supabase (Postgres + pgvector), TypeScript-first | Pre-decided constraints; downstream artifacts inherit without re-derivation                                         | First Scale Trigger event or Phase 2 gate                            |
| D-07 | Success metric: ≥60% of users self-report ≥1 hr/week saved                                   | Primary go/no-go signal for BG-001, measured via weekly survey                                                      | Beta midpoint                                                        |
| D-08 | Cost posture: free-tier MVP, human-review at 80% quota                                       | Prevents silent overage; no automatic scale-up                                                                      | Continuous (usage-triggered); formally at Phase 2 gate               |
| D-09 | Four explicit scale migration triggers                                                       | Removes ambiguity about when to act; prevents "we'll deal with it later" debt                                       | Continuous; at each Scale Trigger event                              |
| D-10 | Requesty Gateway as sole LLM path, no confirmed fallback yet                                 | Critical operational gap flagged, not resolved                                                                      | Before Phase 3 orchestration lock                                    |
| D-11 | Tenant identifiers: server-side only, never trusted from client                              | Multi-tenant RLS is only as safe as its tenant-resolution boundary                                                  | Phase 2 security review, before BFF ships                            |
| D-12 | WF-B (Daily Engagement Cycle) is highest-ranked workflow                                     | Scores highest on business value, cognitive-load reduction, AI-fit; depends on WF-A and WF-F                        | Phase 2 sprint-planning gate                                         |
| D-14 | Two data-subject categories: Engager + third-party participants                              | Capability 10 processes third-party profile data without approval gate on scoring step                              | Before Phase 5; immediately if scoring use expands                   |
| D-15 | Semantic caching **disabled** for personal data                                              | Caching would persist third-party data outside residency/retention controls                                         | Only if encrypted, TTL-bound, access-logged cache becomes available  |
| D-16 | Incident vs. silent-error boundary defined                                                   | Prevents alert fatigue; not every error pages a human                                                               | Phase 3 evaluation, or if alert-fatigue patterns emerge              |

**Table 2 — Open / Blocking Items (Tracked, Not Resolved)**

| #    | Item                                                | Status                                                                                      | Gate                       | Contingency                                                     |
| ---- | --------------------------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------- | --------------------------------------------------------------- |
| D-03 | Target jurisdiction / data residency                | **UNRESOLVED** — acknowledged gap, not deferred                                             | Before Phase 5 (hard gate) | Freeze onboarding pending legal/founder input                   |
| D-13 | Sub-processor register (Supabase, Requesty, Vercel) | **Incomplete — blocking gap** — DPA status, residency, personal-data categories not sourced | Before Phase 5 (hard gate) | Freeze onboarding; parallel legal review of Cap 10 lawful basis |

**Table 3 — Incident Management Decisions (IM-001 through IM-004)**

| #      | Decision                                                    | Rationale (short)                                                    | Review Trigger                                    |
| ------ | ----------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------- |
| IM-001 | Incident severity taxonomy (SEV0–SEV3) as shared constant   | Privacy-triggering events hard-mapped to SEV0 per GDPR Art. 33/34    | 3 months from Phase 1 close                       |
| IM-002 | Incident infrastructure: Sentry → Incident.io → Slack       | Shared operational infrastructure, not product-specific design       | Only if tooling vendor changes                    |
| IM-003 | Privacy breach escalation: Nick as Privacy Officer          | 72-hour regulatory clock requires named authority                    | 6 months from Phase 1 close, or first test-breach |
| IM-004 | Escalation ownership: Nick holds all roles (single-founder) | Acceptable for MVP-stage; flagged as concentration-of-authority risk | Phase 4 gate, or if second team member joins      |

## Your Turn

If you're building something with real judgment calls baked into it, how many of your "we'll decide that later" questions actually got decided later, versus quietly becoming your architecture by default?
