<script lang="ts">
  import type { PostMeta } from '$lib/utils/posts';
  import { formatDateShort } from '$lib/utils/date';
  import TrackBadge from './TrackBadge.svelte';

  interface Props {
    post: PostMeta;
  }

  let { post }: Props = $props();
</script>

<article class="post-card">
  <a href="/writing/{post.slug}" class="block group">
    <div class="flex items-center gap-3 mb-3">
      <TrackBadge track={post.track} />
      <span class="text-small text-muted dark:text-[#A3A3A3]">{formatDateShort(post.publishedAt)}</span>
      <span class="text-small text-muted dark:text-[#A3A3A3]">·</span>
      <span class="text-small text-muted dark:text-[#A3A3A3]">{post.readingTime}</span>
    </div>
    
    <h3 class="text-h4 text-primary dark:text-[#FAFAFA] group-hover:text-accent transition-colors mb-2">
      {post.title}
    </h3>
    
    <p class="text-secondary dark:text-[#D4D4D4] line-clamp-2">
      {post.description}
    </p>
    
    {#if post.tags && post.tags.length > 0}
      <div class="flex flex-wrap gap-2 mt-4">
        {#each post.tags as tag}
          <span class="tag">#{tag}</span>
        {/each}
      </div>
    {/if}
  </a>
</article>
