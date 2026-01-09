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
    name: "LinkedIn Ghostwriter",
    description:
      "Turn voice notes into authentic LinkedIn posts. Style learning, quality gates, and scheduling built-in. For founders who want to post consistently without sounding like corporate AI.",
    status: "In Progress",
    url: "/waitlist",
    featured: true,
  },
];
