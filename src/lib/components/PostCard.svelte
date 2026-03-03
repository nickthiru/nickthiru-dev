<script lang="ts">
  import type { PostMeta } from '$lib/utils/posts';
  import { formatDateShort } from '$lib/utils/date';
  import TrackBadge from './TrackBadge.svelte';

  interface Props {
    post: PostMeta;
  }

  let { post }: Props = $props();
</script>

<article class="post-card h-full">
  <a href="/writing/{post.slug}" class="flex flex-col h-full group">
    <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
      <div class="self-start sm:self-auto shrink-0">
        <TrackBadge track={post.track} />
      </div>
      <div class="flex items-center gap-3">
        <span class="text-small text-muted dark:text-[#A3A3A3] whitespace-nowrap">{formatDateShort(post.publishedAt)}</span>
        <span class="text-small text-muted dark:text-[#A3A3A3]">·</span>
        <span class="text-small text-muted dark:text-[#A3A3A3] whitespace-nowrap">{post.readingTime}</span>
      </div>
    </div>
    
    <h3 class="text-h4 text-primary dark:text-[#FAFAFA] group-hover:text-accent transition-colors mb-2">
      {post.title}
    </h3>
    
    <div class="flex-grow">
      <p class="text-base text-secondary dark:text-[#D4D4D4] line-clamp-2">
        {post.description}
      </p>
    </div>
    
    {#if post.tags && post.tags.length > 0}
      <div class="flex flex-wrap gap-2 mt-4 pt-2">
        {#each post.tags as tag}
          <span class="tag">#{tag}</span>
        {/each}
      </div>
    {/if}
  </a>
</article>
