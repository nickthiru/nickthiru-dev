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
      I write about building agentic AI systems from three main perspectives: Engineering, business, and product.
    </p>
    <div class="grid md:grid-cols-3 gap-6 mt-8 mb-12 items-start">
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
    <FilterPills />
  </header>

  <div class="grid gap-6 md:grid-cols-2">
    {#each data.posts as post}
      <PostCard {post} />
    {:else}
      <p class="text-secondary dark:text-[#D4D4D4] md:col-span-2">No posts yet. Check back soon!</p>
    {/each}
  </div>
</section>
