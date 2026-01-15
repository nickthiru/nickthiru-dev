# Configuration Structure

This directory contains all site and product configuration in a modular structure.

## Files

### `site.ts`

Main site configuration including:

- Site metadata (name, title, description, URL)
- Author information
- Social links
- Navigation menus (header and footer)
- Newsletter provider settings

### `projects.ts`

Unified projects configuration (handles both products and non-product projects):

- **Products**: Projects with blog post CTA support (type: 'product')
- **Non-product projects**: Regular projects, experiments, etc.
- Single source of truth for all projects displayed on `/projects` page
- Helper functions:
  - `getAllProjects()` - Get all projects for the projects page
  - `getProducts()` - Get only product-type projects
  - `getProductByTag()` - Match blog post tags to products for CTAs

### `index.ts`

Central export point that merges all configs for easy importing:

```typescript
import { siteConfig, projects, getProductByTag } from "$lib/config";
```

## Adding a Product (with blog post CTA)

To add a new product to the waitlist CTA system:

1. Open `src/lib/config/projects.ts`
2. Add a new product object to the `projects` array:

```typescript
{
  id: 'your-product-id',
  name: 'Your Product Name',
  tagline: 'Now Building', // or 'Launched', 'Coming Soon', etc.
  description: 'Brief description shown in the CTA',
  url: 'https://thiruailabs.com/products/your-product',
  status: 'building', // 'building' | 'launched' | 'planned'
  tags: ['your-product-tag', 'product', 'saas'] // Tags that trigger this CTA
}
```

3. Tag your blog posts with one of the product's tags
4. The CTA will automatically appear on matching posts

## How Product CTAs Work

The `ProductWaitlistCTA` component:

1. Receives post tags as props
2. Calls `getProductByTag(tags)` to find a matching product
3. If a match is found, displays the product's CTA with dynamic content
4. Returns the **first** matching product (order matters in the array)

## Migration Notes

Previously, all configuration was in `src/lib/config.ts`. It has been refactored into this modular structure to:

- Separate concerns (site config vs product config)
- Make it easier to add new products
- Avoid bloating the main config file
- Keep product-specific logic isolated

All existing imports continue to work via the `index.ts` barrel export.
