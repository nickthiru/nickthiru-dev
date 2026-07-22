import * as fs from "fs";
import * as path from "path";

const SERIES_TRACKER_PATH = path.resolve(
  // @ts-ignore — import.meta.dirname works at runtime with tsx
  import.meta.dirname,
  "../src/content/posts/series-tracker.json",
);

const PENDING_DIR = path.resolve(
  // @ts-ignore — import.meta.dirname works at runtime with tsx
  import.meta.dirname,
  "../src/content/posts/published/newsletter-pending",
);

const DRAFTS_DIR = path.resolve(
  // @ts-ignore — import.meta.dirname works at runtime with tsx
  import.meta.dirname,
  "../src/content/posts/drafts",
);

interface PostEntry {
  slug: string;
  title: string;
  phase: string;
  position: number;
  publishedAt: string;
}

interface PhaseInfo {
  posts_published: number;
}

interface SeriesEntry {
  name: string;
  slug: string;
  description: string;
  status: string;
  current_phase: string;
  current_position: number;
  total_planned_posts: string | number;
  phases: Record<string, PhaseInfo>;
  posts: PostEntry[];
}

interface SeriesTracker {
  series: SeriesEntry[];
}

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

function parseArgs(): { filePath: string | null } {
  const args = process.argv.slice(2);
  let filePath: string | null = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--file" && args[i + 1]) {
      filePath = path.resolve(args[i + 1]);
      i++;
    }
  }

  return { filePath };
}

/**
 * Determine if a draft post is ready to be moved to newsletter-pending/.
 *
 * Criteria:
 *  1. draft !== true  (must be published)
 *  2. linkedin_url and x_url both non-empty (social posts created)
 *  3. newsletter_hook non-empty (required for digest)
 *  4. newsletter_sent !== true (not already included in a newsletter)
 */
function isReadyToMove(fm: Record<string, unknown>): boolean {
  const draft = fm.draft as boolean | undefined;
  const linkedin = (fm.linkedin_url as string) || "";
  const x = (fm.x_url as string) || "";
  const hook = (fm.newsletter_hook as string) || "";
  const sent = fm.newsletter_sent as boolean | undefined;

  if (draft === true) return false;
  if (!linkedin || !x) return false;
  if (!hook) return false;
  if (sent === true) return false;

  return true;
}

/**
 * Move a file from drafts/ to newsletter-pending/.
 */
function moveFileToPending(sourcePath: string): void {
  const basename = path.basename(sourcePath);
  const destPath = path.join(PENDING_DIR, basename);

  if (!fs.existsSync(PENDING_DIR)) {
    fs.mkdirSync(PENDING_DIR, { recursive: true });
  }

  fs.renameSync(sourcePath, destPath);
  console.log(`📦 Moved ${basename} → newsletter-pending/`);
}

function processFile(filePath: string, tracker: SeriesTracker): void {
  const raw = fs.readFileSync(filePath, "utf-8");
  const fm = extractFrontmatter(raw);

  const seriesSlug = (fm.series_slug as string) || "";
  if (!seriesSlug) {
    console.log(
      `⏭️  ${path.basename(filePath)} — standalone post, no series. Skipping.`,
    );
    return;
  }

  const series = tracker.series.find(
    (s) =>
      s.slug === seriesSlug ||
      s.name.toLowerCase() === (fm.series_name as string)?.toLowerCase(),
  );

  if (!series) {
    console.log(
      `⚠️  ${path.basename(filePath)} — series "${seriesSlug}" not found in tracker. Skipping.`,
    );
    return;
  }

  // Frontmatter uses 'subtitle' as the title field (title is deprecated)
  const slug = (fm.slug as string) || "";
  const title = (fm.subtitle as string) || (fm.title as string) || "";
  const phase = (fm.series_phase as string) || "";
  const position = (fm.series_position as number) || 0;
  const publishedAt = (fm.publishedAt as string) || "";

  if (!slug || !title) {
    console.log(
      `⚠️  ${path.basename(filePath)} — missing slug or title. Skipping.`,
    );
    return;
  }

  // Check if post already exists (idempotent)
  const existing = series.posts.find((p) => p.slug === slug);
  if (existing) {
    console.log(
      `✅ ${slug} — already recorded in series "${series.name}". Skipping.`,
    );
    return;
  }

  // Append new post entry
  const newEntry: PostEntry = { slug, title, phase, position, publishedAt };
  series.posts.push(newEntry);
  console.log(
    `📝 ${slug} — added to series "${series.name}" (${phase} #${position})`,
  );

  // Recalculate posts_published from posts array (source of truth)
  for (const phaseKey of Object.keys(series.phases)) {
    const count = series.posts.filter((p) => p.phase === phaseKey).length;
    series.phases[phaseKey].posts_published = count;
  }

  // Update current_position if this post is the latest
  if (position > series.current_position) {
    series.current_position = position;
    series.current_phase = phase;
  }
}

