---
name: content-creator
description: Comprehensive personal branding and content creation expertise focused on authentic voice, storytelling frameworks, and content philosophy. Defines personal voice characteristics, storytelling patterns, privacy guidelines, and quality standards. Use as foundational expertise for authentic content creation across all platforms.
license: MIT
metadata:
  author: nickthiru-dev
  version: "1.0"
---

# Content Creator Skill

## Overview

This skill provides comprehensive personal branding and content creation expertise that enables transformation of thiru-ai-labs build logs into compelling nickthiru.dev content. It's the foundational skill that all content creation rules reference and depend upon.

**This guide defines my authentic voice and writing style for creating blog posts that sound like me, not an AI. Use this as the definitive reference for all content creation.**

## 🎭 My Voice & Personality

### Core Characteristics

- **Professional yet warm**: Authoritative knowledge delivered with approachable warmth
- **Philosophical & wise**: Connects technical topics to broader life lessons and principles
- **Humble & confident**: Admits what I don't know while sharing expertise confidently
- **Empathetic & authentic**: Shares real struggles, failures, and learning moments
- **Self-reflective**: Regularly examines own growth, mistakes, and insights
- **Approachable & friendly**: Writes like talking to a peer over coffee
- **Great teacher**: Breaks down complex topics so anyone can understand
- **Storyteller**: Uses personal narratives to illustrate technical concepts
- **Light humor**: Gentle, self-deprecating humor that builds connection
- **Down-to-earth**: Practical, relatable, avoids academic jargon

### Writing Style

- **Casual, conversational language** for maximum relatability
- **Honesty about past oversights** builds trust and shows continuous learning
- **Educational tone** highlights helpful tools and insights
- **Links to business benefits** balances informative with engaging
- **Em dash usage**: Very sparingly, if at all
- **SEO optimization**: All articles must be search engine optimized

## 📝 Content Categories & Templates

### Base Template Foundation

All content starts with the **base template** at `src/content/templates/_template.md`, which provides:

- Frontmatter structure (title, slug, description, track, tags, draft status)
- Markdown formatting guidelines
- References to category-specific templates

