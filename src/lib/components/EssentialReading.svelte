<script lang="ts">
  import EssentialReadingCard from './EssentialReadingCard.svelte';
  import type { PostMeta } from '$lib/utils/posts';

  interface Props {
    posts: PostMeta[];
    showViewAll?: boolean;
  }

  let { posts, showViewAll = false }: Props = $props();
</script>

{#if posts.length > 0}
  <div class="mb-8 flex items-baseline justify-between">
    <h2 class="text-h3 text-primary dark:text-[#FAFAFA]">Essential Reading</h2>
    {#if showViewAll}
      <a href="/writing" class="hover:text-accent font-medium">
        View all writing <span aria-hidden="true">→</span>
      </a>
    {/if}
  </div>

  <div class="grid gap-6 md:grid-cols-3">
    {#each posts as post}
      <EssentialReadingCard {post} />
    {/each}
  </div>
{/if}
