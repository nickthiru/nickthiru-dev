import { error } from "@sveltejs/kit";
import {
  getPostBySlug,
  getPostsBySeries,
  getSeriesSummary,
  getPreviousPostInSeries,
  getNextPostInSeries,
  getSeriesPosition,
} from "$lib/utils/posts";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const post = await getPostBySlug(params.post_name);

  if (!post) {
    throw error(404, "Post not found");
  }

  let seriesPosts: Awaited<ReturnType<typeof getPostsBySeries>> = [];
  let seriesMeta: Awaited<ReturnType<typeof getSeriesSummary>> = null;
  let previousInSeries: Awaited<ReturnType<typeof getPreviousPostInSeries>> =
    null;
  let nextInSeries: Awaited<ReturnType<typeof getNextPostInSeries>> = null;
  let positionInfo: Awaited<ReturnType<typeof getSeriesPosition>> | null = null;

  if (post.series_slug) {
    seriesMeta = await getSeriesSummary(post.series_slug);
    seriesPosts = await getPostsBySeries(post.series_slug);
    previousInSeries = await getPreviousPostInSeries(
      post.slug,
      post.series_slug,
    );
    nextInSeries = await getNextPostInSeries(post.slug, post.series_slug);
    positionInfo = await getSeriesPosition(post.slug, post.series_slug);
  }

  return {
    post,
    seriesMeta,
    seriesPosts,
    previousInSeries,
    nextInSeries,
    positionInfo,
  };
};
