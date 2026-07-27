import { postFrontmatterSchema } from "../src/lib/schemas/frontmatter";
import { getProducts } from "../src/lib/config/projects";
import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";

const postsDir = path.resolve("src/content/posts");

// Allowed keys — used to detect unknown YAML keys
const allowedKeys = new Set([
  "title", // deprecated — use subtitle
  "subtitle",
  "slug",
  "description",
  "publishedAt",
  "updatedAt",
  "track",
  "hashtags",
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
  "build_logs",
  "newsletter_sent",
  "newsletter_date",
]);

// Map series_name to the correct product's default hashtags
const seriesNameToDefaultHashtags: Record<string, string[]> = {};
for (const product of getProducts()) {
  seriesNameToDefaultHashtags[product.name] = product.defaultHashtags;
}

// Human-readable descriptions for common fields
const fieldDescriptions: Record<string, string> = {
  track: 'Must be "product", "engineering", or "business"',
  series_name:
    "Product name (for track:product) or series title (empty string for standalone posts)",
  series_slug:
    "Kebab-case slug matching the series (empty for standalone posts)",
  series_phase:
    "One of: strategy, design, engineering, deployment, maintenance, community",
  series_position: "Positive integer (1, 2, 3...)",
  image_size: "One of: sm, md, lg, full",
  publishedAt: "ISO date string (YYYY-MM-DD)",
  newsletter_hook: "A short teaser paragraph for newsletter subscribers",
  build_logs: "Array of build log filenames this article was derived from",
  newsletter_sent: "Boolean — true if included in a newsletter digest",
  newsletter_date: "Date string (YYYY-MM-DD) when included in newsletter",
  summary_two_sentence: "Exactly two sentences summarizing the post",
  pinned_order:
    'Number for ordering pinned posts, "n/a" for non-pinned, or omit',
};

/**
 * Extract field-level errors from Zod v4 issues.
 * For union types, errors are nested inside `issues` property.
 */
function extractErrors(
  issue: Record<string, unknown>,
  data: Record<string, unknown>,
): Array<{ field: string; detail: string; hint?: string }> {
  const errors: Array<{ field: string; detail: string; hint?: string }> = [];

  // Zod v4 union errors have nested `issues` array
  if (issue.issues && Array.isArray(issue.issues)) {
    for (const subIssue of issue.issues as Record<string, unknown>[]) {
      errors.push(...extractErrors(subIssue, data));
    }
    return errors;
  }

  // Regular field error
  const path = (issue.path as PropertyKey[]) || [];
  const field = path.map(String).join(".");
  const message = (issue.message as string) || "Invalid input";
  const description = fieldDescriptions[field] || "";

  // Get the actual value at the path
  let actualValue: unknown = data;
  for (const key of path) {
    if (actualValue !== null && actualValue !== undefined) {
      actualValue = (actualValue as Record<string, unknown>)[String(key)];
    }
  }

  let detail = message;
  if (actualValue !== undefined && path.length > 0) {
    detail += ` (got: ${JSON.stringify(actualValue)})`;
  }

  errors.push({
    field: field || "(root)",
    detail,
    hint: description || undefined,
  });

  return errors;
}

function validateFrontmatter() {
  // Recursively find all .md files in drafts/ only (pre-publish validation)
  const files: string[] = [];
  function walkDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.name.endsWith(".md")) {
        files.push(fullPath);
      }
    }
  }
  walkDir(path.join(postsDir, "drafts"));

  let hasErrors = false;

  for (const filePath of files) {
    const file = path.relative(postsDir, filePath);
    const content = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(content);

    // Convert null to undefined (YAML empty values like `series_position:` become null)
    for (const key of Object.keys(data)) {
      if (data[key] === null) {
        data[key] = undefined;
      }
    }

    let fileHasErrors = false;
    const errors: Array<{ field: string; detail: string; hint?: string }> = [];

    // Check for unknown keys first
    for (const key of Object.keys(data)) {
      if (!allowedKeys.has(key)) {
        fileHasErrors = true;
        errors.push({
          field: key,
          detail: "Unknown key",
          hint: "Remove this key or add it to allowedKeys",
        });
      }
    }

    // Then validate against Zod schema
    const result = postFrontmatterSchema.safeParse(data);

    if (!result.success) {
      fileHasErrors = true;
      for (const issue of result.error.issues as unknown as Record<
        string,
        unknown
      >[]) {
        errors.push(...extractErrors(issue, data));
      }
    }

    // Additional hashtags validation
    const hashtags = data.hashtags as string[] | undefined;
    const seriesName = data.series_name as string | undefined;
    const track = data.track as string | undefined;

    // Check 1: hashtags should not be empty for product series posts
    if (seriesName && seriesName.trim() !== "") {
      if (!hashtags || hashtags.length === 0) {
        fileHasErrors = true;
        errors.push({
          field: "hashtags",
          detail: "Hashtags array is empty or missing for product series post",
          hint: "Product series posts must include the product's default hashtags.",
        });
      }

      // Check 2: Product series posts must include the product's default hashtags
      const expectedDefaultHashtags = seriesNameToDefaultHashtags[seriesName];
      if (expectedDefaultHashtags && hashtags) {
        const missingHashtags = expectedDefaultHashtags.filter(
          (h) => !hashtags.includes(h),
        );
        if (missingHashtags.length > 0) {
          fileHasErrors = true;
          errors.push({
            field: "hashtags",
            detail: `Missing required default hashtags: ${missingHashtags.join(", ")} for series "${seriesName}"`,
            hint: `Add the missing hashtags to the hashtags array. These are the product's default hashtags from the product config.`,
          });
        }
      }
    }

    if (fileHasErrors) {
      hasErrors = true;
      console.error(`\n❌ ${file}:`);
      for (const error of errors) {
        console.error(`   ${error.field}: ${error.detail}`);
        if (error.hint) {
          console.error(`      → ${error.hint}`);
        }
        console.error("");
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
