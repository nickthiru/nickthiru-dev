import { calculateReadingTime } from "./reading-time";
import type { Component } from "svelte";

export interface PostFrontmatter {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  track: "engineering" | "business" | "product";
  tags?: string[];
  draft?: boolean;
  pinned?: boolean;
  pinned_order?: number;
  canonical?: string;
  image?: string;
  linkedin_url?: string;
  x_url?: string;
  // Series metadata
  series_name?: string;
  series_slug?: string;
  series_phase?:
    | "strategy"
    | "design"
    | "engineering"
    | "deployment"
    | "maintenance"
    | "community";
  series_position?: number;
}

export interface PostMeta extends PostFrontmatter {
  readingTime: string;
}

export interface Post extends PostMeta {
  content: Component;
}

// Aggregated series summary
export interface SeriesSummary {
  series_name: string;
  series_slug: string;
  total_posts: number;
  phases: {
    strategy: PostMeta[];
    design: PostMeta[];
    engineering: PostMeta[];
    deployment: PostMeta[];
    maintenance?: PostMeta[];
    community?: PostMeta[];
  };
  status: "in-progress" | "complete";
}

// Series metadata for bootstrapping (from series.json)
export interface SeriesMeta {
  name: string;
  slug: string;
  description: string;
  icon?: string;
}

// Use Vite's import.meta.env.DEV for proper dev mode detection
const isDev = import.meta.env.DEV;

type PostModule = {
  metadata: PostFrontmatter;
  default: Component;
};

const postModules = import.meta.glob<PostModule>("/src/content/posts/*.md", {
  eager: true,
});

const rawPostModules = import.meta.glob<string>("/src/content/posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export async function getPostsMeta(): Promise<PostMeta[]> {
  const posts: PostMeta[] = [];

  for (const path in postModules) {
    const file = postModules[path];
    const metadata = file.metadata;

    if (!metadata) {
      continue;
    }

    if (metadata.draft && !isDev) {
      continue;
    }

    posts.push({
      ...metadata,
      readingTime: calculateReadingTime(
        rawPostModules[path] || metadata.description || "",
      ),
    });
  }

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  for (const path in postModules) {
    const file = postModules[path];
    const metadata = file.metadata;

    if (metadata && metadata.slug === slug) {
      if (metadata.draft && !isDev) {
        return null;
      }
      return {
        ...metadata,
        readingTime: calculateReadingTime(
          rawPostModules[path] || metadata.description || "",
        ),
        content: file.default,
      };
    }
  }
  return null;
}

export async function getPostsMetaByTrack(
  track: "engineering" | "business",
): Promise<PostMeta[]> {
  const posts = await getPostsMeta();
  return posts.filter((post) => post.track === track);
}

export async function getPinnedPosts(): Promise<PostMeta[]> {
  const posts = await getPostsMeta();
  const pinnedPosts = posts.filter((post) => post.pinned);

  return pinnedPosts.sort((a, b) => {
    const orderA = a.pinned_order ?? Infinity;
    const orderB = b.pinned_order ?? Infinity;
    return orderA - orderB;
  });
}

// Get all posts in a series, sorted by series_position
export async function getPostsBySeries(
  seriesSlug: string,
): Promise<PostMeta[]> {
  const posts = await getPostsMeta();
  const seriesPosts = posts.filter((post) => post.series_slug === seriesSlug);

  return seriesPosts.sort((a, b) => {
    const posA = a.series_position ?? Infinity;
    const posB = b.series_position ?? Infinity;
    return posA - posB;
  });
}

// Get aggregated series summary with posts grouped by phase
export async function getSeriesSummary(
  seriesSlug: string,
): Promise<SeriesSummary | null> {
  const posts = await getPostsBySeries(seriesSlug);
  if (posts.length === 0) return null;

  const firstPost = posts[0];
  const phases: SeriesSummary["phases"] = {
    strategy: [],
    design: [],
    engineering: [],
    deployment: [],
  };

  for (const post of posts) {
    if (post.series_phase && phases[post.series_phase] !== undefined) {
      phases[post.series_phase]!.push(post);
    }
  }

  return {
    series_name: firstPost.series_name!,
    series_slug: seriesSlug,
    total_posts: posts.length,
    phases,
    status: "in-progress",
  };
}

// Get previous post in series (or null if first)
export async function getPreviousPostInSeries(
  currentSlug: string,
  seriesSlug: string,
): Promise<PostMeta | null> {
  const posts = await getPostsBySeries(seriesSlug);
  const currentIndex = posts.findIndex((p) => p.slug === currentSlug);
  if (currentIndex <= 0) return null;
  return posts[currentIndex - 1];
}

// Get next post in series (or null if last)
export async function getNextPostInSeries(
  currentSlug: string,
  seriesSlug: string,
): Promise<PostMeta | null> {
  const posts = await getPostsBySeries(seriesSlug);
  const currentIndex = posts.findIndex((p) => p.slug === currentSlug);
  if (currentIndex < 0 || currentIndex >= posts.length - 1) return null;
  return posts[currentIndex + 1];
}

// Get position info: { current: number, total: number }
export async function getSeriesPosition(
  currentSlug: string,
  seriesSlug: string,
): Promise<{ current: number; total: number }> {
  const posts = await getPostsBySeries(seriesSlug);
  const currentIndex = posts.findIndex((p) => p.slug === currentSlug);
  return {
    current: currentIndex + 1,
    total: posts.length,
  };
}

// Get all unique series (for filter pills)
export async function getAllSeries(): Promise<SeriesMeta[]> {
  const posts = await getPostsMeta();
  const seriesMap = new Map<string, SeriesMeta>();

  for (const post of posts) {
    if (post.series_slug && !seriesMap.has(post.series_slug)) {
      seriesMap.set(post.series_slug, {
        name: post.series_name || post.series_slug,
        slug: post.series_slug,
        description: "",
      });
    }
  }

  return Array.from(seriesMap.values());
}

// Get posts filtered by track AND series (multi-dimensional)
export async function getFilteredPosts(options: {
  tracks?: string[];
  series?: string[];
}): Promise<PostMeta[]> {
  const posts = await getPostsMeta();
  const { tracks = [], series = [] } = options;

  return posts.filter((post) => {
    const trackMatch = tracks.length === 0 || tracks.includes(post.track);
    const seriesMatch =
      series.length === 0 ||
      (post.series_slug && series.includes(post.series_slug));
    return trackMatch && seriesMatch;
  });
}
