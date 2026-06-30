<script lang="ts">
  import type { SeriesSummary, PostMeta } from '$lib/utils/posts';

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

    <!-- Position -->
    <div class="series-drawer-position">
      Part {currentPosition} of {totalInSeries}
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
            <span class="post-number">
              {#if post.series_position}{post.series_position}{/if}
            </span>
            <span class="post-title">{post.title}</span>
            {#if post.series_phase}
              <span class="post-phase">{capitalize(post.series_phase)}</span>
            {/if}
          </a>
        {/each}
      </div>
    </div>

    <!-- Start from beginning -->
    <div class="series-drawer-footer">
      <a href="/writing/?series={seriesSummary.series_slug}" class="start-link">
        Start from the beginning →
      </a>
    </div>
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

  .series-drawer-position {
    @apply text-sm text-secondary dark:text-[#A3A3A3] mb-4 pb-4 border-b border-border dark:border-[#262626];
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
    @apply flex items-center gap-2 py-2 px-3 rounded-lg text-sm transition-colors hover:bg-gray-50 dark:hover:bg-[#1A1A1A];
  }

  .post-link.current {
    @apply bg-accent/10 dark:bg-accent/20 text-accent;
  }

  .post-number {
    @apply w-6 text-center font-medium shrink-0;
  }

  .post-title {
    @apply flex-1 line-clamp-2;
  }

  .post-phase {
    @apply text-xs text-secondary dark:text-[#A3A3A3] shrink-0;
  }

  .series-drawer-footer {
    @apply mt-4 pt-4 border-t border-border dark:border-[#262626];
  }

  .start-link {
    @apply text-sm text-accent hover:underline font-medium;
  }
</style>
