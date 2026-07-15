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
  series_position: z.null().or(z.undefined()).or(z.number().int().positive()),
});

// Union of all valid frontmatter shapes
export const postFrontmatterSchema = z.union([
  productPostSchema,
  nonProductSeriesPostSchema,
  nonProductStandalonePostSchema,
]);

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;

// Export individual schemas for the product name sync verification
export { productName, productSlug };
