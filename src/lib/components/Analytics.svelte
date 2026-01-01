<script lang="ts">
  import { env } from '$env/dynamic/public';

  const domain = env.PUBLIC_PLAUSIBLE_DOMAIN;
  const src = env.PUBLIC_PLAUSIBLE_SCRIPT_SRC || 'https://plausible.io/js/script.js';
</script>

<svelte:head>
  {#if domain}
    <script defer data-domain={domain} src={src}></script>
  {/if}
</svelte:head>
