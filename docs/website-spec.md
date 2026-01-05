# nickthiru.dev — Website Specification

**Version:** 1.1  
**Last Updated:** December 27, 2025  
**Purpose:** Implementation-ready spec for building the nickthiru.dev SvelteKit website.

**Status:** ✅ Implemented and deployed on `feature/brand-styling` branch

---

## 1. Brand & Positioning

### 1.1 One-Sentence Positioning

> I'm Nick Thiru—I build production-grade agentic AI systems and share everything I learn along the way.

---

### 1.2 Homepage Hero

**Headline:**

> Building agentic systems that ship.

**Subheadline:**

> I'm an AI systems architect designing LangGraph-powered micro-SaaS and automation products. I write about the engineering and the business of making AI agents work in production.

**Primary CTA:**

> Read my writing →

**Secondary CTA:**

> See what I'm building →

---

### 1.3 Short Bio (≈70 words)

> Nick Thiru is an AI systems architect and the founder of Thiru AI Labs, a solo studio focused on agentic micro-SaaS and automation systems. He combines full-stack web development, AWS CDK infrastructure, and LangGraph-based agent workflows to ship production-grade AI products. Nick writes about the technical and operational realities of building AI systems that actually work—architecture decisions, distribution experiments, and lessons from the field.

---

### 1.4 Long Bio (≈200 words)

> Nick Thiru is an AI systems architect building at the intersection of modern web infrastructure and agentic AI. He runs Thiru AI Labs, a solo studio where he designs, builds, and operates production-grade micro-SaaS products and automation systems powered by LangGraph agent workflows.
>
> His work sits in the gap between "AI demo" and "production system"—the messy middle where you need auth, billing, observability, and infrastructure that doesn't fall over. He believes the future of software is agentic: small, focused AI systems that handle real workflows end-to-end rather than generic chatbots.
>
> Nick publishes two tracks of content: **engineering** deep-dives (architecture patterns, benchmarks, build logs, postmortems) and **operating** insights (positioning, pricing, distribution experiments, customer learnings). Both are written for indie founders, operators, and builders who care about shipping, not just prototyping.
>
> Before going solo, Nick worked across full-stack web development and cloud infrastructure. He now spends his time building products, writing about the process, and occasionally consulting for teams who need help shipping agentic systems.
>
> He works remotely and shares his journey publicly at nickthiru.dev.

---

### 1.5 Voice & Tone Guidelines

**Sound like:**

- A thoughtful peer explaining something at a whiteboard
- Direct, clear, and specific—no fluff
- Confident but not arrogant; opinionated but open to being wrong
- Technical when needed, accessible always
- A builder who's in the arena, not a commentator on the sidelines

**Avoid:**

- Hype words: "revolutionary," "game-changing," "10x," "unlock"
- Vague claims: "leverage AI to transform your business"
- Corporate speak: "synergy," "stakeholders," "robust solutions"
- Excessive hedging: "I think maybe perhaps this could possibly..."
- Emojis in body copy (one or two in social posts is fine)

**Sentence style:**

- Short paragraphs (2–4 sentences max)
- Active voice preferred
- Concrete examples over abstract statements
- Use "I" freely—this is a personal site

---

## 2. Information Architecture (IA)

### 2.1 Full Sitemap

```
/                       → Home
/writing                → Writing index (all posts)
/writing/[slug]         → Individual post
/engineering            → Engineering posts (filtered: track=technical)
/operating              → Operating posts (filtered: track=operator)
/projects               → Projects index
/about                  → About page
/now                    → Now page (what I'm focused on currently)
/subscribe              → Email subscribe page
/rss.xml                → RSS feed
/sitemap.xml            → XML sitemap
/404                    → Not found page
```

---

### 2.2 Page Purposes & Primary CTAs

