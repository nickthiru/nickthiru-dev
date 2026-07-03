<script lang="ts">
  import type { SeriesMeta } from '$lib/utils/posts';
  import {
    phaseBadges,
    phaseOrder,
    trackBadges,
    trackPillActiveStyle,
    seriesPillActiveStyle,
    phasePillActiveStyle,
    allPillActiveStyle,
    pillInactiveStyle,
    seriesBadgeStyle,
  } from '$lib/config/badges';

  // Map display track names to slug for color lookup
  const trackDisplayToSlug: Record<string, string> = {
    'Engineering': 'engineering',
    'Business': 'business',
    'Product': 'product',
  };

  function getTrackPillClass(track: string): string {
    const slug = trackDisplayToSlug[track];
    return slug ? trackBadges[slug]?.pill || '' : '';
  }

  function getPhaseBadgeClass(phase: string): string {
    return phaseBadges[phase]?.badge || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }

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
          {#if track === 'All'}
            <button
              type="button"
              class="filter-pill {isTrackActive(track) ? allPillActiveStyle : pillInactiveStyle}"
              aria-pressed={isTrackActive(track)}
              onclick={() => handleTrackClick(track)}
            >
              {track}
            </button>
          {:else}
            <button
              type="button"
              class="filter-pill {isTrackActive(track) ? `${trackPillActiveStyle} ${getTrackPillClass(track)}` : `${pillInactiveStyle} ${getTrackPillClass(track)}`}"
              aria-pressed={isTrackActive(track)}
              onclick={() => handleTrackClick(track)}
            >
              {track}
            </button>
          {/if}
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
            class="filter-pill {isSeriesActive('all') ? allPillActiveStyle : pillInactiveStyle}"
            aria-pressed={isSeriesActive('all')}
            onclick={() => handleSeriesClick('all')}
          >
            All
          </button>
          {#each series as s}
            <button
              type="button"
              class="filter-pill {isSeriesActive(s.slug) ? seriesPillActiveStyle : `${pillInactiveStyle} ${seriesBadgeStyle}`}"
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
          {#each phaseOrder as phase}
            <button
              type="button"
              class="filter-pill-phase {isPhaseActive(phase) ? phasePillActiveStyle : 'filter-pill-phase-inactive'} {getPhaseBadgeClass(phase)}"
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
    <div class="flex items-center justify-between mt-4 ml-2">
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
  @apply px-3 py-1.5 rounded text-sm font-medium transition-colors cursor-pointer;
}

.filter-pill-phase {
  @apply px-3 py-1.5 rounded text-sm font-medium transition-colors cursor-pointer;
}
.filter-pill-phase-inactive {
  @apply hover:opacity-80;
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
