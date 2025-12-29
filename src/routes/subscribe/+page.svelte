<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import SubscribeForm from '$lib/components/SubscribeForm.svelte';
</script>

<SEO 
  title="Subscribe"
  description="Get new posts in your inbox. No spam, unsubscribe anytime."
/>

<section class="mx-auto max-w-page px-6 md:px-8 py-12 md:py-16">
  <div class="max-w-prose mx-auto text-center">
    <h1 class="text-h1 text-primary mb-4">Subscribe</h1>
    <p class="text-xl text-secondary mb-8">
      Get new posts in your inbox. No spam, unsubscribe anytime.
    </p>
    
    <div class="max-w-md mx-auto">
      <SubscribeForm />
    </div>

    <p class="text-secondary mt-12">
      I write about building agentic AI systems—both the technical deep-dives and the business realities of shipping.
      Expect 1–2 posts per week when I'm in writing mode.
    </p>
  </div>
</section>
