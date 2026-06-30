<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import PostCard from '$lib/components/PostCard.svelte';
  import EssentialReading from '$lib/components/EssentialReading.svelte';
  import FilterPills from '$lib/components/FilterPills.svelte';
  import type { PageData } from './$types';
  import type { PostMeta } from '$lib/utils/posts';

  interface ExtendedPageData {
    posts: PostMeta[];
    pinnedPosts: PostMeta[];
    allSeries: Array<{ name: string; slug: string; description: string }>;
  }

  let { data }: { data: ExtendedPageData } = $props();

  // Client-side filter state
  let activeTracks: string[] = $state([]);
  let activeSeries: string[] = $state([]);
  let activePhases: string[] = $state([]);

  // Pagination state
  const POSTS_PER_PAGE = 10;
  let currentPage = $state(1);

  // Normalize track names for comparison
  const trackMap: Record<string, string> = {
    'Engineering': 'engineering',
    'Business': 'business',
    'Product': 'product',
    'Technical': 'technical'
  };

  // Series descriptions map
  const seriesDescriptions: Record<string, string> = $derived.by(() => {
    const map: Record<string, string> = {};
    for (const s of data.allSeries) {
      map[s.slug] = s.description;
    }
    return map;
  });

  // Filter posts based on active filters
  const filteredPosts = $derived.by(() => {
    let filtered = data.posts;

    // Apply track filter
    if (activeTracks.length > 0) {
      const normalizedTracks = activeTracks.map(t => trackMap[t] || t.toLowerCase());
      filtered = filtered.filter(post => normalizedTracks.includes(post.track));
    }

    // Apply series filter
    if (activeSeries.length > 0) {
      filtered = filtered.filter(post => {
        if (activeSeries.includes('all')) return true;
        return post.series_slug && activeSeries.includes(post.series_slug);
      });
    }

    // Apply phase filter
    if (activePhases.length > 0) {
      filtered = filtered.filter(post => post.series_phase && activePhases.includes(post.series_phase));
    }

    return filtered;
  });

  // Paginated posts
  const paginatedPosts = $derived.by(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  });

  // Total pages
  const totalPages = $derived.by(() => {
    return Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  });

  // Reset to page 1 when filters change
  $effect(() => {
    activeTracks;
    activeSeries;
    activePhases;
    currentPage = 1;
  });

  function handleTrackChange(track: string) {
    if (track === 'All') {
      activeTracks = [];
      return;
    }

    const normalizedTrack = trackMap[track] || track.toLowerCase();
    const idx = activeTracks.indexOf(normalizedTrack);
    if (idx >= 0) {
      activeTracks = activeTracks.filter((_, i) => i !== idx);
    } else {
      activeTracks = [...activeTracks, normalizedTrack];
    }
  }

  function handleSeriesChange(seriesSlug: string) {
    if (seriesSlug === 'all') {
      activeSeries = [];
      return;
    }

    const idx = activeSeries.indexOf(seriesSlug);
    if (idx >= 0) {
      activeSeries = activeSeries.filter((_, i) => i !== idx);
    } else {
      activeSeries = [...activeSeries, seriesSlug];
    }
  }

  function handlePhaseChange(phase: string) {
    const idx = activePhases.indexOf(phase);
    if (idx >= 0) {
      activePhases = activePhases.filter((_, i) => i !== idx);
    } else {
      activePhases = [...activePhases, phase];
    }
  }

  function handleClearAll() {
    activeTracks = [];
    activeSeries = [];
    activePhases = [];
  }

  function goToPage(page: number) {
    currentPage = page;
    // Scroll to top of posts section
    const postsSection = document.getElementById('posts-section');
    if (postsSection) {
      postsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<SEO 
  title="Writing"
  description="Technical deep-dives and business insights on building agentic AI systems."
/>

<section class="mx-auto max-w-page px-6 md:px-8 py-12 md:py-16">
  <header class="mb-6">
    <h1 class="text-h2 text-primary dark:text-[#FAFAFA] mb-8">Writing</h1>
    <p class="text-lg text-secondary dark:text-[#D4D4D4] mb-6">
      I write about building and shipping agentic AI from three main perspectives: engineering, business, and product.
    </p>
    <div class="grid md:grid-cols-3 gap-6 mt-7 mb-16 items-start">
      <div class="bg-blue-lighter/30 border border-blue-lighter rounded-lg p-5 dark:bg-blue-darker/20 dark:border-blue-darker/40 h-full">
        <h2 class="text-h5 text-primary dark:text-[#FAFAFA] mb-4 flex items-center gap-2">
          <span class="track-badge track-badge-technical">Engineering</span>
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
      <div class="bg-pink-lighter/30 border border-pink-lighter rounded-lg p-5 dark:bg-pink-darker/20 dark:border-pink-darker/40 h-full">
        <h2 class="text-h5 text-primary dark:text-[#FAFAFA] mb-4 flex items-center gap-2">
          <span class="track-badge track-badge-business">Business</span>
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
      <div class="bg-accent/10 border border-accent/20 rounded-lg p-5 dark:bg-accent/20 dark:border-accent/40 h-full">
        <h2 class="text-h5 text-primary dark:text-[#FAFAFA] mb-4 flex items-center gap-2">
          <span class="track-badge track-badge-product">Product</span>
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

    <!-- Series Explanation -->
    <div class="mt-12 p-6 bg-accent/5 border border-accent/20 rounded-lg">
      <h2 class="text-h4 text-primary dark:text-[#FAFAFA] mb-3">📚 Series</h2>
      <p class="text-base text-secondary dark:text-[#D4D4D4] mb-4">
        A <strong>series</strong> is a sequence of related posts following a product's development journey. Each series tracks the evolution from initial concept through to real-world deployment and beyond.
      </p>
      <div class="flex flex-wrap gap-3 text-sm">
        <div class="flex items-center gap-2">
          <span class="phase-badge bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">Strategy</span>
          <span class="text-secondary dark:text-[#A3A3A3]">→</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="phase-badge bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Design</span>
          <span class="text-secondary dark:text-[#A3A3A3]">→</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="phase-badge bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Engineering</span>
          <span class="text-secondary dark:text-[#A3A3A3]">→</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="phase-badge bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">Deployment</span>
          <span class="text-secondary dark:text-[#A3A3A3]">→</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="phase-badge bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Maintenance</span>
          <span class="text-secondary dark:text-[#A3A3A3]">→</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="phase-badge bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300">Community</span>
        </div>
      </div>
      <p class="text-sm text-secondary dark:text-[#A3A3A3] mt-3">
        Each phase represents a stage in the product lifecycle. Filter by phase to see posts at specific stages across all series.
      </p>
    </div>
  </header>

  <!-- Essential Reading -->
  <div class="pt-12 pb-16 border-t border-b border-border dark:border-[#262626] mb-14">
    <EssentialReading posts={data.pinnedPosts} />
  </div>

  <!-- Posts -->
  <div id="posts-section" class="mb-6">
    <h2 class="text-h3 text-primary dark:text-[#FAFAFA] mb-6">Posts</h2>
    <FilterPills
      series={data.allSeries}
      activeTracks={activeTracks}
      activeSeries={activeSeries}
      activePhases={activePhases}
      onTrackChange={handleTrackChange}
      onSeriesChange={handleSeriesChange}
      onPhaseChange={handlePhaseChange}
      resultCount={filteredPosts.length}
      onClearAll={handleClearAll}
    />
  </div>

  <!-- Series Descriptions (shown when a single series is selected) -->
  {#if activeSeries.length === 1 && !activeSeries.includes('all')}
    {#each activeSeries as slug}
      {#if seriesDescriptions[slug]}
        <div class="mb-8 p-4 bg-accent/5 border border-accent/20 rounded-lg">
          <h3 class="text-h5 text-primary dark:text-[#FAFAFA] mb-2">
            {data.allSeries.find(s => s.slug === slug)?.name}
          </h3>
          <p class="text-secondary dark:text-[#D4D4D4]">{seriesDescriptions[slug]}</p>
        </div>
      {/if}
    {/each}
  {/if}

  <!-- Post Grid -->
  <div class="grid gap-6 md:grid-cols-2">
    {#each paginatedPosts as post}
      <PostCard {post} />
    {:else}
      <p class="text-secondary dark:text-[#D4D4D4] md:col-span-2">No posts match these filters. Try adjusting your selection.</p>
    {/each}
  </div>

  <!-- Pagination -->
  {#if totalPages > 1}
    <nav class="pagination mt-8 pt-6 border-t border-border dark:border-[#262626]" aria-label="Pagination">
      <div class="flex items-center justify-between">
        <!-- Previous Button -->
        <button
          class="pagination-btn {currentPage === 1 ? 'pagination-btn-disabled' : 'pagination-btn-active'}"
          disabled={currentPage === 1}
          onclick={() => goToPage(currentPage - 1)}
        >
          ← Previous
        </button>

        <!-- Page Numbers -->
        <div class="flex items-center gap-2">
          {#each Array.from({ length: totalPages }, (_, i) => i + 1) as page}
            <button
              class="pagination-page {page === currentPage ? 'pagination-page-active' : 'pagination-page-inactive'}"
              onclick={() => goToPage(page)}
            >
              {page}
            </button>
          {/each}
        </div>

        <!-- Next Button -->
        <button
          class="pagination-btn {currentPage === totalPages ? 'pagination-btn-disabled' : 'pagination-btn-active'}"
          disabled={currentPage === totalPages}
          onclick={() => goToPage(currentPage + 1)}
        >
          Next →
        </button>
      </div>

      <!-- Page Info -->
      <p class="text-center text-sm text-secondary dark:text-[#A3A3A3] mt-4">
        Page {currentPage} of {totalPages} — Showing {(currentPage - 1) * POSTS_PER_PAGE + 1}–{Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length)} of {filteredPosts.length} posts
      </p>
    </nav>
  {/if}
</section>

<style>
  .pagination {
    @apply flex flex-col items-center;
  }

  .pagination-btn {
    @apply px-4 py-2 rounded-lg text-sm font-medium transition-colors;
  }

  .pagination-btn-active {
    @apply text-accent hover:bg-accent/10;
  }

  .pagination-btn-disabled {
    @apply text-secondary dark:text-[#A3A3A3] opacity-50 cursor-not-allowed;
  }

  .pagination-page {
    @apply w-8 h-8 rounded-lg text-sm font-medium transition-colors;
  }

  .pagination-page-active {
    @apply bg-accent text-white;
  }

  .pagination-page-inactive {
    @apply text-secondary dark:text-[#A3A3A3] hover:bg-accent/10 hover:text-accent;
  }
</style>
