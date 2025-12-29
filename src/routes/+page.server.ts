import type { PageServerLoad } from "./$types";
import { getPostsMeta } from "$lib/utils/posts";
import { projects } from "$lib/utils/projects";

export const load: PageServerLoad = async () => {
  const posts = await getPostsMeta();
  const recentPosts = posts.slice(0, 3);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  return {
    recentPosts,
    featuredProjects,
  };
};
