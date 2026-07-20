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

interface PostEntry {
  slug: string;
  title: string;
  phase: string;
  position: number;
  publishedAt: string;
}

interface PhaseInfo {
  posts_published: number;
  next_topic: string | null;
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

  const slug = (fm.slug as string) || "";
  const title = (fm.title as string) || "";
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
    processFile(args.filePath, tracker);
  } else {
    // Batch mode: scan newsletter-pending/
    if (!fs.existsSync(PENDING_DIR)) {
      console.log(`⚠️  Newsletter-pending directory not found: ${PENDING_DIR}`);
      console.log("Nothing to do.");
      return;
    }

    const files = fs
      .readdirSync(PENDING_DIR)
      .filter((f: string) => f.endsWith(".md"));
    if (files.length === 0) {
      console.log("✅ No articles in newsletter-pending/. Nothing to do.");
      return;
    }

    console.log(
      `🔍 Scanning ${files.length} file(s) in newsletter-pending/...\n`,
    );
    for (const file of files) {
      const filePath = path.join(PENDING_DIR, file);
      processFile(filePath, tracker);
    }
  }

  // Write back
  fs.writeFileSync(
    SERIES_TRACKER_PATH,
    JSON.stringify(tracker, null, 2) + "\n",
  );
  console.log("\n✅ series-tracker.json updated.");
}

updateSeriesTracker(parseArgs());
