# Writing Guide: Creating Blog Posts

This guide explains how to create new blog posts for nickthiru.dev.

---

## Quick Start

1. **Copy the template:**

   ```bash
   cp src/content/posts/_template.md src/content/posts/your-post-name.md
   ```

2. **Fill in the frontmatter** (the section between `---` markers)

3. **Write your content** using Markdown

4. **Preview locally:**

   ```bash
   npm run dev
   # Visit http://localhost:5173/writing
   ```

5. **Publish:** Set `draft: false` in frontmatter

---

## Frontmatter Fields (Required)

All blog posts **must** include these fields in the frontmatter:

### `title`

- **Type:** String (quoted)
- **Example:** `"Why I Build Production AI Systems with Code"`
- **Guidelines:**
  - Keep under 60 characters for SEO
  - Make it compelling and specific
  - Use sentence case or title case consistently

### `slug`

- **Type:** String (quoted)
- **Example:** `"why-i-use-langgraph-vs-low-code"`
- **Guidelines:**
  - Use lowercase
  - Use hyphens (not underscores or spaces)
  - Keep it short but descriptive
  - Should match the filename (without `.md`)

### `description`

- **Type:** String (quoted)
- **Example:** `"LangGraph and a full production stack vs. no/low-code AI builders—why code-first wins for serious agentic AI systems."`
- **Guidelines:**
  - 120-160 characters (optimal for SEO)
  - Summarize the post's value
  - Include keywords naturally

### `publishedAt`

- **Type:** String (quoted, ISO date format)
- **Example:** `"2026-01-16"`
- **Format:** `"YYYY-MM-DD"`
- **Note:** Must be quoted! `publishedAt: "2026-01-16"` ✅ not `publishedAt: 2026-01-16` ❌

### `track`

- **Type:** String (quoted)
- **Options:** `"technical"` or `"business"`
- **Example:** `"technical"`
- **Guidelines:**
  - **Technical:** Architecture, code, engineering deep-dives, build logs
  - **Business:** Positioning, pricing, customer learnings, strategy

### `tags`

- **Type:** Array of strings
- **Example:** `["ai-agents", "langgraph", "production-systems"]`
- **Guidelines:**
  - Use 3-5 tags per post
  - Use hyphens for multi-word tags (not spaces)
  - Be consistent with existing tags
  - Common tags: `ai-agents`, `langgraph`, `production-systems`, `architecture`, `sveltekit`, `aws`, `build-log`

### `draft`

- **Type:** Boolean
- **Options:** `true` or `false` (no quotes)
- **Example:** `draft: false`
- **Guidelines:**
  - Set to `true` while writing
  - Set to `false` when ready to publish
  - Draft posts won't appear on the site

---

## Complete Frontmatter Example

```yaml
---
title: "Why I Build Production AI Systems with Code, Not Drag-and-Drop"
slug: "why-i-use-langgraph-vs-low-code"
description: "LangGraph and a full production stack vs. no/low-code AI builders—why code-first wins for serious agentic AI systems."
publishedAt: "2026-01-16"
track: "technical"
tags: ["ai-agents", "langgraph", "production-systems", "architecture"]
draft: false
---
```

---

## Content Guidelines

### Structure

1. **Hook** - Start with a compelling question or statement
2. **Context** - Explain why this matters
3. **Main Content** - Break into sections with clear headings
4. **Examples** - Include code snippets, screenshots, or real-world cases
5. **Call-to-Action** - End with next steps or links to related content

### Writing Style

- **First person** - Write as "I" (authentic, personal)
- **Conversational** - Like explaining to a colleague over coffee
- **Specific** - Use concrete examples, not vague generalities
- **Scannable** - Short paragraphs, bullet points, headings
- **Technical but accessible** - Explain jargon, don't assume knowledge

### Markdown Tips

```markdown
# H1 - Post title (auto-generated from frontmatter)

## H2 - Main sections

### H3 - Subsections

**Bold** for emphasis
_Italic_ for subtle emphasis
`inline code` for variables, functions, commands

[Link text](https://example.com)

![Alt text](/images/screenshot.png)

> Blockquote for callouts or important notes

- Bullet points
- For lists

1. Numbered lists
2. For sequential steps

---

Horizontal rule for section breaks
```

### Code Blocks

Use fenced code blocks with language specification:

````markdown
```typescript
const example = "syntax highlighting";
```

```bash
npm run dev
```

```python
def example():
    return "works for any language"
```
````

---

## Common Mistakes to Avoid

❌ **Don't:**

- Forget to quote the `publishedAt` date
- Use spaces in tags (use hyphens: `ai-agents` not `ai agents`)
- Forget to set `draft: false` when ready to publish
- Use inconsistent slug and filename
- Skip the `track` field
- Write walls of text without headings

✅ **Do:**

- Quote all string values in frontmatter
- Use hyphens in multi-word tags and slugs
- Preview locally before publishing
- Keep paragraphs short (3-4 lines max)
- Use headings to structure content
- Include code examples where relevant

---

## Publishing Checklist

Before setting `draft: false`:

- [ ] All required frontmatter fields filled in correctly
- [ ] `publishedAt` date is quoted and in `YYYY-MM-DD` format
- [ ] Slug matches filename (without `.md`)
- [ ] Track is set to `"technical"` or `"business"`
- [ ] Tags use hyphens, not spaces
- [ ] Content is proofread
- [ ] Code examples are tested
- [ ] Links work
- [ ] Images load correctly
- [ ] Previewed locally at `http://localhost:5173/writing/[slug]`

---

## File Naming Convention

**Pattern:** `your-post-slug.md`

**Examples:**

- `why-i-use-langgraph-vs-low-code.md`
- `building-linkedin-ghostwriter.md`
- `what-are-ai-agents.md`

**Rules:**

- Lowercase only
- Use hyphens (not underscores or spaces)
- Should match the `slug` field in frontmatter
- Descriptive but concise

---

## Workflow

### 1. Create from Template

```bash
cd src/content/posts
cp _template.md my-new-post.md
```

### 2. Edit Frontmatter

```yaml
---
title: "My Post Title"
slug: "my-new-post"
description: "A great description"
publishedAt: "2026-01-16"
track: "technical"
tags: ["ai-agents", "langgraph"]
draft: true
---
```

### 3. Write Content

Use Markdown, keep it scannable, add examples.

### 4. Preview Locally

```bash
npm run dev
# Visit http://localhost:5173/writing
```

### 5. Publish

Set `draft: false` and commit.

---

## Troubleshooting

### Error: "Cannot read properties of undefined (reading 'split')"

- **Cause:** `publishedAt` date is not quoted
- **Fix:** Change `publishedAt: 2026-01-16` to `publishedAt: "2026-01-16"`

### Post doesn't appear on site

- **Check:** Is `draft: true`? Set to `false` to publish
- **Check:** Is the file in `src/content/posts/`?
- **Check:** Does the frontmatter have all required fields?

### Tags not displaying correctly

- **Check:** Are tags in an array? `tags: ["tag1", "tag2"]`
- **Check:** Are multi-word tags using hyphens? `"ai-agents"` not `"ai agents"`

### Wrong track badge showing

- **Check:** Is `track` set to `"technical"` or `"business"`?
- **Check:** Is it quoted? `track: "technical"` not `track: technical`

---

## Examples

See existing posts for reference:

- `src/content/posts/what-are-ai-agents.md` - Explainer post
- `src/content/posts/why-building-solo.md` - Business post
- `src/content/posts/langgraph-production-structure.md` - Technical deep-dive

---

**Questions?** Check existing posts or refer to this guide.
