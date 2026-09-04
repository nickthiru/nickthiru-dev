---
subtitle: "Naming every way PolicyForge could fail, before writing code"
description: "Before building PolicyForge, I mapped every failure mode, including GDPR-relevant privacy risks, into a taxonomy that shapes the product."
publishedAt: "2026-08-25"
slug: "policyforge-risk-register-before-code"
image: "/posts/policyforge-risk-register-before-code.png"
image_size: "lg"
draft: false
hashtags:
  ["#CMMC", "#NIST800-171", "#CybersecurityCompliance", "#DFARS", "#Compliance"]
track: "product"
series_name: "PolicyForge"
series_slug: "policy-forge"
series_phase: "strategy"
series_position: 9
linkedin_url: "https://lnkd.in/p/gU_aEvVN"
x_url: ""
pinned: false
pinned_order:
newsletter_hook: "I hadn't written a line of code yet, and I was already arguing with myself about what happens when the product fails a customer. Not bugs. Real failures, the kind that erode trust or trigger a compliance obligation. Here's the taxonomy I built before touching the keyboard, and why one category got treated differently from all the rest."
summary_two_sentence: "Before building anything, I forced myself to name every way PolicyForge could quietly fail a customer, including risks with real regulatory weight. That taxonomy now shapes how trust and reliability get surfaced to users from day one."
build_logs:
  - "thiru-ai-labs/apps/secure-stack/policy-forge/docs/build/phase-1/step-1-7/build-log.md"
newsletter_sent: true
newsletter_date: "2026-09-04"
---

### The User Moment

Picture the moment a PolicyForge user, someone like Michael, a VP of Operations racing towards an insurance-renewal deadline, gets a generated policy back and can't immediately tell if it's actually right. Not "is the formatting nice". . . but, is the underlying control mapping correct, and if it's wrong, who notices, and how fast?

That single question is where this stage of building PolicyForge actually started. Not with a feature. With a list of everything that could go wrong, and then, harder still, a decision about what to do about each one.

### The Design Problem

It's tempting, when you're pre-code, to skip straight to "what am I building" and defer "what happens when it breaks" until later. I don't let myself do that. The easy part was brainstorming a list of bad outcomes; anyone can do that in twenty minutes. The hard part was forcing every single risk through the same three questions: what's the mitigation, what's the acceptable threshold before it becomes a problem, and what triggers escalation to a human being who has to make a judgment call. A risk without a threshold is just anxiety with extra steps.

The deeper problem underneath that: not every failure deserves the same response, and lumping them together is its own kind of failure. Some things are noise the system should absorb quietly on its own; a slow request here or there, retried automatically, is not something I need to know about in real time. Some things demand my immediate attention because no amount of retrying fixes them. Conflating the two either buries a serious issue inside retry logic where nobody notices it escalating, or pages me every time an API call times out until I start ignoring the pages altogether.

I ended up drawing that line using a simple boundary: an incident is anything that requires a human to triage, decide, escalate, or notify someone outside the system. Everything else, expected errors, transient network blips, anything a circuit breaker or a retry can absorb on its own, stays silent. That single distinction became the spine the entire register was built around.

### The Options

I considered treating all technical risk the same way: one severity scale, one escalation path, done. It's simpler to build, and for a solo builder trying to move fast, "simpler" is a genuinely tempting default. But when I actually laid the failure modes out side by side, it became obvious that a single flat scale would either under-react to the risks that matter most or bury me in false alarms for the ones that don't. A framework-mapping error that produces the wrong control language and triggers auditor rework is not the same order of problem as a single slow request from a flaky network connection, and treating them identically meant I'd either miss the mapping error or drown in noise from the network blip.

So I split severity into four tiers instead of one flat scale, ranging from total outage or confirmed data exposure at the top, down to informational-only edge cases at the bottom. Each tier carries its own response target, from immediate action down to "next business day." That structure alone forced a useful discipline: before I could even file something into the register, I had to decide how bad it actually was, not just that it was bad.

I also considered treating privacy-related risk the same as any other operational risk, just another row in the same table alongside latency targets and cost overruns. I rejected that, and this is the decision I keep coming back to. Privacy failures carry a regulatory dimension that a slow database query never will. A mishandled data exposure isn't just an inconvenience I can patch and move on from; it's potentially a notification obligation under GDPR, with specific articles, specific timelines, and specific people who have to be told. Folding privacy risk into general operational risk would have let it quietly inherit a "retry and move on" mentality that is completely wrong for that category. So I pulled it out as its own first-class section in the register, separate from the technical, product, and business risk categories, and gave every entry in it an explicit regulatory citation rather than a generic mitigation note.

A third option I weighed, and ultimately kept in a limited form, was reproducing the severity scale from a shared incident-management document rather than inventing my own for PolicyForge specifically. I decided that consistency mattered more here than bespoke tuning: using the same SEV0 through SEV3 scale that the rest of the system will eventually use means I'm not building a second, incompatible severity language just for this one product. The tradeoff is that some of the wording is broader than PolicyForge-specific risks strictly need, but I'd rather have one severity language across everything I build than five slightly different ones.

### The Build

What I ended up with is a two-layer system, plus a fifth category that turned out to matter more than I expected going in.

