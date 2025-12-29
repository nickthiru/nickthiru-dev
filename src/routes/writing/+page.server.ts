import type { PageServerLoad } from "./$types";
import { getPostsMeta } from "$lib/utils/posts";

export const load: PageServerLoad = async () => {
  const posts = await getPostsMeta();
  return { posts };
};