| Page                | Purpose                                            | Primary CTA                        |
| ------------------- | -------------------------------------------------- | ---------------------------------- |
| **/**               | First impression; establish credibility + intrigue | "Read my writing →"                |
| **/writing**        | Browse all posts; discover content                 | Click a post to read               |
| **/engineering**    | Technical readers find engineering content         | Click a post to read               |
| **/operating**      | Operator readers find business/strategy content    | Click a post to read               |
| **/writing/[slug]** | Read a single post; build trust                    | Subscribe at end of post           |
| **/projects**       | Showcase products/work; establish credibility      | Visit a project or read case study |
| **/about**          | Learn who Nick is; build connection                | "Get in touch" or Subscribe        |
| **/now**            | See current focus; feel connected                  | Subscribe or follow on social      |
| **/subscribe**      | Capture email; grow audience                       | Enter email                        |
| **/404**            | Recover from dead link gracefully                  | "Go home →"                        |

---

## 3. Content Model (Markdown-in-Repo)

### 3.1 Post Frontmatter Schema

```yaml
---
title: string              # Required. Post title.
slug: string               # Required. URL slug (no leading slash).
description: string        # Required. 1–2 sentence summary for SEO/cards.
publishedAt: string        # Required. ISO 8601 date (e.g., "2025-01-15").
updatedAt: string          # Optional. ISO 8601 date if significantly updated.
track: "technical" | "operator"  # Required. Determines filtered index.
tags: string[]             # Optional. Topic tags (e.g., ["langgraph", "pricing"]).
draft: boolean             # Optional. Default false. If true, exclude from production.
canonical: string          # Optional. Canonical URL if cross-posted.
image: string              # Optional. OG image path (relative to static/).
---
```

**Example:**

```yaml
---
title: "How I structure LangGraph agents for production"
slug: "langgraph-production-structure"
description: "A walkthrough of the patterns I use to keep LangGraph agents maintainable, testable, and observable in production."
publishedAt: "2025-01-20"
track: "technical"
tags: ["langgraph", "architecture", "agents"]
draft: false
---
```

---

### 3.2 Tagging Strategy

**Track (required):**

- `technical` — engineering-focused content (architecture, code, infra, benchmarks, postmortems)
- `operator` — business/founder-focused content (positioning, pricing, distribution, customer insights, launch retros)

**Tags (optional, freeform):**

- Use lowercase, hyphenated slugs: `langgraph`, `aws-cdk`, `pricing`, `distribution`
- Keep to 1–4 tags per post
- Tags are for discovery, not hierarchy

---

### 3.3 URL Rules

- Posts live at `/writing/[slug]`
- Slugs are lowercase, hyphenated, no dates in URL
- Slug must be unique
- No trailing slashes

**Examples:**

- `/writing/langgraph-production-structure`
- `/writing/why-i-price-monthly`

---

### 3.4 RSS Requirements

- Endpoint: `/rss.xml`
- Include: title, description, publishedAt, link, full content (or first 500 chars)
- Atom format preferred (works better with most readers)
- Exclude drafts

---

### 3.5 OpenGraph / Twitter Card Requirements

**Per-page meta:**

- `og:title` — post title or page title
- `og:description` — post description or page description
- `og:image` — post image or site default
- `og:url` — canonical URL
- `og:type` — "article" for posts, "website" for others
- `twitter:card` — "summary_large_image"
- `twitter:site` — "@nickthiru" (or actual handle)
- `twitter:creator` — "@nickthiru"

**Default OG image:** Create a simple branded fallback (site name + tagline on solid background).

---

## 4. Visual Design System

### 4.1 Mood Keywords

- **Calm** — restful whitespace, no visual noise
- **Sharp** — crisp typography, precise alignment
- **Technical** — monospace accents, code-friendly
- **Warm** — approachable, not cold or corporate
- **Focused** — content-first, minimal chrome

---

### 4.2 Color Palette

**Light mode (default):**

