<script lang="ts">
  import { siteConfig } from '$lib/config';
  
  let email = $state('');
  let submitted = $state(false);

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (email) {
      submitted = true;
    }
  }
</script>

{#if submitted}
  <div class="bg-accent/10 border border-accent rounded-lg p-6 text-center">
    <p class="text-accent font-medium">Thanks for subscribing!</p>
    <p class="text-secondary text-small mt-2">
      For now, this is a placeholder. Email functionality coming soon.
    </p>
  </div>
{:else}
  <form onsubmit={handleSubmit} class="flex flex-col sm:flex-row gap-3">
    <label for="email" class="sr-only">Email address</label>
    <input
      type="email"
      id="email"
      bind:value={email}
      placeholder="you@example.com"
      required
      class="flex-grow px-4 py-2.5 rounded-md border border-border bg-surface text-primary 
             placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
    />
    <button type="submit" class="btn-primary">
      Subscribe
    </button>
  </form>
  <p class="text-small text-muted mt-3">
    No spam, unsubscribe anytime. Or <a href="mailto:{siteConfig.author.email}" class="text-accent hover:underline">email me directly</a>.
  </p>
{/if}
