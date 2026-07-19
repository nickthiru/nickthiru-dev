# Newsletter Digest — Implementation Guide

**Last updated:** 2026-07-18  
**Status:** Active — first digest pending

---

## Overview

The newsletter has been restructured from a **single-article-per-issue** format to a **weekly digest** format. Each issue contains a personal note followed by a curated list of all blog posts published since the last newsletter.

The workflow is **two steps**:

1. **Generate the draft** (LLM task) — run `prompt_newsletter` in an AI assistant. It reads build logs, drafts the personal note, assembles digest entries, presents subject line options, and after your approval writes `.newsletter-draft.json`.
2. **Create the Brevo campaign** (script task) — run `send-newsletter-campaign.ts`. It reads the draft JSON, discovers articles, creates the campaign, and after you confirm the send, updates tracking, moves files, and deletes the draft.

---

## Concept: Why Digest Format?

### The Problem with Single-Article Issues

The previous format required picking one "featured" article per newsletter issue. When multiple articles were published in a week, this forced an artificial choice:

- Feature one article, defer the rest
- Send multiple issues per week (subscriber fatigue)
- Manually combine articles without template support

### The Digest Solution

Every published article gets equal treatment in a single issue:

- **No decision overhead** — no need to pick a "primary" article
- **Subscriber-friendly** — readers scan and click what interests them
- **Matches reality** — you publish multiple posts per week; the newsletter reflects that
- **Template-native** — Brevo's `{% for %}` loop handles the iteration cleanly

---

## Folder Structure

```
src/content/posts/
├── drafts/                          ← work in progress (draft: true)
└── published/
    ├── newsletter-pending/          ← live, not yet in newsletter
    └── newsletter-done/             ← already included in a newsletter
```

### How It Works

1. **When you finish an article**, save it to `published/newsletter-pending/` (with `draft: false` in frontmatter)
2. **The script scans only `newsletter-pending/`** — a small, manageable set. No scanning of 100+ old files.
3. **After the newsletter is sent**, the script moves each included article to `newsletter-done/`

### Why Two Folders?

Scanning every file in `posts/` for `newsletter_sent: false` becomes wasteful as the archive grows. The two-folder approach:

- Keeps the scan set small (only articles awaiting newsletter inclusion)
- Makes the file system the source of truth (no separate index)
- Moving files is a clear, auditable action
- The `newsletter-pending/` folder is your "inbox" for the next newsletter

### Site Routing

The site's post discovery glob was updated from `*.md` to `**/*.md` in `src/lib/utils/posts.ts`, so posts in subdirectories are found correctly.

---

## Key Frontmatter Fields

| Field             | Location            | Purpose                                                                                  |
| ----------------- | ------------------- | ---------------------------------------------------------------------------------------- |
| `draft`           | Article frontmatter | `true` = not yet published. Newsletter only includes `draft: false` articles.            |
| `newsletter_sent` | Article frontmatter | `false` = not yet included in a newsletter. Set to `true` after send.                    |
| `newsletter_date` | Article frontmatter | ISO date when the article was included in a newsletter.                                  |
| `newsletter_hook` | Article frontmatter | 60–80 word teaser, written at article creation time for email digest use.                |
| `build_logs`      | Article frontmatter | Array of source build log paths. Used by `prompt_newsletter` to draft the personal note. |

---

## Two-Step Workflow

### Step 1: Generate the Draft (LLM Task)

Run `prompt_newsletter` in your AI assistant. The prompt will:

1. Scan for articles where `draft: false` and `newsletter_sent: false`
2. Read the `build_logs` from each article's frontmatter
3. Apply privacy checks to the personal note
4. Draft the personal note from build logs (80–120 words) — **waits for your approval**
5. Assemble digest entries (title + hook + URL per article) — **waits for your approval**
6. Generate 2–3 subject line options — **waits for your selection**
7. Write `.newsletter-draft.json` with all approved values

**The JSON file contains:**

```json
{
  "personal_note": "your approved 80-120 word note here",
  "subject": "your selected subject line",
  "articles": [{ "title": "...", "hook": "...", "url": "..." }]
}
```

**Path:** `src/content/posts/published/newsletter-pending/.newsletter-draft.json`

