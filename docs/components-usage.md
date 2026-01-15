# Component Usage Documentation

## ProductWaitlistCTA vs SubscribeForm

### ProductWaitlistCTA Component

**Purpose:** Conditionally displays a product CTA (Call-to-Action) within blog posts to drive readers to product pages on thiruailabs.com.

**Location:** `src/lib/components/ProductWaitlistCTA.svelte`

**How it works:**

1. Receives post tags as props
2. Calls `getProductByTag(tags)` to find a matching product from `src/lib/config/projects.ts`
3. If a product matches the post's tags, displays a styled CTA box with:
   - Product tagline (e.g., "Now Building")
   - Product name
   - Product description
   - Link to product page on thiruailabs.com (e.g., `https://thiruailabs.com/products/linkedin-ghostwriter`)

**Where it's used:**

- `src/routes/writing/[slug]/+page.svelte` - Individual blog post pages
- Appears **between** the post content and the footer
- Only shows if the post has tags matching a product's `blogPostTags`

**Example:**

```svelte
<ProductWaitlistCTA tags={data.post.tags} />
```

**Key difference from SubscribeForm:**

- **Purpose:** Drives traffic to product pages (external link to thiruailabs.com)
- **Action:** "Learn more and join the waitlist" → Opens product page in new tab
- **Conditional:** Only appears on posts with product-related tags
- **Destination:** thiruailabs.com product pages (where actual waitlist forms live)

---

### SubscribeForm Component

**Purpose:** Collects email subscriptions for the newsletter via Buttondown API.

**Location:** `src/lib/components/SubscribeForm.svelte`

**How it works:**

1. Displays email input (and optional first name field)
2. Submits to `/api/subscribe` endpoint
3. Adds subscriber to Buttondown newsletter with optional tags
4. Shows success/error states with animated loading dots

**Where it's used:**

1. **Blog post footer** (`src/routes/writing/[slug]/+page.svelte`)

   - Appears at the bottom of every blog post
   - Tagged with the post's track (e.g., "engineering", "business")
   - Purpose: Convert readers into newsletter subscribers

2. **Home page** (`src/routes/+page.svelte`)

   - Newsletter section near bottom
   - Tagged with "home"
   - Helper mode: "none" (minimal text)

3. **Subscribe page** (`src/routes/subscribe/+page.svelte`)
   - Dedicated subscription page
   - Tagged with "site"
   - Helper mode: "email-only" (shows email-only helper text)

**Props:**

- `tag?: string` - Buttondown tag to categorize subscriber (e.g., "engineering", "business", "home")
- `helper?: 'default' | 'email-only' | 'none'` - Controls helper text display

**Key difference from ProductWaitlistCTA:**

- **Purpose:** Newsletter subscription (stays on nickthiru.dev)
- **Action:** "Subscribe" → Adds to Buttondown newsletter
- **Always present:** Shows on all blog posts (in footer)
- **Destination:** Internal - subscribes to newsletter, no navigation

---

## Summary

| Component              | Purpose           | Where Used                         | Action     | Destination                  |
| ---------------------- | ----------------- | ---------------------------------- | ---------- | ---------------------------- |
| **ProductWaitlistCTA** | Product promotion | Blog post content (conditional)    | Learn more | thiruailabs.com product page |
| **SubscribeForm**      | Newsletter signup | Blog post footer, home, /subscribe | Subscribe  | Buttondown newsletter        |

**Flow in a blog post:**

1. Reader reads post content
2. **ProductWaitlistCTA** appears (if post has product tags) → Drives to product page
3. Post footer with "Thanks for reading"
4. **SubscribeForm** appears → Captures email for newsletter

Both components serve different conversion goals:

- ProductWaitlistCTA = Product interest → thiruailabs.com
- SubscribeForm = Content interest → Newsletter subscription
