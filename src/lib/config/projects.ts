/**
 * Unified projects configuration
 * Handles both products (with blog post CTAs) and non-product projects
 */

// Base project fields shared by all project types
interface BaseProject {
  id: string;
  name: string;
  description: string;
  status: "building" | "live" | "idea" | "archived";
  url?: string;
  featured?: boolean;
}

// Product projects that appear in blog post CTAs
export interface Product extends BaseProject {
  type: "product";
  tagline: string; // Display tagline for CTA (e.g., "Now Building")
  blogPostTags: string[]; // Tags that trigger this product's CTA in blog posts
  productUrl: string; // Link to product page on thiruailabs.com
}

// Non-product projects (experiments, side projects, etc.)
export interface NonProductProject extends BaseProject {
  type: "project" | "experiment";
}

// Union type for all projects
export type Project = Product | NonProductProject;

/**
 * All projects - single source of truth
 * Products have additional fields for blog post CTAs
 */
export const projects: Project[] = [
  // Products (appear in blog post CTAs)
  {
    type: "product",
    id: "linkedin-ghostwriter",
    name: "LinkedIn Ghostwriter",
    tagline: "Now Building",
    description:
      "Turn voice notes into authentic LinkedIn posts. Style learning, quality gates, and scheduling built-in. For founders who want to post consistently without sounding like corporate AI.",
    status: "building",
    url: "https://thiruailabs.com/products/linkedin-ghostwriter",
    productUrl: "https://thiruailabs.com/products/linkedin-ghostwriter",
    blogPostTags: [
      "linkedin-ghostwriter",
      "product",
      "saas",
      "building-in-public",
    ],
    featured: true,
  },

  // Non-product projects
  {
    type: "project",
    id: "competitor-intelligence",
    name: "Competitor Intelligence Agent",
    description:
      "Automated competitor monitoring and analysis. Track product changes, pricing updates, and market positioning. Get weekly intelligence reports without manual research.",
    status: "idea",
    featured: false,
  },
  {
    type: "project",
    id: "vc-due-diligence",
    name: "VC Due Diligence Agent",
    description:
      "Streamline investment due diligence with automated research, document analysis, and risk assessment. Built for venture capital firms evaluating early-stage startups.",
    status: "idea",
    featured: false,
  },
];

/**
 * Get all projects (for /projects page)
 */
export function getAllProjects(): Project[] {
  return projects;
}

/**
 * Get only product projects
 */
export function getProducts(): Product[] {
  return projects.filter((p): p is Product => p.type === "product");
}

/**
 * Get product by blog post tag - returns the first matching product
 * Used by ProductWaitlistCTA component
 */
export function getProductByTag(postTags: string[]): Product | null {
  const products = getProducts();
  for (const product of products) {
    if (product.blogPostTags.some((tag) => postTags.includes(tag))) {
      return product;
    }
  }
  return null;
}
