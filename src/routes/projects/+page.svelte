<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { getAllProjects } from '$lib/config';

  const allProjects = getAllProjects();
  
  // Separate into Current (Building, Live) and Future/Other (Idea, Archived)
  const currentProjects = allProjects.filter(p => p.status === 'Building' || p.status === 'Live');
  const futureProjects = allProjects.filter(p => p.status === 'Idea' || p.status === 'Archived');
</script>

<SEO 
  title="Projects"
  description="Products and systems I am building."
/>

<section class="mx-auto max-w-page px-6 md:px-8 py-12 md:py-16">
  <header class="mb-12">
    <h1 class="text-h1 text-primary dark:text-[#FAFAFA] mb-8">Projects</h1>
    <p class="text-xl text-secondary dark:text-[#D4D4D4]">
      Products and systems I build through my solo AI systems studio, <a 
        href="https://thiruailabs.com/products"
        target="_blank"
        rel="noopener noreferrer"
        class="text-accent hover:underline inline-flex items-center gap-1"
      >
        Thiru AI Labs
      </a>.
    </p>
  </header>

  {#if currentProjects.length > 0}
    <div class="mb-16">
      <h2 class="text-h3 text-primary dark:text-[#FAFAFA] mb-6">Current</h2>
      <div class="grid gap-6 md:grid-cols-2">
        {#each currentProjects as project}
          <ProjectCard {project} />
        {/each}
      </div>
    </div>
  {/if}

  {#if futureProjects.length > 0}
    <div>
      <h2 class="text-h3 text-primary dark:text-[#FAFAFA] mb-6">Future</h2>
      <div class="grid gap-6 md:grid-cols-2">
        {#each futureProjects as project}
          <ProjectCard {project} />
        {/each}
      </div>
    </div>
  {/if}
</section>
