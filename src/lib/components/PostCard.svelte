<script lang="ts">
  import type { PostMeta } from '$lib/utils/posts';
  import { formatDateShort } from '$lib/utils/date';
  import { getFullTitle } from '$lib/utils/posts';
  import TrackBadge from './TrackBadge.svelte';
  import { phaseBadges, seriesBadgeStyle } from '$lib/config/badges';

  interface Props {
    post: PostMeta;
  }

  let { post }: Props = $props();

  function getPhaseBadgeClass(phase: string): string {
    return phaseBadges[phase]?.badge || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
</script>

<article class="post-card h-full">
  <a href="/writing/{post.slug}" class="flex flex-col h-full group">
    <!-- Date and reading time (top-left) -->
    <div class="flex justify-start items-center gap-3 mb-3">
      <span class="text-small text-muted dark:text-[#A3A3A3] whitespace-nowrap">{formatDateShort(post.publishedAt)}</span>
      <span class="text-small text-muted dark:text-[#A3A3A3]">·</span>
      <span class="text-small text-muted dark:text-[#A3A3A3] whitespace-nowrap">{post.readingTime}</span>
    </div>
    
    <h3 class="text-h4 text-primary dark:text-[#FAFAFA] group-hover:text-accent transition-colors mb-2">
      {getFullTitle(post)}
    </h3>
    
    <div class="flex-grow">
      <p class="text-base text-secondary dark:text-[#D4D4D4] line-clamp-2">
        {post.description}
      </p>
    </div>
    
    <!-- Badges (bottom, full width) -->
    <div class="flex flex-wrap items-center gap-2 mt-4 pt-2">
      <div class="shrink-0 rounded">
        <TrackBadge track={post.track} />
      </div>
      
      <!-- Series Badge (only if series_name exists) -->
      {#if post.series_name}
        <span class="{seriesBadgeStyle}">
          {post.series_name}
        </span>
      {/if}
      
      <!-- Phase Badge (only if series_phase exists) -->
      {#if post.series_phase}
        <span class="phase-badge {getPhaseBadgeClass(post.series_phase)}">
          {capitalize(post.series_phase)}
        </span>
      {/if}
    </div>
  </a>
</article>

<style>
  .phase-badge {
    @apply px-2 py-0.5 rounded text-xs font-medium;
  }
</style>
