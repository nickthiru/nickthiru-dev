export interface Project {
  name: string;
  description: string;
  status: "Live" | "In Progress" | "Idea" | "Archived";
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
    url: "https://thiruailabs.com/products/linkedin-ghostwriter",
    featured: true,
  },
  {
    name: "Competitor Intelligence Agent",
    description:
      "Automated competitor monitoring and analysis. Track product changes, pricing updates, and market positioning. Get weekly intelligence reports without manual research.",
    status: "Idea",
    featured: false,
  },
  {
    name: "VC Due Diligence Agent",
    description:
      "Streamline investment due diligence with automated research, document analysis, and risk assessment. Built for venture capital firms evaluating early-stage startups.",
    status: "Idea",
    featured: false,
  },
];
