# Onboard Notes — nickthiru-dev content creation skills

## Repository Identity

- **Repo**: nickthiru-dev
- **Purpose**: Personal website and blog for Nick Thiru (nickthiru.dev)
- **Domain**: Content creation, personal branding, building in public
- **Tech stack**: SvelteKit (inferred from templates in `src/content/`)

## Current State (Pre-ASI Refactor)

### Skills (3)

| Skill | Lines | ASI-Compliant | Issues |
|---|---|---|---|
| `content-creator` | 91 | No | Monolithic SKILL.md, delegates to rules files, no references/ structure |
| `blog-writer` | 81 | No | Monolithic SKILL.md, delegates to rules files, no references/ structure |
| `content-strategist` | 89 | No | Monolithic SKILL.md, delegates to rules files, no references/ structure |

### Workflows (5)

| Workflow | Lines | Issues |
|---|---|---|
| `capture-daily-content` | 153 | Contains templates, timing data, checklists — should be a skill |
| `plan-weekly-content` | 100 | Contains templates, calendar, theme ideas — should be a skill |
| `write-technical-blog-post` | 97 | Step-by-step procedure — should be a skill |
| `write-business-blog-post` | 92 | Step-by-step procedure — should be a skill |
| `write-product-blog-post` | 94 | Step-by-step procedure — should be a skill |

### Rules (3 + global_rules.md)

| Rule | Lines | Issues |
|---|---|---|
| `voice-and-style.md` | 70 | Policy content — should live in skill 03_POLICIES.md files |
| `content-strategy.md` | 69 | Policy content — should live in skill 03_POLICIES.md files |
| `seo-and-quality.md` | 65 | Policy content — should live in skill 03_POLICIES.md files |
| `global_rules.md` | 10 | Pointer file to rules — will need updating |

## Key Invariants Extracted

### Voice

- Professional yet warm, humble & confident, empathetic & authentic
- Casual conversational language, personal narratives, light humor
- Universal post structure: Hook → Problem → Failed Attempts → Solution → Results → Lessons → CTA
- Signature phrases and analogies defined
- Strict "Never Do" and "Always Do" lists

### Content Strategy

- 3 tracks: technical (60%), business (30%), personal (10%)
- 4 platforms: Blog, Newsletter, LinkedIn, X/Twitter
- Pipeline: thiru-ai-labs build-logs → daily capture → weekly synthesis → blog → multi-platform
- Privacy framework: share patterns, not exploitable details

### SEO & Quality

- Meta description <160 chars, title <60 chars, proper heading hierarchy
- Internal links, image alt text, mobile-friendly
- Code examples must be tested with imports and error handling
- Quality checklist: 10 items before publishing

### Content Templates

- Located in `src/content/templates/`
- 3 track-specific templates: engineering, business, product
- Base template with frontmatter structure
- `src/content/todo/` excluded from AI processing

### Cross-Workspace Pipeline

- Source: `thiru-ai-labs/build-logs/YYYY-MM-DD.md`
- Transform: `scripts/content-transform.js`
- Output: `src/content/posts/`
- Manual integration only (no automatic triggers)

## ASI Compliance Issues

1. **Skills delegate to rules** — violates passivity illusion (rules cannot be assumed active)
2. **No references/ structure** — all skills are monolithic SKILL.md files
3. **No metadata.references** — skills don't declare reference files
4. **No scripts** — no validation or deterministic entrypoints
5. **Workflows should be skills** — all 5 workflows contain policy + procedure that should be skill-governed
6. **Massive overlap** — voice/SEO/quality content duplicated across rules, skills, and workflows

## Proposed Final Skill Set

Based on overlap analysis, the 3 skills + 5 workflows should consolidate into these ASI-compliant skills:

| Proposed Skill | Absorbs | Purpose |
|---|---|---|
| `content-creator` | current content-creator + voice-and-style rules + content-strategy rules | Foundational voice, 4-step pipeline, privacy policies |
| `blog-writer` | current blog-writer + seo-and-quality rules + write-technical + write-business + write-product workflows | Template system, SEO, track-specific procedures |
| `content-planner` | current content-strategist + capture-daily-content + plan-weekly-content workflows | Strategy, daily capture, weekly synthesis, distribution |

Each skill will follow ASI V2 canonical structure:
```
skill-name/
├── SKILL.md
└── references/
    ├── 01_SUMMARY.md
    ├── 02_INTENT.md
    ├── 03_POLICIES.md
    └── 04_PROCEDURE.md
```
