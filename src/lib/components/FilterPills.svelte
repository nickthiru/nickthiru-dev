<script lang="ts">
  import { page } from '$app/stores';

  const filters = [
    { label: 'All', href: '/writing' },
    { label: 'Engineering', href: '/engineering' },
    { label: 'Business', href: '/business' }
  ];
</script>

<div class="flex flex-wrap gap-2" role="navigation" aria-label="Content filters">
  {#each filters as filter}
    <a
      href={filter.href}
      class="filter-pill {$page.url.pathname === filter.href ? 'filter-pill-active' : 'filter-pill-inactive'}"
    >
      {filter.label}
    </a>
  {/each}
</div>
