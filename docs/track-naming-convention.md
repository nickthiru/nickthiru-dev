# Track Naming Convention

## Current Standard

The codebase uses a **single slug** for each content track, with display labels mapped in components and config.

### Internal Values (code/data)

Used in:

- Post frontmatter (`track: "engineering"`)
- TypeScript types
- Database/config values
- Route parameters

**Values:**

- `engineering` - Engineering/technical content
- `business` - Business/operating content
- `product` - Product development content

### Display Labels (UI)

Used in:

- TrackBadge component labels
- Page headings
- Navigation
- User-facing text

**Labels:**

- `engineering` → **"Engineering"**
- `business` → **"Business"**
- `product` → **"Product"**

## Why This Approach?

1. **Simplicity**: One slug used everywhere — frontmatter, routes, filters, badges — no indirection or mapping layer needed.
2. **Clarity**: "Engineering" is both the internal slug and the user-facing label, reducing cognitive overhead.
3. **Consistency**: Filter pills, postcard badges, and blog post badges all display the same label.

## Implementation

### In Components

```typescript
// TrackBadge.svelte
const labels = {
  engineering: "Engineering",
  business: "Business",
  product: "Product",
};
```

### In Post Frontmatter

```yaml
---
track: "engineering" # Use the track slug directly
---
```

### In Routes

```
/writing/engineering  # URL uses the track slug
```

And the route loads posts with:

```typescript
getPostsMetaByTrack("engineering"); // Uses the same slug
```

## Current Files Using This Convention

- ✅ `src/lib/components/TrackBadge.svelte` - Maps slug → display label
- ✅ `src/lib/utils/posts.ts` - Uses track slugs in types
- ✅ `src/content/posts/*.md` - Uses track slugs in frontmatter
- ✅ `src/routes/writing/engineering/+page.server.ts` - Loads by track slug
- ✅ `src/lib/config/badges.ts` - Track badge config keyed by track slug
- ✅ `src/routes/rss.xml/+server.ts` - RSS category mappings
