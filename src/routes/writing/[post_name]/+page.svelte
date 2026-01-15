<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import TrackBadge from '$lib/components/TrackBadge.svelte';
  import SubscribeForm from '$lib/components/SubscribeForm.svelte';
  import ProductWaitlistCTA from '$lib/components/ProductWaitlistCTA.svelte';
  import { formatDate } from '$lib/utils/date';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  onMount(() => {
    // Add target="_blank" and rel="noopener noreferrer" to all external links in post content
    const proseContent = document.querySelector('.prose');
    if (proseContent) {
      const links = proseContent.querySelectorAll('a[href^="http"]');
      links.forEach((link) => {
        const href = link.getAttribute('href');
        if (href && !href.includes('nickthiru.dev')) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        }
      });
    }
  });
</script>

<SEO 
  title={data.post.title}
  description={data.post.description}
  type="article"
  publishedAt={data.post.publishedAt}
  image={data.post.image}
  canonical={data.post.canonical}
/>

<article class="mx-auto max-w-page px-6 md:px-8 py-12 md:py-16">
  <!-- Article Header -->
  <header class="max-w-prose mx-auto mb-12">
    <div class="flex items-center gap-3 mb-4">
      <TrackBadge track={data.post.track} />
    </div>
    
    <h1 class="text-h1 text-primary mb-4">
      {data.post.title}
    </h1>
    
    <div class="flex items-center gap-2 text-secondary">
      <time datetime={data.post.publishedAt}>
        {formatDate(data.post.publishedAt)}
      </time>
      <span>·</span>
      <span>{data.post.readingTime}</span>
    </div>
    
    {#if data.post.tags && data.post.tags.length > 0}
      <div class="flex flex-wrap gap-2 mt-4">
        {#each data.post.tags as tag}
          <span class="tag">#{tag}</span>
        {/each}
      </div>
    {/if}
  </header>

  <!-- Article Body -->
  <div class="max-w-prose mx-auto prose prose-lg">
    <data.post.content />
  </div>

  <!-- Product Waitlist CTA (conditional on tags) -->
  <div class="max-w-prose mx-auto">
    <ProductWaitlistCTA tags={data.post.tags} />
  </div>

  <!-- Post Footer -->
  <footer class="max-w-prose mx-auto mt-16 pt-8 border-t border-border">
    <h3 class="text-h4 text-primary mb-4">
      Thanks for reading
    </h3>
    <p class="text-secondary mb-6">
      If this was useful, subscribe for more posts on building agentic AI systems.
    </p>
    <SubscribeForm tag={data.post.track} />
  </footer>
</article>
