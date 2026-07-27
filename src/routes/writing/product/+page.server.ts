import type { PageServerLoad } from "./$types";
import { getPostsMeta } from "$lib/utils/posts";

export const load: PageServerLoad = async () => {
  const allPosts = await getPostsMeta();
  const posts = allPosts.filter((post) => post.track === "product");
  return { posts };
};
