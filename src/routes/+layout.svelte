<script lang="ts">
  import '../app.css';
  import Analytics from '$lib/components/Analytics.svelte';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { afterNavigate } from '$app/navigation';
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores/theme';

  interface Props {
    children: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  onMount(() => {
    theme.init();
  });

  afterNavigate(() => {
    // Scroll to top on navigation unless there's a hash in the URL
    if (!window.location.hash) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      });
    }
  });
</script>

<Analytics />

<div class="min-h-screen flex flex-col">
  <Nav />
  <main id="main-content" class="flex-grow">
    {@render children()}
  </main>
  <Footer />
</div>
