# Route Structure Documentation

## Current Issue

The filtered writing category routes are confusing because they exist as top-level routes:

```
src/routes/
├── business/          # Filtered writing view (track: "business")
├── engineering/       # Filtered writing view (track: "engineering")
├── product/           # Filtered writing view (track: "product")
├── writing/           # Main writing page
│   ├── [slug]/        # Individual post pages
│   └── +page.svelte   # All posts listing
```

**Problem:** These look like separate sections of the site, but they're actually just filtered views of `/writing` content.

## Proposed Solutions

### Option 1: Move to /writing subdirectories (Recommended)

Restructure to make the relationship clear:

```
src/routes/
├── writing/
│   ├── business/      # /writing/business
│   ├── engineering/   # /writing/engineering
│   ├── product/       # /writing/product
│   ├── [slug]/        # /writing/[slug]
│   └── +page.svelte   # /writing
```

**Pros:**

- Clear hierarchy: filtered views are under `/writing`
- URLs reflect structure: `/writing/engineering`, `/writing/business`
- Easier to understand codebase organization
- Consistent with mental model

**Cons:**

- URL change (requires redirects if already indexed)
- Need to update FilterPills navigation links

### Option 2: Add README in each filter directory

Keep current structure but add `README.md` in each filter directory:

```
src/routes/business/README.md
```

Content:

```markdown
# Business Track Filter

This route displays filtered writing content for the "business" track.
It's a filtered view of /writing, not a separate section.

See: src/routes/writing/ for the main writing section.
```

**Pros:**

- No URL changes
- Quick documentation fix
- No code changes needed

**Cons:**

- Doesn't solve the structural confusion
- Still looks like separate sections in file tree

### Option 3: Rename directories to indicate filtering

```
src/routes/
├── writing-business/   # or writing.business/
├── writing-engineering/
├── writing-product/
├── writing/
```

**Pros:**

- Clear naming indicates relationship
- No URL changes

**Cons:**

- Awkward directory names
- URLs still don't reflect relationship

## Recommendation

**Option 1** is the best long-term solution because:

1. File structure matches URL structure
2. Clear parent-child relationship
3. Easier for future developers to understand
4. Standard SvelteKit pattern for nested routes

## Implementation for Option 1

1. Move directories:

   ```bash
   mv src/routes/business src/routes/writing/business
   mv src/routes/engineering src/routes/writing/engineering
   mv src/routes/product src/routes/writing/product
   ```

2. Update FilterPills component links:

   ```typescript
   // From:
   { label: "Engineering", href: "/engineering" }

   // To:
   { label: "Engineering", href: "/writing/engineering" }
   ```

3. Add redirects in `svelte.config.js` or create redirect routes for old URLs (if needed for SEO)

4. Update sitemap generation if applicable

## Current URLs vs Proposed URLs

| Current           | Proposed               | Purpose                  |
| ----------------- | ---------------------- | ------------------------ |
| `/writing`        | `/writing`             | All posts                |
| `/business`       | `/writing/business`    | Business track filter    |
| `/engineering`    | `/writing/engineering` | Engineering track filter |
| `/product`        | `/writing/product`     | Product track filter     |
| `/writing/[slug]` | `/writing/[slug]`      | Individual posts         |
