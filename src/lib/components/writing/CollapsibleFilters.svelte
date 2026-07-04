<script lang="ts">
  import FilterPills from '$lib/components/FilterPills.svelte';
  import type { SeriesMeta } from '$lib/utils/posts';

  interface Props {
    series: SeriesMeta[];
    activeTracks: string[];
    activeSeries: string[];
    activePhases: string[];
    initialExpanded: boolean;
    onTrackChange: (track: string) => void;
    onSeriesChange: (series: string) => void;
    onPhaseChange: (phase: string) => void;
    onClearAll: () => void;
  }

  let {
    series,
    activeTracks,
    activeSeries,
    activePhases,
    initialExpanded,
    onTrackChange,
    onSeriesChange,
    onPhaseChange,
    onClearAll,
  }: Props = $props();

  // Clear all is handled in the parent, just need to call it
  const handleClearAll = () => {
    onClearAll?.();
  };

  const COOKIE_NAME = 'nickthiru_filters_expanded';

  let expanded = $state(initialExpanded);

  function toggle() {
    expanded = !expanded;
    document.cookie = `${COOKIE_NAME}=${expanded};path=/;max-age=31536000`;
  }

  // Track display names for summary
  const trackDisplayNames: Record<string, string> = {
    'engineering': 'Engineering',
    'business': 'Business',
    'product': 'Product',
  };

  // Series name lookup
  function getSeriesName(slug: string): string {
    const found = series.find(s => s.slug === slug);
    return found ? found.name : slug;
  }

  // Build collapsed summary data
  const summaryData = $derived.by(() => {
    const items: Array<{ label: string; value: string }> = [];

    if (activeTracks.length === 0) {
      items.push({ label: 'Track', value: 'All' });
    } else {
      const trackNames = activeTracks.map(t => trackDisplayNames[t] || t);
      items.push({ label: 'Track', value: trackNames.join(', ') });
    }

    if (activeSeries.length === 0) {
      items.push({ label: 'Series', value: 'All' });
    } else {
      const seriesNames = activeSeries.map(s => getSeriesName(s));
      items.push({ label: 'Series', value: seriesNames.join(', ') });
    }

    if (activePhases.length === 0) {
      items.push({ label: 'Phase', value: 'All' });
    } else {
      const phaseNames = activePhases.map(p => p.charAt(0).toUpperCase() + p.slice(1));
      items.push({ label: 'Phase', value: phaseNames.join(', ') });
    }

    return items;
  });

  const hasActiveFilters = $derived(activeTracks.length > 0 || activeSeries.length > 0 || activePhases.length > 0);
</script>

<div class="collapsible-filters">
  <!-- Header Row -->
  <div class="filter-header">
    <div class="filter-header-left">
      <span class="filter-label">Filters</span>
      <button
        type="button"
        class="toggle-link"
        aria-expanded={expanded}
        aria-controls="filters-content"
        onclick={toggle}
      >
        <span class="toggle-text">{expanded ? 'Hide' : 'Show'}</span>
        <svg class="toggle-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    {#if hasActiveFilters}
      <button
        type="button"
        class="clear-all-link"
        onclick={handleClearAll}
      >
        Clear filters
      </button>
    {/if}
  </div>

  <!-- Shared content area: summary when collapsed, pills when expanded -->
  <div
    id="filters-content"
    class="filters-content"
    aria-hidden={!expanded}
  >
    <!-- Summary: shown when collapsed -->
    <div class="summary-view" class:hidden={expanded}>
      <div class="summary-categories">
        {#each summaryData as item, index}
          {#if index > 0}
            <span class="summary-separator" aria-hidden="true">•</span>
          {/if}
          <span class="summary-item">
            <span class="summary-label">{item.label}:</span>
            <span class="summary-value">{item.value}</span>
          </span>
        {/each}
      </div>
    </div>

    <!-- Filter pills: shown when expanded -->
    <div class="pills-view" class:hidden={!expanded}>
      <FilterPills
        {series}
        activeTracks={activeTracks}
        activeSeries={activeSeries}
        activePhases={activePhases}
        onTrackChange={onTrackChange}
        onSeriesChange={onSeriesChange}
        onPhaseChange={onPhaseChange}
      />
    </div>
  </div>
</div>

<style>
  .collapsible-filters {
    @apply mb-4;
  }

  .filter-header {
    @apply flex items-center justify-between gap-3 mb-2;
  }

  .filter-header-left {
    @apply flex items-center gap-3;
  }

  .filter-label {
    @apply text-sm font-semibold text-secondary dark:text-[#A3A3A3] whitespace-nowrap;
  }

  .clear-all-link {
    @apply text-sm text-accent hover:underline whitespace-nowrap bg-transparent border-none p-0 cursor-pointer;
  }

  .toggle-link {
    @apply flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80 whitespace-nowrap bg-transparent border-none p-0 cursor-pointer;
  }

  .toggle-chevron {
    @apply transition-transform duration-200;
  }

  .toggle-link[aria-expanded="true"] .toggle-chevron {
    @apply rotate-180;
  }

  .filters-content {
    @apply relative;
    min-height: 2rem;
  }

  /* Summary view - shown when collapsed */
  .summary-view {
    @apply flex items-start justify-between gap-4 pb-2 px-2 transition-all duration-200 ease-out;
  }

  .summary-view.hidden {
    @apply opacity-0 absolute inset-0 pointer-events-none;
    transform: translateY(-4px);
  }

  .summary-categories {
    @apply flex items-center flex-wrap gap-2;
  }

  .summary-separator {
    @apply text-lg text-secondary dark:text-[#737373] leading-relaxed;
  }

  .summary-item {
    @apply text-sm text-secondary dark:text-[#A3A3A3];
  }

  .summary-label {
    @apply font-semibold text-primary dark:text-[#D4D4D4];
  }

  .summary-value {
    @apply font-normal;
  }

  /* Pills view - shown when expanded */
  .pills-view {
    @apply transition-all duration-200 ease-out;
  }

  .pills-view.hidden {
    @apply opacity-0 absolute inset-0 pointer-events-none overflow-hidden;
    transform: translateY(8px);
  }
</style>
