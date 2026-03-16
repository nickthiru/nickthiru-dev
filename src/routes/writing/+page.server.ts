import type { PageServerLoad } from "./$types";
import { getPostsMeta, getPinnedPosts } from "$lib/utils/posts";

export const load: PageServerLoad = async () => {
  const posts = await getPostsMeta();
  const pinnedPosts = await getPinnedPosts();
  return { posts, pinnedPosts };
};
