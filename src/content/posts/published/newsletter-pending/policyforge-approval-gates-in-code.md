---
subtitle: "Approval gates that live in the code"
description: "Six approval gates, written as code instead of documentation. How PolicyForge makes sure a policy can't ship without you saying so."
publishedAt: "2026-10-09"
slug: "policyforge-approval-gates-in-code"
image: "/posts/policyforge-approval-gates-in-code.png"
image_size: "lg"
draft: false
hashtags:
  ["#CMMC", "#NIST800-171", "#CybersecurityCompliance", "#DFARS", "#Compliance"]
track: "product"
series_name: "PolicyForge"
series_slug: "policy-forge"
series_phase: "design"
series_position: 16
linkedin_url: "https://lnkd.in/p/gs4nmkkt"
x_url: ""
pinned: false
pinned_order:
newsletter_hook:
  "A compliance lead has a vendor questionnaire due Monday and needs
  an access control policy she can honestly say she reviewed and approved.
  PolicyForge promised six approval gates to make that true. For months those
  gates were a diagram, and nothing in the system would have stopped a policy
  from skipping one. This post is about the step where the gates, and the
  privacy rules around them, moved out of the design docs and into something
  the software cannot ignore."
summary_two_sentence: "PolicyForge's six approval gates and five privacy
  constraints used to live in design documents, which meant nothing actually
  enforced them. Turning them into schemas, config and typed code made them
  structural constraints rather than promises, which is the difference between
  a policy you can defend and one you hope nobody checks."
build_logs:
  - "thiru-ai-labs/apps/secure-stack/policy-forge/docs/build/phase-5/step-5-1plus2/build-log.md"
newsletter_sent: false
newsletter_date: ""
---

## The User Moment

Picture a compliance lead at a forty-person fintech on a Thursday afternoon. She has a vendor security questionnaire due Monday, and question 14 asks for her access control policy. She doesn't have one. She has a half-finished draft from eight months ago and a strong feeling that whatever she sends needs to be something she has actually read and signed off on, because her name goes on it.

That's the person PolicyForge is built for, and that feeling is the thing I've been protecting since the earliest design explorations. A generated policy is only useful if the human who owns it can say, honestly, "I reviewed this, I approved this, and I can show you when."

