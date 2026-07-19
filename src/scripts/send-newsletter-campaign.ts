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

interface NewsletterDraft {
  personal_note: string;
  subject: string;
  articles: Array<{ title: string; hook: string; url: string }>;
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
  "../../../thiru-ai-labs/docs/business/building-in-public-latest/newsletter-tracker.json",
);
const DEFAULT_DRAFT_PATH = path.resolve(
  import.meta.dirname,
  "../content/posts/published/newsletter-pending/.newsletter-draft.json",
);
const BASE_URL = "https://nickthiru.dev/writing/";

// ─── CLI Arg Parsing ─────────────────────────────────────────────────────────

function parseArgs(): { configPath: string } {
  const args = process.argv.slice(2);
  let configPath = DEFAULT_DRAFT_PATH;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--config" && args[i + 1]) {
      configPath = path.resolve(args[i + 1]);
      i++;
    }
  }

  return { configPath };
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

function loadDraft(configPath: string): NewsletterDraft | null {
  if (!fs.existsSync(configPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(configPath, "utf-8"));
  } catch {
    return null;
  }
}

function deleteDraft(configPath: string): void {
  if (fs.existsSync(configPath)) {
    fs.unlinkSync(configPath);
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

async function sendNewsletterCampaign() {
  const { configPath } = parseArgs();

  // Step 1: Load draft config
  const draft = loadDraft(configPath);
  if (!draft || !draft.personal_note || !draft.subject || !draft.articles) {
    console.log("\n⚠️  No valid .newsletter-draft.json found.");
    console.log("   Run prompt_newsletter first to generate the draft,");
    console.log("   then run this script.");
    console.log(`\n   Expected config path: ${configPath}`);
    console.log("   Or specify a custom path: --config /path/to/file.json");
    console.log("\n   Expected format:");
    console.log(`   {
  "personal_note": "...",
  "subject": "...",
  "articles": [
    { "title": "...", "hook": "...", "url": "..." }
  ]
}`);
    return;
  }

  // Step 2: Discover articles (validate against draft)
  console.log("🔍 Scanning for newsletter-pending articles...\n");
  const discovered = await discoverArticles();

  if (discovered.length === 0) {
    console.log("\nNo articles to include. Exiting.");
    return;
  }

  // Match draft articles with discovered files
  const articles: ArticleEntry[] = [];
  for (const draftArticle of draft.articles) {
    const found = discovered.find(
      (d) => d.slug === draftArticle.url.split("/").pop(),
    );
    if (found) {
      articles.push(found);
    } else {
      console.log(`⚠️  Could not find file for: ${draftArticle.title}`);
    }
  }

  if (articles.length === 0) {
    console.log("\n⚠️  No matching articles found. Exiting.");
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
    `\n✅ Personal note loaded from draft (${draft.personal_note.split(/\s+/).length} words)`,
  );
  console.log(`✅ Subject line: ${draft.subject}\n`);

  // Step 3: Build params
  const params = {
    personal_note: draft.personal_note,
    articles: articles.map(({ title, hook, url }) => ({ title, hook, url })),
  };

  const today = new Date().toISOString().split("T")[0];
  const campaignName = `Newsletter — Week of ${today}`;

  // Step 4: Confirm before sending
  console.log("📋 Campaign summary:");
  console.log(`   Name:    ${campaignName}`);
  console.log(`   Subject: ${draft.subject}`);
  console.log(`   Articles: ${articles.length}`);
  console.log("");

  const confirm = await promptUser("Create draft campaign in Brevo? (y/n): ");
  if (confirm.toLowerCase() !== "y") {
    console.log("❌ Aborted. Articles remain in newsletter-pending/.");
    return;
  }

  // Step 5: Create campaign
  const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY!,
  });

  // ✅ Update these values before running
  const TEMPLATE_ID = 11; // 👈 paste your Brevo template ID here
  const LIST_ID = 11; // 👈 paste your Brevo subscriber list ID here

  try {
    const response = await brevo.emailCampaigns.createEmailCampaign({
      name: campaignName,
      sender: {
        name: "Nick",
        email: "newsletter@nickthiru.dev",
      },
      subject: draft.subject,
      templateId: TEMPLATE_ID,
      recipients: {
        listIds: [LIST_ID],
      },
      params: params as unknown as Record<string, unknown>,
    });

    console.log("\n✅ Draft campaign created successfully!");
    console.log(`   Campaign ID: ${response.id}`);
    console.log(
      "   👉 Go to Brevo > Marketing > Campaigns to preview the draft.",
    );

    // Step 6: Confirm send and update tracking
    const sent = await promptUser("\nCampaign sent in Brevo? (y/n): ");
    if (sent.toLowerCase() === "y") {
      const trackerEntry: NewsletterTrackerEntry = {
        date: today,
        campaign_name: campaignName,
        subject: draft.subject,
        articles: articles.map((a) => a.slug),
        status: "sent",
      };
      updateTracker(trackerEntry);
      markArticlesAsSent(articles, today);
      deleteDraft(configPath);
      console.log("\n✅ Tracking updated. Articles moved to newsletter-done/.");
      console.log("✅ Draft config deleted.");
    } else {
      console.log(
        "\n⏭️  Tracking not updated. Articles remain in newsletter-pending/.",
      );
      console.log("   Run the script again after sending to update tracking.");
    }
  } catch (error) {
    console.error("❌ Campaign creation failed:", error);
  }
}

sendNewsletterCampaign();
