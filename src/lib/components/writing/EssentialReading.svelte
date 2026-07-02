<script lang="ts">
  import { onMount } from "svelte";
  import EssentialReadingCard from "$lib/components/EssentialReadingCard.svelte";
  import type { PostMeta } from "$lib/utils/posts";

  interface Props {
    posts: PostMeta[];
  }

  let { posts }: Props = $props();

  // State management with localStorage persistence
  let expanded = $state(false);
  let mounted = $state(false);

  onMount(() => {
    mounted = true;
    const saved = localStorage.getItem("nickthiru_writing_essential_reading_expanded");
    if (saved !== null) {
      expanded = JSON.parse(saved);
    }
  });

  function toggle() {
    expanded = !expanded;
    if (mounted) {
      localStorage.setItem(
        "nickthiru_writing_essential_reading_expanded",
        JSON.stringify(expanded),
      );
    }
  }

  const postCount = $derived(posts?.length ?? 0);
</script>

<section class="essential-reading-section">
  <!-- Section Header Row -->
  <div class="section-header">
    <span class="section-label">Essential Reading</span>
    <div class="section-rule"></div>
    <button
      type="button"
      class="toggle-link"
      aria-expanded={expanded}
      aria-controls="essential-reading-content"
      onclick={toggle}
    >
      <!-- <span class="toggle-text">{expanded ? 'Hide' : `Show posts (${postCount})`}</span> -->
      <span class="toggle-text">{expanded ? 'Hide' : `Show posts`}</span>
      <svg class="toggle-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>

  <!-- Always visible subtitle -->
  <!-- <p class="section-subtitle">
    The most important posts to start with — foundational reads that set the stage for everything else.
  </p> -->
  <p class="section-subtitle">
    The 3 most important posts to start with.
  </p>

  <!-- Collapsible Content -->
  <div
    id="essential-reading-content"
    class="guide-content"
    class:collapsed={!expanded}
    aria-hidden={!expanded}
  >
    <div class="guide-content-inner">
      <div class="grid gap-6 md:grid-cols-3">
        {#each posts as post}
          <EssentialReadingCard {post} />
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .essential-reading-section {
    @apply mt-8;
  }

  .section-header {
    @apply flex items-center gap-3 mb-2;
  }

  .section-label {
    @apply text-sm font-semibold text-secondary dark:text-[#A3A3A3] whitespace-nowrap;
  }

  .section-rule {
    @apply flex-1 h-px bg-border dark:bg-[#262626];
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

  .section-subtitle {
    @apply text-base text-secondary dark:text-[#D4D4D4] mb-8;
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
    @apply pb-8;
  }
</style>
