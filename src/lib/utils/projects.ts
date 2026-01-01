export interface Project {
  name: string;
  description: string;
  status: "Live" | "In Progress" | "Archived";
  url?: string;
  caseStudySlug?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: "LinkedIn Ghostwriter Agent",
    description:
      "AI-powered LinkedIn content assistant for busy founders. Generates posts, comments, and engagement strategies.",
    status: "In Progress",
    featured: true,
  },
  {
    name: "Thiru AI Labs",
    description:
      "Solo studio for agentic micro-SaaS and automation systems. Building the future of AI-first software.",
    status: "Live",
    url: "https://thiruailabs.com",
    featured: true,
  },
  {
    name: "nickthiru.dev",
    description:
      "This site—built with SvelteKit, markdown-in-repo, and deployed on Vercel. Open-source and documented.",
    status: "Live",
    featured: true,
  },
  {
    name: "Agent Observability Toolkit",
    description:
      "Lightweight observability layer for LangGraph agents. Traces, metrics, and debugging tools.",
    status: "In Progress",
    featured: true,
  },
];
