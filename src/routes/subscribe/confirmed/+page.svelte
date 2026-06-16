<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
</script>

<SEO 
  title="Email Confirmed"
  description="Your newsletter subscription has been confirmed."
/>

<section class="mx-auto max-w-page px-6 md:px-8 py-12 md:py-16">
  <div class="max-w-prose mx-auto text-center">
    <h1 class="text-h2 text-primary dark:text-[#FAFAFA] mb-4">Email Confirmed!</h1>
    <p class="text-lg text-secondary dark:text-[#D4D4D4] mb-8">
      You're now subscribed to the newsletter. You'll receive new posts directly in your inbox.
    </p>

    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/writing" class="btn-primary">
        Read the Blog
      </a>
      <a href="/" class="btn-secondary">
        Back to Home
      </a>
    </div>
  </div>
</section>
