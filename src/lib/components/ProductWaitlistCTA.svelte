<script lang="ts">
  interface Props {
    tags?: string[];
  }

  let { tags = [] }: Props = $props();

  // Check if post has product-related tags
  const hasProductTag = tags.some(tag => 
    tag === 'linkedin-ghostwriter' || 
    tag === 'product'
  );
</script>

{#if hasProductTag}
  <div class="bg-gradient-to-r from-accent/10 to-pink/10 border border-accent/20 rounded-lg p-8 my-12">
    <div class="max-w-prose">
      <span class="text-small font-medium text-accent">Now Building</span>
      <h3 class="text-h4 text-primary mt-2 mb-3">LinkedIn Ghostwriter</h3>
      <p class="text-secondary mb-6">
        Voice notes → authentic LinkedIn posts. Style learning, quality gates, and scheduling. 
        Built for founders who want to post consistently without sounding like corporate AI.
      </p>
      <a 
        href="https://thiruailabs.com/products/linkedin-ghostwriter" 
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