function updateSeriesTracker(args: ReturnType<typeof parseArgs>): void {
  if (!fs.existsSync(SERIES_TRACKER_PATH)) {
    console.error(
      `❌ series-tracker.json not found at: ${SERIES_TRACKER_PATH}`,
    );
    process.exit(1);
  }

  const tracker: SeriesTracker = JSON.parse(
    fs.readFileSync(SERIES_TRACKER_PATH, "utf-8"),
  );

  if (args.filePath) {
    // Process single file
    if (!fs.existsSync(args.filePath)) {
      console.error(`❌ File not found: ${args.filePath}`);
      process.exit(1);
    }

    const resolvedPath = path.resolve(args.filePath);
    const raw = fs.readFileSync(resolvedPath, "utf-8");
    const fm = extractFrontmatter(raw);

    // If the file is in drafts/ and is ready, move it first
    if (resolvedPath.startsWith(DRAFTS_DIR) && isReadyToMove(fm)) {
      moveFileToPending(resolvedPath);
      // Process the copy in newsletter-pending/
      const pendingPath = path.join(PENDING_DIR, path.basename(resolvedPath));
      processFile(pendingPath, tracker);
    } else if (resolvedPath.startsWith(DRAFTS_DIR) && !isReadyToMove(fm)) {
      const reasons = getSkipReasons(fm);
      console.log(
        `⏭️  ${path.basename(resolvedPath)} — not ready to move. Reasons: ${reasons.join(", ")}`,
      );
    } else {
      // File is already in newsletter-pending/ or elsewhere
      processFile(resolvedPath, tracker);
    }
  } else {
    // Batch mode: scan drafts/ for ready-to-move posts, then scan newsletter-pending/
    let movedCount = 0;
    let skippedCount = 0;

    // Phase 1: Check drafts/ for posts ready to move
    if (fs.existsSync(DRAFTS_DIR)) {
      const draftFiles = fs
        .readdirSync(DRAFTS_DIR)
        .filter((f: string) => f.endsWith(".md"));

      if (draftFiles.length > 0) {
        console.log(
          `🔍 Checking ${draftFiles.length} draft(s) for readiness...\n`,
        );
      }

      for (const file of draftFiles) {
        const draftPath = path.join(DRAFTS_DIR, file);
        const raw = fs.readFileSync(draftPath, "utf-8");
        const fm = extractFrontmatter(raw);

        if (isReadyToMove(fm)) {
          moveFileToPending(draftPath);
          movedCount++;
        } else {
          const reasons = getSkipReasons(fm);
          console.log(
            `⏭️  ${file} — not ready. Reasons: ${reasons.join(", ")}`,
          );
          skippedCount++;
        }
      }
    }

    // Phase 2: Process all .md files in newsletter-pending/
    if (!fs.existsSync(PENDING_DIR)) {
      console.log(`⚠️  Newsletter-pending directory not found: ${PENDING_DIR}`);
      console.log("Nothing to do.");
      return;
    }

    const pendingFiles = fs
      .readdirSync(PENDING_DIR)
      .filter((f: string) => f.endsWith(".md"));

    if (pendingFiles.length === 0 && movedCount === 0) {
      console.log("✅ No articles to process. Nothing to do.");
      return;
    }

    if (pendingFiles.length > 0) {
      console.log(
        `\n📰 Processing ${pendingFiles.length} article(s) in newsletter-pending/...\n`,
      );
      for (const file of pendingFiles) {
        const filePath = path.join(PENDING_DIR, file);
        processFile(filePath, tracker);
      }
    }

    // Summary
    console.log(
      `\n📊 Summary: ${movedCount} moved, ${skippedCount} skipped, ${pendingFiles.length} processed for tracker.`,
    );
  }

  // Write back
  fs.writeFileSync(
    SERIES_TRACKER_PATH,
    JSON.stringify(tracker, null, 2) + "\n",
  );
  console.log("\n✅ series-tracker.json updated.");
}

/**
 * Return human-readable reasons why a post is not ready to move.
 */
function getSkipReasons(fm: Record<string, unknown>): string[] {
  const reasons: string[] = [];
  const draft = fm.draft as boolean | undefined;
  const linkedin = (fm.linkedin_url as string) || "";
  const x = (fm.x_url as string) || "";
  const hook = (fm.newsletter_hook as string) || "";
  const sent = fm.newsletter_sent as boolean | undefined;

  if (draft === true) reasons.push("draft=true");
  if (!linkedin) reasons.push("linkedin_url empty");
  if (!x) reasons.push("x_url empty");
  if (!hook) reasons.push("newsletter_hook empty");
  if (sent === true) reasons.push("newsletter_sent=true");

  return reasons;
}

updateSeriesTracker(parseArgs());