The LLM writes this file directly — you don't need to save it manually.

### Step 2: Create the Brevo Campaign (Script Task)

Run `send-newsletter-campaign.ts`. The script:

1. **Loads `.newsletter-draft.json`** (or a custom path via `--config`)
2. **Scans `published/newsletter-pending/`** for `.md` files
3. **Reads frontmatter** of each file (custom YAML parser, no external dependency)
4. **Filters out** articles where `draft: true` or `newsletter_sent: true`
5. **Matches draft articles with discovered files**
6. **Displays discovered articles** — title, slug, URL, hook preview
7. **Asks for confirmation** — y/n before creating the campaign
8. **Creates the Brevo campaign** — via `createEmailCampaign` (marketing API)
9. **Asks if you sent it** — y/n after you've sent in Brevo
10. **Updates tracking** — appends to `newsletter-tracker.json`
11. **Updates frontmatter** — sets `newsletter_sent: true` + `newsletter_date`
12. **Moves files** — from `newsletter-pending/` to `newsletter-done/`
13. **Deletes `.newsletter-draft.json`** — cleanup after successful run

### Configuration (Manual Step)

Before running the script, update these two values in it:

```typescript
const TEMPLATE_ID = 11; // 👈 paste your Brevo template ID here
const LIST_ID = 11; // 👈 paste your Brevo subscriber list ID here
```

### Running the Script

```bash
# Default: reads from newsletter-pending/.newsletter-draft.json
npx tsx src/scripts/send-newsletter-campaign.ts

# Custom config path:
npx tsx src/scripts/send-newsletter-campaign.ts --config /path/to/draft.json
```

### Example Session

```
🔍 Scanning for newsletter-pending articles...

📰 Found 3 article(s) for this issue:

  1. Why I Price Monthly
     Slug: why-i-price-monthly
     URL:  https://nickthiru.dev/writing/why-i-price-monthly
     Hook: I almost went with usage-based pricing. Here's why I chose...

  2. Why Building Solo
     Slug: why-building-solo
     URL:  https://nickthiru.dev/writing/why-building-solo
     Hook: Everyone says find a co-founder. Here's why I chose to go...

  3. What Are AI Agents
     Slug: what-are-ai-agents
     URL:  https://nickthiru.dev/writing/what-are-ai-agents
     Hook: The term "AI agent" gets thrown around a lot. Here's what...

✅ Personal note loaded from draft (52 words)
✅ Subject line: This week: Why I Price, Why Building, What Are AI

📋 Campaign summary:
   Name:    Newsletter — Week of 2026-07-18
   Subject: This week: Why I Price, Why Building, What Are AI
   Articles: 3

Create draft campaign in Brevo? (y/n): y

✅ Draft campaign created successfully!
   Campaign ID: 42
   👉 Go to Brevo > Marketing > Campaigns to preview the draft.

Campaign sent in Brevo? (y/n): y

✅ Tracking updated. Articles moved to newsletter-done/.
✅ Draft config deleted.
```

### If Draft File Is Missing

```
⚠️  No valid .newsletter-draft.json found.
   Run prompt_newsletter first to generate the draft,
   then run this script.

   Expected config path: /path/to/.newsletter-draft.json
   Or specify a custom path: --config /path/to/file.json

   Expected format:
   {
     "personal_note": "...",
     "subject": "...",
     "articles": [
       { "title": "...", "hook": "...", "url": "..." }
     ]
   }
```

---

## Brevo Template Setup

### Template Language

Brevo uses **Django/Pongo2-style** syntax, not Liquid or Handlebars.

| Purpose         | Syntax                                                  |
| --------------- | ------------------------------------------------------- |
| Output variable | `{{ params.personal_note }}`                            |
| Loop array      | `{% for article in params.articles %} ... {% endfor %}` |
| Nested property | `{{ article.title }}`                                   |
| Conditional     | `{% if params.showFooter %} ... {% endif %}`            |

## Operational Workflow

### Publishing a New Article

1. Write the article (save to `drafts/` while working)
2. When ready to publish, move to `published/newsletter-pending/` with `draft: false` in frontmatter
3. The `article-draft.md` prompt already generates `newsletter_hook` (60–80 words), `build_logs`, `newsletter_sent: false`, and `newsletter_date: ""`

