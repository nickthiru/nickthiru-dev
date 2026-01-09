<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import { siteConfig } from '$lib/config';
</script>

<SEO 
  title="Consulting"
  description="Need help shipping AI agentic systems? I help teams design, build, and deploy production-grade LangGraph agents."
/>

<section class="mx-auto max-w-prose px-6 md:px-8 py-12 md:py-16">
  <header class="mb-12">
    <h1 class="text-h1 text-primary mb-4">Consulting</h1>
    <p class="text-xl text-secondary">
      Need help shipping AI agentic systems? I help teams design, build, and deploy production-grade LangGraph agents.
    </p>
  </header>

  <div class="space-y-8">
    <div>
      <h2 class="text-h3 text-primary mb-4">What I Do</h2>
      <div class="space-y-4 text-secondary leading-relaxed">
        <p>
          I work with startups and product teams to turn AI agent prototypes into production systems. 
          My focus is on the messy middle—the gap between "it works in a notebook" and "it's running reliably in production."
        </p>
        <p>
          I specialize in <strong class="text-primary">LangGraph-based agentic systems</strong> that need to handle 
          real workflows, not just demos. Think multi-step agents with quality gates, state management, error handling, 
          and observability.
        </p>
      </div>
    </div>

    <div>
      <h2 class="text-h3 text-primary mb-4">Services</h2>
      <div class="space-y-6">
        <div class="bg-surface border border-border rounded-lg p-6">
          <h3 class="text-h4 text-primary mb-3">Architecture Review & Design</h3>
          <p class="text-secondary mb-4">
            Review your existing agent architecture or design a new one from scratch. I'll help you choose 
            the right patterns, avoid common pitfalls, and set up for scalability.
          </p>
          <ul class="space-y-2 text-secondary">
            <li class="flex items-start gap-2">
              <span class="text-accent mt-1">→</span>
              <span>Agent workflow design (LangGraph state machines)</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent mt-1">→</span>
              <span>Prompt engineering strategy</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent mt-1">→</span>
              <span>Quality gate implementation</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent mt-1">→</span>
              <span>Infrastructure planning (AWS CDK, serverless)</span>
            </li>
          </ul>
        </div>

        <div class="bg-surface border border-border rounded-lg p-6">
          <h3 class="text-h4 text-primary mb-3">Implementation Support</h3>
          <p class="text-secondary mb-4">
            Hands-on help building your agent system. I can work alongside your team or take ownership 
            of specific components.
          </p>
          <ul class="space-y-2 text-secondary">
            <li class="flex items-start gap-2">
              <span class="text-accent mt-1">→</span>
              <span>LangGraph agent development</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent mt-1">→</span>
              <span>Integration with existing systems (APIs, databases)</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent mt-1">→</span>
              <span>Testing and quality validation</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent mt-1">→</span>
              <span>Deployment and CI/CD setup</span>
            </li>
          </ul>
        </div>

        <div class="bg-surface border border-border rounded-lg p-6">
          <h3 class="text-h4 text-primary mb-3">Production Readiness</h3>
          <p class="text-secondary mb-4">
            Get your agent system ready for production with proper observability, error handling, and monitoring.
          </p>
          <ul class="space-y-2 text-secondary">
            <li class="flex items-start gap-2">
              <span class="text-accent mt-1">→</span>
              <span>Observability and logging setup</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent mt-1">→</span>
              <span>Error handling and retry strategies</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent mt-1">→</span>
              <span>Performance optimization</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-accent mt-1">→</span>
              <span>Cost monitoring and optimization</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-h3 text-primary mb-4">Who I Work With</h2>
      <ul class="space-y-2 text-secondary">
        <li class="flex items-start gap-2">
          <span class="text-accent mt-1">→</span>
          <span><strong class="text-primary">Startups</strong> building AI-first products who need to move fast without breaking things</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-accent mt-1">→</span>
          <span><strong class="text-primary">Product teams</strong> adding agentic capabilities to existing platforms</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-accent mt-1">→</span>
          <span><strong class="text-primary">Technical founders</strong> who need a second pair of eyes on their agent architecture</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-accent mt-1">→</span>
          <span><strong class="text-primary">Agencies</strong> delivering AI solutions to clients and need specialized expertise</span>
        </li>
      </ul>
    </div>

    <div>
      <h2 class="text-h3 text-primary mb-4">How It Works</h2>
      <div class="space-y-4 text-secondary leading-relaxed">
        <p>
          <strong class="text-primary">1. Discovery call:</strong> We'll discuss your project, challenges, and goals. 
          I'll assess if I'm a good fit and provide initial recommendations.
        </p>
        <p>
          <strong class="text-primary">2. Scope & proposal:</strong> I'll send a clear proposal outlining deliverables, 
          timeline, and pricing. No surprises.
        </p>
        <p>
          <strong class="text-primary">3. Engagement:</strong> We work together via async communication (Slack, email) 
          and scheduled calls. I provide regular updates and documentation.
        </p>
        <p>
          Most engagements are <strong class="text-primary">project-based</strong> (2-8 weeks) or 
          <strong class="text-primary">retainer-based</strong> (ongoing support). I'm also available for 
          <strong class="text-primary">one-off architecture reviews</strong> (1-2 days).
        </p>
      </div>
    </div>

    <div class="bg-accent/5 border border-accent/20 rounded-lg p-8 mt-12">
      <h2 class="text-h3 text-primary mb-4">Get in Touch</h2>
      <p class="text-secondary mb-6">
        Interested in working together? Send me an email with:
      </p>
      <ul class="space-y-2 text-secondary mb-6">
        <li class="flex items-start gap-2">
          <span class="text-accent mt-1">→</span>
          <span>What you're building</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-accent mt-1">→</span>
          <span>Where you're stuck or what help you need</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-accent mt-1">→</span>
          <span>Your timeline and budget range</span>
        </li>
      </ul>
      <a href="mailto:{siteConfig.author.email}" class="btn-primary">
        Email me: {siteConfig.author.email}
      </a>
    </div>
  </div>
</section>
