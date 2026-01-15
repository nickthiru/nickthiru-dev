import type { PageServerLoad } from "./$types";
import { getPostsMeta } from "$lib/utils/posts";

export const load: PageServerLoad = async () => {
  const allPosts = await getPostsMeta();
  const posts = allPosts.filter(post => 
    post.tags?.includes('linkedin-ghostwriter') || 
    post.tags?.includes('product')
  );
  return { posts };
};
