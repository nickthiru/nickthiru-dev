<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import PostCard from '$lib/components/PostCard.svelte';
  import FilterPills from '$lib/components/FilterPills.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<SEO 
  title="Engineering"
  description="Architecture decisions, implementation challenges, and general insights on agentic AI systems."
/>

<section class="mx-auto max-w-page px-6 md:px-8 py-12 md:py-16">
  <header class="mb-6">
    <h1 class="text-h1 text-primary dark:text-[#FAFAFA] mb-6">Engineering</h1>
    <p class="text-xl text-secondary dark:text-[#D4D4D4] mb-14">
      Detailed technical breakdowns of architecture decisions, implementation challenges, and general insights on agentic AI systems and industry trends.
    </p>
    <FilterPills />
  </header>

  <div class="grid gap-6 md:grid-cols-2">
    {#each data.posts as post}
      <PostCard {post} />
    {:else}
      <p class="text-secondary dark:text-[#D4D4D4] md:col-span-2">No engineering posts yet. Check back soon!</p>
    {/each}
  </div>
</section>
