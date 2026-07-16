<script lang="ts">
  interface Props {
    seriesName: string;
    currentPhase: string;
    currentPosition: number;
    totalInSeries: number;
    seriesSlug: string;
  }

  let { seriesName, currentPhase, currentPosition, totalInSeries, seriesSlug }: Props = $props();

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
</script>

<div class="series-context-card">
  <div class="flex items-start gap-3">
    <!-- <span class="text-2xl shrink-0">📚</span> -->
    <div class="flex-1">
      <p class="text-base text-primary dark:text-[#FAFAFA] mb-1">
        You're reading Part {currentPosition} of {totalInSeries} in the
        <a href="/writing/?series={seriesSlug}" class="text-accent hover:underline">{seriesName}</a>
        series 
        {#if currentPhase}
          ({capitalize(currentPhase)} phase).
        {/if}
      </p>
      <a href="/writing/?series={seriesSlug}" class="text-sm text-accent hover:underline font-medium">
        Start from the beginning →
      </a>
    </div>
  </div>
</div>

<style>
  .series-context-card {
    @apply bg-accent/5 border border-accent/20 rounded-lg p-4 my-8;
  }
</style>