| Role            | Color          | Hex       |
| --------------- | -------------- | --------- |
| Background      | Light lavender | `#F5F0FA` |
| Surface         | Lighter tint   | `#FDFBFF` |
| Text primary    | Near-black     | `#1A1A1A` |
| Text secondary  | Dark gray      | `#525252` |
| Text muted      | Medium gray    | `#737373` |
| Accent          | Purple         | `#A286DE` |
| Accent hover    | Darker purple  | `#8161C7` |
| Pink            | Pink           | `#DA7ADA` |
| Blue            | Blue           | `#84A3DC` |
| Border          | Light gray     | `#E5E5E5` |
| Code background | Warm gray      | `#F5F5F4` |

**Dark mode (optional toggle):**

| Role            | Color          | Hex       |
| --------------- | -------------- | --------- |
| Background      | Near-black     | `#0A0A0A` |
| Surface         | Dark gray      | `#171717` |
| Text primary    | Off-white      | `#FAFAFA` |
| Text secondary  | Light gray     | `#A3A3A3` |
| Text muted      | Medium gray    | `#737373` |
| Accent          | Bright teal    | `#14B8A6` |
| Accent hover    | Lighter teal   | `#2DD4BF` |
| Border          | Dark border    | `#262626` |
| Code background | Darker surface | `#1C1C1C` |

**Recommendation:** Ship light mode first. Add dark mode toggle later if desired (store preference in localStorage).

---

### 4.3 Typography

**Headings:** Poppins (Google Fonts) — rounded geometric, excellent readability  
**Body:** Poppins — same family for cohesion  
**Monospace:** JetBrains Mono (Google Fonts) — excellent for code blocks

**Scale (base 16px):**

| Element | Size             | Weight | Line Height |
| ------- | ---------------- | ------ | ----------- |
| H1      | 2.25rem (36px)   | 700    | 1.2         |
| H2      | 1.75rem (28px)   | 700    | 1.3         |
| H3      | 1.375rem (22px)  | 700    | 1.4         |
| H4      | 1.125rem (18px)  | 700    | 1.4         |
| Body    | 1.0625rem (17px) | 500    | 1.7         |
| Small   | 0.875rem (14px)  | 500    | 1.5         |
| Code    | 0.9375rem (15px) | 400    | 1.6         |

---

### 4.4 Spacing Scale

Use Tailwind's default spacing scale. Key values:

- `4` (1rem / 16px) — base unit
- `6` (1.5rem / 24px) — tight gaps
- `8` (2rem / 32px) — section padding
- `12` (3rem / 48px) — large gaps
- `16` (4rem / 64px) — section separators
- `24` (6rem / 96px) — hero/major section spacing

---

### 4.5 Layout Grid

- **Max content width:** 680px (prose-optimized)
- **Max page width:** 1200px (for wider layouts like projects grid)
- **Side padding:** 1.5rem (mobile), 2rem (desktop)
- **Single-column layout** for all reading pages (no sidebars)

---

### 4.6 Component Style Notes

**Buttons:**

- Primary: Accent background, white text, rounded-md, subtle shadow
- Secondary: Transparent background, accent text, accent border
- Hover: Slight scale (1.02) + color shift
- Focus: Visible ring (2px accent)

**Links:**

- Inline links: Accent color, underline on hover
- Navigation links: Text primary, accent on hover, no underline

**Cards (for post lists):**

- White/surface background
- Subtle border or shadow
- Padding: 1.5rem
- Hover: Slight lift (translateY -2px) + shadow increase

**Code blocks:**

- Code background color
- Rounded corners (rounded-lg)
- Padding: 1rem
- Horizontal scroll for overflow
- Syntax highlighting: Use Shiki with "github-light" / "github-dark" themes

**Blockquotes:**

- Left border (3px accent)
- Italic text
- Slightly indented (left padding)
- Text secondary color

**Callouts (optional):**

- Background tint (accent at 10% opacity)
- Left border (3px accent)
- Icon optional (info, warning, tip)

---

## 5. Page-Level Layout Specs

### 5.1 Home (/)

**Sections (top to bottom):**

