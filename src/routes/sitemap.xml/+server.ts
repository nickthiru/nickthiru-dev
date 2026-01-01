import type { RequestHandler } from "./$types";
import { getPostsMeta, type PostMeta } from "$lib/utils/posts";
import { siteConfig } from "$lib/config";

export const prerender = true;

export const GET: RequestHandler = async () => {
  const posts = await getPostsMeta();

  const staticPages = [
    "",
    "/writing",
    "/engineering",
    "/operating",
    "/projects",
    "/about",
    "/now",
    "/contact",
    "/subscribe",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${siteConfig.url}${page}</loc>
    <changefreq>${page === "" ? "daily" : "weekly"}</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("")}
  ${posts
    .map(
      (post: PostMeta) => `
  <url>
    <loc>${siteConfig.url}/writing/${post.slug}</loc>
    <lastmod>${post.updatedAt || post.publishedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=0, s-maxage=3600",
    },
  });
};
