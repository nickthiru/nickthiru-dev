import { error } from "@sveltejs/kit";
import { getPostBySlug } from "$lib/utils/posts";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const post = await getPostBySlug(params.post_name);

  if (!post) {
    throw error(404, "Post not found");
  }

  return { post };
};
