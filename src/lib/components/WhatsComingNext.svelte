<script lang="ts">
  interface Props {
    nextPostTitle: string;
    nextPostSlug: string;
    nextPostPhase?: string;
  }

  let { nextPostTitle, nextPostSlug, nextPostPhase }: Props = $props();

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
</script>

<div class="whats-coming-next">
  <div class="flex items-start gap-3">
    <span class="text-2xl shrink-0">🔜</span>
    <div class="flex-1">
      <h3 class="text-h5 text-primary dark:text-[#FAFAFA] mb-2">What's Coming Next</h3>
      <p class="text-base text-secondary dark:text-[#D4D4D4] mb-3">
        In the next part of this series I'll be covering:
      </p>
      <a href="/writing/{nextPostSlug}" class="next-post-link">
        <span class="next-post-title">{nextPostTitle}</span>
        {#if nextPostPhase}
          <span class="next-post-phase">({capitalize(nextPostPhase)} phase)</span>
        {/if}
      </a>
      <a href="/writing/{nextPostSlug}" class="read-next-link">
        Read the next post →
      </a>
    </div>
  </div>
</div>

<style>
  .whats-coming-next {
    @apply bg-accent/5 border border-accent/20 rounded-lg p-6 my-8;
  }

  .next-post-link {
    @apply block text-lg text-primary dark:text-[#FAFAFA] font-medium hover:text-accent transition-colors mb-2;
  }

  .next-post-title {
    @apply block;
  }

  .next-post-phase {
    @apply text-sm text-secondary dark:text-[#A3A3A3];
  }

  .read-next-link {
    @apply inline-block text-sm text-accent hover:underline font-medium mt-2;
  }
</style>
