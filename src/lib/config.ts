export const siteConfig = {
  name: "Nick Thiru",
  title: "nickthiru.dev",
  description:
    "I build production-grade agentic AI systems and share everything I learn along the way.",
  url: "https://nickthiru.dev",
  newsletter: {
    provider: "buttondown",
    username: "nickthirudev",
  },
  author: {
    name: "Nick Thiru",
    email: "contact@nickthiru.dev",
    twitter: "@nickthiru",
    github: "nickthiru",
    linkedin: "nick-thiru",
  },
  social: {
    twitter: "https://twitter.com/intent/follow?screen_name=nickthiru",
    github: "https://github.com/nickthiru",
    linkedin: "https://linkedin.com/in/nick-thiru",
  },
  nav: [
    { label: "About", href: "/about" },
    { label: "Writing", href: "/writing" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],
  footerNav: [
    { label: "About", href: "/about" },
    { label: "Writing", href: "/writing" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
    { label: "Subscribe", href: "/subscribe" },
    { label: "RSS", href: "/rss.xml" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