1. **Nav bar** — Logo/name (left), nav links (right): Writing, Projects, About
2. **Hero section**
   - Profile photo (right side, 224px width, rectangular with rounded corners and purple border)
   - Headline: "Building agentic systems that ship."
   - Subheadline: "I'm an AI systems architect designing LangGraph-powered micro-SaaS and automation products. I write about the engineering and the business of making AI agents work in production."
   - Primary CTA: "Read my writing →" (links to /writing)
   - Secondary CTA: "See what I'm building →" (links to /projects)
3. **Recent posts section**
   - Heading: "Recent writing"
   - Show 4–6 most recent posts (mixed tracks)
   - Each post card: title, description (truncated), date, track badge
   - Link: "View all →" (to /writing)
4. **Featured projects section** (optional on v1)
   - Heading: "Projects"
   - Show 2–3 featured projects
   - Link: "View all →" (to /projects)
5. **Footer**
   - Links: Writing, Projects, About, Now, Subscribe, RSS
   - Social links: Twitter/X, LinkedIn, GitHub
   - Copyright: "© 2025 Nick Thiru"
   - Note: Sitemap link removed (sitemaps are for search engines, not users)

---

### 5.2 Writing Index (/writing)

**Sections:**

1. **Nav bar**
2. **Page header**
   - Title: "Writing"
   - Subtitle: "Technical deep-dives and operator insights on building agentic AI systems."
   - Filter pills: "All" (active), "Engineering", "Operating" — these link to /writing, /engineering, /operating
3. **Post list**
   - Sorted by publishedAt descending
   - Each post: title (linked), description, date, track badge, tags (subtle)
   - No pagination initially; load all (reasonable for <100 posts). Add pagination later if needed.
4. **Footer**

---

### 5.3 Engineering Index (/engineering)

**Same layout as /writing, with:**

- Title: "Engineering"
- Subtitle: "Architecture patterns, build logs, benchmarks, and postmortems."
- Filter pills: "All", "Engineering" (active), "Operating"
- Post list filtered to `track: "technical"`

---

### 5.4 Operating Index (/operating)

**Same layout as /writing, with:**

- Title: "Operating"
- Subtitle: "Positioning, pricing, distribution experiments, and lessons from shipping."
- Filter pills: "All", "Engineering", "Operating" (active)
- Post list filtered to `track: "operator"`

---

### 5.5 Post Detail (/writing/[slug])

**Sections:**

1. **Nav bar**
2. **Article header**
   - Track badge (e.g., "Engineering" or "Operating")
   - Title (H1)
   - Meta line: "January 20, 2025 · 8 min read"
   - Tags (subtle, linked)
3. **Table of contents** (sticky on desktop, collapsible on mobile)
   - Auto-generated from H2/H3 headings
   - Highlight current section on scroll
4. **Article body**
   - Rendered markdown
   - Max-width 680px, centered
   - Proper typography (see 4.3)
   - Code blocks with syntax highlighting
5. **Post footer**
   - Horizontal rule
   - "Thanks for reading. If this was useful, subscribe for more."
   - Email subscribe inline form (simple: email input + button)
   - Prev/Next post links (optional, can add later)
6. **Footer**

---

### 5.6 Projects (/projects)

**Sections:**

1. **Nav bar**
2. **Page header**
   - Title: "Projects"
   - Subtitle: "Products and systems I've built or am building."
3. **Projects grid**
   - 2-column grid on desktop, 1-column on mobile
   - Each project card:
     - Name
     - One-line description
     - Status badge: "Live" / "In Progress" / "Archived"
     - Link to project URL or case study post
4. **Footer**

**Example projects (for seed content):**

| Name                       | Description                                               | Status      |
| -------------------------- | --------------------------------------------------------- | ----------- |
| LinkedIn Ghostwriter Agent | AI-powered LinkedIn content assistant for busy founders.  | In Progress |
| Thiru AI Labs              | Solo studio for agentic micro-SaaS and automation.        | Live        |
| nickthiru.dev              | This site—built with SvelteKit, markdown-in-repo, Vercel. | Live        |

