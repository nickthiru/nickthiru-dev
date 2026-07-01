<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import TrackBadge from '$lib/components/TrackBadge.svelte';
  import SubscribeForm from '$lib/components/SubscribeForm.svelte';
  import ProductWaitlistCTA from '$lib/components/ProductWaitlistCTA.svelte';
  import SeriesContextCard from '$lib/components/SeriesContextCard.svelte';
  import SeriesDrawer from '$lib/components/SeriesDrawer.svelte';
  import WhatsComingNext from '$lib/components/WhatsComingNext.svelte';
  import PostNavigation from '$lib/components/PostNavigation.svelte';
  import { formatDate } from '$lib/utils/date';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import type { Post, PostMeta, SeriesSummary } from '$lib/utils/posts';
  import { phaseBadges, seriesBadgeStyle } from '$lib/config/badges';

  interface ExtendedPageData {
    post: Post;
    seriesMeta: SeriesSummary | null;
    seriesPosts: PostMeta[];
    previousInSeries: PostMeta | null;
    nextInSeries: PostMeta | null;
    positionInfo: { current: number; total: number } | null;
  }

  let { data }: { data: ExtendedPageData } = $props();

  let drawerOpen = $state(false);

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

  // Enhanced meta description for series posts
  const metaDescription = $derived.by(() => {
    if (data.seriesMeta && data.positionInfo) {
      return `Part ${data.positionInfo.current} of ${data.positionInfo.total} in "${data.post.series_name}". ${data.post.description}`;
    }
    return data.post.description;
  });

  function getPhaseBadgeClass(phase: string): string {
    return phaseBadges[phase]?.badge || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
</script>

<SEO 
  title={data.post.title}
  description={metaDescription}
  type="article"
  publishedAt={data.post.publishedAt}
  image={data.post.image}
  canonical={data.post.canonical}
/>

<div class="post-layout">
  <!-- Main content -->
  <article class="mx-auto max-w-page px-6 md:px-8 py-12 md:py-16">
    <!-- Article Header -->
    <header class="max-w-prose mx-auto mb-12">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <TrackBadge track={data.post.track} />
          {#if data.post.series_name}
            <span class="series-badge">
              {data.post.series_name}
            </span>
          {/if}
          {#if data.post.series_phase}
            <span class="phase-badge {getPhaseBadgeClass(data.post.series_phase)}">
              {capitalize(data.post.series_phase)}
            </span>
          {/if}
        </div>
        {#if data.seriesMeta}
          <button
            class="series-drawer-toggle-btn"
            aria-label="Toggle series navigation"
            aria-expanded={drawerOpen}
            onclick={() => drawerOpen = !drawerOpen}
          >
            <!-- List/TOC icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"/>
              <line x1="8" y1="12" x2="21" y2="12"/>
              <line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6"/>
              <line x1="3" y1="12" x2="3.01" y2="12"/>
              <line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
          </button>
        {/if}
      </div>
      
      <h1 class="text-h2 text-primary mb-4 dark:text-[#FAFAFA]">
        {data.post.title}
      </h1>
      
      <div class="flex items-center gap-2 text-secondary dark:text-[#A3A3A3]">
        <time datetime={data.post.publishedAt}>
          {formatDate(data.post.publishedAt)}
        </time>
        <span>·</span>
        <span>{data.post.readingTime}</span>
      </div>
    </header>

    <!-- Series Context Card (if series exists) -->
    {#if data.seriesMeta && data.positionInfo}
      <div class="max-w-prose mx-auto">
        <SeriesContextCard
          seriesName={data.post.series_name!}
          currentPhase={data.post.series_phase!}
          currentPosition={data.positionInfo.current}
          totalInSeries={data.positionInfo.total}
          seriesSlug={data.post.series_slug!}
        />
      </div>
    {/if}

    <!-- Article Body -->
    <div class="max-w-prose mx-auto mt-12 prose dark:prose-invert">
      <data.post.content />
    </div>

    <!-- Product Waitlist CTA (conditional on tags) -->
    <div class="max-w-prose mx-auto">
      <ProductWaitlistCTA tags={data.post.tags} />
    </div>

    <!-- What's Coming Next (if next post exists) -->
    {#if data.nextInSeries}
      <div class="max-w-prose mx-auto">
        <WhatsComingNext
          nextPostTitle={data.nextInSeries.title}
          nextPostSlug={data.nextInSeries.slug}
          nextPostPhase={data.nextInSeries.series_phase}
        />
      </div>
    {/if}

    <!-- Post Navigation (if series exists) -->
    {#if data.seriesMeta}
      <div class="max-w-prose mx-auto">
        <PostNavigation
          previousPost={data.previousInSeries}
          nextPost={data.nextInSeries}
        />
      </div>
    {/if}

    <!-- Join the Discussion (conditional — visible once social post URLs are set in frontmatter) -->
    {#if data.post.linkedin_url || data.post.x_url}
      <div class="max-w-prose mx-auto mt-12 pt-8 border-t border-border dark:border-[#262626]">
        <h2 class="text-h3 text-primary dark:text-[#FAFAFA] mb-4">Join the Discussion</h2>
        <p class="text-secondary dark:text-[#D4D4D4] mb-4">
          Have thoughts on this? I'd love to hear them. The conversation is happening on:
        </p>
        <ul class="flex flex-col gap-2">
          {#if data.post.linkedin_url}
            <li>
              <a
                href={data.post.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                class="text-accent hover:underline"
              >LinkedIn →</a>
            </li>
          {/if}
          {#if data.post.x_url}
            <li>
              <a
                href={data.post.x_url}
                target="_blank"
                rel="noopener noreferrer"
                class="text-accent hover:underline"
              >X (Twitter) →</a>
            </li>
          {/if}
        </ul>
      </div>
    {/if}

    <!-- Post footer -->
    <footer class="max-w-prose mx-auto mt-16 pt-8">
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

  <!-- Series Drawer (if series exists) -->
  {#if data.seriesMeta}
    <SeriesDrawer
      seriesName={data.post.series_name!}
      seriesSummary={data.seriesMeta}
      currentPostSlug={data.post.slug}
      currentPosition={data.positionInfo?.current ?? 0}
      totalInSeries={data.positionInfo?.total ?? 0}
      bind:isOpen={drawerOpen}
    />
  {/if}
</div>

<style>
  .post-layout {
    @apply relative;
  }

  .phase-badge {
    @apply px-2 py-0.5 rounded text-xs font-medium;
  }

  .series-badge {
    /* Uses seriesBadgeStyle from $lib/config/badges.ts */
    @apply px-2 py-0.5 rounded text-xs font-medium
           text-secondary bg-white border border-gray-400
           dark:text-[#A3A3A3] dark:bg-[#0A0A0A] dark:border-gray-500;
  }

  .series-drawer-toggle-btn {
    @apply p-2 rounded-lg border border-border dark:border-[#262626] hover:border-accent hover:text-accent transition-colors;
  }
</style>
