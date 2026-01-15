<script lang="ts">
  import { getProductByTag } from '$lib/config';

  interface Props {
    tags?: string[];
  }

  let { tags = [] }: Props = $props();

  // Get the matching product based on post tags
  const product = $derived(getProductByTag(tags));
</script>

{#if product}
  <div class="bg-gradient-to-r from-accent/10 to-pink/10 border border-accent/20 rounded-lg p-8 my-12">
    <div class="max-w-prose">
      <span class="text-small font-medium text-accent">{product.tagline}</span>
      <h3 class="text-h4 text-primary mt-2 mb-3">{product.name}</h3>
      <p class="text-secondary mb-6">
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
