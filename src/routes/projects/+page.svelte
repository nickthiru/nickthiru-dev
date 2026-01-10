<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { projects } from '$lib/utils/projects';
</script>

<SEO 
  title="Projects"
  description="Products and systems I've built or am building."
/>

<section class="mx-auto max-w-page px-6 md:px-8 py-12 md:py-16">
  <header class="mb-12">
    <h1 class="text-h1 text-primary mb-4">Projects</h1>
    <p class="text-xl text-secondary">
      Products and systems I've built or am building through my solo AI systems studio: <a
        href="https://thiruailabs.com"
        target="_blank"
        rel="noopener noreferrer"
        class="text-accent hover:underline inline-flex items-center gap-1"
      >
        Thiru AI Labs.
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </p>
  </header>

  <div class="grid gap-6 md:grid-cols-2">
    {#each projects as project}
      <ProjectCard {project} />
    {/each}
  </div>
</section>
