export const siteConfig = {
  name: "Nick Thiru",
  title: "nickthiru.dev",
  description:
    "I build production-grade agentic AI systems and share everything I learn along the way.",
  url: "https://nickthiru.dev",
  author: {
    name: "Nick Thiru",
    email: "nick@nickthiru.dev",
    twitter: "@nickthiru",
    github: "nickthiru",
    linkedin: "nickthiru",
  },
  social: {
    twitter: "https://twitter.com/nickthiru",
    github: "https://github.com/nickthiru",
    linkedin: "https://linkedin.com/in/nickthiru",
  },
  nav: [
    { label: "Writing", href: "/writing" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
  ],
  footerNav: [
    { label: "Writing", href: "/writing" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Now", href: "/now" },
    { label: "Subscribe", href: "/subscribe" },
    { label: "RSS", href: "/rss.xml" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