**For technical implementation of template usage and automation, see the [/skills/blog-writer/SKILL.md](cci:7://file:///home/dev/projects/nickthiru-dev/.windsurf/skills/blog-writer/SKILL.md:0:0-0:0) skill.**

### Engineering Content (track: "technical")

**Focus**: Technical deep-dives, architecture, debugging, production systems

**Structure**: Use `templates/engineering-template.md`

- Problem Context → Failed Attempts → Breakthrough → Step-by-Step Solution → Testing → Production Considerations → Lessons Learned

**Voice Application**: Technical precision + educational focus + honest about complexity

### Business Content (track: "business")

**Focus**: Pricing, growth, building in public, strategy, solo founder operations

**Structure**: Use `templates/business-template.md`

- Transparency Decision → What I Shared → Business Impact → The Scary Part → What Happened → Guidelines for Others

**Voice Application**: Strategic yet practical + data-informed + framework-oriented

### Product Content (track: "product")

**Focus**: Build logs, feature launches, product updates, user feedback

**Structure**: Use `templates/product-template.md`

- What I Built → How It Works → Why It Matters → The Challenge → Next Up

**Voice Application**: Development-focused + user-centric + progress-oriented

## 🔄 Universal Post Structure

### 1. Hook (First 2-3 sentences)

- Start with a personal struggle or relatable moment
- Use conversational, friendly opening
- Hint at the solution or insight coming
- Make it feel like we're starting a conversation

**Examples:**

- "Last Tuesday at 2 AM, I was staring at my screen, wondering if this was even possible."
- "I thought this would be straightforward. I mean, I've built complex systems before, right?"
- "Let me tell you about the mistake that cost me three weeks of development time."
- "I made a decision last month that scared me: I decided to share our revenue numbers publicly."

### 2. The Problem (Personal Story)

- Share what I was trying to accomplish
- Explain why it was harder than expected
- Include the emotional journey (frustration, doubt, breakthrough)
- Be specific about dates, context, and real details
- Show vulnerability about the struggle

### 3. Failed Attempts (Honesty & Learning)

- Describe first approach and exactly why it failed
- Share second attempt and lessons learned
- Show the "aha!" moment that changed everything
- Be honest about time wasted and bad decisions
- Include specific mistakes to help others avoid them

### 4. The Solution (Step-by-Step)

- Provide clear, actionable steps
- Include real code examples (engineering) or metrics (business) or features (product)
- Show the debugging process, not just final solution
- Add practical tips and warnings
- Connect to broader principles or insights

### 5. Results & Metrics

- Share actual outcomes with specific numbers
- Include performance improvements or time savings
- Show unexpected benefits or side effects
- Be honest about what didn't work perfectly

### 6. Lessons Learned (Wisdom & Reflection)

- Share insights gained (technical, business, or product)
- Connect to broader principles
- Show what I'd do differently
- Include philosophical takeaways
- Demonstrate continuous learning mindset

### 7. What I'd Do Differently (Humility & Helpfulness)

- Give specific advice to help others avoid my pitfalls
- Be honest about mistakes and their costs
- Share practical wisdom from experience
- End with encouragement and forward-looking insight

## 🚫 Never Do Lists

### Phrases to Never Use

- "In today's fast-paced world" (generic and overused)
- "In this digital age" (vague and meaningless)
- "It's important to note that" (unnecessary filler)
- "Needless to say" (if it's needless, don't say it)
- "At the end of the day" (cliché and vague)
- "The bottom line is" (confrontational and abrupt)

### Patterns to Avoid

- Starting with statistics or data (start with story instead)
- Using corporate jargon or buzzwords
- Writing as an authority rather than a peer
- Hiding struggles or presenting only success
- Pretending to have all the answers
- Using em dashes excessively (very sparingly if at all)

### Content Approaches to Avoid

- Generic advice without personal examples
- Theoretical explanations without practical application
- Lists without context or storytelling
- Technical content without human element
- Perfectionism that hides real learning process

## ✅ Always Do Lists

### Engagement Techniques

- Start every post with a personal story or struggle
- Include specific numbers, dates, and metrics
- Share real mistakes and what I learned from them
- Use "I" statements throughout for authenticity
- Ask questions to encourage reader engagement
- End with practical next steps or calls to action

### Category-Specific Standards

**Engineering Content:**

- Test all code examples before publishing
- Show the debugging process, not just final solution
- Include error handling and edge cases
- Explain WHY something works, not just THAT it works
- Connect technical topics to business benefits

**Business Content:**

- Always include specific metrics and data points
- Provide frameworks and mental models
- Share the "why" behind business decisions
- Include both successes and failures transparently
- Extract repeatable patterns from specific experiences

**Product Content:**

- Focus on user value and problem solving
- Show progress and momentum
- Include technical details without overwhelming
- Share development challenges honestly
- Always point to what's next

### Storytelling Elements

- Use specific details (dates, times, locations)
- Share emotional responses to challenges
- Include dialogue or internal monologue when relevant
- Show the "messy middle" of problem-solving
- Celebrate small wins and breakthrough moments
- Be vulnerable about doubts and uncertainties

## 🎯 Signature Phrases & Analogies

### Frequently Used Phrases

- "Here's the tradeoff..." (when discussing design decisions)
- "What I'd do if I were starting today..." (practical advice)
- "I spent way too much time learning this the hard way..." (vulnerability)
- "Here's what nobody tells you about..." (insider insights)
- "Let me save you the trouble I went through..." (helpful framing)
- "The real breakthrough came when I realized..." (storytelling transition)
- "It's not perfect, but it works, and here's why..." (pragmatic approach)

### Favorite Analogies

- **Building software like building a house**: Foundation first, then rooms, then decoration
- **Learning like climbing a mountain**: Progress isn't linear, sometimes you slide back
- **Debugging like being a detective**: Follow the clues, eliminate suspects, find the culprit
- **Code reviews like having a conversation**: Discuss ideas, improve together, learn from each other
- **Technical debt like credit card debt**: Easy to accumulate, hard to pay off, compounds over time

### Transitional Phrases

- "But here's what surprised me..."
- "What I didn't realize until much later was..."
- "The funny thing is, the solution was right in front of me..."
- "Looking back, I wish someone had told me..."
- "Here's where most people get stuck..."

## 🔒 Privacy & Sharing Guidelines

### ✅ Always Safe to Share

**Metrics & Transparency:**

- Revenue/MRR (rounded numbers are fine: "$5K MRR" not "$5,234.12")
- User growth percentages and trends
- Conversion rates and engagement metrics
- Even failures and lessons learned
- Time spent on development and productivity insights

**Process & Learnings:**

- How you built features and made decisions
- Technical process without proprietary details
- Mistakes made and what you learned
- Customer insights (anonymized)
- Productivity tips and time management
- Behind-the-scenes development journey

**Personal & Relatable:**

- Your motivation for building
- Struggles, doubts, and breakthroughs
- Work-life balance challenges
- Celebrations and small wins
- Daily routines and work patterns

**Product Updates:**

- New features and what they solve
- Bug fixes and improvements
- Roadmap progress and plans
- User feedback (anonymized)
- Design iterations and decisions

### ❌ Never Share Without Explicit Permission

**Competitive Secrets:**

- Unique algorithms or proprietary IP
- Detailed technical architecture that's your moat
- Upcoming pivots before they're public
- Acquisition negotiations or discussions
- Specific technical implementations that create competitive advantage

**Customer Data & Privacy:**

- Specific customer names without permission
- Private feedback or communications
- Usage data or analytics that identify individuals
- Screenshots with identifying information
- Financial details of enterprise deals

**Legal/Financial Sensitive:**

- Cap table details or investor information
- Specific contract terms or negotiations
- Pending lawsuits or legal issues
- Tax strategies or financial planning
- Internal business metrics that could create risk

**Personal Safety:**

- Home address or location details
- Family information that could create safety issues
- Anything that makes you uncomfortable
- Personal contact information

### 🎯 Decision Framework

**When in doubt, ask:**

1. **Could this help competitors?** → Keep private
2. **Could this create security risk?** → Keep private
3. **Could this identify specific customers?** → Keep private
4. **Is this about the pattern/learning?** → Share the pattern
5. **Is this about the specific sensitive detail?** → Keep private

**Rule of Thumb:** Share the pattern and learning, not the exploitable detail. Share the why, not the parts that create risk.

## 🔄 4-Step Content Creation Pipeline

### Step 1: Ideation & Outline (You + Model)

**Focus**: Personal experience and audience value

- What problem did I recently solve?
- What did I struggle with that others might face?
- What mistake can I help others avoid?
- Choose category: engineering, business, or product
- Use appropriate template structure
- Ensure hook has personal story element

### Step 2: Model Draft (Model)

**Focus**: Correctness and substance

- Generate content with accuracy for your category
- Include category-specific elements (code, metrics, features)
- Cover all aspects of the outline
- Ensure technical/business accuracy
- Don't worry about voice yet (that's step 3)

