---
description: Identity and scope of blog-writer.
index:
  - Identity
  - Scope
  - Constraints
---

# Summary

## Identity

`blog-writer` is the execution skill for blog content on nickthiru.dev. It handles template selection, track-specific writing procedures, SEO optimization, quality assurance, and publication setup. It depends on `content-creator` for voice characteristics and privacy policies.

## Scope

It performs:

- Track-specific blog post creation (engineering, business, product)
- Template selection and content structure enforcement
- SEO optimization (meta descriptions, titles, headings, internal links, images)
- Technical content standards (tested code, imports, error handling, versions)
- Quality assurance checklist before publishing
- Publication frontmatter setup and distribution guidance

It does NOT:

- Define voice or writing style (use `content-creator`)
- Define privacy or sharing policies (use `content-creator`)
- Plan content calendars or daily capture routines (use `content-planner`)
- Handle cross-platform distribution strategy (use `content-planner`)

## Constraints

- Every blog post must use a template from `src/content/templates/`
- SEO policies are non-negotiable — all posts must pass the quality checklist
- Voice application always defers to `content-creator` policies
- Track must be explicitly identified: engineering, business, or product
- Word count target: 800–1500 words per post
