<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';

  interface Props {
    children: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="min-h-screen flex flex-col">
  <Nav />
  <main id="main-content" class="flex-grow">
    {@render children()}
  </main>
  <Footer />
</div>
