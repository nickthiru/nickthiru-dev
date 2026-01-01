<script lang="ts">
  import { PUBLIC_PLAUSIBLE_DOMAIN, PUBLIC_PLAUSIBLE_SCRIPT_SRC } from '$env/static/public';

  const src = PUBLIC_PLAUSIBLE_SCRIPT_SRC || 'https://plausible.io/js/script.js';
</script>

<svelte:head>
  {#if PUBLIC_PLAUSIBLE_DOMAIN}
    <script defer data-domain={PUBLIC_PLAUSIBLE_DOMAIN} src={src}></script>
  {/if}
</svelte:head>
