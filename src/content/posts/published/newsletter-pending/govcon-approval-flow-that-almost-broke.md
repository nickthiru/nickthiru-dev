---
subtitle: "When a design step assumes a robot that doesn't exist"
description: "GovCon Leads Radar's approval flow almost got designed around a feature the product doesn't have. Here's what shipped instead."
publishedAt: "2026-08-19"
slug: "govcon-approval-flow-that-almost-broke"
image: "/posts/govcon-approval-flow-that-almost-broke.png"
image_size: "lg"
draft: false
hashtags:
  ["#GovCon", "#FederalContracting", "#SalesIntelligence", "#B2B", "#AI"]
track: "product"
series_name: "GovCon Leads Radar"
series_slug: "govcon-leads-radar"
series_phase: "design"
series_position: 7
linkedin_url: "https://lnkd.in/p/gkdVXB-r"
x_url: ""
pinned: false
pinned_order:
newsletter_hook: "I was designing an approval flow for GovCon Leads Radar and hit a wall: the template assumed the system would eventually take an action. Mine never does. Here's the feature that shipped once I stopped trying to force that fit."
summary_two_sentence: "GovCon Leads Radar's approval flow was supposed to gate a system action — except the product never lets the AI act on its own. The fix wasn't a workaround, it was redefining what 'approval' means when a human's decision is the only action that ever happens."
build_logs:
  - "thiru-ai-labs/apps/govcon-leads-radar/docs/build/phase-2/step-2-5/build-log.md"
newsletter_sent: false
newsletter_date: ""
---

## The User Moment

Picture a seller inside GovCon Leads Radar, looking at a lead with a compliance flag sitting on it. The AI has already surfaced what it knows: the flag exists, what category it falls into, and a plain-language read on how serious it looks. Nothing about that flag has been decided yet. There's a button: the seller has to click "Disqualify" or "Clear" — no default, no auto-advance, no way to scroll past it and let the system quietly assume an answer.

That single, deliberate click is the entire feature I'm going to talk about. It sounds small, but designing the fifteen decisions hiding underneath it was not.

## The Design Problem

I was working through a standard step in my own design process: design the approval gate, then design what happens after approval, when the system executes the action. It's a reasonable default. Most AI products eventually do something on a user's behalf. . .send the email, file the record, hit the API.

GovCon Leads Radar isn't built that way, on purpose. I'd already locked the product into a category where the AI never autonomously executes a consequential action. No outbound emails, no automatic disqualifications, nothing system-triggered. That decision matters more in this market than most: a seller evaluating a federal contract opportunity needs to know a human, not a script, made the call on a compliance risk. So when I sat down to design "approval and execution," I got halfway through drafting the execution half before I stopped and asked myself what, exactly, I thought was going to execute.

There wasn't an answer. There was no system action waiting on the other side of that approval gate. Which meant I had a choice to make, and both easy options were bad ones.

## The Options

**Option one:** design an execution phase anyway, just to fill in the template. Invent a plausible-sounding "system executes the disqualification" step, write a rollback plan for it, ship the doc. This gets rejected fast; it documents a capability the product doesn't have, and the first time someone builds against that doc instead of the real product, it becomes a real bug, not a paperwork problem.

**Option two:** skip the execution design entirely. Treat the product as exempt because it doesn't act autonomously. This one is quieter and more tempting, and it's just as wrong. Skipping it means shipping without an error-handling plan for what happens when a seller's judgment call is wrong, without an audit trail for compliance decisions, and without a defined moment where a decision actually becomes permanent. Those aren't optional for a product where a wrong call on a compliance flag has real consequences.

**Option three**, the one that almost got through: a compromise. What if the system took just one small autonomous action, something low-stakes, like auto-archiving a lead once a seller disqualifies it? It felt harmless; no outbound email, no external side-effect, just quiet housekeeping. But housekeeping is still an action the system takes on its own initiative, and the moment I let one exception through, "no autonomous execution" stops being a boundary and starts being a guideline with footnotes. The actual design ended up enforcing the opposite instinct: a lead can't even advance to the export workflow in a pursue state without an explicit disqualify-or-clear value on record — that's a data-completeness requirement on the record itself, not a system action taken on the seller's behalf. Same outcome sellers would want, achieved without the system ever doing anything.

