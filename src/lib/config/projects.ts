/**
 * Unified projects configuration
 * Handles both products (with blog post CTAs) and non-product projects
 */

// Base project fields shared by all project types
interface BaseProject {
  id: string;
  name: string;
  description: string;
  status: "Building" | "Live" | "Planned" | "Idea" | "Archived";
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
    id: "social-engagement-radar",
    name: "Social Engagement Radar",
    tagline: "Now Building",
    description:
      "Monitor X and LinkedIn conversations in real-time. Find relevant discussions about your topics of interest, get AI-drafted responses ready to review, edit, and send. Easily plug into communities without manual monitoring.",
    status: "Building",
    url: "https://thiruailabs.com/products/social-engagement-radar",
    productUrl: "https://thiruailabs.com/products/social-engagement-radar",
    blogPostTags: [
      "social-engagement-radar",
      "product",
      "SaaS",
      "building-in-public",
    ],
    featured: true,
  },

  {
    type: "product",
    id: "ops-pilot",
    name: "OpsPilot",
    tagline: "Now Building",
    description:
      "SMBs will be able to run their entire business with the operational efficiency and intelligence previously available only to enterprises with dedicated accounting, finance, customer support, sales & marketing, and operations teams.",
    status: "Building",
    url: "https://thiruailabs.com/products/ops-pilot",
    productUrl: "https://thiruailabs.com/products/ops-pilot",
    blogPostTags: [
      "ops-pilot",
      "product",
      "SaaS",
      "PaaS",
      "building-in-public",
    ],
    featured: true,
  },

  {
    type: "product",
    id: "policy-forge",
    name: "PolicyForge",
    tagline: "Now Building",
    description:
      "Generate compliant cybersecurity policies in minutes instead of weeks. Answer 15–20 questions about your technology stack and controls. Get framework-aligned security policies ready for audit submission. No expensive consulting.",
    status: "Building",
    url: "https://thiruailabs.com/products/policy-forge",
    productUrl: "https://thiruailabs.com/products/policy-forge",
    blogPostTags: ["policy-forge", "product", "SaaS", "building-in-public"],
    featured: true,
  },

  {
    type: "product",
    id: "secure-stack",
    name: "SecureStack Suite",
    tagline: "Now Building",
    description:
      "A modular AI-native cybersecurity compliance suite of products for regulated SMBs and the defense industry supply chain at large. Each product, starting with PolicyForge + CipherScan, reinforces the others, building a coherent story: 'We assessed our gaps, generated policies, scanned our codebase for crypto vulnerabilities, and had everything organized for our auditor in 4 weeks—using one integrated suite.'",
    status: "Planned",
    url: "https://thiruailabs.com/products#secure-stack",
    productUrl: "https://thiruailabs.com/products#secure-stack",
    blogPostTags: [
      "secure-stack",
      "suite",
      "product",
      "SaaS",
      "building-in-public",
    ],
    featured: false,
  },

  // Non-product projects
  // {
  //   type: "project",
  //   id: "competitor-intelligence",
  //   name: "Competitor Intelligence Agent",
  //   description:
  //     "Automated competitor monitoring and analysis. Track product changes, pricing updates, and market positioning. Get weekly intelligence reports without manual research.",
  //   status: "Idea",
  //   featured: false,
  // },
  // {
  //   type: "project",
  //   id: "vc-due-diligence",
  //   name: "VC Due Diligence Agent",
  //   description:
  //     "Streamline investment due diligence with automated research, document analysis, and risk assessment. Built for venture capital firms evaluating early-stage startups.",
  //   status: "Idea",
  //   featured: false,
  // },
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
 * @deprecated Use getProductBySlug instead for more reliable matching
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

/**
 * Get product by series slug - matches product id to series_slug
 * Used by ProductWaitlistCTA component for reliable product matching
 */
export function getProductBySlug(
  seriesSlug: string | undefined,
): Product | null {
  if (!seriesSlug) return null;
  const products = getProducts();
  return products.find((p) => p.id === seriesSlug) || null;
}
