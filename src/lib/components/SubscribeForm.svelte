<script lang="ts">
  import { siteConfig } from '$lib/config';
  
  let email = $state('');
  let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
  let errorMessage = $state('');

  interface Props {
    tag?: string;
    helper?: 'default' | 'email-only' | 'none';
  }

  let { tag, helper = 'default' }: Props = $props();

  async function handleSubmit(e: Event) {
    e.preventDefault();
    status = 'loading';
    errorMessage = '';

    try {
      const tags = tag ? [tag] : [];
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tags })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: 'Failed to subscribe' }));
        throw new Error(data.error || 'Failed to subscribe');
      }

      status = 'success';
      email = '';
    } catch (error) {
      status = 'error';
      errorMessage = error instanceof Error ? error.message : 'Something went wrong';
    }
  }
</script>

{#if status === 'success'}
  <div class="bg-accent/10 border border-accent rounded-lg p-6 text-center">
    <p class="text-accent font-medium">Thanks for subscribing!</p>
    <p class="text-secondary text-small mt-2">
      Check your inbox for a confirmation email.
    </p>
  </div>
{:else}
  <form onsubmit={handleSubmit} class="flex flex-col sm:flex-row gap-3" novalidate>
    <label for="email" class="sr-only">Email address</label>
    <input
      type="email"
      id="email"
      bind:value={email}
      placeholder="you@example.com"
      required
      disabled={status === 'loading'}
      class="flex-grow min-w-0 px-4 py-2.5 rounded-md border border-border bg-surface text-primary 
             placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
    />
    <button type="submit" class="btn-primary shrink-0" disabled={status === 'loading'}>
      {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
    </button>
  </form>
  {#if status === 'error'}
    <p class="text-small text-red-600 mt-2">{errorMessage}</p>
  {/if}
  {#if helper !== 'none'}
    <p class="text-small text-muted mt-3">
      {#if helper === 'email-only'}
        Or <a href="mailto:{siteConfig.author.email}" class="text-accent hover:underline">email me directly</a>.
      {:else}
        No spam, unsubscribe anytime. Or <a href="mailto:{siteConfig.author.email}" class="text-accent hover:underline">email me directly</a>.
      {/if}
    </p>
  {/if}
{/if}