---

### 5.7 About (/about)

**Sections:**

1. **Nav bar**
2. **Page header**
   - Title: "About" (centered)
3. **Content section** (centered)
   - Profile photo (circular, 192px, centered with purple border)
   - Long bio in first person ("I'm...", "I run...", "My work...")
   - "What I'm working on now" (link to /now)
   - "Get in touch" — email link
   - Social links: Twitter/X, LinkedIn, GitHub
4. **Footer**

---

### 5.8 Now (/now)

**Sections:**

1. **Nav bar**
2. **Page header**
   - Title: "Now"
   - Subtitle: "What I'm focused on right now. Updated regularly."
   - Last updated date
3. **Content section** (freeform markdown)
   - Current projects
   - Current learning
   - Current reading
   - Anything else relevant
4. **Footer**

**Note:** This is a single markdown file, not a collection. Simpler to implement.

---

### 5.9 Subscribe (/subscribe)

**Sections:**

1. **Nav bar**
2. **Page content**
   - Title: "Subscribe"
   - Copy: "Get new posts in your inbox. No spam, unsubscribe anytime."
   - Email input + Submit button
   - **Implementation:** Server-side API endpoint for secure Buttondown integration
     - Client form POSTs to `/api/subscribe` (SvelteKit server endpoint)
     - Server endpoint POSTs to Buttondown v1 API: `https://api.buttondown.com/v1/subscribers`
     - Required server env var: `BUTTONDOWN_API_KEY` (never expose to client)
     - Request body: `{ email_address: string, tags: string[] }`
     - Optional: `tags` array to segment subscribers (e.g., `["technical"]`, `["operator"]`, `["site"]`)
     - Success: Show confirmation message
     - Error: Display user-friendly error message
3. **Footer**

---

### 5.10 404 Page

**Sections:**

1. **Nav bar**
2. **Content**
   - Large "404"
   - "Page not found. It might have moved or never existed."
   - "Go home →" button
3. **Footer**

---

## 6. Interaction & UX Details

### 6.1 Navigation Behavior

**Desktop:**

- Horizontal nav bar, fixed at top (subtle background blur on scroll)
- Logo/name on left, links on right: Writing, Projects, About
- Active page indicated with underline or accent color

**Mobile:**

- Hamburger menu (top right)
- Slide-in drawer from right (or simple dropdown)
- Same links + Subscribe, RSS

---

### 6.2 Search

**Recommendation:** No search for v1. With <100 posts, browsing + filtering is sufficient. Add search later if needed (use Pagefind for static search).

---

### 6.3 Table of Contents (Posts)

**Yes.** Implement for posts.

- Desktop: Sticky sidebar on the right (appears after scrolling past header)
- Mobile: Collapsible TOC at top of article (below header, above body)
- Auto-generated from H2/H3
- Highlight current section on scroll
- Click to smooth-scroll to section

---

### 6.4 Prev/Next Post Navigation

**Optional for v1.** Nice to have, but not critical. If implemented:

- Show at bottom of post, above footer
- "← Previous: [Title]" and "Next: [Title] →"
- Only within same track, or across all posts (decide based on preference)

---

### 6.5 Reading Time

**Yes.** Display on post cards and post header.

- Calculate: ~200 words per minute
- Format: "8 min read"

---

### 6.8 Analytics (Optional)

**Recommendation:** Use Plausible (privacy-focused) and keep it behind env vars.

- Env var: `PUBLIC_PLAUSIBLE_DOMAIN=nickthiru.dev`
- Optional env var (self-hosted Plausible): `PUBLIC_PLAUSIBLE_SCRIPT_SRC=https://plausible.yourdomain.com/js/script.js`

---

### 6.6 Code Syntax Highlighting

**Required.** Use Shiki (works well with SvelteKit + mdsvex).

