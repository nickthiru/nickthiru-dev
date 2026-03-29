---
description: Canonical blog post templates owned by the blog-writer skill.
index:
  - Base Template
  - Engineering Track Template
  - Business Track Template
  - Product Track Template
---

# Templates

This file contains the canonical blog post templates for all three content tracks. These are the single source of truth — there are no separate template files elsewhere in the repository.

## How to Use

1. Copy the **Base Template** frontmatter into a new file under `src/content/posts/`.
2. Set the `track` field to `engineering`, `business`, or `product`.
3. Below the frontmatter, follow the corresponding **Track Template** structure.
4. Refer to `04_PROCEDURE.md` for the full 9-step writing process.

---

## Base Template

Every blog post starts with this frontmatter. All fields are required unless marked optional.

```markdown
---
title: "Your Post Title Here"
slug: "your-post-slug-here"
description: "A concise description of your post (shown in previews and SEO)"
publishedAt: "YYYY-MM-DD"
updatedAt: ""
track: "engineering" # Options: "engineering", "business", "product"
tags: ["tag1", "tag2", "tag3"]
draft: true # Set to false when ready to publish
image: "" # Optional: path to hero image
linkedin_url: "" # Populated after weekly social posts are live
x_url: "" # Populated after weekly social posts are live
---
```

**Field notes:**

- `slug` — URL-safe, lowercase, hyphens only. Must be unique across all posts.
- `tags` — Use hyphens for multi-word tags: `"ai-agents"`, `"production-systems"`.
- `draft: true` — Always start as draft. Set to `false` only after passing the quality checklist in `03_POLICIES.md`.
- `track` — Determines which track template to follow below.

---

## Engineering Track Template

For technical deep-dives, architecture decisions, debugging stories, and implementation walkthroughs.

```markdown
# [Technical Problem / Solution Title]

I spent [time period] trying to solve [technical challenge].

## The Problem

[Specific technical problem with context — what you were building, why it mattered]

## What Didn't Work

[Failed attempt 1 + why it failed]
[Failed attempt 2 + why it failed]

## The Breakthrough

[Key insight that led to the solution]

## Step-by-Step Solution

1. [Step 1 with code example]
2. [Step 2 with code example]
3. [Step 3 with code example]

## Testing & Validation

[How to verify the solution works]

## Production Considerations

[Performance, scaling, monitoring notes]

## What I Learned

[Technical insights and broader principles]

## What I'd Do Differently

[Advice for others facing this problem]

## Your Turn

[Specific engagement question — e.g. "What's the hardest debugging problem you've faced with [tech]? I'd love to hear how you solved it."]

## Join the Discussion

Have thoughts on this? I'd love to hear them.
Share your experience on [LinkedIn](LINKEDIN_URL) or [X](X_URL).
```

**Track-specific requirements:**

- All code examples must be tested and functional
- Include imports and dependencies
- Add error handling and edge cases
- Specify library/framework versions
- Show the debugging process, not just the final solution
- Explain WHY something works, not just THAT it works
- Connect technical topics to business benefits where relevant

---

## Business Track Template

For revenue transparency, pricing decisions, operations insights, and strategic reflections.

```markdown
# [Transparency Insight Title]

I decided to share [specific metric/experience] publicly.

## Why Share This?

[Thinking behind the transparency decision]

## What I Shared

[Specific information + format — be concrete]

## Business Impact

[How it affected trust/growth/engagement]

## The Scary Part

[What made me hesitant + how I handled it]

## What Happened

[Actual outcomes + audience response]

## Guidelines for Others

[Safe framework for building in public — actionable advice]

## Your Turn

[Specific engagement question — e.g. "What metric do you wish you'd shared publicly earlier?"]

## Join the Discussion

Have thoughts on this? I'd love to hear them.
Share your experience on [LinkedIn](LINKEDIN_URL) or [X](X_URL).
```

**Track-specific requirements:**

- Include specific metrics and data points throughout
- Provide frameworks and mental models
- Share both successes and failures transparently
- Apply privacy decision framework before publishing
- Revenue numbers rounded (e.g., "$5K MRR" not "$5,234.12")

---

## Product Track Template

For feature launches, user feedback incorporation, beta programs, and product-market fit explorations.

```markdown
# Build Log: [Product Name / Feature]

Today I got [specific milestone] working.

## What I Built

[Description of feature/progress + technical details at a high level]

## How It Works

[User-facing explanation — step-by-step UX or technical implementation]

## Why It Matters

[User value and problem solved — connect to the bigger vision]

## The Challenge

[What was difficult or surprising during development]

## Next Up

[What I'm working on tomorrow/next week]

## Your Turn

[Specific engagement question — e.g. "What feature would you want to see first?"]

## Join the Discussion

Have thoughts on this? I'd love to hear them.
Share your experience on [LinkedIn](LINKEDIN_URL) or [X](X_URL).
```

**Track-specific requirements:**

- Focus on user value and problem solving
- Show progress and momentum
- Include technical details without overwhelming
- Be honest about challenges and limitations
- Be clear about what's real vs. planned
