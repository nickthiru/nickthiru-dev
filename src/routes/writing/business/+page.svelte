<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import PostCard from '$lib/components/PostCard.svelte';
  import FilterPills from '$lib/components/FilterPills.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<SEO 
  title="Business"
  description="Practical insights on pricing, distribution, and running a portfolio of AI products."
/>

<section class="mx-auto max-w-page px-6 md:px-8 py-12 md:py-16">
  <header class="mb-6">
    <h1 class="text-h2 text-primary dark:text-[#FAFAFA] mb-6">Business</h1>
    <p class="text-lg text-secondary dark:text-[#D4D4D4] mb-14">
      Practical insights on pricing, distribution, and running a portfolio of AI products. Real numbers and honest updates on what's working and what's not.
    </p>
    <FilterPills />
  </header>

  <div class="grid gap-6 md:grid-cols-2">
    {#each data.posts as post}
      <PostCard {post} />
    {:else}
      <p class="text-secondary dark:text-[#D4D4D4] md:col-span-2">No business posts yet. Check back soon!</p>
    {/each}
  </div>
</section>