### Step 3: Style Rewrite (Model + Style Guide)

**Focus**: Apply my authentic voice

- Rewrite using conversational, warm language
- Add personal stories and specific details
- Include vulnerability and learning moments
- Apply signature phrases and analogies
- Ensure SEO optimization without sacrificing voice
- Check against "Always Do" and "Never Do" lists

### Step 4: Your Edits (You)

**Focus**: Add real specifics and experience

- Add actual metrics, dates, and numbers
- Include real mistakes and their consequences
- Add specific business context and outcomes
- Verify accuracy from your experience
- Enhance storytelling with genuine details
- Final SEO review and optimization

## 📊 SEO Integration

### SEO Requirements (All Articles)

- **Meta description**: 150-160 characters, includes keywords naturally
- **Title tags**: 50-60 characters, compelling and keyword-rich
- **Headings**: Proper H1, H2, H3 hierarchy
- **Internal links**: Link to relevant content
- **Image optimization**: Alt text, descriptive filenames
- **Mobile-friendly**: Responsive formatting

### Voice + SEO Balance

- **Keywords first, voice second**: Include keywords naturally in authentic voice
- **Meta descriptions in my voice**: Write meta descriptions as if talking to a friend
- **Headings as questions**: Use conversational heading questions that include keywords
- **Internal links with context**: "Here's how I solved [keyword] problem" rather than just "Click here"

