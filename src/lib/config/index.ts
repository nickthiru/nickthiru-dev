/**
 * Central configuration export
 * Merges site config and projects/products config for easy imports
 */

export { siteConfig, type SiteConfig } from "./site";
export {
  projects,
  getAllProjects,
  getProducts,
  getProductByTag,
  type Project,
  type Product,
  type NonProductProject,
} from "./projects";
