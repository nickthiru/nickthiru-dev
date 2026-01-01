<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import { siteConfig } from '$lib/config';
</script>

<SEO 
  title="Now"
  description="What I'm focused on right now. Updated regularly."
/>

<section class="mx-auto max-w-page px-6 md:px-8 py-12 md:py-16">
  <div class="max-w-prose">
    <header class="mb-8">
      <h1 class="text-h1 text-primary mb-2">Now</h1>
      <p class="text-secondary">
        What I'm focused on right now. Updated regularly.
      </p>
      <p class="text-small text-muted mt-2">
        Last updated: December 2025
      </p>
    </header>

    <div class="prose prose-lg">
      <h2>Current Projects</h2>
      <ul>
        <li><strong>LinkedIn Ghostwriter Agent</strong> — Building an AI-powered content assistant for busy founders. Currently working on the core agent loop and content generation quality.</li>
        <li><strong>nickthiru.dev</strong> — This site! Refining the design and starting to build up the content library.</li>
        <li><strong>Agent Observability Toolkit</strong> — Designing a lightweight observability layer for LangGraph agents. Early exploration phase.</li>
      </ul>

      <h2>Current Learning</h2>
      <ul>
        <li>Deep-diving into LangGraph internals and advanced patterns</li>
        <li>Studying distribution strategies for solo founders (building in public, content marketing, cold outreach)</li>
        <li>Exploring prompt engineering techniques for reliable agent outputs</li>
      </ul>

      <h2>Current Reading</h2>
      <ul>
        <li><em>Working in Public</em> by Nadia Eghbal</li>
        <li>Various indie hacker and AI engineering blogs</li>
      </ul>

      <h2>Location</h2>
      <p>Working remotely.</p>

      <h2>Follow</h2>
      <p>
        If you want to keep up with what I'm building, the best places to follow along are:
      </p>
      <ul>
        <li><a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer">Twitter/X</a></li>
        <li><a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
      </ul>
    </div>
  </div>
</section>
