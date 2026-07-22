<script lang="ts">
  import { getProductBySlug } from '$lib/config';

  interface Props {
    seriesSlug?: string;
  }

  let { seriesSlug }: Props = $props();

  // Get the matching product based on series slug
  const product = $derived(getProductBySlug(seriesSlug));
</script>

{#if product}
  <div class="bg-gradient-to-r from-accent/10 to-pink/10 dark:from-accent/5 dark:to-pink/5 border border-accent/20 dark:border-accent/30 rounded-lg p-8 my-12">
    <div class="max-w-prose">
      <span class="text-small font-medium text-accent">{product.tagline}</span>
      <h3 class="text-h4 text-primary dark:text-[#FAFAFA] mt-2 mb-3">{product.name}</h3>
      <p class="text-secondary dark:text-[#D4D4D4] mb-6">
        {product.description}
      </p>
      <a 
        href={product.productUrl}
        class="btn-primary inline-flex items-center gap-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn more and join the waitlist
        <span aria-hidden="true">→</span>
      </a>
    </div>
  </div>
{/if}
