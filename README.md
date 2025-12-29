# nickthiru.dev

Personal website and blog for Nick Thiru — built with SvelteKit, TailwindCSS, and markdown-in-repo publishing.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── content/
│   └── posts/          # Markdown blog posts
├── lib/
│   ├── components/     # Reusable Svelte components
│   ├── utils/          # Helper functions
│   └── config.ts       # Site configuration
├── routes/
│   ├── +layout.svelte  # Root layout
│   ├── +page.svelte    # Home page
│   ├── writing/        # Blog post listing & detail
│   ├── engineering/    # Technical posts (filtered)
│   ├── operating/      # Operator posts (filtered)
│   ├── projects/       # Projects showcase
│   ├── about/          # About page
│   ├── now/            # Now page
│   ├── subscribe/      # Email subscription
│   ├── rss.xml/        # RSS feed
│   └── sitemap.xml/    # XML sitemap
└── app.css             # Global styles (Tailwind)
```

## Adding a New Post

1. Create a new `.md` file in `src/content/posts/`:

```markdown
---
title: "Your Post Title"
slug: "your-post-slug"
description: "A brief description for SEO and cards."
publishedAt: "2025-01-20"
track: "technical" # or "operator"
tags: ["tag1", "tag2"]
draft: false
---

Your post content here...
```

2. Save and the post will appear automatically.

## Frontmatter Schema

| Field         | Type                          | Required | Description                   |
| ------------- | ----------------------------- | -------- | ----------------------------- |
| `title`       | string                        | Yes      | Post title                    |
| `slug`        | string                        | Yes      | URL slug (no leading slash)   |
| `description` | string                        | Yes      | 1-2 sentence summary          |
| `publishedAt` | string                        | Yes      | ISO date (YYYY-MM-DD)         |
| `track`       | `"technical"` \| `"operator"` | Yes      | Content category              |
| `tags`        | string[]                      | No       | Topic tags                    |
| `draft`       | boolean                       | No       | Hide from production if true  |
| `updatedAt`   | string                        | No       | ISO date if updated           |
| `canonical`   | string                        | No       | Canonical URL if cross-posted |
| `image`       | string                        | No       | OG image path                 |

## How Tracks Work

Posts are categorized into two tracks:

- **`technical`** — Engineering content: architecture, code, infra, benchmarks, postmortems
- **`operator`** — Business content: positioning, pricing, distribution, customer insights

The track determines which filtered index the post appears in:

- `/writing` — All posts
- `/engineering` — Posts with `track: "technical"`
- `/operating` — Posts with `track: "operator"`

## Draft Posts

Set `draft: true` in frontmatter to hide a post from production builds.

During development (`npm run dev`), drafts are visible so you can preview them.

## Deploying to Vercel

### Initial Setup

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and create a new project
3. Import your GitHub repository
4. Vercel will auto-detect SvelteKit and configure the build

### Configuration

The project uses `@sveltejs/adapter-static` for static site generation. No additional Vercel configuration is needed.

### Automatic Deployments

- **Production**: Every push to `main` triggers a production deploy
- **Previews**: Every PR gets a preview deployment URL

### Custom Domain

1. Go to Project Settings → Domains
2. Add `nickthiru.dev`
3. Update DNS as instructed

## Environment Variables

No environment variables required for basic functionality.

If you add email capture later (e.g., ConvertKit, Buttondown), you'll add API keys here.

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) with Typography plugin
- **Markdown**: [mdsvex](https://mdsvex.pngwn.io/)
- **Syntax Highlighting**: [Shiki](https://shiki.matsu.io/)
- **Deployment**: [Vercel](https://vercel.com/)

## License

Content is © Nick Thiru. Code is MIT licensed.
