<script lang="ts">
  import type { SeriesSummary, PostMeta } from '$lib/utils/posts';
  import { onMount, tick } from 'svelte';

  interface Props {
    seriesName: string;
    seriesSummary: SeriesSummary;
    currentPostSlug: string;
    currentPosition: number;
    totalInSeries: number;
    isOpen?: boolean;
    onToggle?: () => void;
  }

  let {
    seriesName,
    seriesSummary,
    currentPostSlug,
    currentPosition,
    totalInSeries,
    isOpen = $bindable(false),
    onToggle
  }: Props = $props();

  function toggle() {
    isOpen = !isOpen;
    onToggle?.();
  }

  function close() {
    if (isOpen) {
      isOpen = false;
      onToggle?.();
    }
  }

  // Phase order for display
  const phaseOrder = ['strategy', 'design', 'engineering', 'deployment', 'maintenance', 'community'] as const;

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Flatten all posts for the posts list
  const allPosts = $derived.by(() => {
    const posts: PostMeta[] = [];
    for (const phase of phaseOrder) {
      const phasePosts = seriesSummary.phases[phase] || [];
      posts.push(...phasePosts);
    }
    return posts;
  });

  // Handle escape key to close
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpen) {
      close();
    }
  }

  // Truncation detection for hover tooltips
  let titleElements: Record<string, HTMLElement> = {};
  let truncatedPosts: Set<string> = $state(new Set());

  onMount(async () => {
    await tick();
    // Check each title for actual truncation
    for (const [slug, el] of Object.entries(titleElements)) {
      if (el && el.scrollHeight > el.clientHeight) {
        truncatedPosts.add(slug);
        truncatedPosts = new Set(truncatedPosts); // trigger reactivity
      }
    }
  });

  function isTruncated(slug: string): boolean {
    return truncatedPosts.has(slug);
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Backdrop -->
{#if isOpen}
  <div class="series-drawer-backdrop" role="button" tabindex="0" onclick={close} onkeydown={(e) => e.key === 'Enter' && close()}></div>
{/if}

<!-- Drawer -->
<div class="series-drawer" class:open={isOpen}>
  <div class="series-drawer-content">
    <!-- Header -->
    <div class="series-drawer-header">
      <h3 class="text-h5 text-primary dark:text-[#FAFAFA]">{seriesName}</h3>
      <button class="series-drawer-close" onclick={close} aria-label="Close series navigation">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>

    <!-- Phases -->
    <div class="series-drawer-phases">
      <h4 class="text-sm font-medium text-secondary dark:text-[#A3A3A3] uppercase tracking-wide mb-2">Phases</h4>
      {#each phaseOrder as phase}
        {@const posts = seriesSummary.phases[phase] || []}
        {@const hasPosts = posts.length > 0}
        <div class="phase-item" class:active={hasPosts} class:empty={!hasPosts}>
          <span class="phase-icon">
            {#if hasPosts}✓{:else}○{/if}
          </span>
          <span class="phase-name">{capitalize(phase)}</span>
          {#if hasPosts}
            <span class="phase-count">({posts.length} {posts.length === 1 ? 'post' : 'posts'})</span>
          {:else}
            <span class="phase-count">coming soon</span>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Posts in Series -->
    <div class="series-drawer-posts">
      <h4 class="text-sm font-medium text-secondary dark:text-[#A3A3A3] uppercase tracking-wide mb-2">Posts in Series</h4>
      <div class="posts-list">
        {#each allPosts as post}
          <a
            href="/writing/{post.slug}"
            class="post-link"
            class:current={post.slug === currentPostSlug}
          >
            <div class="post-content">
              <div class="post-header">
                <span class="post-number">
                  {#if post.series_position}{post.series_position}{/if}
                </span>
                <span
                  class="post-title"
                  bind:this={titleElements[post.slug]}
                >
                  {post.subtitle}
                </span>
              </div>
              {#if post.series_phase}
                <div class="post-meta">
                  <span class="post-phase">{capitalize(post.series_phase)}</span>
                  {#if post.series_position}
                    <span class="post-meta-separator">·</span>
                    <span class="post-position">Part {post.series_position} of {totalInSeries}</span>
                  {/if}
                </div>
              {/if}
            </div>
            {#if isTruncated(post.slug)}
              <div class="post-tooltip" role="tooltip">
                {post.subtitle}
              </div>
            {/if}
          </a>
        {/each}
      </div>
    </div>

    <!-- Start from beginning -->
    {#if allPosts[0] && currentPosition > 1}
      <div class="series-drawer-footer">
        <a href="/writing/{allPosts[0].slug}" class="start-link">
          Start from the beginning →
        </a>
      </div>
    {/if}

  </div>
</div>

<style>
  .series-drawer-backdrop {
    @apply fixed inset-0 bg-black/50 z-40;
  }

  .series-drawer {
    @apply fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-[#0A0A0A] border-l border-border dark:border-[#262626] z-50 transform translate-x-full transition-transform duration-300 ease-in-out;
  }

  .series-drawer.open {
    @apply translate-x-0;
  }

  .series-drawer-content {
    @apply h-full flex flex-col p-6 overflow-y-auto pt-16;
  }

  .series-drawer-header {
    @apply flex items-center justify-between mb-4;
  }

  .series-drawer-close {
    @apply p-1 rounded hover:bg-gray-100 dark:hover:bg-[#1A1A1A] transition-colors;
  }

  .series-drawer-phases {
    @apply mb-6;
  }

  .phase-item {
    @apply flex items-center gap-2 py-2 text-sm;
  }

  .phase-item.active {
    @apply text-primary dark:text-[#FAFAFA];
  }

  .phase-item.empty {
    @apply text-secondary dark:text-[#A3A3A3] opacity-50;
  }

  .phase-icon {
    @apply w-4 text-center;
  }

  .phase-name {
    @apply font-medium flex-1;
  }

  .phase-count {
    @apply text-xs;
  }

  .series-drawer-posts {
    @apply flex-1;
  }

  .posts-list {
    @apply space-y-2;
  }

  .post-link {
    @apply block py-3 px-3 rounded-lg text-sm transition-colors hover:bg-gray-50 dark:hover:bg-[#1A1A1A] relative;
  }

  .post-link.current {
    @apply bg-accent/10 dark:bg-accent/20;
  }

  .post-content {
    @apply flex flex-col gap-1;
  }

  .post-header {
    @apply flex items-start gap-2;
  }

  .post-number {
    @apply w-6 text-center font-medium shrink-0 pt-0.5;
  }

  .post-title {
    @apply flex-1 line-clamp-2 text-primary dark:text-[#FAFAFA];
  }

  .post-link.current .post-title {
    @apply text-accent;
  }

  .post-meta {
    @apply flex items-center gap-1.5 ml-8 text-xs text-secondary dark:text-[#A3A3A3];
  }

  .post-phase {
    @apply font-medium;
  }

  .post-meta-separator {
    @apply text-secondary dark:text-[#A3A3A3];
  }

  .post-position {
    @apply text-secondary dark:text-[#A3A3A3];
  }

  /* Tooltip for truncated titles */
  .post-tooltip {
    @apply absolute bottom-full left-3 mb-2 px-3 py-2 bg-gray-900 dark:bg-[#1A1A1A] text-white text-xs rounded-lg shadow-lg max-w-xs z-50 pointer-events-none opacity-0 transition-opacity;
  }

  .post-link:hover .post-tooltip,
  .post-link:focus .post-tooltip {
    @apply opacity-100;
  }

  .series-drawer-footer {
    @apply mt-4 pt-4 border-t border-border dark:border-[#262626];
  }

  .start-link {
    @apply text-sm text-accent hover:underline font-medium;
  }
</style>