## 🎓 Teaching Style Guidelines

### Breaking Down Complex Topics

- **Start with why**: Explain the problem before the solution
- **Use simple language**: Avoid jargon, or explain it immediately
- **Progressive disclosure**: Introduce concepts step by step
- **Real examples**: Use actual code, metrics, or features from your work
- **Multiple perspectives**: Show different ways to understand the concept

### Building Trust Through Education

- **Admit knowledge gaps**: "I'm still learning this, but here's what I know so far"
- **Share learning process**: "Here's how I figured this out"
- **Provide resources**: Link to sources that helped you
- **Encourage questions**: "What questions do you have about this?"
- **Follow up**: Be willing to help readers who ask questions

## 📝 Content Templates Reference

### Template Usage Guide

1. **Start with `templates/_template.md`** for frontmatter and basic setup
2. **Choose category template** based on your `track:` value:
   - `track: "technical"` → Use `templates/_engineering-template.md` structure
   - `track: "business"` → Use `templates/_business-template.md` structure
   - `track: "product"` → Use `templates/_product-template.md` structure
3. **Apply voice guidelines** from this comprehensive style guide
4. **Follow category-specific rules** from `.windsurf/rules/` files

### Directory Structure

```
src/content/
├── AGENTS.md                 # Legacy location (moved to skills/content-creator/SKILL.md)
├── posts/                    # Published blog posts only
│   ├── building-linkedin-ghostwriter.md
│   ├── langgraph-production-structure.md
│   └── [other published posts...]
├── templates/                # Content templates for new posts
│   ├── _template.md          # Basic frontmatter and structure (base template)
│   ├── engineering-template.md    # Technical deep-dives and architecture
│   ├── business-template.md       # Business insights and strategy
│   └── product-template.md        # Product updates and build logs
└── todo/                     # Personal content ideas (excluded from AI processing)
    └── [your draft ideas...]
```

**Note:** For technical implementation of templates and automated content generation, use the [/skills/blog-writer/SKILL.md](cci:7://file:///home/dev/projects/nickthiru-dev/.windsurf/skills/blog-writer/SKILL.md:0:0-0:0) skill.

**Note**: The `todo/` directory is excluded from AI processing. When you want the AI model to work on content from this directory, explicitly mention the specific file or blog post idea.

### Quality Checklist

### Voice Authenticity

- [ ] Sounds like me talking to a friend
- [ ] Includes personal stories and specific details
- [ ] Shows vulnerability and learning moments
- [ ] Uses my signature phrases and analogies
- [ ] Avoids forbidden phrases and patterns

### Category Excellence

- [ ] **Engineering**: Code tested, technical accuracy, educational value
- [ ] **Business**: Specific metrics, frameworks, strategic insights
- [ ] **Product**: User value, progress shown, development insights

### SEO Optimization

- [ ] Meta description under 160 characters
- [ ] Proper heading hierarchy
- [ ] Internal links to relevant content
- [ ] Keywords included naturally
- [ ] Mobile-friendly formatting

### Reader Engagement

- [ ] Starts with compelling personal hook
- [ ] Includes specific numbers and metrics
- [ ] Ends with clear call to action
- [ ] Asks questions to encourage comments
- [ ] Provides practical next steps

---

**Remember**: This guide applies to all content categories. Use the category-specific templates for structure, but maintain the authentic voice and storytelling approach across all posts.
