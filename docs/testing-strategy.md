# Testing Strategy for nickthiru.dev

## Philosophy

For a personal website with primarily static content, automated testing (Cypress, Playwright, etc.) is **overkill**. The maintenance burden outweighs the benefits.

Instead, use lightweight manual checks and build-time validation.

## Better Alternatives to Automated Testing

### 1. **Build-time checks** (Already in place)

- TypeScript compilation catches type errors
- SvelteKit build process validates routes and components
- Markdown parsing errors surface during build
- **Action:** None needed - this runs automatically on every build

### 2. **Link checker** (Run occasionally)

Check for broken internal and external links:

```bash
# Install (one-time)
npm install -g broken-link-checker

# Run against local dev server
npx broken-link-checker http://localhost:5173 --recursive --ordered

# Or run against production
npx broken-link-checker https://nickthiru.dev --recursive --ordered
```

**When to run:** After adding new posts with external links, or quarterly.

### 3. **Manual smoke test** (After deployments)

Quick 2-minute checklist:

- [ ] Homepage loads
- [ ] Writing page loads and filters work
- [ ] Click into one blog post - renders correctly
- [ ] Projects page shows correct projects
- [ ] About page loads
- [ ] Consult page loads
- [ ] Newsletter subscription form submits (test with your email)
- [ ] Check one external link works

**When to run:** After every deployment to production.

### 4. **RSS feed validator** (Occasional)

Validate your RSS feed to ensure email subscribers get proper updates:

```bash
# Visit this URL and paste your feed URL
https://validator.w3.org/feed/

# Your feed URL
https://nickthiru.dev/rss.xml
```

**When to run:** After changing RSS generation logic, or when adding new post metadata fields.

### 5. **Email integration test** (When changing subscription logic)

- Subscribe with a test email
- Verify Buttondown receives it with correct tags
- Check welcome email arrives
- Unsubscribe and verify it works

**When to run:** After modifying SubscribeForm or WaitlistForm components.

### 6. **Visual regression** (Manual)

Before deploying major CSS changes:

- Take screenshots of key pages (homepage, writing, post detail)
- Make changes
- Compare visually
- Check mobile responsiveness in browser DevTools

**When to run:** When updating global styles, typography, or layout components.

## What Could Go Wrong (and how to catch it)

| Issue                     | Detection Method           | Prevention                          |
| ------------------------- | -------------------------- | ----------------------------------- |
| Broken internal links     | Link checker               | Review before publishing            |
| Broken external links     | Link checker               | Use reputable sources               |
| RSS feed malformation     | RSS validator              | Test after schema changes           |
| Email subscription breaks | Manual test                | Test in staging first               |
| Markdown rendering issues | Build fails / visual check | Preview posts before publishing     |
| TypeScript errors         | Build fails                | Run `npm run check` locally         |
| Mobile layout breaks      | Manual visual check        | Test responsive design in DevTools  |
| SEO metadata missing      | Manual check               | Use consistent frontmatter template |

## When to Add Automated Testing

Only consider automated testing if:

1. **Complex interactive features** - Multi-step forms, dashboards, user accounts, real-time updates
2. **Multiple contributors** - Team members who might break things unknowingly
3. **Critical user flows** - E-commerce checkout, payment processing, data submission
4. **Frequent changes** - Components that change weekly and need regression protection

For **actual products** (LinkedIn Ghostwriter, future SaaS tools), automated testing makes sense. For this personal blog/portfolio site, it doesn't.

## Recommended Workflow

### For new blog posts:

1. Write post in markdown
2. Preview locally (`npm run dev`)
3. Check formatting, links, images
4. Commit and deploy
5. Quick smoke test on production

### For code changes:

1. Make changes locally
2. Run `npm run check` to catch TypeScript errors
3. Test affected pages in browser
4. Commit and deploy
5. Run smoke test checklist

### Quarterly maintenance:

1. Run link checker
2. Validate RSS feed
3. Test email subscription
4. Review analytics for 404s or errors

## Tools Reference

```bash
# TypeScript check
npm run check

# Build check
npm run build

# Link checker (install once)
npm install -g broken-link-checker
npx broken-link-checker http://localhost:5173 --recursive

# RSS validator (online)
# Visit: https://validator.w3.org/feed/
# Enter: https://nickthiru.dev/rss.xml

# Local dev server
npm run dev
```

## Notes

- **Time investment:** ~5 minutes per deployment, ~30 minutes quarterly
- **ROI:** High - catches real issues without maintenance burden
- **Scalability:** If site grows to 100+ posts or adds complex features, revisit this strategy
