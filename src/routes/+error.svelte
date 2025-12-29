<script lang="ts">
  import { page } from '$app/stores';
  import SEO from '$lib/components/SEO.svelte';
</script>

<SEO 
  title="Page not found"
  description="The page you're looking for doesn't exist."
/>

<section class="mx-auto max-w-page px-6 md:px-8 py-24 text-center">
  <h1 class="text-8xl font-bold text-primary mb-4">
    {$page.status}
  </h1>
  <p class="text-xl text-secondary mb-8">
    {#if $page.status === 404}
      Page not found. It might have moved or never existed.
    {:else}
      Something went wrong.
    {/if}
  </p>
  <a href="/" class="btn-primary">
    Go home
    <span aria-hidden="true">→</span>
  </a>
</section>
