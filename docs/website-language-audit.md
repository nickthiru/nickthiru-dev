# Website Language Audit: nickthiru.dev

**Date:** January 10, 2026  
**Purpose:** Audit language usage across nickthiru.dev to ensure consistent positioning of solo/lean studio messaging

---

## Audit Summary

**Current State:**

- Consistently uses "I" language (appropriate for personal brand)
- Uses "solo" explicitly in About page
- Professional but personal tone throughout
- No inappropriate "we" usage found

**Recommended Changes:**

- Keep "I" language (this is a personal brand site)
- Add strategic link to solo article when published
- Maintain current positioning

---

## Page-by-Page Analysis

### 1. Homepage (`/`)

**Current Language:**

- ✅ "I'm an AI systems architect..."
- ✅ "I write about..."
- ✅ "See what I'm building"

**Assessment:** **GOOD** - Appropriate first-person language for personal brand

**Recommended Changes:** None needed

---

### 2. About Page (`/about`)

**Current Language:**

- ✅ "I'm an AI systems architect..."
- ✅ "I run Thiru AI Labs, a **solo AI systems studio**..."
- ✅ "I publish two tracks..."
- ✅ "Before going solo, I worked..."
- ✅ "I now spend my time..."
- ✅ "I work remotely..."

**Assessment:** **GOOD** - Uses "solo" explicitly, which is honest and direct

**Recommended Changes:**

- Add link to solo article after it's published
- Consider adding: "Read more about [why I build solo →](/writing/why-building-solo)" after the "solo AI systems studio" mention

**Suggested Edit (Line 28):**

```svelte
<!-- Current -->
</a>, a solo AI systems studio where I design, build, and operate production-grade micro-SaaS products and automation systems powered by LangGraph agent workflows.

<!-- Recommended (after article is published) -->
</a>, a solo AI systems studio where I design, build, and operate production-grade micro-SaaS products and automation systems powered by LangGraph agent workflows. <a href="/writing/why-building-solo" class="text-accent hover:underline">Why solo? →</a>
```

---

### 3. Consulting Page (`/consult`)

**Current Language:**

- ✅ "I help teams design, build, and deploy..."
- ✅ "I work with startups..."
- ✅ "I specialize in..."
- ✅ "I can work alongside your team..."
- ✅ "I'll assess if I'm a good fit..."
- ✅ "I provide regular updates..."

**Assessment:** **GOOD** - Appropriate "I" language for consulting services

**Recommended Changes:** None needed

**Note:** The consulting page appropriately focuses on value delivery, not team size. This is correct positioning.

---

### 4. Footer (Global Component)

**Current Language:**

- ✅ "Built by Thiru AI Labs" (entity name, appropriate)
- ✅ Copyright uses author name

**Assessment:** **GOOD** - Appropriate use of entity name

**Recommended Changes:** None needed

---

## Overall Assessment

**Strengths:**

1. ✅ Consistent first-person voice throughout
2. ✅ Honest about being solo (doesn't hide it)
3. ✅ Professional tone despite personal brand
4. ✅ No inappropriate "we" usage
5. ✅ Entity name (Thiru AI Labs) used appropriately in footer

**No Critical Issues Found**

**Minor Enhancement Opportunities:**

1. Add link to solo article in About page (after publication)
2. Consider adding trust signals (response times, uptime) once products launch

---

## Recommended Positioning Framework

**For nickthiru.dev (Personal Brand):**

### ✅ DO:

- Use "I" language consistently
- Own the solo builder identity
- Be transparent about being solo
- Link to solo article for deeper explanation
- Show competence through depth of content

### ❌ DON'T:

- Use "we" (dishonest, confusing)
- Apologize for being solo
- Hide or downplay solo status
- Use corporate language

---

## Action Items

### Immediate (No Changes Needed):

- Current language is appropriate and consistent
- No urgent changes required

### After Solo Article Publication:

1. Add link in About page (line 28) to solo article
2. Consider adding link in hero section if appropriate
3. Reference solo article in consulting page if relevant

### Future Enhancements:

1. Add trust signals section to About page:
   - Response time commitments
   - Uptime statistics
   - Support SLAs
2. Add testimonials section (when available)
3. Add case studies (after product launches)

---

## Comparison: Personal vs Business Site

**nickthiru.dev (Personal Brand):**

- Use "I" language ✅
- Personal story and journey ✅
- Solo builder identity ✅
- Writing, consulting, personal projects ✅

**thiruailabs.com (Business Entity):**

- Use "Thiru AI Labs" as entity
- Product-focused, not personal
- Professional, less personal
- Products, solutions, business focus

**Key Distinction:** nickthiru.dev is about the person, thiruailabs.com is about the products.

---

## Next Steps

1. ✅ Audit complete - no critical issues
2. ⏳ Audit thiruailabs.com next
3. ⏳ Add solo article links after publication
4. ⏳ Monitor for consistency in future content
