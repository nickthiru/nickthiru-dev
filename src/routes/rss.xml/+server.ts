import type { RequestHandler } from "./$types";
import { getPostsMeta, type PostMeta } from "$lib/utils/posts";
import { siteConfig } from "$lib/config";

export const prerender = true;

export const GET: RequestHandler = async () => {
  const posts = await getPostsMeta();

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name}</title>
    <description>${siteConfig.description}</description>
    <link>${siteConfig.url}</link>
    <atom:link href="${
      siteConfig.url
    }/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
      .map(
        (post: PostMeta) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${siteConfig.url}/writing/${post.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/writing/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category>${
        post.track === "technical" ? "Engineering" : "Operating"
      }</category>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=0, s-maxage=3600",
    },
  });
};
