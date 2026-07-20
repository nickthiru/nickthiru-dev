import { BrevoClient } from "@getbrevo/brevo";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

// Load .env file from project root
dotenv.config();

// ─── Types ───────────────────────────────────────────────────────────────────

interface ArticleEntry {
  title: string;
  hook: string;
  url: string;
  slug: string;
  filePath: string;
}

interface NewsletterMeta {
  personal_note: string;
  subject: string;
}

interface NewsletterTrackerEntry {
  date: string;
  campaign_name: string;
  subject: string;
  articles: string[];
  status: "sent" | "draft";
}

// ─── Constants ───────────────────────────────────────────────────────────────

const POSTS_DIR = path.resolve(
  import.meta.dirname,
  "../content/posts/published/newsletter-pending",
);
const DONE_DIR = path.resolve(
  import.meta.dirname,
  "../content/posts/published/newsletter-done",
);
const TRACKER_PATH = path.resolve(
  import.meta.dirname,
  "../content/posts/newsletter-tracker.json",
);
const DEFAULT_META_PATH = path.resolve(
  import.meta.dirname,
  "../content/posts/published/newsletter-pending/.newsletter-meta.json",
);
const BASE_URL = "https://nickthiru.dev/writing/";

// ─── CLI Arg Parsing ─────────────────────────────────────────────────────────

function parseArgs(): { command: string; metaPath: string } {
  const args = process.argv.slice(2);
  let metaPath = DEFAULT_META_PATH;
  let command = "create-draft"; // default

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--config" && args[i + 1]) {
      metaPath = path.resolve(args[i + 1]);
      i++;
    } else if (args[i] === "create-draft" || args[i] === "finalize") {
      command = args[i];
    }
  }

  return { command, metaPath };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function extractFrontmatter(raw: string): Record<string, unknown> {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const lines = match[1].split("\n");
  const result: Record<string, unknown> = {};
  let currentKey = "";
  let isArray = false;

  for (const line of lines) {
    if (isArray && line.trim().startsWith("- ")) {
      (result[currentKey] as string[]).push(line.trim().slice(2));
      continue;
    }
    isArray = false;
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    if (value === "") {
      result[key] = [];
      currentKey = key;
      isArray = true;
      continue;
    }
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (value === "true") value = true as unknown as string;
    if (value === "false") value = false as unknown as string;
    result[key] = value;
    currentKey = key;
  }
  return result;
}

async function discoverArticles(): Promise<ArticleEntry[]> {
  if (!fs.existsSync(POSTS_DIR)) {
    console.log(`⚠️  Newsletter-pending directory not found: ${POSTS_DIR}`);
    return [];
  }

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  if (files.length === 0) {
    console.log("✅ No articles pending for newsletter. Nothing to do!");
    return [];
  }

  const articles: ArticleEntry[] = [];

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const fm = extractFrontmatter(raw);

    if (fm.draft === true) {
      console.log(`⏭️  Skipping ${file} (draft: true)`);
      continue;
    }

    if (fm.newsletter_sent === true) {
      console.log(`⏭️  Skipping ${file} (newsletter_sent: true)`);
      continue;
    }

    const title = (fm.title as string) || "";
    const slug = (fm.slug as string) || "";
    const hook = (fm.newsletter_hook as string) || "";

    if (!title || !slug) {
      console.log(`⚠️  Skipping ${file} (missing title or slug)`);
      continue;
    }

    articles.push({
      title,
      slug,
      hook: hook || "[No newsletter_hook found in frontmatter]",
      url: `${BASE_URL}${slug}`,
      filePath,
    });
  }

  return articles;
}

function loadMeta(metaPath: string): NewsletterMeta | null {
  if (!fs.existsSync(metaPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(metaPath, "utf-8"));
  } catch {
    return null;
  }
}

function deleteMeta(metaPath: string): void {
  if (fs.existsSync(metaPath)) {
    fs.unlinkSync(metaPath);
  }
}

function promptUser(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer: string) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function updateTracker(entry: NewsletterTrackerEntry): void {
  let tracker: { issues: NewsletterTrackerEntry[] } = { issues: [] };
  if (fs.existsSync(TRACKER_PATH)) {
    tracker = JSON.parse(fs.readFileSync(TRACKER_PATH, "utf-8"));
  }
  tracker.issues.push(entry);
  fs.writeFileSync(TRACKER_PATH, JSON.stringify(tracker, null, 2) + "\n");
}

