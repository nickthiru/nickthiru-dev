<script lang="ts">
  import { siteConfig } from '$lib/config';
  
  let email = $state('');
  let firstName = $state('');
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
      const metadata = firstName ? { first_name: firstName } : {};
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tags, metadata })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: 'Failed to subscribe' }));
        throw new Error(data.error || 'Failed to subscribe');
      }

      status = 'success';
      email = '';
      firstName = '';
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
  <form onsubmit={handleSubmit} class="flex flex-col gap-3" novalidate>
    <div class="flex flex-col sm:flex-row gap-3">
      <div class="flex-grow">
        <label for="firstName" class="sr-only">First name (optional)</label>
        <input
          type="text"
          id="firstName"
          bind:value={firstName}
          placeholder="First name (optional)"
          disabled={status === 'loading'}
          class="w-full px-4 py-2.5 rounded-md border border-border bg-surface text-primary 
                 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>
      <div class="flex-grow">
        <label for="email" class="sr-only">Email address</label>
        <input
          type="email"
          id="email"
          bind:value={email}
          placeholder="Email"
          required
          disabled={status === 'loading'}
          class="w-full px-4 py-2.5 rounded-md border border-border bg-surface text-primary 
                 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>
    </div>
    <button type="submit" class="btn-primary w-full sm:w-auto flex items-center justify-center" disabled={status === 'loading'}>
      {#if status === 'loading'}
        <span class="inline-flex items-center">
          Subscribing<span class="loading-dots inline-block w-6 text-left"></span>
        </span>
      {:else}
        Subscribe
      {/if}
    </button>
  </form>
  {#if status === 'error'}
    <p class="text-small text-red-600 mt-2">{errorMessage}</p>
  {/if}
  {#if helper !== 'none' && helper !== 'email-only'}
    <p class="text-small text-muted mt-3">
      No spam, unsubscribe anytime.
    </p>
  {/if}
{/if}
