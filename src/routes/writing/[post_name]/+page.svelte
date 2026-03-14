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
    
    <h1 class="text-h2 text-primary mb-4s dark:prose-invert">
      {data.post.title}
    </h1>
    
    <div class="flex items-center gap-2 text-secondary dark:text-[#A3A3A3]">
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
<div class="max-w-prose mx-auto prose dark:prose-invert">
    <data.post.content />
  </div>

  <!-- Product Waitlist CTA (conditional on tags) -->
  <div class="max-w-prose mx-auto">
    <ProductWaitlistCTA tags={data.post.tags} />
  </div>

  <!-- Post Footer -->
  <footer class="max-w-prose dark:prose-invert mx-auto mt-16 pt-8">
    <div class="bg-accent/5 border border-accent/20 rounded-lg p-8 md:p-10 dark:bg-accent/10 dark:border-accent/30 text-center">
      <h3 class="text-h3 text-primary dark:text-[#FAFAFA] mb-4">
        Thanks for reading
      </h3>
      <p class="text-secondary dark:text-[#D4D4D4] mb-8">
        If this was useful, subscribe for more posts on the engineering, productization, and business, of agentic AI systems.
      </p>
      <div class="w-full max-w-md mx-auto">
        <SubscribeForm tag={data.post.track} />
      </div>
    </div>
  </footer>
</article>
