import type { PageServerLoad } from "./$types";
import { getPinnedPosts } from "$lib/utils/posts";
import { getAllProjects } from "$lib/config";

export const load: PageServerLoad = async () => {
  const pinnedPosts = await getPinnedPosts();
  const allProjects = getAllProjects();
  const featuredProjects = allProjects.filter((p) => p.featured).slice(0, 4);

  return {
    pinnedPosts,
    featuredProjects,
  };
};
