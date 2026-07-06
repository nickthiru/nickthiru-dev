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

export const load: PageServerLoad = async ({ cookies }) => {
  const posts = await getPostsMeta();
  const pinnedPosts = await getPinnedPosts();
  const dynamicSeries = await getAllSeries();
  const allSeries = mergeSeries(seriesData, dynamicSeries);

  // Read preferences from cookies (defaults: all collapsed when cookie is missing)
  const searchGuideExpanded =
    cookies.get("nickthiru_search_guide_expanded") === "true";
  const essentialReadingExpanded =
    cookies.get("nickthiru_essential_reading_expanded") === "true";
  const filtersExpanded = cookies.get("nickthiru_filters_expanded") === "true";

  // Read saved filter state from cookie
  const filterStateCookie = cookies.get("nickthiru_filter_state");
  let initialFilterState: {
    tracks: string[];
    series: string[];
    phases: string[];
  } | null = null;
  if (filterStateCookie) {
    try {
      initialFilterState = JSON.parse(filterStateCookie);
    } catch {
      // Ignore invalid cookies
    }
  }

  return {
    posts,
    pinnedPosts,
    allSeries,
    searchGuideExpanded,
    essentialReadingExpanded,
    filtersExpanded,
    initialFilterState,
  };
};
