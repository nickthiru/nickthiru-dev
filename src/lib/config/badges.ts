/**
 * Badge and pill color configuration
 * Single source of truth for all badge/pill styling across the app
 * Used by: TrackBadge.svelte, FilterPills.svelte, PostCard.svelte, +page.svelte
 */

// ============================================================
// Track Badge Colors
// ============================================================
// These colors match the track badges shown in the track description
// cards at the top of the /writing page and on post cards.
// Defined in app.css as:
//   .track-badge-technical: bg-blue-lighter text-blue-darker
//   .track-badge-business: bg-pink-lighter text-pink-darker
//   .track-badge-product: bg-purple-100 text-purple-800

export interface TrackBadgeConfig {
  label: string;
  // Classes for the TrackBadge component (on post cards, track cards)
  badge: string;
  // Classes for the filter pill when unselected
  pill: string;
}

export const trackBadges: Record<string, TrackBadgeConfig> = {
  engineering: {
    label: "Engineering",
    badge: "track-badge-technical",
    pill: "text-blue-darker bg-blue-lighter dark:text-blue-light dark:bg-blue-darker/30",
  },
  business: {
    label: "Business",
    badge: "track-badge-business",
    pill: "text-pink-darker bg-pink-lighter dark:text-pink-light dark:bg-pink-darker/30",
  },
  product: {
    label: "Product",
    badge: "track-badge-product",
    pill: "text-purple-800 bg-purple-100 dark:text-purple-300 dark:bg-purple-900/30",
  },
};

// Map display names to slugs (for filter pill buttons)
export const trackDisplayToSlug: Record<string, string> = {
  All: "all",
  Engineering: "engineering",
  Business: "business",
  Product: "product",
};

// ============================================================
// Phase Badge Colors
// ============================================================
// Phases represent stages in a product's development lifecycle.
// Strategy uses indigo to avoid clashing with Product track's purple.

export interface PhaseBadgeConfig {
  label: string;
  // Classes for the badge (used in both filter pills and post cards)
  badge: string;
}

export const phaseBadges: Record<string, PhaseBadgeConfig> = {
  strategy: {
    label: "Strategy",
    badge:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  },
  design: {
    label: "Design",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  },
  engineering: {
    label: "Engineering",
    badge:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  },
  deployment: {
    label: "Deployment",
    badge:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  },
  maintenance: {
    label: "Maintenance",
    badge:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  },
  community: {
    label: "Community",
    badge: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  },
};

// Phase display order (for filter pills)
export const phaseOrder = [
  "strategy",
  "design",
  "engineering",
  "deployment",
  "maintenance",
  "community",
] as const;

// ============================================================
// Series Badge Style
// ============================================================
// Series badges use a neutral black-on-white style with gray border.
// This scales to any number of series without color conflicts.

export const seriesBadgeStyle =
  "px-2 py-0.5 rounded text-xs font-medium text-secondary bg-white border border-gray-400 dark:text-[#A3A3A3] dark:bg-[#0A0A0A] dark:border-gray-500";

// ============================================================
// Filter Pill Active States
// ============================================================
// CSS classes for the "selected/active" state of different filter types.

// Track pills: purple ring on top of track color
export const trackPillActiveStyle =
  "ring-2 ring-accent ring-offset-1 dark:ring-offset-[#0A0A0A]";

// Series named pills: purple border only (no fill)
export const seriesPillActiveStyle =
  "text-secondary bg-white border-2 border-accent dark:text-[#A3A3A3] dark:bg-[#0A0A0A] dark:border-accent";

// Phase pills: purple ring on top of phase color
export const phasePillActiveStyle =
  "ring-2 ring-accent ring-offset-1 dark:ring-offset-[#0A0A0A]";

// "All" pills: white-on-purple (same for both Track and Series groups)
export const allPillActiveStyle =
  "bg-accent text-white border border-accent hover:bg-accent/90";

// Inactive pill base style (border + hover, no text color — text color comes from track/series specific classes)
export const pillInactiveStyle =
  "border border-border dark:border-[#262626] hover:border-accent";

// Inactive series pill text color
export const seriesPillInactiveText = "text-secondary dark:text-[#A3A3A3]";
