<script lang="ts">
  import type { SeriesMeta } from '$lib/utils/posts';

  const phases = ['strategy', 'design', 'engineering', 'deployment', 'maintenance', 'community'] as const;
  type Phase = typeof phases[number];

  const phaseColors: Record<Phase, string> = {
    strategy: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    design: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    engineering: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    deployment: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    maintenance: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    community: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
  };

  interface Props {
    tracks?: string[];
    series?: SeriesMeta[];
    activeTracks?: string[];
    activeSeries?: string[];
    activePhases?: string[];
    onTrackChange?: (track: string) => void;
    onSeriesChange?: (series: string) => void;
    onPhaseChange?: (phase: string) => void;
    resultCount?: number;
    onClearAll?: () => void;
  }

  let {
    tracks = ['All', 'Engineering', 'Business', 'Product'],
    series = [],
    activeTracks = [],
    activeSeries = [],
    activePhases = [],
    onTrackChange,
    onSeriesChange,
    onPhaseChange,
    resultCount,
    onClearAll,
  }: Props = $props();

  function handleTrackClick(track: string) {
    onTrackChange?.(track);
  }

  function handleSeriesClick(seriesSlug: string) {
    onSeriesChange?.(seriesSlug);
  }

  function handlePhaseClick(phase: string) {
    onPhaseChange?.(phase);
  }

  function isTrackActive(track: string): boolean {
    if (track === 'All') {
      return activeTracks.length === 0;
    }
    return activeTracks.includes(track.toLowerCase());
  }

  function isSeriesActive(seriesSlug: string): boolean {
    if (seriesSlug === 'all') {
      return activeSeries.length === 0;
    }
    return activeSeries.includes(seriesSlug);
  }

  function isPhaseActive(phase: string): boolean {
    return activePhases.includes(phase);
  }

  function getPhaseColor(phase: string): string {
    return phaseColors[phase as Phase] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const hasActiveFilters = $derived(activeTracks.length > 0 || activeSeries.length > 0 || activePhases.length > 0);
</script>

<div class="flex flex-col gap-3" role="group" aria-label="Content filters">
  <!-- Track Filters -->
  <div class="flex flex-wrap items-center gap-2">
    <span class="text-sm text-secondary dark:text-[#A3A3A3] mr-1">Track:</span>
    {#each tracks as track}
      <button
        type="button"
        class="filter-pill {isTrackActive(track) ? 'filter-pill-active' : 'filter-pill-inactive'}"
        aria-pressed={isTrackActive(track)}
        onclick={() => handleTrackClick(track)}
      >
        {track}
      </button>
    {/each}
  </div>

  <!-- Series Filters (only shown if there are series) -->
  {#if series.length > 0}
    <div class="flex flex-wrap items-center gap-2">
      <span class="text-sm text-secondary dark:text-[#A3A3A3] mr-1">Series:</span>
      <button
        type="button"
        class="filter-pill {isSeriesActive('all') ? 'filter-pill-active' : 'filter-pill-inactive'}"
        aria-pressed={isSeriesActive('all')}
        onclick={() => handleSeriesClick('all')}
      >
        All
      </button>
      {#each series as s}
        <button
          type="button"
          class="filter-pill {isSeriesActive(s.slug) ? 'filter-pill-active' : 'filter-pill-inactive'}"
          aria-pressed={isSeriesActive(s.slug)}
          onclick={() => handleSeriesClick(s.slug)}
        >
          {s.name}
        </button>
      {/each}
    </div>
  {/if}

  <!-- Phase Filters (only shown when at least one series is selected) -->
  {#if activeSeries.length > 0 && !activeSeries.includes('all')}
    <div class="flex flex-wrap items-center gap-2">
      <span class="text-sm text-secondary dark:text-[#A3A3A3] mr-1">Phase:</span>
      {#each phases as phase}
        <button
          type="button"
          class="filter-pill-phase {isPhaseActive(phase) ? 'filter-pill-phase-active' : 'filter-pill-phase-inactive'} {getPhaseColor(phase)}"
          aria-pressed={isPhaseActive(phase)}
          onclick={() => handlePhaseClick(phase)}
        >
          {capitalize(phase)}
        </button>
      {/each}
    </div>
  {/if}

  <!-- Result Count and Clear All -->
  {#if resultCount !== undefined || hasActiveFilters}
    <div class="flex items-center justify-between mt-1 pt-2 border-t border-border dark:border-[#262626]">
      {#if resultCount !== undefined}
        <span class="text-sm text-secondary dark:text-[#A3A3A3]">
          Showing {resultCount} {resultCount === 1 ? 'post' : 'posts'}
        </span>
      {:else}
        <span></span>
      {/if}
      {#if hasActiveFilters && onClearAll}
        <button
          type="button"
          class="text-sm text-accent hover:underline"
          onclick={onClearAll}
        >
          Clear all
        </button>
      {/if}
    </div>
  {/if}
</div>

<style>
  .filter-pill {
    @apply px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer;
  }
  .filter-pill-inactive {
    @apply border border-border text-secondary dark:border-[#262626] dark:text-[#A3A3A3] hover:border-accent hover:text-accent;
  }
  .filter-pill-active {
    @apply bg-accent text-white border border-accent hover:bg-accent/90;
  }

  .filter-pill-phase {
    @apply px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer;
  }
  .filter-pill-phase-inactive {
    @apply opacity-60 hover:opacity-100;
  }
  .filter-pill-phase-active {
    @apply ring-2 ring-accent ring-offset-1 dark:ring-offset-[#0A0A0A];
  }
</style>