**Option four**, the one I'll actually build: keep the intent of the design step, but throw out its assumed mechanism. The step isn't really asking "what does the system execute?" It's asking "what happens at the moment a decision becomes real and permanent, and how do you handle it when that decision is wrong?" For a product that never acts on its own, the moment a decision becomes real isn't a system action. It's the seller's click.

## The Build

Once I reframed "execution" as "the moment a human judgment gets recorded," the rest of the feature designed itself in a way the fake-execution version never could have.

I split the flow into two phases. Phase one is the AI's draft interpretive layer: the computed compliance signal, the plain-language severity narrative, the confidence framing on a point of contact. None of it is a decision — it's explicitly a draft interpretive artifact, never itself a decision or action. Phase two is the seller converting that material into a recorded judgment: disqualify, clear, accept, reject, tier override, pursue, no-pursue. That record is the equivalent of "execution" under the reframed definition, and it happens with no external API call, no outbound action, no irreversible system side-effect — just a local, tenant-scoped database write.

The approval gate itself became the interface expression of that split: no default or auto-advance state on the compliance toggle, and no way for a lead to slide through to the export step without an explicit disqualify-or-clear value on record. It's a data-completeness rule sitting where you'd normally expect a system-execution safeguard, and it does the same job. . .it just does it for a human decision instead of an API call.

Error handling followed the same logic once I let go of hunting for failures that would never occur, like a failed outbound call or a timeout. A human judgment can still go wrong, just differently. One seller misreading one flag is normal variance — worth quietly tracking, not worth an alarm. The same mistake showing up across many sellers on the same flag category or entity type is a different problem entirely, likely pointing at a confusing explanation steering people the same wrong way, and that gets escalated as an incident.

Getting a working definition of "wrong" required an actual number, not just a feeling. The dashboard I'm designing tracks a ground-truth match rate for compliance decisions against a target of 90% or higher; that's the acceptance bar for whether the human-judgment layer is actually working as intended. Cross that threshold in the wrong direction on a specific flag category, and it doesn't just get logged quietly; it routes to an incident, escalated to the product and engineering leads, the same severity path reserved for a systemic failure, not an individual mistake.

And the audit trail became the permanent record of every judgment a seller ever made on a lead — queryable, revisable (a later decision supersedes an earlier one, it never erases it, preserved via a superseding audit-trail entry rather than a duplicate), and framed to sellers with language that never implies the system is acting: "Your decision has been saved," not "Action submitted." That phrasing choice matters more than it looks like it should, because it's the difference between a product that's honest about what it does and one that quietly borrows the authority of an action it never actually takes.

## The Verdict

Does it solve the problem? Mostly, yes — with one thing I'm still watching. The approval flow now does what the original step was actually trying to protect: a decision that's traceable, reversible in the audit-trail sense, and auditable after the fact, without inventing a system capability the product was deliberately never given. Sellers get a clear, un-skippable moment to make the call, and a permanent record they can point back to if a compliance question comes up later.

What I'm not fully sure of yet is whether the no-default-state friction on the compliance toggle will feel like appropriate rigor or like an annoying speed bump once real sellers are moving through dozens of leads a day. I don't have to guess at that blindly, though. The outcome-tracking design already treats seller behavior as a signal, not just a compliance record: outcomes captured at this gate feed a weekly calibration cycle that computes conversion rates against tier and compliance decisions, and misjudgment clustering doubles as an early-warning signal for something upstream going wrong. If sellers start clearing flags they shouldn't, or disqualifying leads they shouldn't, in a clustered, non-random pattern, that shows up in the same data pipeline built to catch AI miscalibration. . .it just as easily catches UX friction wearing a different hat. So the honest answer isn't "we'll never know." It's "the product is already instrumented to tell us, we just haven't run it against real usage yet."

## Your Turn

If you've ever hit a design template that assumed a capability your product deliberately doesn't have, did you force the fit, quietly skip the step, or find the underlying intent and redesign around it — and how did that choice hold up once real users got their hands on it?
