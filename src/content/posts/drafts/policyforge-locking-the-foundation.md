---
subtitle: "Inside the MVP Technical Stack"
description: "Inside the week I locked PolicyForge's technical foundation, and the tradeoffs I chose along the way."
publishedAt: "2026-08-02"
slug: "policyforge-locking-the-foundation"
image: "/posts/policyforge-locking-the-foundation.png"
image_size: "lg"
draft: false
hashtags:
  ["#CMMC", "#NIST800-171", "#CybersecurityCompliance", "#DFARS", "#Compliance"]
track: "product"
series_name: "PolicyForge"
series_slug: "policy-forge"
series_phase: "strategy"
series_position: 8
linkedin_url: ""
x_url: ""
pinned: false
pinned_order:
newsletter_hook: "Every product hits a moment where the ideas have to become actual choices: this framework, that database, this fallback plan. For PolicyForge, that moment meant locking a stack, a cost model, and a hard question we hadn't answered yet: what happens when the thing you're relying on goes down?"
summary_two_sentence: "Turning PolicyForge's MVP vision into a real technical foundation meant making concrete, sometimes uncomfortable tradeoffs on stack, cost, and risk. Here's what we locked in, what we rejected, and the one gap that almost slipped through."
build_logs:
  - "thiru-ai-labs/apps/secure-stack/policy-forge/docs/build/phase-1/step-1-6/build-log.md"
newsletter_sent: false
newsletter_date: ""
---

## The User Moment

Michael doesn't care what database PolicyForge runs on. He cares that when he opens the tool, his policy draft is there, it's accurate, and it doesn't cost him a consultant's hourly rate to get right.

But every one of those outcomes traces back to decisions nobody outside the build ever sees. Which framework routes requests where. Which service holds the data. What happens the one day a vendor has an outage. Those choices are invisible right up until they're the reason something breaks, or the reason it doesn't.

This was the week I locked in those choices for PolicyForge. Not the vision, not the roadmap — both of which had already been created at earlier stages — but the actual, load-bearing infrastructure the product will run on. It's a less glamorous milestone than announcing a feature or a launch date, but it's the one that determines whether everything built afterward has somewhere solid to stand.

(See: _[PolicyForge — The Product Vision](/writing/policyforge-product-vision)_)

(See: _[PolicyForge — Roadmap](/writing/policyforge-impact-map)_)

## The Design Problem

Here's the tradeoff every early-stage build runs into: you want to move fast and spend almost nothing, but you can't let "cheap and fast" quietly become "fragile." My regular approach to solving this is not picking one stack and hoping it holds forever. No, I always plan for two. A lean, low-cost tier to prove the product works, and a defined path to an enterprise-grade tier (e.g. AWS, provisioned through infrastructure-as-code) for when the product has real usage to justify it. The hard part isn't choosing between them. It's about being honest about which tier I was building for right now, and building in a way to move to the other one without a rewrite.

That sounds simple. In practice it meant every choice had to answer two questions at once: does this work today, and what do I do when it doesn't scale? "What I do" wasn't a shrug; it was already decided. Every low-cost choice at this stage has a named, more robust counterpart waiting on the other side of a specific trigger: a usage limit, a compliance requirement, a customer who needs guarantees a free tier can't give. I wasn't choosing cheap instead of enterprise-grade. I was choosing cheap first, with enterprise-grade already staged for the moment it's actually earned.

There was a second layer to the problem, too. PolicyForge isn't a simple form-fill tool. It's designed to run an interview, check whether the interview has gathered enough information, map that information against a compliance framework, generate policy language, and route the whole thing through human review before anything gets submitted. That's not a straight line. It loops. It waits on people. And the technical foundation had to be honest about that shape from day one, rather than forcing a simpler architecture onto a workflow that isn't actually simple.

## The Options

