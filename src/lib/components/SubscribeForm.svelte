<script lang="ts">
  import { siteConfig } from '$lib/config';
  
  let email = $state('');
  let status = $state<'idle' | 'loading' | 'success'>('idle');
  let pendingSubmit = $state(false);

  interface Props {
    tag?: string;
    helper?: 'default' | 'email-only' | 'none';
  }

  let { tag, helper = 'default' }: Props = $props();

  const actionUrl = `https://buttondown.com/api/emails/embed-subscribe/${siteConfig.newsletter.username}`;

  function handleSubmit() {
    status = 'loading';
    pendingSubmit = true;
  }

  function handleIframeLoad() {
    if (!pendingSubmit) return;
    pendingSubmit = false;
    status = 'success';
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
  <form action={actionUrl} method="post" target="buttondown-iframe" onsubmit={handleSubmit} class="flex flex-col sm:flex-row gap-3" novalidate>
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
    <input type="hidden" name="embed" value="1" />
    {#if tag}
      <input type="hidden" name="tag" value={tag} />
    {/if}
    <button type="submit" class="btn-primary shrink-0" disabled={status === 'loading'}>
      {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
    </button>
  </form>
  <iframe
    name="buttondown-iframe"
    title="Buttondown subscription"
    class="hidden"
    onload={handleIframeLoad}
  ></iframe>
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
