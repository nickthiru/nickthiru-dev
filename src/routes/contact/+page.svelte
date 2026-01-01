<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import { siteConfig } from '$lib/config';
</script>

<SEO
  title="Contact"
  description="How to reach Nick Thiru."
/>

<section class="mx-auto max-w-page px-6 md:px-8 py-12 md:py-16">
  <div class="max-w-prose mx-auto">
    <h1 class="text-h1 text-primary mb-8">Contact</h1>

    <div class="prose prose-lg">
      <p>
        The best way to reach me is by email:
        <a href="mailto:{siteConfig.author.email}">{siteConfig.author.email}</a>.
      </p>

      <p>
        You can also find me on:
      </p>

      <ul>
        <li><a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer">Twitter/X</a></li>
        <li><a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
      </ul>

      <p>
        If you're writing about a specific post, linking the URL helps me respond faster.
      </p>
    </div>
  </div>
</section>