For the front-end and orchestration layer, I weighed convenience against flexibility. I picked SvelteKit, a full-stack framework that lets the client and the server-side logic live close together, paired with LangGraph.js for a graph-based orchestration approach rather than a straight linear pipeline. PolicyForge's workflow isn't linear; it needs to loop back on itself when the interview doesn't have enough information yet, or when a mapping needs another pass. A rigid, single-direction pipeline would have fought that reality instead of matching it. Choosing a stateful, graph-based orchestration layer over a simpler request-response chain costs a bit of upfront complexity, but it means the architecture won't need to be rebuilt the first time a workflow step needs to loop.

For the database, the real decision was whether to run separate systems for structured data and for the vector search PolicyForge needs to ground its policy generation in the right compliance frameworks. I chose Supabase, a single managed Postgres service with pgvector support built in, over standing up a dedicated vector database. One less moving part, one less bill, one less integration to maintain, at the cost of accepting that this one service now does more work than any other in the stack. I was explicit with myself about that tradeoff rather than pretending it away: consolidating onto one database is the right call for an MVP with no real users yet, and the wrong call to leave unexamined once real customers depend on this thing staying up.

For getting policy language out of the language models themselves, I didn't want to hard-wire myself to a single AI vendor. I'm routing model calls through Requesty.ai as a gateway layer instead of calling any one provider directly, and picking the smallest model capable of each specific task rather than defaulting to the biggest one everywhere. Two different tasks in the workflow, checking whether an interview has enough information versus mapping that information into a compliance framework, get two different-sized models, matched to how much reasoning each actually needs. Nobody tells you this, but a meaningful chunk of your AI cost problem disappears the moment you stop treating every request as if it needs your most expensive model. Claude Haiku handles the sufficiency check; Claude Sonnet is reserved for the framework mapping, where the reasoning actually matters.

Hosting was the easy call: Vercel, with a generous free tier and effectively zero setup overhead. That one didn't need much of a debate, and honestly, having at least one uncontested decision in a week full of tradeoffs was a relief. The enterprise-grade counterpart is already named too: AWS, provisioned through infrastructure-as-code (AWS CDK) rather than clicked together by hand, waiting for the trigger that says Vercel's free tier has been outgrown, not for a moment of panic.

The Requesty.ai gateway layer earned its place for a second reason beyond cost routing: it gives me a single point to enforce failover behavior if a model provider has an outage, rather than scattering that logic across every place in the code that calls a language model. That's the kind of decision that looks like overengineering right up until the day a provider goes down, at which point it looks like the only decision that mattered.

## The Build

What I locked in was a lean, cost-conscious foundation, but "cost-conscious" turned out to mean more than picking cheap services. It meant modeling cost honestly. Raw API pricing alone would make PolicyForge look far more expensive to run than it will actually be in practice, once semantic caching softens the load from repeated or similar requests. I built the cost model around both numbers, not just the sticker price, because planning against the wrong number is worse than not planning at all.

That cost model is tied to something more meaningful than a spreadsheet, too. The entire cost-savings premise behind PolicyForge only holds if the product genuinely replaces the consultant, not just supplements them. If a meaningful share of users still end up hiring a consultant after using the tool, the savings story falls apart regardless of how cheap the infrastructure is to run. So the cost work here wasn't just "keep this affordable." It was "keep this affordable without ever letting cost-cutting degrade the one output quality bar that determines whether people trust this instead of a human expert." Those are two different constraints, and it would have been easy to optimize for the wrong one.

I also defined specific, measurable triggers for when this lean setup needs to graduate to something sturdier: hitting free-tier usage limits on Supabase or Vercel, a compliance requirement that demands infrastructure I don't control at this tier, or a rush of activity around a shared deadline that several customers are working against at once. Naming those triggers in advance means the decision to scale up won't be a panicked reaction. It's a plan I've already agreed to, waiting for its trigger condition.

