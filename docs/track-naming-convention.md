# Track Naming Convention

## Current Standard

The codebase uses a **two-layer naming system** for content tracks:

### Internal Values (code/data)

Used in:

- Post frontmatter (`track: "technical"`)
- TypeScript types
- Database/config values
- Route parameters

**Values:**

- `technical` - Engineering/technical content
- `business` - Business/operating content
- `product` - Product development content

### Display Labels (UI)

Used in:

- TrackBadge component labels
- Page headings
- Navigation
- User-facing text

**Labels:**

- `technical` → **"Engineering"**
- `business` → **"Business"** (or "Operating" in some contexts)
- `product` → **"Product"**

## Why This Approach?

1. **Stability**: Internal values (`technical`) don't change even if we rebrand the display label
2. **Flexibility**: Can change "Engineering" to "Technical" in UI without touching data
3. **Clarity**: "Engineering" is more specific and user-friendly than "technical"

## Implementation

### In Components

```typescript
// TrackBadge.svelte
const labels = {
  technical: "Engineering", // Internal → Display
  business: "Business",
  product: "Product",
};
```

### In Post Frontmatter

```yaml
---
track: "technical" # Use internal value
---
```

### In Routes

```
/writing/engineering  # URL uses display name
```

But the route loads posts with:

```typescript
getPostsMetaByTrack("technical"); // Uses internal value
```

## Current Files Using This Convention

- ✅ `src/lib/components/TrackBadge.svelte` - Maps internal → display
- ✅ `src/lib/utils/posts.ts` - Uses internal values in types
- ✅ `src/content/posts/*.md` - Uses internal values in frontmatter
- ✅ `src/routes/writing/engineering/+page.server.ts` - Loads by internal value
- ✅ `src/routes/rss.xml/+server.ts` - Maps for RSS categories

## Potential Inconsistency

The route is `/writing/engineering` but internally uses `track: "technical"`. This is intentional but can be confusing.

**Alternative considered:** Rename internal value to `engineering` to match URL.

**Decision:** Keep `technical` as internal value because:

- It's more generic (covers broader technical content)
- Already used in all existing posts
- Display label can change without data migration
- "Engineering" is just the current branding choice

## Future Additions

When adding new tracks:

1. Choose a generic internal value (e.g., `design`, `marketing`)
2. Map to specific display label in TrackBadge
3. Create route using display name (e.g., `/writing/design`)
4. Load posts using internal value in server code
