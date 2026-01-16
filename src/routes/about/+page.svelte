<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import { siteConfig } from '$lib/config';
</script>

<SEO 
  title="About"
  description="Nick Thiru is an AI systems architect building production-grade agentic AI systems."
/>

<section class="mx-auto max-w-page px-6 md:px-8 py-12 md:py-16">
  <div class="max-w-prose mx-auto">
    <h1 class="text-h1 text-primary dark:text-[#FAFAFA] mb-8">About</h1>

    <div class="prose prose-lg dark:prose-invert">
      <p>
        I'm an AI systems architect building at the intersection of modern web infrastructure and agentic AI. I run 
        <a
        href="https://thiruailabs.com"
        target="_blank"
        rel="noopener noreferrer"
        class="text-accent hover:underline inline-flex items-center gap-1"
      >
        Thiru AI Labs
      </a>, a solo AI systems studio where I design, build, and operate production-grade agentic AI systems and SaaS products—combining LangGraph orchestration with modern web infrastructure (SvelteKit, AWS, full observability).
      </p>

      <p>
        My work sits in the gap between "AI demo" and "production system"—the messy middle where you need auth, billing, observability, and infrastructure that doesn't fall over. I believe the future of software is agentic: small, focused AI systems that handle real workflows end-to-end rather than generic chatbots.
      </p>

      <p>
        I publish two tracks of content: <strong>engineering</strong> deep-dives (architecture patterns, benchmarks, build logs, postmortems) and <strong>business</strong> insights (positioning, pricing, distribution experiments, customer learnings). Both are written for indie founders, operators, and builders who care about shipping, not just prototyping.
      </p>

      <p>
        Before going solo, I worked across full-stack web development and cloud infrastructure. I now spend my time building products and writing about the process.
      </p>

      <p>
        I also offer consulting services for teams building agentic AI systems through <a href="https://thiruailabs.com/consult" target="_blank" rel="noopener noreferrer">Thiru AI Labs</a>.
      </p>

      <p>
        I work remotely and share my journey publicly on this website.
      </p>

      <h2>Get in touch</h2>
      <p>
        The best way to reach me is via email at <a href="mailto:{siteConfig.author.email}">{siteConfig.author.email}</a>.
      </p>
      <p>
        You can also find me on:
      </p>
      <ul>
        <li><a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer">Twitter/X</a></li>
        <li><a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
      </ul>
    </div>
  </div>
</section>
