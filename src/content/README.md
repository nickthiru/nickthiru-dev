# Content Directory

This directory contains all content for the nickthiru-dev website, organized by purpose and workflow.

## Directory Structure

```
content/
├── README.md                 # This file - directory overview
├── posts/                    # Published blog posts
├── templates/                # Content templates for new posts
└── todo/                     # Personal content ideas and drafts
```

## Overview

### 📝 `posts/`

Contains published blog posts that follow the style guidelines in the content-creator skill. Each post uses one of the category-specific templates and maintains authentic voice and storytelling approach.

### 📋 `templates/`

Provides structured templates for creating new content:

- `_template.md` - Basic frontmatter and structure
- `engineering-template.md` - Technical deep-dives and architecture
- `business-template.md` - Business insights and strategy
- `product-template.md` - Product updates and build logs

### 🎯 Content Creator Skill

The comprehensive style guide that defines authentic voice, writing patterns, and content creation workflow. Located at `../.windsurf/skills/content-creator/SKILL.md`. All content should reference this guide for consistency and quality.

**For technical implementation of templates and automated content generation, use the blog-writer skill at `../.windsurf/skills/blog-writer/SKILL.md`.**

### 💡 `todo/`

Personal workspace for content ideas and drafts. Files in this directory are excluded from automated AI processing unless explicitly mentioned.

## Content Creation Workflow

1. **Ideation**: Start with a concept in `todo/` or directly outline
2. **Template Selection**: Choose appropriate template from `templates/`
3. **Draft Creation**: Write following content-creator skill style guidelines
4. **Publication**: Move completed posts to `posts/` directory

## Voice & Style

All content maintains a conversational, authentic voice that balances technical expertise with personal storytelling. Key characteristics:

- Professional yet warm tone
- Personal stories and specific details
- Honest about struggles and learning
- Educational and helpful approach

Refer to the content-creator skill at `../.windsurf/skills/content-creator/SKILL.md` for comprehensive guidelines on voice, structure, and quality standards.

## Quality Standards

Every piece of content should:

- Start with a compelling personal hook
- Include specific metrics and real examples
- Provide actionable insights or lessons learned
- Maintain SEO optimization without sacrificing authenticity
- End with clear next steps or engagement prompts

---

**Note**: This directory is organized to support both creative workflow and content consistency. The structure separates templates, published work, and ideas to maintain clarity while enabling efficient content creation.
