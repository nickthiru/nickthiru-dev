<script lang="ts">
  import type { Project } from '$lib/config';

  interface Props {
    project: Project;
  }

  let { project }: Props = $props();

  const statusColors = {
    live: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    building: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    archived: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    idea: 'bg-black text-white dark:bg-white dark:text-black'
  };
</script>

<article class="post-card h-full flex flex-col">
  <div class="flex items-start justify-between gap-4 mb-3">
    <h3 class="text-h4 text-primary dark:text-[#FAFAFA]">
      {project.name}
    </h3>
    <span class="track-badge {statusColors[project.status]} shrink-0">
      {project.status}
    </span>
  </div>
  
  <p class="text-secondary dark:text-[#D4D4D4] flex-grow">
    {project.description}
  </p>
  
  {#if project.url}
    <div class="mt-4 pt-4 border-t border-border dark:border-[#262626]">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        class="text-accent hover:underline inline-flex items-center gap-1"
      >
        View details
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  {/if}
</article>
