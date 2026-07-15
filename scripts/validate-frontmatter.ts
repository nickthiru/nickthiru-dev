import { postFrontmatterSchema } from "../src/lib/schemas/frontmatter";
import * as fs from "fs";
import * as path from "path";
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
  const files = fs
    .readdirSync(postsDir)
    .filter((f: string) => f.endsWith(".md"));
  let hasErrors = false;

  for (const file of files) {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(content);

    // Convert null to undefined (YAML empty values like `series_position:` become null)
    for (const key of Object.keys(data)) {
      if (data[key] === null) {
        data[key] = undefined;
      }
    }

    let fileHasErrors = false;
    const errors: string[] = [];

    // Check for unknown keys first
    for (const key of Object.keys(data)) {
      if (!allowedKeys.has(key)) {
        fileHasErrors = true;
        errors.push(`Unknown key: "${key}"`);
      }
    }

    // Then validate against Zod schema
    const result = postFrontmatterSchema.safeParse(data);

    if (!result.success) {
      fileHasErrors = true;
      for (const error of result.error.issues) {
        errors.push(`${error.path.join(".")}: ${error.message}`);
      }
    }

    if (fileHasErrors) {
      hasErrors = true;
      console.error(`\n❌ ${file}:`);
      for (const error of errors) {
        console.error(`   - ${error}`);
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
