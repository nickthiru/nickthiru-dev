import { productName, productSlug } from "../src/lib/schemas/frontmatter";
import seriesData from "../src/lib/data/series.json" with { type: "json" };

const jsonNames = new Set(seriesData.map((s) => s.name));
const jsonSlugs = new Set(seriesData.map((s) => s.slug));

const schemaNames = new Set(productName.options);
const schemaSlugs = new Set(productSlug.options);

let hasErrors = false;

if (
  JSON.stringify([...jsonNames].sort()) !==
  JSON.stringify([...schemaNames].sort())
) {
  hasErrors = true;
  console.error("❌ Product name mismatch between series.json and schema!");
  console.error("  series.json names:", [...jsonNames]);
  console.error("  schema names:", [...schemaNames]);
}

if (
  JSON.stringify([...jsonSlugs].sort()) !==
  JSON.stringify([...schemaSlugs].sort())
) {
  hasErrors = true;
  console.error("❌ Product slug mismatch between series.json and schema!");
  console.error("  series.json slugs:", [...jsonSlugs]);
  console.error("  schema slugs:", [...schemaSlugs]);
}

if (hasErrors) {
  console.error("\n❌ Product name sync check failed.");
  process.exit(1);
} else {
  console.log("✅ Product names and slugs are in sync.");
}
