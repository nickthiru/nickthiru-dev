---
subtitle: "Building a radar, not another lead list"
description: "Why GovCon Leads Radar went API-first and horizontal from day one, instead of chasing a narrow niche."
publishedAt: "2026-08-13"
slug: "govcon-radar-not-lead-list"
image: "/posts/govcon-radar-not-lead-list.png"
image_size: "lg"
draft: false
hashtags:
  ["#GovCon", "#FederalContracting", "#SalesIntelligence", "#B2B", "#AI"]
track: "product"
series_name: "GovCon Leads Radar"
series_slug: "govcon-leads-radar"
series_phase: "strategy"
series_position: 1
linkedin_url: "https://lnkd.in/p/gqMpRsfx"
x_url: ""
pinned: false
pinned_order:
newsletter_hook: "Before I wrote a line of code for GovCon Leads Radar, I had to answer a question that would quietly decide everything downstream: who is this actually for, and how will it talk to the world? Getting it wrong meant rebuilding the whole thing later. Here's the call I made, and why."
summary_two_sentence: "Before building anything, I had to decide whether GovCon Leads Radar would serve a narrow niche through a simple app, or a broad market through an API-first architecture. I chose the harder, more scalable path, and here's the reasoning behind it."
build_logs:
  - "thiru-ai-labs/apps/govcon-leads-radar/docs/build/discovery/product-vision/build-log.md"
  - "thiru-ai-labs/apps/govcon-leads-radar/docs/build/discovery/product-vision/output/product-vision.md"
newsletter_sent: false
newsletter_date: ""
---

## The User Moment

A sales rep at a small IT services firm opens a browser tab. She's not selling software to consumers, she's trying to find her next government client. So she opens USAspending.gov, types in a NAICS code, and starts scrolling. An hour later she has a spreadsheet of maybe-leads. Then she opens SAM.gov in another tab and starts checking each one by hand: is this vendor still registered, are they debarred, who's the point of contact. Then she opens LinkedIn to actually find that contact. By the time she's done, she's spent half her morning doing research instead of selling.

That's the moment GovCon Leads Radar is built around. Not "how do I find government contracts to bid on," but "how do I find the companies I should be selling _to_." It's a subtle but important flip: most tools in this space help contractors find opportunities. This one helps sellers find buyers and vendors worth approaching.

## The Design Problem

Here's the tradeoff I had to face before writing a single feature spec: who exactly is "the user," and how narrow should that definition be?

The obvious move would have been to pick a single, well-defined niche. Compliance vendors, for example, a group with clear, homogenous needs. Narrow niches are easier to build for, easier to market to, and easier to reach product-market fit with quickly.

But when I actually looked at the underlying problem, the pain wasn't specific to compliance vendors. It was structural. Any company selling into the federal government, cloud consultants, staffing firms, accounting firms, BD agencies, faces the exact same manual cross-referencing grind: cross-check award data, verify registration status, hunt for a real point of contact. The tool that solves this problem doesn't need to know what industry you're in. It needs to know that you're trying to sell to the government and you're currently doing this by hand.

That reframing had a second-order consequence I didn't expect: it wasn't just a market-sizing question. It was an architecture question.

## The Options

I considered three paths.

**Option one: build a narrow, vertical-specific tool.** Ship a simple web app targeted at one segment, with UI and messaging tuned to their specific workflow. Faster to build, faster to sell, lower risk of building something too generic to resonate with anyone.

**Option two: build a horizontal web app, but keep it a simple, standalone product.** Serve the broader market of GovCon sellers, but architect it as a typical monolithic web application, dashboard and business logic bundled together, no separation between "the product" and "the underlying engine."

**Option three: build API-first internally, with the web dashboard as just the first client.** Design the actual lead-generation and scoring engine as an internal API from day one. The dashboard becomes a consumer of that API, not the product itself. Any future product, whether a CRM integration, a raw data feed, or an entirely different front end, is just another client of the same underlying engine.

The pull toward option one was real. Niches are comfortable. But I kept running into the same conclusion: the actual cognitive bottleneck sellers face, isn't unique to a niche. It's universal to anyone who sells to the government. Building for a narrow slice would mean re-solving the same problem for every new segment I wanted to add later.

Option two solved the market question but not the architecture question. If I built a bundled app now and wanted to sell API access later, or add other clients, I'd effectively be re-architecting the whole product mid-flight.

## The Build

I went with option three: horizontal market, API-first from day one.

Concretely, that means the actual "radar" logic, running saved searches against public contracting data, cross-referencing results against registration and compliance sources, and scoring leads into tiers, lives behind an internal API. The web dashboard people will use at launch is simply the first client of that API. It has no special privileges the API itself doesn't expose.

The comparison against existing tools in this space came down to three things: most existing tools require manual cross-referencing between data sources rather than doing it automatically, most are built to help companies find contracts to bid _on_ rather than buyers to sell _to_, and most require you to re-enter and re-run your research from scratch every session instead of persisting it. Those three gaps became the core of what this product needed to do differently, and none of them are niche-specific. They're true for anyone doing this kind of prospecting.

What surprised me during this process wasn't the architecture decision itself, it was how much the "who is this for" question and the "how is this built" question turned out to be the same question. I went in thinking I'd separate market strategy from technical architecture. I came out realizing that going horizontal _required_ going API-first, because a horizontal product needs to support future clients I can't fully predict yet, an Enterprise API tier, integrations, maybe things I haven't thought of.

## The Verdict

Is this the right call? Honestly, I won't know for certain until real users are on the dashboard and I can see whether a horizontal, undifferentiated message actually resonates as broadly as I'm betting it will. That's the single assumption I'm most nervous about: that the market is large and consistent enough in behavior that one product and one message can serve compliance vendors, IT firms, and staffing agencies equally well, without needing separate versions for each.

What I'm confident about is the architecture. Even if the market bet turns out to need adjusting, an internal API-first design costs me almost nothing extra right now and gives me real optionality later. Nobody tells you this, but the hardest part of a horizontal bet isn't deciding to go broad, it's making sure your foundation doesn't quietly assume narrowness anyway. Building the dashboard as "just a client" instead of "the product" is what keeps that door open.

<!-- [INTERNAL LINK: relevant post on choosing a target market for a new SaaS product] -->

<!-- [INTERNAL LINK: relevant post on API-first architecture decisions] -->

<!-- [ALT: Diagram showing the web dashboard as one client sitting on top of an internal API layer, with placeholder boxes for future clients like an Enterprise API or CRM integration] -->

## Your Turn

If you were building a tool for a market this broad, would you have started narrow and expanded later, or would you have bet on the horizontal architecture from day one? What would make you change your mind partway through?
