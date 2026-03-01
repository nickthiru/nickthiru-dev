import type { PageServerLoad } from "./$types";
import { getPostsMeta } from "$lib/utils/posts";
import { getAllProjects } from "$lib/config";

export const load: PageServerLoad = async () => {
  const posts = await getPostsMeta();
  const recentPosts = posts.slice(0, 4);
  const allProjects = getAllProjects();
  const featuredProjects = allProjects.filter((p) => p.featured).slice(0, 4);

  return {
    recentPosts,
    featuredProjects,
  };
};