The first three categories are the ones you'd expect: technical risks (things like the framework-mapping engine producing inconsistent control language, or latency targets that were never formally locked down), product and adoption risks (would Michael trust an AI-generated policy without external validation, would an insurance carrier reject the output outright), and business risks (will the cost-savings hypothesis collapse if too many users still hire a consultant anyway, does the fixed February 1 renewal deadline blow up if the workflow slips). Each of those got the same treatment: a likelihood-times-impact score, a mitigation, a measurable acceptance criterion, an escalation trigger, and a contingency plan for when the trigger fires.

The fourth category is privacy, and I split it further into two tiers. The first tier covers ongoing privacy obligations that exist regardless of whether anything goes wrong: things tied to the fact that Michael's account, logs, and credentials sit at the infrastructure layer, separate from the workflow's actual subject matter, which is organizational technical data rather than anyone's personal data. The second tier, which I labeled privacy incident risks, covers the always-high-severity scenarios: unauthorized access to personal data in logs, accidental exposure of personal data in a system output, an unactioned data-subject rights request, data retained past its deletion date, a sub-processor breach. Every single row in that second tier ties directly to a specific GDPR article, whether that's the notification obligation under Article 33, the individual-notification threshold under Article 34, or the response-timeliness requirement under Article 12. That's the part that surprised me most. It's easy to assume privacy risk is "handled" if you're not processing obviously sensitive personal data in the core product workflow. But exposure risk lives at the infrastructure layer too, in logs, in credentials, in account data, regardless of how sensitive the core workflow itself is. Naming that explicitly, rather than assuming it away because the primary workflow deals in organizational data, was the actual insight of this whole exercise.

The fifth piece is the silent-versus-incident classification I mentioned earlier, applied specifically to every critical or high-severity risk from the first four categories. A framework-mapping inaccuracy that exceeds the rework threshold is always an incident; it needs a human looking at the mapping logic, not a retry. A latency breach is silent if it's isolated to one request, but becomes an incident if it turns systematic across many requests. Free-tier quota exhaustion on the hosting or database layer is always an incident, because it requires a human decision to upgrade or reprovision, not something code can fix on its own. And cross-context data leakage is automatically classified as an incident in the privacy sense, full stop, no judgment call required, because the regulatory clock starts the moment that's suspected.

I also built ownership directly into the register rather than leaving it implicit. Operational, non-privacy incidents route to whoever is playing the product-management role for triage and business-impact assessment. Anything that's a suspected breach or privacy incident routes to a distinct privacy-owner role, with decision authority over external or regulatory notification, and that role is a mandatory secondary recipient any time the top severity tier gets flagged as a possible breach. As a solo builder right now, I am both of those roles today, but writing the separation down matters, because it means the day I do bring someone else onto this, the escalation path doesn't have to be redesigned from scratch. It already exists on paper.

The other piece that shaped downstream thresholds was building a companion go/no-go matrix alongside the register, one that translates each risk category into a specific number I can watch. The consultant-free completion rate has a pivot line at fifty percent or below, a delay-and-iterate range between fifty-one and seventy percent, and a proceed signal above seventy percent. The auditor rework rate pivots the mapping-engine approach entirely if it sits at or above twenty percent sustained, delays general availability in the ten-to-nineteen-percent range, and only clears for proceed below ten percent. Insurance carrier acceptance and stakeholder alignment get similar three-tier treatment. Building that matrix is the thing that mattered most for how I think about privacy specifically: most of those operational metrics have a genuine middle ground, a "delay and iterate" zone where the signal is bad but not disqualifying, and I get to keep working while I fix it. Privacy and security signals don't get that middle ground. There is no acceptable "delay" tier for a data exposure. It's binary: proceed, or stop everything until it's resolved.

( See: [_PolicyForge — Inside the MVP Technical Stack_](/writing/policyforge-locking-the-foundation) )

### The Verdict

Does this solve the problem? Mostly, yes, for now. It gives me a shared vocabulary before a single feature ships: is this failure silent or does it need a human, and does it carry regulatory weight or not. It also means that when I eventually do bring someone else onto this project, whether that's a contractor, an early hire, or a co-founder, they inherit a register that already answers "who gets called at 2 a.m. for this specific failure" instead of me having to reconstruct that judgment from scratch under pressure.

What it doesn't do yet is prove itself under real production load, with real users hitting real edge cases I haven't imagined. A risk register is a hypothesis until it survives contact with actual failures. I fully expect some of these severity classifications to be wrong in practice, some silent failures to turn out to need a human after all, some incidents to turn out to be safely automatable. I'll find out soon enough whether I got the categories right, and I've deliberately left room in the design to revise the classifications rather than treating this as a document I write once and never touch again.

What I do think I got right: treating "responsible AI compliance tooling" as something you design for structurally, before the product exists, rather than as a checkbox you retrofit after someone complains. The privacy-incident tier didn't get added because a regulator asked a hard question or a customer got nervous. It got added because I sat down and asked myself, before writing any code, what happens the day this actually breaks, and I didn't like the answer of "I'll figure it out then."

<!-- [INTERNAL LINK: relevant post on approval gates and human-in-the-loop design] -->

<!-- [ALT: Simplified diagram showing risk categories split into silent-versus-incident paths, with a separate privacy risk branch and its GDPR-obligation mapping] -->

### Your Turn

If you've had to decide which failures your product should quietly self-heal versus which ones need a human in the loop immediately, where did you draw that line, and what made you draw it there?
