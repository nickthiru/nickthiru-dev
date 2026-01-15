import { calculateReadingTime } from "./reading-time";
import type { Component } from "svelte";

export interface PostFrontmatter {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  track: "technical" | "business";
  tags?: string[];
  draft?: boolean;
  canonical?: string;
  image?: string;
}

export interface PostMeta extends PostFrontmatter {
  readingTime: string;
}

export interface Post extends PostMeta {
  content: Component;
}

// Always hide draft posts, even in dev mode, for consistency with production
const isDev = false;

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
        rawPostModules[path] || metadata.description || ""
      ),
    });
  }

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
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
          rawPostModules[path] || metadata.description || ""
        ),
        content: file.default,
      };
    }
  }
  return null;
}

export async function getPostsMetaByTrack(
  track: "technical" | "business"
): Promise<PostMeta[]> {
  const posts = await getPostsMeta();
  return posts.filter((post) => post.track === track);
}
