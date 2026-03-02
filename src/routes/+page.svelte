<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import PostCard from '$lib/components/PostCard.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import SubscribeForm from '$lib/components/SubscribeForm.svelte';
  import { siteConfig } from '$lib/config';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<SEO />

<!-- Hero Section -->
<section class="mx-auto max-w-page px-6 md:px-8 py-16 md:py-24">
  <div class="grid md:grid-cols-[1fr,auto] gap-8 md:gap-16 items-center">
    <!-- Mobile photo - appears first on mobile -->
    <div class="md:hidden flex justify-center mb-4">
      <img 
        src="/profile-picture.jpeg" 
        alt="Nick Thiru" 
        class="w-32 rounded-lg shadow-xl"
      />
    </div>
    
    <div class="max-w-prose">
      <h1 class="text-h1 text-primary dark:text-[#FAFAFA] mb-6">
        Building agentic AI systems that ship.
      </h1>
      <p class="text-xl text-secondary dark:text-[#D4D4D4] leading-relaxed mb-6">
        I'm an AI systems architect building complete production systems for agentic AI—from LangGraph orchestration to AWS infrastructure, custom dashboards, and everything needed to ship reliably. 
        I also write about and share my expertise on the engineering and the business of making AI agents work in production.
      </p>
    </div>
    
    <!-- Desktop photo - appears on right side -->
    <div class="hidden md:block">
      <img 
        src="/profile-picture.jpeg" 
        alt="Nick Thiru" 
        class="w-56 rounded-lg shadow-xl"
      />
    </div>
  </div>
</section>

<!-- Recent Posts Section -->
<section class="mx-auto max-w-page px-6 md:px-8 py-12 border-t border-border dark:border-[#262626]" >
  <div class="flex items-center justify-between mb-8">
    <h2 class="text-h2 text-primary dark:text-[#FAFAFA]">Recent writing</h2>
    <a href="/writing" class="hover:text-accent font-medium">
      View all <span aria-hidden="true">→</span>
    </a>
  </div>
  
  <div class="grid gap-6 md:grid-cols-2">
    {#each data.recentPosts as post}
      <PostCard {post} />
    {/each}
  </div>
</section>

<!-- Subscribe Section -->
<section class="mx-auto max-w-page px-6 md:px-8 py-12 border-t border-border dark:border-[#262626]">
  <div class="bg-accent/5 border border-accent/20 rounded-lg p-8 md:p-10 dark:bg-accent/10 dark:border-accent/30 max-w-3xl mx-auto">
    <div class="flex flex-col gap-6 text-center items-center">
      <div class="max-w-prose">
        <h2 class="text-h3 text-primary dark:text-[#FAFAFA] mb-3">Subscribe</h2>
        <p class="text-secondary dark:text-[#D4D4D4]">
          Get new posts in your inbox. No spam, unsubscribe anytime.
        </p>
      </div>
      <div class="w-full max-w-md">
        <SubscribeForm tag="home" helper="none" />
      </div>
    </div>
  </div>
</section>

<!-- Projects Section -->
<section class="mx-auto max-w-page px-6 md:px-8 py-12 border-t border-border dark:border-[#262626]">
  <div class="flex items-center justify-between mb-8">
    <h2 class="text-h2 text-primary dark:text-[#FAFAFA]">Current projects</h2>
    <a href="/projects" class="hover:text-accent font-medium">
      View all <span aria-hidden="true">→</span>
    </a>
  </div>
  
  <div class="grid gap-6 md:grid-cols-2">
    {#each data.featuredProjects as project}
      <ProjectCard {project} />
    {/each}
  </div>
</section>