- Themes: "github-light" for light mode, "github-dark" for dark mode
- Support common languages: javascript, typescript, python, bash, yaml, json, markdown
- Line numbers: Optional (off by default, can add later)
- Copy button: Nice to have (can add later)

---

### 6.7 Accessibility Checklist

- [ ] All images have alt text (or empty alt for decorative)
- [ ] Color contrast meets WCAG AA (4.5:1 for body text)
- [ ] Focus states visible on all interactive elements
- [ ] Skip-to-content link (hidden until focused)
- [ ] Proper heading hierarchy (H1 → H2 → H3, no skipping)
- [ ] Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`
- [ ] Form inputs have associated labels
- [ ] Buttons have accessible names
- [ ] No keyboard traps
- [ ] Reduced motion: respect `prefers-reduced-motion`

---

## 7. Tech Constraints

### 7.1 Framework

**SvelteKit** — latest stable version.

---

### 7.2 Styling

**TailwindCSS** — v3.x or v4.x (latest stable).

- Use `@tailwind base`, `@tailwind components`, `@tailwind utilities`
- Extend theme for custom colors, fonts
- Prefer utility classes; extract components only when repeated 3+ times

---

### 7.3 Markdown Processing

**mdsvex** — Svelte-flavored markdown processor.

- Store posts in `src/content/posts/*.md`
- Store pages (now, about) in `src/content/pages/*.md` or inline in routes
- Use `+page.server.ts` to load and parse markdown at build time

---

### 7.4 Syntax Highlighting

**Shiki** — integrates with mdsvex via rehype plugin.

---

### 7.5 Deployment

**Vercel** — use `@sveltejs/adapter-vercel` or `adapter-static` (static preferred for simplicity).

- Static generation: prerender all routes
- No server functions needed for v1

---

### 7.6 Other Dependencies (suggested)

- `date-fns` or `dayjs` — date formatting
- `reading-time` — calculate read time from content
- `feed` — generate RSS/Atom feed

---

### 7.7 File Structure (suggested)

```
nickthiru-dev/
├── src/
│   ├── lib/
│   │   ├── components/       # Reusable components
│   │   ├── utils/            # Helpers (date formatting, reading time)
│   │   └── config.ts         # Site config (name, URL, social links)
│   ├── content/
│   │   └── posts/            # Markdown posts
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +page.svelte      # Home
│   │   ├── writing/
│   │   │   ├── +page.svelte  # Writing index
│   │   │   └── [slug]/
│   │   │       └── +page.svelte  # Post detail
│   │   ├── engineering/
│   │   │   └── +page.svelte
│   │   ├── operating/
│   │   │   └── +page.svelte
│   │   ├── projects/
│   │   │   └── +page.svelte
│   │   ├── about/
│   │   │   └── +page.svelte
│   │   ├── now/
│   │   │   └── +page.svelte
│   │   ├── subscribe/
│   │   │   └── +page.svelte
│   │   ├── rss.xml/
│   │   │   └── +server.ts
│   │   └── sitemap.xml/
│   │       └── +server.ts
│   └── app.html
├── static/
│   ├── favicon.ico
│   └── og-default.png        # Default OG image
├── tailwind.config.js
├── svelte.config.js
├── package.json
└── README.md
```

---

## 8. Seed Content Requirements

For the engineer/LLM building this site, include:

1. **2–3 example posts** (real titles, short but realistic content, proper frontmatter)
2. **2–4 example projects** (realistic names, descriptions, statuses)
3. **Now page content** (placeholder but realistic)
4. **About page content** (use long bio from section 1.4)

---

## 9. README Requirements

The project README should include:

1. Local dev commands (`pnpm install`, `pnpm dev`, `pnpm build`)
2. How to add a new post (create file, frontmatter, etc.)
3. How tracks/tags work
4. How to deploy to Vercel (connect repo, auto-deploy on push)
5. Environment variables (if any)

---

**End of Specification.**
