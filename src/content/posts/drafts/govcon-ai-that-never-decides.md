---
subtitle: "Designing an AI that proposes, never decides"
description: "How I built GovCon Leads Radar's AI layer to support judgment without ever making the call for the seller."
publishedAt: "2026-08-19"
slug: "govecon-ai-that-never-decides"
image: "/posts/govcon-ai-that-never-decides.png"
image_size: "lg"
draft: true
hashtags:
  ["#GovCon", "#FederalContracting", "#SalesIntelligence", "#B2B", "#AI"]
track: "product"
series_name: "GovCon Leads Radar"
series_slug: "govcon-leads-radar"
series_phase: "design"
series_position: 6
linkedin_url: ""
x_url: ""
pinned: false
pinned_order:
newsletter_hook: "I spent a week designing an AI system for GovCon Leads Radar and wrote a rule at the top of every prompt: the model is never allowed to tell a seller what to do. Here's why that constraint made the hardest engineering decisions easier, not harder."
summary_two_sentence: "Building the AI layer for a lead-qualification tool meant resisting the obvious move of letting the model just decide which leads are worth pursuing. The result is a retrieval, ranking, and generation stack that explains itself instead of deciding for you."
build_logs:
  - "thiru-ai-labs/apps/govcon-leads-radar/docs/build/phase-2/step-2-1/build-log.md"
  - "thiru-ai-labs/apps/govcon-leads-radar/docs/build/phase-2/step-2-2/build-log.md"
  - "thiru-ai-labs/apps/govcon-leads-radar/docs/build/phase-2/step-2-3/build-log.md"
  - "thiru-ai-labs/apps/govcon-leads-radar/docs/build/phase-2/step-2-4/build-log.md"
newsletter_sent: false
newsletter_date: ""
---

## The Moment

I had a whiteboard with four boxes on it: retrieval, ranking, prompting, generation. Underneath, in smaller letters, I'd written a rule I kept coming back to all week: _the model never gets to say "pursue" or "don't pursue."_ Every time I sketched a design that made the AI smarter, I had to ask whether it also made the AI more likely to break that rule. Most of the interesting decisions in this build came from that tension.

GovCon Leads Radar exists to help people selling to the U.S. government figure out which leads are worth their time. That sounds like a scoring problem. Score the lead, sort the list, done. But the moment you let an AI hand a seller a single number and call it a verdict, you've built something sellers can't trust and can't audit — and in a market where a bad call can mean chasing a contract you were never going to win, or worse, missing a compliance red flag, that's not a shortcut. It's a liability with a UI.

So I designed the opposite of a black box. Here's what that actually took.

## The Problem

Federal contracting sellers already have a process for judging leads. It's just not written down anywhere. They eyeball contract value, squint at how recent the award activity is, cross-reference it against what they know about a buyer's award patterns, and mentally flag anything that smells like a compliance risk. All of that lives in someone's head, gets reconstructed from memory every single day, and evaporates the moment that person takes a vacation.

My job wasn't to replace that judgment. It was to make the invisible parts of it visible, fast, and consistent, without pretending the AI could make the final call. That constraint touched every layer of the stack:

- **Retrieval**: how do you pull the right data out of two different government sources without either missing matches or hallucinating ones that don't exist?
- **Ranking**: how do you turn four different signals into a tier a seller can trust, without dressing up guesswork as precision?
- **Prompting**: how do you let a language model narrate _why_ a lead looks a certain way without accidentally exposing personal information about the humans behind a compliance flag?
- **Orchestration**: how do you wire four separate AI-generated explanations together into one coherent dashboard experience, without turning it into an unpredictable, expensive mess?

Each of those questions had an easy answer and a right answer, and they were rarely the same thing.

## The Struggle

The retrieval question hit first, and it's the one that usually teaches me the most. A lot of people building anything AI-adjacent in 2026 onward, will instinctively reach for semantic search. That is, embed everything, throw it in a vector store, let similarity search do the matching. It's flexible, and it "just works," especially for messy text.

Except most of what I needed to match wasn't messy text. Government award data has structure: a company name, a NAICS code, a contract value, a date. If I know the shape of what I'm matching, using semantic search anyway is like hiring a translator to read a spreadsheet. It technically works, but it's also the wrong tool, and it introduces exactly the kind of fuzzy uncertainty I was trying to design out of the product.

The genuinely hard part wasn't identifying that structured data needed structured queries. It was figuring out where the boundary sat. Some of what I needed to match, like resolving whether two entity names actually referred to the same company, or judging how severe a compliance flag really was, didn't have a clean deterministic answer. Those were exactly the places where semantic search earned its keep. There was no prior playbook telling me where that line was for this specific product; I had to draw it by testing what broke when I got it wrong.

