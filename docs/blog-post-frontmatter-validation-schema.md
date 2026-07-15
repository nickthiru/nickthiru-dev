# Stricter Frontmatter Validation Schema

## Problem Statement

The current [`PostFrontmatter`](src/lib/utils/posts.ts:4) interface uses optional fields (`?`) for all series-related and image-related properties. This means:

1. TypeScript doesn't enforce required fields at compile time.
2. Unknown YAML keys (like `series:` instead of `series_name:` + `series_slug:`) are silently ignored.
3. Posts can be published (`draft: false`) without required fields like `image`, `linkedin_url`, `x_url`, `newsletter_hook`, or `summary_two_sentence`.

## Proposed Solution

### 1. Discriminated Union Type with Product Name Enforcement

Product posts **must** belong to a known product series. They can never be standalone. The known products are defined in [`src/lib/data/series.json`](src/lib/data/series.json):

| Product Name                | Slug                        |
| --------------------------- | --------------------------- |
| `"Social Engagement Radar"` | `"social-engagement-radar"` |
| `"OpsPilot"`                | `"ops-pilot"`               |
| `"PolicyForge"`             | `"policy-forge"`            |

```typescript
// Known product names (derived from series.json)
type ProductName = "Social Engagement Radar" | "OpsPilot" | "PolicyForge";
type ProductSlug = "social-engagement-radar" | "ops-pilot" | "policy-forge";

// Base frontmatter shared by all posts
interface BaseFrontmatter {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
  draft?: boolean;
  pinned?: boolean;
  pinned_order?: number;
  canonical?: string;
  image: string; // Required for all posts
  image_size: "sm" | "md" | "lg" | "full"; // Required for all posts
  linkedin_url: string;
  x_url: string;
  newsletter_hook: string;
  summary_two_sentence: string;
}

// Product post — MUST belong to a known product series
interface ProductPostFrontmatter extends BaseFrontmatter {
  track: "product";
  series_name: ProductName;
  series_slug: ProductSlug;
  series_phase:
    | "strategy"
    | "design"
    | "engineering"
    | "deployment"
    | "maintenance"
    | "community";
  series_position: number;
}

// Non-product series post — belongs to a series (not a known product)
interface NonProductSeriesPostFrontmatter extends BaseFrontmatter {
  track: "engineering" | "business";
  series_name: string;
  series_slug: string;
  series_phase:
    | "strategy"
    | "design"
    | "engineering"
    | "deployment"
    | "maintenance"
    | "community";
  series_position: number;
}

// Non-product standalone post — no series
interface NonProductStandalonePostFrontmatter extends BaseFrontmatter {
  track: "engineering" | "business";
  series_name: "";
  series_slug: "";
  series_phase: "";
  series_position?: undefined;
}

// Union type — discriminated on `track`
export type PostFrontmatter =
  | ProductPostFrontmatter
  | NonProductSeriesPostFrontmatter
  | NonProductStandalonePostFrontmatter;
```

### 2. Build-Time Validation Using Zod

Add a Zod schema that validates all frontmatter at build time. This catches unknown keys, missing required fields, invalid values, and — critically — ensures product posts use valid product names.

#### Installation

```bash
npm install zod
```

#### Schema Definition

Create `src/lib/schemas/frontmatter.ts`:

```typescript
import { z } from "zod";

// Known products (must match src/lib/data/series.json)
const productName = z.enum([
  "Social Engagement Radar",
  "OpsPilot",
  "PolicyForge",
]);

const productSlug = z.enum([
  "social-engagement-radar",
  "ops-pilot",
  "policy-forge",
]);

const phase = z.enum([
  "strategy",
  "design",
  "engineering",
  "deployment",
  "maintenance",
  "community",
]);

const imageSize = z.enum(["sm", "md", "lg", "full"]);

// Base schema for all posts
const baseSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
  pinned: z.boolean().optional(),
  pinned_order: z.number().optional(),
  canonical: z.string().optional(),
  image: z.string().min(1),
  image_size: imageSize,
  linkedin_url: z.string(),
  x_url: z.string(),
  newsletter_hook: z.string(),
  summary_two_sentence: z.string(),
});

// Product post schema — track: "product" requires known product name + slug
const productPostSchema = baseSchema.extend({
  track: z.literal("product"),
  series_name: productName,
  series_slug: productSlug,
  series_phase: phase,
  series_position: z.number().int().positive(),
});

// Non-product series post schema
const nonProductSeriesPostSchema = baseSchema.extend({
  track: z.enum(["engineering", "business"]),
  series_name: z.string().min(1),
  series_slug: z.string().min(1),
  series_phase: phase,
  series_position: z.number().int().positive(),
});

// Non-product standalone post schema
const nonProductStandalonePostSchema = baseSchema.extend({
  track: z.enum(["engineering", "business"]),
  series_name: z.literal(""),
  series_slug: z.literal(""),
  series_phase: z.literal(""),
  series_position: z.undefined().optional(),
});

// Discriminated union on `track`
export const postFrontmatterSchema = z.discriminatedUnion("track", [
  productPostSchema,
  nonProductSeriesPostSchema,
  nonProductStandalonePostSchema,
]);

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
```

