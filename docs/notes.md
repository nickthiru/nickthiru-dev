# nickthiru.dev Notes

## styling

i have some ideas on the styling of the website, particularly the color scheme and font for now. you can find descriptions of these in obsidian notes at /mnt/hgfs/ObsidianVault/20 Work/nickthiru.dev/Business/Brand Identity/ directory. use the mcp server to access these notes. can you please see how you can incorporate these designs? make sure the look of the website is professional and modern. make sure to create a separate git branch for this work. note that the quicksand font otf file is located at "~/Downloads/quicksand.zip". in the "fonts" note, there is the following mention: providing WOFF and WOFF2 formats alongside OTF for broader browser compatibility and optimized web performance. let me know your thoughts on this and what i may need to do to generate these formats.

## mailing list

how does this work? from what i know:

- i will need to store my list somewhere
- i will need to automatically send an email about an article
- users will need a way to opt out of mailing lists. can they unsubscribe from all or just specific topics?
- will i need to create a template for the email?
- will signees receive each and every new article?

### Cascade's comments on mailing list

You have several options, ranging from simple to full-featured:

**Option 1: Third-party email service (Recommended for starting out)**

- **Buttondown** (~$9/mo) or **ConvertKit** (free up to 1,000 subscribers) - handles everything: storage, sending, unsubscribe, templates
- You just embed their form or connect via API
- They handle CAN-SPAM compliance, unsubscribe links, bounce handling
- Can segment by topic (e.g., "technical only" vs "all posts")

**Option 2: Self-hosted (More control, more work)**

- Store subscribers in a database (e.g., Supabase, PlanetScale)
- Use a transactional email service like **Resend**, **Postmark**, or **SendGrid** to send
- You'd need to build: subscription management, unsubscribe flow, email templates, a sending script

**Answers to your questions:**

- **Storage**: Either the email service stores it, or you store in your own DB
- **Auto-send on publish**: You'd trigger this manually or via a webhook/script when you publish. Most services have RSS-to-email features that auto-send when your RSS feed updates
- **Unsubscribe**: Services handle this automatically. You can offer topic preferences (technical/operator) if you want granular control
- **Templates**: Yes, you'd create an HTML template. Most services have visual builders
- **Every article?**: Your choice. You can send per-article, weekly digests, or let subscribers choose

**My recommendation**: Start with **Buttondown** or **ConvertKit free tier**. Minimal setup, handles compliance, you can migrate later if needed.

## social media links

there are currently three social media links on the website. how can i add the links?

### Cascade's comments on social media links

The social links are configured in `nickthiru-dev/src/lib/config.ts`:

```typescript
social: {
  twitter: "https://twitter.com/nickthiru",
  github: "https://github.com/nickthiru",
  linkedin: "https://linkedin.com/in/nickthiru",
},
```

**To add a new social link:**

1. Add the URL to the `social` object in `config.ts`:

   ```typescript
   social: {
     twitter: "https://twitter.com/nickthiru",
     github: "https://github.com/nickthiru",
     linkedin: "https://linkedin.com/in/nickthiru",
     youtube: "https://youtube.com/@nickthiru",  // new
   },
   ```

2. Add the icon and link in `src/lib/components/Footer.svelte` (copy an existing `<a>` block and update the href, aria-label, and SVG icon)

**Common platforms you might add:**

- YouTube, Threads, Bluesky, Mastodon, Discord, Medium, Substack

**Where to find SVG icons:**

- [Simple Icons](https://simpleicons.org/) - brand icons
- [Lucide](https://lucide.dev/) - general icons
- [Heroicons](https://heroicons.com/) - UI icons

Let me know which platforms you want to add and I can implement them.

## GitHub

i have created a new github account for thiru-ai-labs. this repository should be moved to that account.