What surprised me wasn't a technical wall; it was a measurement one. I went looking for the response-time targets that should have already existed somewhere upstream, ready to transcribe into the budget. They weren't there. What I had were deadline and cost thresholds, not the second-by-second responsiveness numbers you'd want for something people interact with live. The real lesson was that not every product needs a stopwatch. PolicyForge isn't a chat interface where a half-second delay is felt; it's a process people wait on for a meaningful stretch of time, not seconds. So instead of forcing a number that didn't fit, I proposed sensible starting targets flagged clearly as provisional, and made sure the next steps in the build would treat those targets as something to revisit, not something carved in stone.

Alongside those targets, I set up a simple monitoring rule: get an early warning once usage or performance crosses a meaningful threshold toward its limit, well before it becomes an emergency. It's a small thing, but it's the difference between finding out about a problem from a dashboard and finding out about it from a user.

The one tradeoff I want to be upfront about: locking in a single managed database service without a backup plan for this MVP stage means that if that service goes down, the whole workflow will stop. The interview, the mapping, the review gates, all of it. I chose to accept that risk deliberately rather than over-build resilience for a product that doesn't have real users yet. It's the kind of decision that's easy to defend in a planning document and would be uncomfortable to defend the day it actually happens. I'm choosing to live with that discomfort now, on purpose, rather than later, by accident.

I also locked in a rule that has nothing to do with which tools I picked and everything to do with what PolicyForge promises: no policy will be submitted without a human looking at it first. Every approval point in the workflow will be enforced on the server, not the client, and there won't be an automated path around it. That's not a technical constraint. That's a promise about what kind of product this is, and it was important enough that it shaped the architecture rather than getting bolted on afterward.

## The Verdict

Does it solve the problem? Mostly, yes, and I want to be honest about the "mostly." The stack is real, on paper it's cheap to run at this stage, and it's flexible enough to swap pieces out later if something outgrows its free tier. The cost model is grounded in numbers I can defend, not numbers I hoped were true. The model-routing choice alone should keep my AI spend from becoming the thing that quietly kills the unit economics before I even have customers to test them against.

What's not fully solved yet is the fragility question. I know exactly where the single point of failure is. I chose to live with it for now rather than solve a scaling problem before there's anything to scale. That's a legitimate call for an MVP, but it's a call, not a solved problem, and it goes on the list of things to revisit before this gets in front of real customers.

<!-- <figure class="my-8">
  <img src="/posts/policyforge-locking-the-foundation-2.png"
       alt="Simple diagram showing PolicyForge's planned request flow"
       class="w-6/12 m-auto rounded-lg shadow-md" />
</figure> -->

<!-- <figure class="my-8">
  <img
    src="/posts/policyforge-locking-the-foundation-2.png"
    alt="..."
    class="w-6/12 m-auto rounded-lg shadow-md block md:hidden"
  />
  <img
    src="/posts/policyforge-locking-the-foundation-2-lg.png"
    alt="..."
    class="w-6/12 m-auto rounded-lg shadow-md hidden md:block"
  />
</figure> -->

<figure class="my-8">
  <picture>
    <!-- Landscape version for medium screens and up -->
    <source media="(min-width: 768px)" srcset="/posts/policyforge-locking-the-foundation-request-flow-diagram-landscape.png" />
    <!-- Portrait version for small screens (default fallback) -->
    <img 
      src="/posts/policyforge-locking-the-foundation-request-flow-diagram-portrait.png" 
      alt="Simple diagram showing PolicyForge's planned request flow: client → server logic → AI gateway → database, with the database marked as the current single point of failure" 
      class="w-full rounded-lg shadow-md" 
    />
  </picture>
  <figcaption class="text-center text-sm text-gray-500 mt-2">
    PolicyForge's request flow with the database as the current single point of failure.
  </figcaption>
</figure>

## Your Turn

If you're building an early-stage product right now: what's the one dependency in your stack that you know is a single point of failure, and are you fixing it now or consciously deciding to live with it a little longer?
