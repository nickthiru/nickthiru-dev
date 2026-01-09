<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import WaitlistForm from '$lib/components/WaitlistForm.svelte';
</script>

<SEO 
  title="Join the Waitlist - LinkedIn Ghostwriter"
  description="Turn voice notes into authentic LinkedIn posts. Join the waitlist for early access to LinkedIn Ghostwriter."
/>

<section class="mx-auto max-w-prose px-6 md:px-8 py-12 md:py-16">
  <header class="mb-12">
    <div class="inline-block bg-accent/10 text-accent text-small font-medium px-3 py-1 rounded-full mb-4">
      Now Building
    </div>
    <h1 class="text-h1 text-primary mb-4">LinkedIn Ghostwriter</h1>
    <p class="text-xl text-secondary">
      Turn voice notes into authentic LinkedIn posts that sound like you wrote them.
    </p>
  </header>

  <div class="space-y-8 mb-12">
    <div>
      <h2 class="text-h3 text-primary mb-4">The Problem</h2>
      <p class="text-secondary leading-relaxed">
        You know you should post on LinkedIn consistently. You have ideas. But writing takes time, 
        and generic AI tools make you sound like a corporate marketing bot.
      </p>
    </div>

    <div>
      <h2 class="text-h3 text-primary mb-4">The Solution</h2>
      <div class="space-y-4 text-secondary leading-relaxed">
        <p>
          <strong class="text-primary">Voice → Post in 30 seconds.</strong> Capture ideas on-the-go via Telegram. 
          No app switching, no typing.
        </p>
        <p>
          <strong class="text-primary">Learns your writing style.</strong> Analyzes your past posts to match 
          your tone, vocabulary, and formatting. Posts sound authentically like you.
        </p>
        <p>
          <strong class="text-primary">Quality gates built-in.</strong> Every post is scored for hook strength, 
          readability, and style match. No generic AI slop reaches your audience.
        </p>
        <p>
          <strong class="text-primary">Complete workflow.</strong> Generate variations, review, schedule, 
          and publish—all in one place.
        </p>
      </div>
    </div>

    <div>
      <h2 class="text-h3 text-primary mb-4">Who It's For</h2>
      <ul class="space-y-2 text-secondary">
        <li class="flex items-start gap-2">
          <span class="text-accent mt-1">→</span>
          <span>Solo founders building in public</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-accent mt-1">→</span>
          <span>Consultants establishing thought leadership</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-accent mt-1">→</span>
          <span>Operators sharing insights (without sounding corporate)</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-accent mt-1">→</span>
          <span>Anyone who wants to post 3-5x/week without the time investment</span>
        </li>
      </ul>
    </div>
  </div>

  <div class="bg-accent/5 border border-accent/20 rounded-lg p-8">
    <h2 class="text-h3 text-primary mb-4">Join the Waitlist</h2>
    <p class="text-secondary mb-6">
      Be the first to get early access when LinkedIn Ghostwriter launches. 
      Plus, get updates on the build process.
    </p>
    <WaitlistForm product="linkedin-ghostwriter" />
  </div>

  <div class="mt-12 pt-8 border-t border-border">
    <p class="text-secondary text-center">
      Want to learn more? <a href="https://thiruailabs.com" class="text-accent hover:underline">Visit Thiru AI Labs</a> 
      or <a href="/writing" class="text-accent hover:underline">read about the build process</a>.
    </p>
  </div>
</section>
