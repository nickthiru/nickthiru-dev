<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
</script>

<SEO 
  title="Email Confirmed"
  description="Your newsletter subscription has been confirmed."
/>

<section class="mx-auto max-w-page px-6 md:px-8 py-12 md:py-16">
  <div class="max-w-prose mx-auto text-center">
    <div class="mb-8">
      <svg
        class="mx-auto h-16 w-16 text-green-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>

    <h1 class="text-h2 text-primary dark:text-[#FAFAFA] mb-4">Email Confirmed!</h1>
    <p class="text-lg text-secondary dark:text-[#D4D4D4] mb-8">
      Thank you for confirming your email. You're now subscribed to the <em>Nick Thiru Dev Notes</em> newsletter.
    </p>

    <div class="flex flex-col gap-7 sm:flex-row sm:justify-center">
      <a href="/writing" class="btn-primary flex w-full sm:w-56 justify-center items-center gap-1.5">
        Read the Blog
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
      </a>
      <a href="https://www.thiruailabs.com" target="_blank" class="btn-secondary flex w-full sm:w-56 justify-center items-center gap-1.5">
        Visit Thiru AI Labs
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
      </a>
    </div>
  </div>
</section>
