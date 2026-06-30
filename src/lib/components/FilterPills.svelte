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

<div role="group" aria-label="Content filters">
  <!-- 3-Column Grid Layout -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- Column 1: Track Filters -->
    <div class="filter-column">
      <span class="filter-column-label">Track:</span>
      <div class="flex flex-wrap items-center gap-2 mt-2">
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
    </div>

    <!-- Column 2: Series Filters (only shown if there are series) -->
    {#if series.length > 0}
      <div class="filter-column">
        <span class="filter-column-label">Series:</span>
        <div class="flex flex-wrap items-center gap-2 mt-2">
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
      </div>
    {/if}

    <!-- Column 3: Phase Filters (only shown when at least one series is selected) -->
    {#if activeSeries.length > 0 && !activeSeries.includes('all')}
      <div class="filter-column phase-filter-wrapper">
        <span class="filter-column-label tooltip-trigger" data-tooltip="Phase filtering available for product series. Phases represent stages in a product's development lifecycle.">
          Phase:
          <svg class="tooltip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
          </svg>
        </span>
        <div class="flex flex-wrap items-center gap-2 mt-2">
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
      </div>
    {/if}
  </div>

  <!-- Result Count and Clear All -->
  {#if resultCount !== undefined || hasActiveFilters}
    <div class="flex items-center justify-between mt-4 pt-3">
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

  .filter-column {
    @apply flex flex-col;
  }

  .filter-column-label {
    @apply text-base font-semibold text-secondary dark:text-[#A3A3A3];
    /* Adjust text size: change text-base to text-lg, text-xl, etc. */
  }

  .phase-filter-wrapper {
    animation: fadeIn 0.2s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .tooltip-trigger {
    @apply relative cursor-help inline-flex items-center gap-1.5;
  }

  .tooltip-icon {
    @apply w-5 h-5 text-secondary dark:text-[#A3A3A3] hover:text-accent transition-colors flex-shrink-0;
    /* Adjust icon size: change w-5/h-5 to w-6/h-6, etc. */
  }

  .tooltip-trigger::after {
    content: attr(data-tooltip);
    @apply absolute bottom-full left-0 mb-2 px-4 py-3 text-sm font-normal text-white bg-gray-900 dark:bg-gray-700 rounded-lg shadow-lg opacity-0 invisible transition-all duration-200 z-50;
    /* Tooltip box styling - adjust width below */
    width: 280px;
    white-space: normal;
    line-height: 1.4;
    pointer-events: none;
  }

  .tooltip-trigger::before {
    content: '';
    @apply absolute bottom-full left-3 mb-[-1px] border-8 border-transparent border-t-gray-900 dark:border-t-gray-700 opacity-0 invisible transition-all duration-200 z-50;
    pointer-events: none;
  }

  .tooltip-trigger:hover::after,
  .tooltip-trigger:focus::after,
  .tooltip-trigger:hover::before,
  .tooltip-trigger:focus::before {
    @apply opacity-100 visible;
  }
</style>
