import type { PageServerLoad } from "./$types";
import { getPostsMetaByTrack } from "$lib/utils/posts";

export const load: PageServerLoad = async () => {
  const posts = await getPostsMetaByTrack("business");
  return { posts };
};
