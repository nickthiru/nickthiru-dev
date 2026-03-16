<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import EssentialReading from '$lib/components/EssentialReading.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import SubscribeForm from '$lib/components/SubscribeForm.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<SEO />

<!-- Hero Section -->
<section class="mx-auto max-w-page px-6 md:px-8 py-16 lg:py-24">
  <div class="flex flex-col lg:flex-row gap-8 lg:gap-32 items-center">
    <!-- Mobile/Tablet photo - appears first on smaller screens -->
    <div class="lg:hidden flex justify-center mb-4">
      <img 
        src="/profile-picture.jpeg" 
        alt="Nick Thiru" 
        class="w-32 md:w-48 rounded-lg shadow-xl"
      />
    </div>
    
    <div class="max-w-2xl text-center lg:text-left">
      <h1 class="text-h2 text-primary dark:text-[#FAFAFA] mb-6">
        Building agentic AI systems that ship.
      </h1>
      <p class="font-[100] text-lg text-secondary dark:text-[#D4D4D4] leading-relaxed mb-4">
        I'm the Founder and AI Systems Architect & Engineer at <a
        href="https://thiruailabs.com"
        target="_blank"
        rel="noopener noreferrer"
        class="text-accent hover:underline inline-flex items-center gap-1"
      >
        Thiru AI Labs
      </a>, building full-stack, agentic AI SaaS products and bespoke systems—secure, data-isolated, reliable, and production-grade—for the real world.
      </p>
      <p class="font-[100] text-lg text-secondary dark:text-[#D4D4D4] leading-relaxed mb-6">
         I also share my hard-won lessons and expertise across engineering, product, and business, through my writing.
      </p>
    </div>
    
    <!-- Desktop photo - appears on right side -->
    <div class="hidden lg:block shrink-0">
      <img 
        src="/profile-picture.jpeg" 
        alt="Nick Thiru" 
        class="w-48 rounded-lg shadow-xl"
      />
    </div>
  </div>
</section>

<!-- Essential Reading Section -->
<section class="mx-auto max-w-page px-6 md:px-8 pt-12 pb-16 border-t border-border dark:border-[#262626]">
  <EssentialReading posts={data.pinnedPosts} showViewAll={true} />
</section>

<!-- Subscribe Section -->
<section class="mx-auto max-w-page px-6 md:px-8 py-16 border-t border-border dark:border-[#262626]">
  <div class="bg-accent/5 border border-accent/20 rounded-lg p-8 md:p-10 dark:bg-accent/10 dark:border-accent/30 max-w-3xl mx-auto">
    <div class="flex flex-col gap-6 text-center items-center">
      <div class="max-w-prose">
        <h2 class="text-h3 text-primary dark:text-[#FAFAFA] mb-3">Subscribe</h2>
        <p class="text-secondary dark:text-[#D4D4D4]">
          Get new posts in your inbox. No spam, unsubscribe anytime.
        </p>
      </div>
      <div class="w-full max-w-md mb-3">
        <SubscribeForm tag="home" helper="none" />
      </div>
    </div>
  </div>
</section>

<!-- Projects Section -->
<section class="mx-auto max-w-page px-6 md:px-8 py-12 border-t border-border dark:border-[#262626]">
  <div class="flex items-baseline justify-between mb-8">
    <h2 class="text-h3 text-primary dark:text-[#FAFAFA]">Current Projects</h2>
    <a href="/projects" class="hover:text-accent font-medium">
      View all projects <span aria-hidden="true">→</span>
    </a>
  </div>
  
  <div class="grid gap-6 md:grid-cols-2">
    {#each data.featuredProjects as project}
      <ProjectCard {project} />
    {/each}
  </div>
</section>
