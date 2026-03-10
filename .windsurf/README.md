# nickthiru.dev — Windsurf Skills Catalog

Complete catalog of ASI-compliant skills available in this workspace. Each skill is explicitly invoked — none are auto-applied.

Every skill follows the ASI V2 canonical structure: `SKILL.md` + `references/` (`01_SUMMARY.md`, `02_INTENT.md`, `03_POLICIES.md`, `04_PROCEDURE.md`).

**Ref:** [Windsurf Skills Docs](https://docs.windsurf.com/windsurf/cascade/skills) · [ASI Spec](https://github.com/JordanGunn/asi)

---

## Content Skills (4)

| Skill                 | Purpose                                                        | Depends On                       |
| --------------------- | -------------------------------------------------------------- | -------------------------------- |
| `voice-and-style`     | Foundational voice, 4-step pipeline, privacy policies          | —                                |
| `blog-writer`         | Blog post execution, SEO, templates, quality assurance         | `voice-and-style`                |
| `content-planner`     | Weekly theme selection, content mix, editorial routing         | `voice-and-style`, `blog-writer` |
| `content-distributor` | Multi-platform repurposing, scheduling, newsletter compilation | `voice-and-style`                |

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

**Writing a blog post:** `voice-and-style` (voice) → `blog-writer` (template, draft, SEO, quality)

**Daily content capture:** `content-planner` daily check-in procedure (morning engagement, build log seed)

**Weekly synthesis:** `content-planner` weekly theme selection → `blog-writer` (write post) → `content-distributor` (repurpose + distribute)

**Creating a new skill:** `asi-creator` (interactive creation loop) · `asi-onboard` (repository context)

---

## Other Windsurf Features

- **`global_rules.md`** — Workspace-wide behavioral directive
- **`_archive/`** — Legacy rules and workflows (no longer active)

---

## Content Pipeline

The full 6-stage content pipeline (Stage 0–5) is documented in the Building in Public manual at `thiru-ai-labs/docs/business/building-in-public/03-content-pipeline/`.

---

**Last Updated:** March 9, 2026
