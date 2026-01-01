<script lang="ts">
  import { page } from '$app/stores';
  import { siteConfig } from '$lib/config';

  let mobileMenuOpen = $state(false);

  function toggleMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMenu() {
    mobileMenuOpen = false;
  }
</script>

<a href="#main-content" class="skip-link">Skip to content</a>

<header class="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-sm">
  <nav class="mx-auto flex max-w-page items-center justify-between px-6 py-4 md:px-8" aria-label="Main navigation">
    <a href="/" class="hover:opacity-80 transition-opacity">
      <img src="/logo.png" alt={siteConfig.name} class="h-10" />
    </a>

    <!-- Desktop nav -->
    <ul class="hidden md:flex items-center gap-8">
      {#each siteConfig.nav as item}
        <li>
          <a
            href={item.href}
            class="nav-link {$page.url.pathname.startsWith(item.href) ? 'nav-link-active' : ''}"
          >
            {item.label}
          </a>
        </li>
      {/each}
      <li>
        <a href="/subscribe" class="btn-primary">
          Subscribe
        </a>
      </li>
    </ul>

    <!-- Mobile menu button -->
    <button
      type="button"
      class="md:hidden p-2 -mr-2 text-primary hover:text-accent"
      onclick={toggleMenu}
      aria-expanded={mobileMenuOpen}
      aria-controls="mobile-menu"
      aria-label="Toggle menu"
    >
      {#if mobileMenuOpen}
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      {:else}
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      {/if}
    </button>
  </nav>

  <!-- Mobile menu -->
  {#if mobileMenuOpen}
    <div id="mobile-menu" class="md:hidden border-t border-border bg-background">
      <ul class="px-6 py-4 space-y-4">
        {#each siteConfig.nav as item}
          <li>
            <a
              href={item.href}
              class="block nav-link {$page.url.pathname.startsWith(item.href) ? 'nav-link-active' : ''}"
              onclick={closeMenu}
            >
              {item.label}
            </a>
          </li>
        {/each}
        <li class="pt-4 border-t border-border">
          <a href="/subscribe" class="block nav-link" onclick={closeMenu}>Subscribe</a>
        </li>
        <li>
          <a href="/rss.xml" class="block nav-link" onclick={closeMenu}>RSS</a>
        </li>
      </ul>
    </div>
  {/if}
</header>