### Running the Newsletter

1. **Run `prompt_newsletter`** in your AI assistant
2. **Review and approve** each stage — the prompt pauses for your input at each step
3. **LLM writes `.newsletter-draft.json`** — no manual save needed
4. **Run the script**: `npx tsx src/scripts/send-newsletter-campaign.ts`
5. **Review discovered articles** — the script lists them with title, slug, URL, hook
6. **Confirm campaign creation** — type `y`
7. **Preview in Brevo** — go to Marketing → Campaigns, open the draft, send test email
8. **Send in Brevo** — schedule or send immediately
9. **Confirm in script** — type `y` when asked "Campaign sent in Brevo?"
10. **Done** — tracking updated, frontmatter updated, files moved, draft deleted

### If Something Goes Wrong

- **Script fails before campaign creation**: Articles remain in `newsletter-pending/`. Fix the error and re-run.
- **Campaign created but not sent**: Articles remain in `newsletter-pending/`. Fix the issue, delete the draft in Brevo, re-run the script.
- **Campaign sent but script didn't update tracking**: Manually run the tracking update (see below).

### Manual Tracking Update (Fallback)

If the script fails after you've sent the campaign:

1. Update each article's frontmatter:
   ```yaml
   newsletter_sent: true
   newsletter_date: "2026-07-18"
   ```
2. Move each file from `newsletter-pending/` to `newsletter-done/`
3. Append to `newsletter-tracker.json` (at `thiru-ai-labs/docs/business/building-in-public-latest/newsletter-tracker.json`):
   ```json
   {
     "date": "2026-07-18",
     "campaign_name": "Newsletter — Week of 2026-07-18",
     "subject": "This week: ...",
     "articles": ["slug-1", "slug-2"],
     "status": "sent"
   }
   ```

---

## Troubleshooting

### Loop Not Rendering in Brevo

- Verify the template uses the **Brevo Template Language** editor, not classic mode
- Ensure `params.` prefix is used: `{{ params.articles }}`, not `{{ articles }}`
- Check that `params` is passed as `Record<string, unknown>` in the API call
- Test with a minimal template: just `{% for a in params.articles %}{{ a.title }}{% endfor %}`

### Article Not Appearing in Newsletter

- Check the file is in `published/newsletter-pending/` (not `drafts/` or `newsletter-done/`)
- Check `draft: false` in frontmatter
- Check `newsletter_sent: false` in frontmatter

### Hook Too Long or Too Short

- The target is 60–80 words, set at article creation time in `article-draft.md`
- If a hook is outside this range, edit the frontmatter directly before running the script

### No Articles Found

- Make sure files are in `src/content/posts/published/newsletter-pending/`
- Check that frontmatter has `draft: false` (or no `draft` field) and `newsletter_sent: false` (or no `newsletter_sent` field)

---

## Files Reference

| File                          | Location                                     | Purpose                                              |
| ----------------------------- | -------------------------------------------- | ---------------------------------------------------- |
| `article-draft.md`            | `thiru-ai-labs/.../prompts/article-draft.md` | Generates article frontmatter with newsletter fields |
| `newsletter.md`               | `thiru-ai-labs/.../prompts/newsletter.md`    | Assembles digest (AI-assisted workflow)              |
| `newsletter-tracker.json`     | `thiru-ai-labs/.../newsletter-tracker.json`  | Audit trail of sent issues                           |
| `send-newsletter-campaign.ts` | `nickthiru-dev/src/scripts/`                 | Automated script (discovers, creates, tracks)        |
| `posts.ts`                    | `nickthiru-dev/src/lib/utils/`               | Site post discovery (glob updated to `**/*.md`)      |

---

## Migration Notes

- **Migrated from:** Buttondown (July 2026)
- **New tool:** Brevo (marketing campaign API)
- **Template language change:** Liquid/Handlebars → Django/Pongo2-style
- **Format change:** Single-article feature → weekly digest
- **Personal note:** Retained (80–120 words from build logs)
- **Exclusive insight:** Removed (was redundant with digest format)
- **Automation:** Two-step — LLM writes `.newsletter-draft.json`, script reads it, creates campaign, updates tracking, moves files, deletes draft