function markArticlesAsSent(articles: ArticleEntry[], date: string): void {
  for (const article of articles) {
    let content = fs.readFileSync(article.filePath, "utf-8");
    content = content.replace(
      /newsletter_sent:\s*false/,
      "newsletter_sent: true",
    );
    content = content.replace(
      /newsletter_date:\s*""/,
      `newsletter_date: "${date}"`,
    );
    fs.writeFileSync(article.filePath, content);

    const destPath = path.join(DONE_DIR, path.basename(article.filePath));
    fs.renameSync(article.filePath, destPath);
    console.log(
      `✅ Moved ${path.basename(article.filePath)} to newsletter-done/`,
    );
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

// ─── Commands ─────────────────────────────────────────────────────────────────

// ✅ Update these values before running
const TEMPLATE_ID = 11; // 👈 paste your Brevo template ID here
const LIST_ID = 11; // 👈 paste your Brevo subscriber list ID here

async function createDraft(metaPath: string) {
  // Step 1: Load meta (personal_note + subject only)
  const meta = loadMeta(metaPath);
  if (!meta || !meta.personal_note || !meta.subject) {
    console.log("\n⚠️  No valid .newsletter-meta.json found.");
    console.log("   Run prompt_newsletter first to generate the meta,");
    console.log("   then run this script.");
    console.log(`\n   Expected config path: ${metaPath}`);
    console.log("   Or specify a custom path: --config /path/to/file.json");
    console.log("\n   Expected format:");
    console.log(`   {
  "personal_note": "...",
  "subject": "..."
}`);
    return;
  }

  // Step 2: Discover articles from frontmatter
  console.log("🔍 Scanning for newsletter-pending articles...\n");
  const articles = await discoverArticles();

  if (articles.length === 0) {
    console.log("\nNo articles to include. Exiting.");
    return;
  }

  console.log(`\n📰 Found ${articles.length} article(s) for this issue:\n`);
  articles.forEach((a, i) => {
    console.log(`  ${i + 1}. ${a.title}`);
    console.log(`     Slug: ${a.slug}`);
    console.log(`     URL:  ${a.url}`);
    console.log(`     Hook: ${a.hook.slice(0, 60)}...`);
    console.log("");
  });

  console.log(
    `\n✅ Personal note loaded from meta (${meta.personal_note.split(/\s+/).length} words)`,
  );
  console.log(`✅ Subject line: ${meta.subject}\n`);

  // Step 3: Build params (articles from frontmatter)
  const params = {
    personal_note: meta.personal_note,
    articles: articles.map(({ title, hook, url }) => ({ title, hook, url })),
  };

  const today = new Date().toISOString().split("T")[0];
  const campaignName = `Newsletter — Week of ${today}`;

  // Step 4: Summary
  console.log("📋 Campaign summary:");
  console.log(`   Name:    ${campaignName}`);
  console.log(`   Subject: ${meta.subject}`);
  console.log(`   Articles: ${articles.length}`);
  console.log("");

  // Step 5: Create campaign
  const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY!,
  });

  try {
    const response = await brevo.emailCampaigns.createEmailCampaign({
      name: campaignName,
      sender: {
        name: "Nick",
        email: "newsletter@nickthiru.dev",
      },
      subject: meta.subject,
      templateId: TEMPLATE_ID,
      recipients: {
        listIds: [LIST_ID],
      },
      params: params as unknown as Record<string, unknown>,
    });

    console.log("\n✅ Draft campaign created successfully!");
    console.log(`   Campaign ID: ${response.id}`);
    console.log(
      "   👉 Go to Brevo > Marketing > Campaigns to preview and send.",
    );
    console.log(
      "\n   After sending, run: npx tsx send-newsletter-campaign.ts finalize",
    );
  } catch (error) {
    console.error("❌ Campaign creation failed:", error);
  }
}

async function finalize(metaPath: string) {
  // Load meta to get subject
  const meta = loadMeta(metaPath);
  if (!meta || !meta.subject) {
    console.log("\n⚠️  No valid .newsletter-meta.json found.");
    console.log("   Cannot finalize without the meta config file.");
    console.log(
      "   If you already deleted it, manually update newsletter-tracker.json.",
    );
    return;
  }

  // Discover articles from frontmatter
  const articles = await discoverArticles();

  if (articles.length === 0) {
    console.log("\n⚠️  No matching articles found in newsletter-pending/.");
    console.log("   They may have already been moved. Exiting.");
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  const campaignName = `Newsletter — Week of ${today}`;

  // Update tracker
  const trackerEntry: NewsletterTrackerEntry = {
    date: today,
    campaign_name: campaignName,
    subject: meta.subject,
    articles: articles.map((a) => a.slug),
    status: "sent",
  };
  updateTracker(trackerEntry);

  // Mark articles as sent and move files
  markArticlesAsSent(articles, today);

  // Delete meta config
  deleteMeta(metaPath);

  console.log("\n✅ Tracking updated. Articles moved to newsletter-done/.");
  console.log("✅ Meta config deleted.");
}

// ─── Entry Point ───────────────────────────────────────────────────────────────

async function main() {
  const { command, metaPath } = parseArgs();

  console.log(`\n📧 Newsletter CLI — Command: ${command}\n`);

  switch (command) {
    case "create-draft":
      await createDraft(metaPath);
      break;
    case "finalize":
      await finalize(metaPath);
      break;
    default:
      console.log(`⚠️  Unknown command: ${command}`);
      console.log("Usage:");
      console.log(
        "  npx tsx send-newsletter-campaign.ts create-draft [--config path]",
      );
      console.log(
        "  npx tsx send-newsletter-campaign.ts finalize [--config path]",
      );
      break;
  }
}

main();
