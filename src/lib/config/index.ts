/**
 * Central configuration export
 * Merges site config, projects/products config, and badge config for easy imports
 */

export { siteConfig, type SiteConfig } from "./site";
export {
  projects,
  getAllProjects,
  getProducts,
  getProductByTag,
  getProductBySlug,
  type Project,
  type Product,
  type NonProductProject,
} from "./projects";
export {
  trackBadges,
  phaseBadges,
  phaseOrder,
  seriesBadgeStyle,
  trackPillActiveStyle,
  seriesPillActiveStyle,
  phasePillActiveStyle,
  allPillActiveStyle,
  pillInactiveStyle,
  type TrackBadgeConfig,
  type PhaseBadgeConfig,
} from "./badges";
