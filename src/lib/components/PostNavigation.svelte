<script lang="ts">
  import type { PostMeta } from '$lib/utils/posts';
  import { getFullTitle } from '$lib/utils/posts';

  interface Props {
    previousPost: PostMeta | null;
    nextPost: PostMeta | null;
  }

  let { previousPost, nextPost }: Props = $props();

  // Don't render if both are null
  const shouldRender = $derived(previousPost !== null || nextPost !== null);
</script>

{#if shouldRender}
  <nav class="post-navigation" aria-label="Post navigation">
    <div class="nav-item nav-previous">
      {#if previousPost}
        <a href="/writing/{previousPost.slug}" class="nav-link">
          <span class="nav-direction">← Previous</span>
          <span class="nav-title">{getFullTitle(previousPost)}</span>
        </a>
      {/if}
    </div>
    <div class="nav-item nav-next">
      {#if nextPost}
        <a href="/writing/{nextPost.slug}" class="nav-link">
          <span class="nav-direction">Next →</span>
          <span class="nav-title">{getFullTitle(nextPost)}</span>
        </a>
      {/if}
    </div>
  </nav>
{/if}

<style>
  /* .post-navigation {
    @apply flex flex-col sm:flex-row gap-4 sm:gap-6 my-8 pt-8 border-t border-border dark:border-[#262626];
  } */

  .post-navigation {
    @apply flex flex-col sm:flex-row gap-4 sm:gap-6 my-8;
  }

  .nav-item {
    @apply flex-1;
  }

  .nav-link {
    @apply block p-4 rounded-lg border border-border dark:border-[#262626] hover:border-accent transition-colors;
  }

  .nav-direction {
    @apply block text-sm text-secondary dark:text-[#A3A3A3] mb-1;
  }

  .nav-title {
    @apply block text-base text-primary dark:text-[#FAFAFA] group-hover:text-accent transition-colors font-medium;
  }

  .nav-next {
    @apply sm:text-right;
  }
</style>
