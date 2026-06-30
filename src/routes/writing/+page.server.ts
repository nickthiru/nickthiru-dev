import type { PageServerLoad } from "./$types";
import { getPostsMeta, getPinnedPosts, getAllSeries } from "$lib/utils/posts";
import seriesData from "$lib/data/series.json";

// Helper to merge bootstrap series with dynamic series from posts
function mergeSeries(
  bootstrap: typeof seriesData,
  dynamic: Awaited<ReturnType<typeof getAllSeries>>,
) {
  const slugSet = new Set<string>();
  const merged: typeof seriesData = [];

  // Add bootstrap series first
  for (const s of bootstrap) {
    if (!slugSet.has(s.slug)) {
      slugSet.add(s.slug);
      merged.push(s);
    }
  }

  // Add dynamic series not already in bootstrap
  for (const s of dynamic) {
    if (!slugSet.has(s.slug)) {
      slugSet.add(s.slug);
      merged.push({ name: s.name, slug: s.slug, description: s.description });
    }
  }

  return merged;
}

export const load: PageServerLoad = async () => {
  const posts = await getPostsMeta();
  const pinnedPosts = await getPinnedPosts();
  const dynamicSeries = await getAllSeries();
  const allSeries = mergeSeries(seriesData, dynamicSeries);
  return { posts, pinnedPosts, allSeries };
};
