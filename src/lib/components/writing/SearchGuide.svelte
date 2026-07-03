<script lang="ts">
  import { onMount } from "svelte";
  import TrackBadge from "$lib/components/TrackBadge.svelte";

  // State management with localStorage persistence
  let expanded = $state(true);
  let mounted = $state(false);

  onMount(() => {
    mounted = true;
    const saved = localStorage.getItem("nickthiru_writing_search_guide_expanded");
    if (saved !== null) {
      expanded = JSON.parse(saved);
    }
  });

  function toggle() {
    expanded = !expanded;
    if (mounted) {
      localStorage.setItem(
        "nickthiru_writing_search_guide_expanded",
        JSON.stringify(expanded),
      );
    }
  }
</script>

<section class="search-guide">
  <!-- Section Header Row -->
  <div class="section-header">
    <span class="section-label">Search Guide</span>
    <!-- <div class="section-rule"></div> -->
    <button
      type="button"
      class="toggle-link"
      aria-expanded={expanded}
      aria-controls="search-guide-content"
      onclick={toggle}
    >
      <span class="toggle-text">{expanded ? 'Hide' : 'Show'}</span>
      <svg class="toggle-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>

  <!-- Always visible subtitle -->
  <p class="section-subtitle">
    Learn how posts are organised — and how to navigate them.
  </p>

  <!-- Collapsible Content -->
  <div
    id="search-guide-content"
    class="guide-content"
    class:collapsed={!expanded}
    aria-hidden={!expanded}
  >
    <div class="guide-content-inner">
      <!-- Track Cards (3-column grid) -->
      <div class="grid md:grid-cols-3 gap-6 mb-6">
        <!-- Engineering Track -->
        <div class="bg-blue-lighter/30 border border-blue-lighter rounded-lg p-5 dark:bg-blue-darker/20 dark:border-blue-darker/40 h-full">
          <h2 class="text-h5 text-primary dark:text-[#FAFAFA] mb-4 flex items-center gap-2">
            <TrackBadge track="engineering" />
          </h2>
          <div class="space-y-4">
            <div>
              <span class="block font-medium text-primary dark:text-[#FAFAFA] text-sm">Engineering Deep-Dives</span>
              <span class="text-secondary dark:text-[#D4D4D4] text-sm leading-relaxed block mt-1">Architecture decisions, implementation challenges, and solutions.</span>
            </div>
            <div>
              <span class="block font-medium text-primary dark:text-[#FAFAFA] text-sm">Technical Writing</span>
              <span class="text-secondary dark:text-[#D4D4D4] text-sm leading-relaxed block mt-1">General agentic AI insights, industry trends, and emerging patterns.</span>
            </div>
          </div>
        </div>

        <!-- Business Track -->
        <div class="bg-pink-lighter/30 border border-pink-lighter rounded-lg p-5 dark:bg-pink-darker/20 dark:border-pink-darker/40 h-full">
          <h2 class="text-h5 text-primary dark:text-[#FAFAFA] mb-4 flex items-center gap-2">
            <TrackBadge track="business" />
          </h2>
          <div class="space-y-4">
            <div>
              <span class="block font-medium text-primary dark:text-[#FAFAFA] text-sm">Business & Operations</span>
              <span class="text-secondary dark:text-[#D4D4D4] text-sm leading-relaxed block mt-1">Practical insights on pricing, distribution, and running a portfolio.</span>
            </div>
            <div>
              <span class="block font-medium text-primary dark:text-[#FAFAFA] text-sm">Metrics & Progress</span>
              <span class="text-secondary dark:text-[#D4D4D4] text-sm leading-relaxed block mt-1">Real numbers and honest updates on what's working and what's not.</span>
            </div>
          </div>
        </div>

        <!-- Product Track -->
        <div class="bg-accent/10 border border-accent/20 rounded-lg p-5 dark:bg-accent/20 dark:border-accent/40 h-full">
          <h2 class="text-h5 text-primary dark:text-[#FAFAFA] mb-4 flex items-center gap-2">
            <TrackBadge track="product" />
          </h2>
          <div class="space-y-4">
            <div>
              <span class="block font-medium text-primary dark:text-[#FAFAFA] text-sm">Product News</span>
              <span class="text-secondary dark:text-[#D4D4D4] text-sm leading-relaxed block mt-1">Build logs, learnings, and updates on shipped AI products.</span>
            </div>
            <div>
              <span class="block font-medium text-primary dark:text-[#FAFAFA] text-sm">Community Feedback</span>
              <span class="text-secondary dark:text-[#D4D4D4] text-sm leading-relaxed block mt-1">Iterating on products based on user requests and collaboration.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Series & Phase Cards (2-column grid) -->
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Series Card -->
        <div class="p-6 bg-accent/5 border border-accent/20 rounded-lg h-full">
          <h2 class="text-h4 text-primary dark:text-[#FAFAFA] mb-3">Series</h2>
          <p class="text-base text-secondary dark:text-[#D4D4D4]">
            Blog posts can also belong to a <strong>Series</strong>, which collects related posts exploring a topic deeply—whether that's a product's journey, a technical subject, or a business theme.
          </p>
        </div>

        <!-- Phase Card -->
        <div class="p-6 bg-accent/5 border border-accent/20 rounded-lg h-full">
          <h2 class="text-h4 text-primary dark:text-[#FAFAFA] mb-3">Phase</h2>
          <p class="text-base text-secondary dark:text-[#D4D4D4] mb-3">
            <em>Product series</em> posts are organised into <strong>Phases</strong> of a product's development journey: 
            <span class="text-base font-medium">
            strategy, design, engineering, deployment, maintenace, community (feedback)
          </span>
          </p>
          <p class="text-base text-secondary dark:text-[#A3A3A3]">
            The phase filter appears automatically when a product series is selected.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .search-guide {
    @apply p-4 pb-5 my-8 ml-6 mr-9 border-2 rounded-xl border-purple-200 dark:border-[#262626];
  }

  .section-header {
    @apply flex items-center gap-3 mb-2;
  }

  .section-label {
    @apply text-sm font-semibold text-secondary dark:text-[#A3A3A3] whitespace-nowrap;
  }

  /* .section-rule {
    @apply flex-1 h-px bg-border dark:bg-[#262626];
  } */

  .toggle-link {
    @apply flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80 whitespace-nowrap bg-transparent border-none p-0 cursor-pointer;
  }

  .toggle-chevron {
    @apply transition-transform duration-200;
  }

  .toggle-link[aria-expanded="true"] .toggle-chevron {
    @apply rotate-180;
  }

  .section-subtitle {
    @apply text-base text-secondary dark:text-[#D4D4D4];
  }

  .guide-content {
    @apply overflow-hidden transition-all duration-200 ease-out;
    max-height: 2000px;
  }

  .guide-content.collapsed {
    max-height: 0;
    @apply overflow-hidden;
  }

  .guide-content-inner {
    @apply pt-6;
  }
</style>