The ranking problem exposed a different flavor of the same struggle. I had four signals I could compute: how large the contract value was relative to what a seller usually handles, how recent the activity was, whether the buyer's award pattern matched the seller's specialty, and whether there was a compliance flag attached. The tempting move was to weight them, blend them into a single score, and rank leads 1 to 100 (continuous scores feel more sophisticated. . .they also lie). A precise-looking number implies precision that four heuristic signals simply don't have, and the first time a seller sees two nearly identical leads scored 71 and 74, they'll (correctly) stop trusting the system.

The prompting layer had its own version of the fight. Once I started designing the actual language the AI would generate, like explaining why a lead landed in a given tier, or describing how serious a compliance flag was, I realized how easily this kind of system quietly leaks personal information about real people into places it shouldn't be. A compliance flag on a business entity often traces back to a named individual. A point-of-contact record does too. If I wasn't disciplined, that data could end up baked into a prompt template, then into a log file, then somewhere I'd have no way to retract it from.

## The Breakthrough

The retrieval answer came down to a principle I apply reflexively: match the retrieval mechanism to the shape of the data, not to whatever's trendy. Deterministic relational queries handle the parts of the problem that are genuinely structured and unambiguous. Semantic search earns its place only where the matching problem is fuzzy by nature: entity resolution across inconsistent naming, and severity judgment on data that doesn't fit neatly into predefined buckets. Splitting retrieval this way also gave me a clean way to reason about failure. When the deterministic path breaks, it's a data problem. When the semantic path breaks, it's a relevance problem. Those get debugged differently, and I know exactly where to look.

For ranking, the breakthrough was giving up on the score entirely. Instead of blending four signals into a number, I built a rule-cascade: a set of explicit if/then rules that map combinations of signal values to one of three discrete tiers, plus a separate flag for compliance concerns that sits alongside the tier rather than inside it. A lead is Tier 1, Tier 2, or Tier 3. It's never a 74. And every tier assignment carries a small piece of metadata recording _which_ signals drove that outcome, so a seller who disagrees with the system can see exactly why the system landed where it did, not just trust it blindly.

That separation of tiers from compliance flags mattered more than I expected going in. It would have been simpler to let a serious compliance concern automatically tank a lead's tier. But priority and risk are different questions. A Tier 1 lead with a flag is still worth pursuing, just with eyes open. Collapsing those into one number would have hidden that nuance behind a false sense of precision, exactly what I was trying to avoid.

The prompting breakthrough was less about a single decision and more about discipline turning into infrastructure. I locked a single structural template, role, context, constraints, instruction, examples, output format, reused across every kind of explanation the AI needed to generate. That consistency alone reduced a lot of surface area for mistakes. But the real unlock was treating "don't leak personal data into a prompt" as an enforceable rule in code, not a guideline I'd remember to follow under deadline pressure. Every generation angle was scoped to reference only categories and confidence levels, never a named individual. If a field wasn't on the approved list, it simply couldn't reach the model. That took what used to be a judgment call I'd have to make correctly every single time, and turned it into something the system enforces whether I'm paying attention or not.

The orchestration decision tied it together. I'd assumed I'd need some kind of competitive, multi-option generation setup, several draft explanations racing each other, with a scoring step picking the best one. It turns out that's the wrong shape for this problem. Each type of explanation the AI generates, why a tier looks the way it does, how serious a compliance flag is, how confident to be in a point of contact, is tied to one specific, deterministic moment in the seller's workflow. There's no competition to resolve. So I locked a sequential design instead: process each explanation one at a time, in order, using the same template with only the role and instruction changing. It's less flashy than a multi-candidate system. It's also predictable, debuggable, and cheap, three things that matter enormously more once you're running this in production instead of admiring it on a whiteboard.

## The Pattern

Here's the tradeoff I keep running into on this build: every time I was tempted to make the AI more capable, the more capable version was almost always the less trustworthy one. A single continuous score is more "capable" than three discrete tiers, in the sense that it carries more information. It's also a worse product decision, because it manufactures confidence the underlying signals don't actually have.

The real lesson is that "AI-fit" isn't a property of a task, it's a property of a _boundary_ you draw around a task. Entity resolution is AI-fit. Whether to pursue a federal contract is not, and never will be, no matter how good the model gets. The engineering work here wasn't teaching a model to be smart. It was building enough scaffolding, deterministic where possible, explainable everywhere, so that a human keeps full authority while getting real leverage from automation.

If I were starting today, I'd draw that boundary even earlier than I did. I spent real time on the retrieval split trying to find a general rule before I let myself just test cases and see where the line actually sat. The instinct to theorize the boundary in advance cost more time than just probing it would have.

## Your Turn

If you're building any kind of AI feature into a product where a wrong recommendation carries real consequences, where's the line you've drawn between what the model gets to influence and what it never gets to decide, and how did you enforce that line so it holds under deadline pressure instead of just living in a comment somewhere?
