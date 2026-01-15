<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import PostCard from '$lib/components/PostCard.svelte';
  import FilterPills from '$lib/components/FilterPills.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<SEO 
  title="Operating"
  description="Positioning, pricing, distribution experiments, and lessons from shipping."
/>

<section class="mx-auto max-w-page px-6 md:px-8 py-12 md:py-16">
  <header class="mb-12">
    <h1 class="text-h1 text-primary dark:text-[#FAFAFA] mb-4">Operating</h1>
    <p class="text-xl text-secondary dark:text-[#D4D4D4] mb-8">
      Positioning, pricing, distribution experiments, and lessons from shipping.
    </p>
    <FilterPills />
  </header>

  <div class="space-y-6">
    {#each data.posts as post}
      <PostCard {post} />
    {:else}
      <p class="text-secondary dark:text-[#D4D4D4]">No operating posts yet. Check back soon!</p>
    {/each}
  </div>
</section>
