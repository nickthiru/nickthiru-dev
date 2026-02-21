# nickthiru.dev — Windsurf Skills Catalog

Complete catalog of ASI-compliant skills available in this workspace. Each skill is explicitly invoked — none are auto-applied.

Every skill follows the ASI V2 canonical structure: `SKILL.md` + `references/` (`01_SUMMARY.md`, `02_INTENT.md`, `03_POLICIES.md`, `04_PROCEDURE.md`).

**Ref:** [Windsurf Skills Docs](https://docs.windsurf.com/windsurf/cascade/skills) · [ASI Spec](https://github.com/JordanGunn/asi)

---

## Content Skills (3)

| Skill                | Purpose                                                             | Depends On                       |
| -------------------- | ------------------------------------------------------------------- | -------------------------------- |
| `content-creator`    | Foundational voice, 4-step pipeline, privacy policies               | —                                |
| `blog-writer`        | Blog post execution, SEO, templates, quality assurance              | `content-creator`                |
| `content-strategist` | Daily capture, weekly synthesis, distribution, editorial calendar   | `content-creator`, `blog-writer` |

## ASI Tooling (3)

| Skill         | Purpose                              |
| ------------- | ------------------------------------ |
| `asi-onboard` | Build disk-backed repository context |
| `asi-creator` | Interactive ASI skill creation loop  |
| `asi-cli`     | Python CLI for ASI skill operations  |

---

## Skill Structure

```
.windsurf/skills/<skill-name>/
├── SKILL.md              ← identity, description, metadata
└── references/
    ├── 01_SUMMARY.md     ← scope and constraints
    ├── 02_INTENT.md      ← parameter compilation, guardrails
    ├── 03_POLICIES.md    ← mandatory and prohibited behaviors
    └── 04_PROCEDURE.md   ← canonical execution path
```

---

## Skill-to-Task Mapping

**Writing a blog post:** `content-creator` (voice) → `blog-writer` (template, draft, SEO, quality)

**Daily content capture:** `content-strategist` daily capture procedure (morning, during dev, end of day)

**Weekly synthesis:** `content-strategist` weekly synthesis procedure (review build logs → blog post → distribute)

**Creating a new skill:** `asi-creator` (interactive creation loop) · `asi-onboard` (repository context)

---

## Other Windsurf Features

- **`global_rules.md`** — Workspace-wide behavioral directive
- **`_archive/`** — Legacy rules and workflows (no longer active)

---

## Content Pipeline

```
thiru-ai-labs/build-logs/YYYY-MM-DD.md   (source material)
    ↓ manual integration
nickthiru-dev/scripts/content-transform.js (transformation)
    ↓
src/content/posts/                        (published content)
    ↓
LinkedIn, X/Twitter, Newsletter           (distribution)
```

---

**Last Updated:** February 20, 2026
