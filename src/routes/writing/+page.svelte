<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import PostCard from '$lib/components/PostCard.svelte';
  import FilterPills from '$lib/components/FilterPills.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<SEO 
  title="Writing"
  description="Technical deep-dives and business insights on building agentic AI systems."
/>

<section class="mx-auto max-w-page px-6 md:px-8 py-12 md:py-16">
  <header class="mb-12">
    <h1 class="text-h1 text-primary dark:text-[#FAFAFA] mb-4">Writing</h1>
    <p class="text-xl text-secondary dark:text-[#D4D4D4] mb-6">
      I write about building agentic AI systems from three perspectives:
    </p>
    <div class="grid md:grid-cols-3 gap-6 mb-8">
      <div class="bg-blue-lighter/30 border border-blue-lighter rounded-lg p-5 dark:bg-blue-darker/20 dark:border-blue-darker/40">
        <h2 class="text-h5 text-primary dark:text-[#FAFAFA] mb-2 flex items-center gap-2">
          <span class="track-badge track-badge-technical">Engineering</span>
        </h2>
        <p class="text-secondary dark:text-[#D4D4D4] text-body">
          Technical deep-dives on LangGraph architecture, prompt engineering, quality gates, and production patterns for AI agents.
        </p>
      </div>
      <div class="bg-pink-lighter/30 border border-pink-lighter rounded-lg p-5 dark:bg-pink-darker/20 dark:border-pink-darker/40">
        <h2 class="text-h5 text-primary dark:text-[#FAFAFA] mb-2 flex items-center gap-2">
          <span class="track-badge track-badge-business">Business</span>
        </h2>
        <p class="text-secondary dark:text-[#D4D4D4] text-body">
          Practical insights on pricing, distribution, building in public, and running a portfolio of AI products as a solo founder.
        </p>
      </div>
      <div class="bg-accent/10 border border-accent/20 rounded-lg p-5 dark:bg-accent/20 dark:border-accent/40">
        <h2 class="text-h5 text-primary dark:text-[#FAFAFA] mb-2 flex items-center gap-2">
          <span class="track-badge track-badge-product">Product</span>
        </h2>
        <p class="text-secondary dark:text-[#D4D4D4] text-body">
          Build logs, learnings, and updates from shipping AI products—currently building LinkedIn Ghostwriter.
        </p>
      </div>
    </div>
    <FilterPills />
  </header>

  <div class="space-y-6">
    {#each data.posts as post}
      <PostCard {post} />
    {:else}
      <p class="text-secondary dark:text-[#D4D4D4]">No posts yet. Check back soon!</p>
    {/each}
  </div>
</section>