In an earlier post I described the approval workflow and the gates that every policy passes through before it can be exported. (See: [_Why you'll always have the final say_](/writing/policyforge-human-approval)). At the time, those gates existed as a diagram and a few pages of design notes. They were real in the sense that I had thought hard about them. They were not real in the sense that anything in the system would have stopped a policy from skipping one.

This post is about closing that gap.

## The Design Problem

Here's the uncomfortable truth about design documents: they describe intent, not behavior. A diagram that says "legal review happens before publication" is a promise. It isn't a constraint. The moment someone builds the feature on a tight deadline, or a bug routes around a step, or a future version of me forgets why a gate existed, the promise quietly stops holding.

The same problem applied to privacy. During design I had committed to five specific privacy constraints for PolicyForge: things like keeping prompts clean of customer data, using synthetic data in every non-production environment, scrubbing logs, and setting hard retention periods. All of it was written down. None of it was enforced anywhere a developer would trip over it.

So the problem going into this step was simple to state but more complex to solve. I had eighteen design artifacts covering data models, generation logic, workflow, observability and incident handling. Every one of them needed to become something that implementation could consume directly, with the approval gates and privacy rules embedded in the artifact itself rather than referenced from a document nobody re-reads .

The stakes were practical. Without that transformation, there would be no machine-readable specification to build from, and the privacy obligations would be invisible at exactly the moment they matter most, which is when someone is writing the code .

## The Options

I considered three ways to handle this, and I want to be honest about the ones I rejected.

**Option one: keep the design docs as the source of truth and write a checklist.** This is what most small teams do, and it's not crazy. You write a "before you ship" checklist, you link to the design docs, and you trust people to follow it. I rejected it because a checklist is still documentation. It has the same failure mode as the thing it's supposed to fix. It also doesn't help if the person doing the implementation is working from a spec and never opens the checklist.

**Option two: write everything as code from the start, in one language.** Tempting, because then there's one place to look. The problem is that different artifacts have different consumers. A database schema has a different audience than a runtime config, which has a different audience than a ranking algorithm that still needs human translation. Forcing all of it into a single format meant either over-engineering the simple things or under-specifying the complex ones.

**Option three: classify every artifact by who consumes it, then pick a format per consumer.** This is what I did. The rule I settled on is small enough to fit in a sentence: structured schema for anything that is the database source of truth, declarative config for anything that drives runtime behavior or orchestration, pseudocode for anything that still needs a human to translate it, and application code for anything that is straightforwardly application logic .

I've been calling this the format-selection rule in my own notes, and the reason it matters for this blog post is that it's where privacy enforcement actually becomes possible. Once you know a given artifact will be consumed as a schema, you can put the tenant isolation column _in the schema_. Once you know a workflow will be consumed as declarative config, you can put the approval gates _in the config_. The format decision is what makes the constraint enforceable.

## The Build

The eighteen artifacts ended up in five groups: data schemas, logic and algorithms, workflow orchestration, observability, and incident management . I'll walk through the ones that matter most for the approval story.

### The gates became a state machine

The centerpiece is the approval workflow itself. In the design docs it was a flow diagram. Now it is a declarative state machine where each of the six gates is an explicit state, and the only way to move from one state to the next is a recorded approval event.

<!-- [ALT: A simplified linear diagram showing a policy draft moving through six labelled checkpoints, each with a lock icon, ending in "Exportable". A dashed arrow attempting to skip a checkpoint is crossed out.] -->

The practical consequence is that "skipping a gate" is no longer a process violation. It's an invalid state transition. The system doesn't have a code path for it. If you've worked with state machines before, you know this is the whole point: you get to stop writing defensive checks everywhere because the model itself refuses to represent the bad case.

I'm deliberately not reproducing the transition table here, partly because it's the kind of detail that belongs to the product rather than to a blog post, and partly because the interesting part isn't the specific gates . . . it's that the gates moved from a document into something that executes.

### The execution flow got checkpoints

Alongside the state machine, the end-to-end execution flow (from "user requests a policy" to "policy is exported") was rewritten as declarative config with gate checkpoints inlined at each stage. So the orchestration layer and the approval layer are no longer two things that are supposed to agree. The flow literally cannot proceed past a checkpoint without the state machine reporting that the corresponding gate has been passed.

### Every gate leaves a record

An approval that isn't recorded is just a click. The audit events schema defines what gets written every time a gate transition happens: which policy, which gate, who approved, when, and what version of the content they approved. That last one matters more than it sounds. If the generated text changes after legal signs off, the audit trail should make that visible rather than hiding it behind a single "approved" flag.

Illustrative shape of a single audit record (fields simplified, sensitive fields removed):

```ts
// Illustrative only. Not the production schema.
type ApprovalAuditEvent = {
  policyId: string;
  tenantId: string;
  gate: string; // which of the six gates
  approvedBy: string; // [redacted: identity reference]
  contentVersion: string; // hash of what was actually reviewed
  occurredAt: string; // ISO timestamp
};
```

Going back to the compliance lead from the opening: this record is what lets her answer "who approved this and when" without digging through email. That's the user moment, served by a schema.

### Privacy became a column, not a sentence

This is the part of the build I'm most pleased with, and it's the least glamorous.

Every schema artifact now carries a tenant identifier with a reference to a database-level isolation policy . In plain terms: one customer's policies are walled off from another's by the database itself, not by application code remembering to add a filter. If a future query forgets the filter, it gets nothing, not someone else's data.

The observability artifacts embed the other privacy constraints directly. The logging config specifies sanitization of personal-data signals and sets retention as concrete integer values rather than placeholders . I do want to dwell on the "concrete integer" part a little more because it sounds trivial. During earlier designing, retention was written as "TBD" in a couple of places, which is the honest thing to write when you haven't decided. But "TBD" in a spec that gets implemented becomes "forever" in production, because nobody deletes anything by default. Forcing every retention period to be an actual number before the artifact could be considered done was a small rule with a large effect.

Illustrative shape of the logging rules (rendered as TypeScript for readability; the real artifact is declarative config):

```ts
// Illustrative only.
const loggingPolicy = {
  sanitize: ["email", "name", "ipAddress"], // scrubbed before write
  retentionDays: {
    applicationLogs: 30, // example value
    auditEvents: 365, // example value, longer by design
  },
};
```

The other two constraints, prompt-contamination controls and synthetic-data requirements, live in the generation and testing artifacts respectively . Prompt contamination is the risk that customer-specific content leaks into the instructions sent to the generation model and from there into someone else's output. The control for that is now part of the generation spec, not a note in a design doc.

### The two things that surprised me

First, I initially produced a standalone inventory document cataloguing all eighteen artifacts and their classifications, and then deleted it. The classification work was real and necessary, but it turned out to be an input to the transformation rather than a deliverable in its own right . Keeping it around would have created exactly the thing this whole step was trying to eliminate: a document that describes the system instead of being part of it.

Second, type drift showed up before a single feature was built. The application-logic artifacts originally redeclared some of the data types inline, which meant the schema and the code could silently disagree. The fix was to make every application-logic artifact import its types from the generated schema types, with no inline redeclaration allowed . A naming error in one of those files was caught during this pass . Small, but it's the kind of thing that would have cost an afternoon three months from now.

## The Verdict

Does this solve the problem?

For the approval gates: yes, with a caveat. The gates are now constraints rather than intentions. A policy cannot reach an exportable state without six recorded approvals, and the record is structured enough that the compliance lead can produce it on demand. That's the promise I made in the earlier post about final say, and it's now backed by something that executes rather than something that describes.

The caveat is that a state machine is only as good as the code that honours it. The orchestration config references the gates, but the implementation still has to be built, and I won't know whether the constraints hold under real load until they're running. I'd rather say that plainly than pretend the design step is the finish line.

For privacy: mostly yes. Tenant isolation at the database level, sanitized logs with hard retention numbers, and prompt-contamination controls in the generation spec are all now artifact-level requirements rather than document-level ones . What I'd push back on, if someone claimed this makes PolicyForge "private by design," is that embedding a constraint in a spec is necessary but not sufficient. It needs tests, and it needs the discipline to not override it when a customer asks for an exception. Both of those are ahead of me.

What I'd do differently: I'd have written the format-selection rule before starting the design artifacts, not after. Knowing up front that a given artifact will end up as a schema versus config changes how you write it, and I spent real time reworking things that could have been written correctly the first time.

The honest summary is this. Six gates that used to be a drawing are now six states the software can't skip. Five privacy rules that used to be paragraphs are now columns, config keys and type imports. The next step is turning all of it into working software, and that's where the real test begins.

## Your Turn

If you've ever had a "mandatory" review step in your product that turned out to be skippable in practice, what was the thing that finally made it un-skippable: code, process, or a painful incident?