#### Validation Script

Create `scripts/validate-frontmatter.ts`:

```typescript
import { postFrontmatterSchema } from "../src/lib/schemas/frontmatter";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.resolve("src/content/posts");

// Allowed keys — used to detect unknown YAML keys
const allowedKeys = new Set([
  "title",
  "slug",
  "description",
  "publishedAt",
  "updatedAt",
  "track",
  "tags",
  "draft",
  "pinned",
  "pinned_order",
  "canonical",
  "image",
  "image_size",
  "linkedin_url",
  "x_url",
  "series_name",
  "series_slug",
  "series_phase",
  "series_position",
  "newsletter_hook",
  "summary_two_sentence",
]);

function validateFrontmatter() {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  let hasErrors = false;

  for (const file of files) {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(content);

    // Check for unknown keys first
    for (const key of Object.keys(data)) {
      if (!allowedKeys.has(key)) {
        hasErrors = true;
        console.error(`\n❌ ${file}:`);
        console.error(`   - Unknown key: "${key}"`);
      }
    }

    // Then validate against Zod schema
    const result = postFrontmatterSchema.safeParse(data);

    if (!result.success) {
      hasErrors = true;
      console.error(`\n❌ ${file}:`);
      for (const error of result.error.errors) {
        console.error(`   - ${error.path.join(".")}: ${error.message}`);
      }
    } else {
      console.log(`✅ ${file}`);
    }
  }

  if (hasErrors) {
    console.error("\n❌ Frontmatter validation failed.");
    process.exit(1);
  } else {
    console.log(`\n✅ All ${files.length} posts passed validation.`);
  }
}

validateFrontmatter();
```

#### Add to package.json

```json
{
  "scripts": {
    "validate:frontmatter": "tsx scripts/validate-frontmatter.ts",
    "dev": "npm run validate:frontmatter && vite dev",
    "build": "npm run validate:frontmatter && vite build"
  }
}
```

### 3. Keeping Product Names in Sync

The product names in the Zod schema must match `src/lib/data/series.json`. To avoid drift, the schema could be generated from the JSON file at build time, or a test could assert that the enum values match the JSON contents:

```typescript
// scripts/verify-product-names.ts
import seriesData from "../src/lib/data/series.json";
import { productName, productSlug } from "../src/lib/schemas/frontmatter";

const jsonNames = new Set(seriesData.map((s) => s.name));
const jsonSlugs = new Set(seriesData.map((s) => s.slug));

const schemaNames = new Set(productName.options);
const schemaSlugs = new Set(productSlug.options);

if (
  JSON.stringify([...jsonNames].sort()) !==
  JSON.stringify([...schemaNames].sort())
) {
  console.error("Product name mismatch between series.json and schema!");
  process.exit(1);
}

if (
  JSON.stringify([...jsonSlugs].sort()) !==
  JSON.stringify([...schemaSlugs].sort())
) {
  console.error("Product slug mismatch between series.json and schema!");
  process.exit(1);
}

console.log("✅ Product names and slugs are in sync.");
```

## Implementation Steps

1. **Create `src/lib/schemas/frontmatter.ts`** with the Zod schema.
2. **Create `scripts/validate-frontmatter.ts`** with the validation script.
3. **Add `gray-matter` and `tsx` as dev dependencies** (if not already present):
   ```bash
   npm install -D gray-matter tsx
   ```
4. **Update `package.json`** to run validation before `dev` and `build`.
5. **Run validation** to catch any remaining issues:
   ```bash
   npm run validate:frontmatter
   ```

## Benefits

| Before                                     | After                                      |
| ------------------------------------------ | ------------------------------------------ |
| Optional fields silently accepted          | Required fields enforced at build time     |
| Unknown YAML keys ignored                  | Unknown keys flagged as errors             |
| `series:` typo silently ignored            | `series:` flagged as unknown key           |
| Product posts could have any `series_name` | Must be one of the known product names     |
| No validation before build                 | Validation runs on every `dev` and `build` |
| Type errors only catch obvious mistakes    | Zod catches structural and value errors    |
| Manual review needed for frontmatter       | Automated validation catches issues early  |

## Migration Notes

- All existing `draft: false` posts have been updated to use `series_name`, `series_slug`, `series_phase` instead of `series`.
- The `why-i-price-monthly.md` draft post has been updated with all required fields.
- The `article-draft.md` prompt has been updated to generate the correct frontmatter structure.
