<script lang="ts">
  import type { PostMeta } from '$lib/utils/posts';
  import { formatDateShort } from '$lib/utils/date';
  import TrackBadge from './TrackBadge.svelte';

  interface Props {
    post: PostMeta;
  }

  let { post }: Props = $props();

  // Phase display order and colors
  const phaseOrder = ['strategy', 'design', 'engineering', 'deployment', 'maintenance', 'community'];
  
  const phaseColors: Record<string, string> = {
    strategy: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    design: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    engineering: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    deployment: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    maintenance: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    community: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
  };

  function getPhaseColor(phase: string): string {
    return phaseColors[phase] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
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
      {post.title}
    </h3>
    
    <div class="flex-grow">
      <p class="text-base text-secondary dark:text-[#D4D4D4] line-clamp-2">
        {post.description}
      </p>
    </div>
    
    <!-- Badges (bottom, full width) -->
    <div class="flex flex-wrap items-center gap-2 mt-4 pt-2">
      <div class="shrink-0">
        <TrackBadge track={post.track} />
      </div>
      
      <!-- Series Badge (only if series_name exists) -->
      {#if post.series_name}
        <span class="series-badge">
          {post.series_name}
        </span>
      {/if}
      
      <!-- Phase Badge (only if series_phase exists) -->
      {#if post.series_phase}
        <span class="phase-badge {getPhaseColor(post.series_phase)}">
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
  .series-badge {
    @apply px-2 py-0.5 rounded text-xs font-medium bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent;
  }
</style>
