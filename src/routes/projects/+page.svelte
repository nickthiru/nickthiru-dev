<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { getAllProjects } from '$lib/config';
  
  const projects = getAllProjects();
</script>

<SEO 
  title="Projects"
  description="Products and systems I've built or am building."
/>

<section class="mx-auto max-w-page px-6 md:px-8 py-12 md:py-16">
  <header class="mb-12">
    <h1 class="text-h1 text-primary dark:text-[#FAFAFA] mb-4">Projects</h1>
    <p class="text-xl text-secondary dark:text-[#D4D4D4]">
      Products and systems I've built or am building through my solo AI systems studio: <a
        href="https://thiruailabs.com"
        target="_blank"
        rel="noopener noreferrer"
        class="text-accent hover:underline inline-flex items-center gap-1"
      >
        Thiru AI Labs
      </a>.
    </p>
  </header>

  <div class="grid gap-6 md:grid-cols-2">
    {#each projects as project}
      <ProjectCard {project} />
    {/each}
  </div>
</section>
