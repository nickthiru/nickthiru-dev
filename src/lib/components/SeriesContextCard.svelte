<script lang="ts">
  interface Props {
    seriesName: string;
    currentPhase: string;
    currentPosition: number;
    totalInSeries: number;
    seriesSlug: string;
    firstPostSlug: string;
  }

  let { seriesName, currentPhase, currentPosition, totalInSeries, seriesSlug, firstPostSlug }: Props = $props();

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
</script>

<div class="series-context-card">
  <div class="flex items-start gap-3">
    <!-- <span class="text-2xl shrink-0">📚</span> -->
    <div class="flex-1">
      <p class="text-base text-primary dark:text-[#FAFAFA] mb-3">
        You're reading Part {currentPosition} of {totalInSeries} in the
        <strong class="text-primary dark:text-[#FAFAFA]">{seriesName}</strong>
        series
        {#if currentPhase}
          ({capitalize(currentPhase)} phase).
        {/if}
      </p>
      <p class="text-sm text-secondary dark:text-[#A3A3A3] mb-2">
        Use the <strong>Series Navigation</strong> button at the top-right of the post to browse all posts in this series.
      </p>
      {#if currentPosition > 1}
        <a href="/writing/{firstPostSlug}" class="text-sm text-accent hover:underline font-medium">
          Start from the beginning →
        </a>
      {/if}
    </div>
  </div>
</div>

<style>
  .series-context-card {
    @apply bg-accent/5 border border-accent/20 rounded-lg p-4 my-8;
  }
</style>
