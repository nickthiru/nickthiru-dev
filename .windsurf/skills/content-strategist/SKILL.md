---
name: content-strategist
description: Develop comprehensive content strategies, editorial calendars, and audience growth plans for technical founders and MSMEs building in public. Use when planning content, analyzing audience engagement, or optimizing content distribution.
license: MIT
metadata:
  author: nickthiru-dev
  version: "1.0"
---

# Content Strategist Skill

## Overview

This skill provides comprehensive guidance for developing content strategies that resonate with technical founders, MSMEs (Micro, Small & Medium Enterprises), operators, and AI engineers while building authentic personal brands and growing engaged audiences.

## When to Use

- Planning editorial calendars and content themes
- Analyzing audience engagement and growth metrics
- Developing content distribution strategies
- Optimizing content for platform-specific audiences
- Building community engagement strategies
- Creating monetization and partnership plans

## Step-by-Step Implementation

### 1. Audience Analysis Framework

```typescript
// Audience analysis interface
interface AudienceSegment {
  segment: string;
  characteristics: string[];
  painPoints: string[];
  contentPreferences: ContentPreference[];
  engagementPatterns: EngagementPattern[];
  growthPotential: number; // 1-10 scale
}

interface ContentPreference {
  format: "blog" | "video" | "newsletter" | "twitter" | "linkedin";
  topics: string[];
  length: "short" | "medium" | "long";
  tone: "technical" | "conversational" | "inspirational";
  frequency: string;
}

interface EngagementPattern {
  platform: string;
  bestPostingTimes: string[];
  preferredContentTypes: string[];
  interactionStyle: "lurker" | "commenter" | "sharer" | "creator";
}

export class AudienceAnalyzer {
  static analyzeAudience(metrics: {
    newsletterSubscribers: number;
    twitterFollowers: number;
    blogViews: number;
    linkedinConnections: number;
    engagementData: any;
  }): AudienceAnalysis {
    const segments = this.identifySegments(metrics);
    const opportunities = this.findGrowthOpportunities(segments);
    const contentGaps = this.identifyContentGaps(segments);

    return {
      segments,
      opportunities,
      contentGaps,
      recommendations: this.generateRecommendations(segments, opportunities),
    };
  }

  private static identifySegments(metrics: any): AudienceSegment[] {
    return [
      {
        segment: "Technical Founders",
        characteristics: [
          "Building AI-powered products",
          "Small teams or solo founders",
          "Technical background but need business insights",
          "Time-constrained, value efficiency",
        ],
        painPoints: [
          "Limited time for content creation",
          "Need to balance development and marketing",
          "Difficulty reaching broader audience beyond tech",
          "Struggle with business-focused messaging",
        ],
        contentNeeds: [
          "Technical implementation guides",
          "Business growth strategies",
          "Time-efficient content systems",
          "Audience expansion tactics",
        ],
        engagementPatterns: [
          {
            platform: "Twitter",
            bestPostingTimes: ["9-11 AM EST", "2-4 PM EST"],
            preferredContentTypes: ["threads", "quick tips", "polls"],
            interactionStyle: "commenter",
          },
        ],
        growthPotential: 9,
      },
      {
        segment: "MSME Business Owners",
        characteristics: [
          "1-249 employees",
          "Non-technical or semi-technical background",
          "Focus on practical business solutions",
          "Need ROI and efficiency improvements",
        ],
        painPoints: [
          "AI seems complex and intimidating",
          "Unclear how AI applies to their business",
          "Limited budget for experimentation",
          "Need concrete case studies and results",
        ],
        contentNeeds: [
          "Practical AI implementation guides",
          "Business case studies and ROI examples",
          "Step-by-step adoption strategies",
          "Cost-benefit analysis frameworks",
        ],
        engagementPatterns: [
          {
            platform: "LinkedIn",
            bestPostingTimes: ["8-10 AM EST", "12-1 PM EST"],
            preferredContentTypes: [
              "case studies",
              "business insights",
              "ROI examples",
            ],
            interactionStyle: "commenter",
          },
        ],
        growthPotential: 8,
      },
      {
        segment: "AI Engineers",
        characteristics: [
          "Deep technical expertise",
          "Interested in production AI",
          "Learning new technologies",
          "Career advancement focused",
        ],
        painPoints: [
          "Production deployment challenges",
          "Keeping up with rapid AI advances",
          "Career growth and skills",
          "Work-life balance in tech",
        ],
        contentPreferences: [
          {
            format: "blog",
            topics: ["LangGraph", "production AI", "career growth"],
            length: "long",
            tone: "technical",
            frequency: "bi-weekly",
          },
          {
            format: "twitter",
            topics: ["quick tips", "career advice"],
            length: "short",
            tone: "conversational",
            frequency: "daily",
          },
        ],
        engagementPatterns: [
          {
            platform: "LinkedIn",
            bestPostingTimes: ["8-10 AM EST", "5-7 PM EST"],
            preferredContentTypes: ["technical deep dives", "career insights"],
            interactionStyle: "sharer",
          },
        ],
        growthPotential: 8,
      },
    ];
  }

  private static findGrowthOpportunities(
    segments: AudienceSegment[],
  ): string[] {
    return [
      'Create "Founder Technical Challenges" series',
      "Develop AI career transition content",
      "Build community around production AI",
      "Create templates and tools for founders",
      "Partner with complementary creators",
    ];
  }

  private static identifyContentGaps(segments: AudienceSegment[]): string[] {
    return [
      "Limited content on AI team building",
      "Missing career transition guidance",
      "Few practical templates available",
      "Underdeveloped community engagement",
      "Limited video content presence",
    ];
  }

  private static generateRecommendations(
    segments: AudienceSegment[],
    opportunities: string[],
  ): ContentStrategyRecommendation[] {
    return [
      {
        priority: "high",
        action: 'Launch "Production AI Weekly" newsletter',
        rationale: "Addresses technical founders' biggest pain point",
        expectedImpact: "High engagement and subscriber growth",
        effort: "Medium",
      },
      {
        priority: "medium",
        action: "Create AI career transition guide",
        rationale: "Serves growing engineer audience segment",
        expectedImpact: "Thought leadership and community building",
        effort: "High",
      },
    ];
  }
}
```

### 2. Content Calendar Development

```typescript
// Content calendar management
export class ContentCalendarGenerator {
  static generateQuarterlyCalendar(
    audience: AudienceSegment[],
    themes: string[],
    capacity: number, // posts per week
  ): QuarterlyCalendar {
    const weeks = this.generateWeeklyStructure(themes, capacity);
    const contentPillars = this.defineContentPillars(audience);
    const distributionPlan = this.createDistributionPlan(audience);

    return {
      quarter: this.getCurrentQuarter(),
      weeks,
      contentPillars,
      distributionPlan,
      kpis: this.defineKPIs(audience),
    };
  }

  private static generateWeeklyStructure(
    themes: string[],
    capacity: number,
  ): WeekPlan[] {
    const weeks: WeekPlan[] = [];
    const currentWeek = this.getCurrentWeek();

    for (let i = 0; i < 13; i++) {
      // 13 weeks per quarter
      const weekNumber = currentWeek + i;
      const theme = themes[i % themes.length];

      weeks.push({
        weekNumber,
        theme,
        posts: this.generateWeeklyPosts(capacity, theme),
        goals: this.setWeeklyGoals(theme),
        promotions: this.planPromotions(theme),
      });
    }

    return weeks;
  }

  private static generateWeeklyPosts(
    capacity: number,
    theme: string,
  ): PostPlan[] {
    const posts: PostPlan[] = [];

    if (capacity >= 3) {
      posts.push({
        day: "Monday",
        type: "technical-tutorial",
        title: this.generateTutorialTitle(theme),
        format: "blog",
        distribution: ["newsletter", "twitter", "linkedin"],
        effort: "high",
      });
    }

    if (capacity >= 2) {
      posts.push({
        day: "Wednesday",
        type: "building-in-public",
        title: this.generateBIPTitle(theme),
        format: "blog",
        distribution: ["newsletter", "twitter"],
        effort: "medium",
      });
    }

    posts.push({
      day: "Friday",
      type: "quick-tips",
      title: this.generateTipsTitle(theme),
      format: "twitter-thread",
      distribution: ["twitter"],
      effort: "low",
    });

    return posts;
  }

  private static defineContentPillars(
    audience: AudienceSegment[],
  ): ContentPillar[] {
    return [
      {
        name: "Technical Deep Dives",
        description: "In-depth technical tutorials and implementation guides",
        targetSegments: ["Technical Founders", "AI Engineers"],
        formats: ["blog", "video"],
        frequency: "weekly",
        kpis: ["reading time", "shares", "backlinks"],
      },
      {
        name: "Founder Stories",
        description: "Real experiences building and scaling technical products",
        targetSegments: ["Technical Founders"],
        formats: ["blog", "newsletter", "podcast"],
        frequency: "bi-weekly",
        kpis: ["newsletter signups", "comments", "engagement"],
      },
      {
        name: "Career Growth",
        description: "Career advice and skill development for AI engineers",
        targetSegments: ["AI Engineers"],
        formats: ["blog", "linkedin", "twitter"],
        frequency: "monthly",
        kpis: ["linkedin engagement", "job inquiries", "mentorship requests"],
      },
      {
        name: "Business AI Applications",
        description: "Practical AI implementations and case studies for MSMEs",
        targetSegments: ["MSME Business Owners"],
        formats: ["blog", "linkedin", "case study", "webinar"],
        frequency: "bi-weekly",
        kpis: [
          "waitlist signups",
          "business inquiries",
          "case study downloads",
        ],
      },
      {
        name: "Community Building",
        description: "Engaging with and growing the technical community",
        targetSegments: ["All"],
        formats: ["twitter", "newsletter", "events"],
        frequency: "weekly",
        kpis: ["community growth", "event attendance", "collaborations"],
      },
    ];
  }

  private static createDistributionPlan(
    audience: AudienceSegment[],
  ): DistributionPlan {
    return {
      platforms: {
        blog: {
          primary: true,
          frequency: "2-3x per week",
          contentTypes: ["tutorials", "stories", "analysis"],
          seo: true,
          newsletter: true,
        },
        newsletter: {
          primary: true,
          frequency: "weekly",
          contentTypes: [
            "exclusive content",
            "curated links",
            "personal updates",
          ],
          monetization: true,
          community: true,
        },
        twitter: {
          primary: true,
          frequency: "daily",
          contentTypes: ["threads", "tips", "engagement"],
          community: true,
          traffic: true,
        },
        linkedin: {
          primary: false,
          frequency: "2-3x per week",
          contentTypes: ["career insights", "professional achievements"],
          networking: true,
          b2b: true,
        },
        youtube: {
          primary: false,
          frequency: "bi-weekly",
          contentTypes: ["tutorials", "interviews", "behind-the-scenes"],
          monetization: true,
          discoverability: true,
        },
      },
      crossPromotion: this.defineCrossPromotionStrategy(),
      repurposing: this.createRepurposingPlan(),
    };
  }

  private static defineCrossPromotionStrategy(): CrossPromotionPlan {
    return {
      "blog-to-newsletter": "Include newsletter signup in every blog post",
      "twitter-to-blog": "Thread summaries link to full articles",
      "linkedin-to-twitter":
        "Post professional insights, then expand as Twitter thread",
      "newsletter-to-community":
        "Exclusive content drives community engagement",
      "youtube-to-blog": "Video tutorials accompanied by written guides",
    };
  }

  private static createRepurposingPlan(): RepurposingPlan {
    return {
      "blog-posts": [
        "Create Twitter thread summary",
        "Extract key points for LinkedIn",
        "Turn into newsletter exclusive content",
        "Create script for YouTube video",
      ],
      "newsletter-content": [
        "Adapt for blog post (if not exclusive)",
        "Share key insights on Twitter",
        "Use quotes for LinkedIn posts",
      ],
      "twitter-threads": [
        "Expand into full blog post",
        "Create carousel for LinkedIn",
        "Include in newsletter roundup",
      ],
    };
  }

  private static generateTutorialTitle(theme: string): string {
    const templates = [
      `Building ${theme}: The Complete Guide`,
      `How I Solved ${theme} Without Going Insane`,
      `The ${theme} Architecture That Actually Works`,
      `${theme}: Lessons from 6 Months in Production`,
      `Scaling ${theme}: What I Wish I Knew Earlier`,
    ];

    return templates[Math.floor(Math.random() * templates.length)];
  }

  private static generateBIPTitle(theme: string): string {
    return `Building ${theme} in Public: Week X Update`;
  }

  private static generateTipsTitle(theme: string): string {
    return `5 Quick ${theme} Tips I Learned This Week`;
  }

  private static setWeeklyGoals(theme: string): WeeklyGoals {
    return {
      content: ["Complete tutorial", "Write update post", "Share 3 tips"],
      growth: [
        "Gain 50 newsletter subscribers",
        "Increase Twitter engagement by 10%",
      ],
      community: ["Respond to all comments", "Engage with 5 other creators"],
      learning: ["Test new content format", "Analyze performance metrics"],
    };
  }

  private static planPromotions(theme: string): PromotionPlan[] {
    return [
      {
        type: "newsletter",
        timing: "Thursday",
        message: `This week's ${theme} deep dive is now live for subscribers`,
        channels: ["twitter", "linkedin"],
      },
      {
        type: "community",
        timing: "Friday",
        message: `What ${theme} challenges are you facing? Let's discuss`,
        channels: ["twitter", "newsletter"],
      },
    ];
  }

  private static defineKPIs(audience: AudienceSegment[]): KPI[] {
    return [
      {
        metric: "newsletter subscribers",
        target: "1000 per quarter",
        current: 0,
        importance: "high",
      },
      {
        metric: "blog engagement rate",
        target: "5% average",
        current: 0,
        importance: "high",
      },
      {
        metric: "twitter follower growth",
        target: "500 per quarter",
        current: 0,
        importance: "medium",
      },
      {
        metric: "content repurposing efficiency",
        target: "80% of content repurposed",
        current: 0,
        importance: "medium",
      },
    ];
  }

  private static getCurrentQuarter(): number {
    const month = new Date().getMonth();
    return Math.floor(month / 3) + 1;
  }

  private static getCurrentWeek(): number {
    const start = new Date(new Date().getFullYear(), 0, 1);
    const today = new Date();
    return Math.ceil(
      ((today.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7,
    );
  }
}
```

### 3. Growth Strategy Development

```typescript
// Growth strategy framework
export class GrowthStrategist {

  static developGrowthPlan(
    currentMetrics: CurrentMetrics,
    targetMetrics: TargetMetrics,
    timeline: number // months
  ): GrowthPlan {
    const growthChannels = this.identifyGrowthChannels(currentMetrics);
    const contentStrategy = this.alignContentToGrowth(growthChannels);
    const partnerships = this.identifyPartnershipOpportunities();
    const monetization = this.planMonetization(targetMetrics);

    return {
      timeline,
      growthChannels,
      contentStrategy,
      partnerships,
      monetization,
      milestones: this.setMilestones(targetMetrics, timeline),
      budget: this.estimateBudget(growthChannels, partnerships)
    };
  }

  private static identifyGrowthChannels(metrics: CurrentMetrics): GrowthChannel[] {
    return [
      {
        name: 'SEO Optimization',
        priority: 'high',
        potential: 'high',
        effort: 'medium',
        timeline: '3-6 months',
        tactics: [
          'Target long-tail keywords in AI/tech space',
          'Build topic clusters around core themes',
          'Optimize for featured snippets',
          'Build backlinks through guest posting'
        ],
        expectedGrowth: '30-50% traffic increase'
      },
      {
        name: 'Community Building',
        priority: 'high',
        potential: 'high',
        effort: 'high',
        timeline: '6-12 months',
        tactics: [
          'Launch Discord/Slack community',
          'Host monthly technical workshops',
          'Create contributor program',
          'Develop community resources'
        ],
        expectedGrowth: '200-300% engagement increase'
      },
      {
        name: 'Strategic Partnerships',
        priority: 'medium',
        potential: 'medium',
        effort: 'medium',
        timeline: '3-9 months',
        tactics: [
          'Collaborate with complementary creators',
          'Guest post on established tech blogs',
          'Joint webinars with AI companies',
          'Cross-promotion with newsletters'
        ],
        expectedGrowth: '15-25% audience increase'
      },
      {
        name: 'Video Content',
        priority: 'medium',
        potential: 'high',
        effort: 'high',
        timeline: '6-12 months',
        tactics: [
          'YouTube tutorial series',
          'LinkedIn video content',
          'Twitter video tips',
          'Course development'
        ],
        expectedGrowth: '40-60% reach increase'
      }
    ];
  }

  private static alignContentToGrowth(channels: GrowthChannel[]): ContentGrowthStrategy {
    return {
      seo: {
        contentTypes: ['in-depth tutorials', 'comparison guides', 'case studies'],
        frequency: '2x per week',
        optimization: ['keyword research', 'on-page SEO', 'technical SEO'],
        metrics: ['organic traffic', 'keyword rankings', 'backlinks']
      },
      community: {
        contentTypes: ['workshops', 'Q&A sessions', 'community spotlights'],
        frequency: 'weekly',
        engagement: ['Discord discussions', 'office hours', 'feedback sessions'],
        metrics: ['community growth', 'engagement rate', 'member contributions']
      },
      partnerships: {
        contentTypes: ['guest posts', 'interviews', 'collaborative projects'],
        frequency: 'monthly',
        outreach: ['creator collaborations', 'company partnerships', 'media features'],
        metrics: ['partnership ROI', 'audience growth', 'brand awareness']
      },
      video: {
        contentTypes: ['tutorials', 'behind-the-scenes', 'interviews'],
        frequency: 'bi-weekly',
        platforms: ['YouTube', 'LinkedIn', 'Twitter'],
        metrics: ['views', 'subscribers', 'engagement rate']
      }
    };
  }

  private static identifyPartnershipOpportunities(): PartnershipOpportunity[] {
    return [
      {
        type: 'Creator Collaboration',
        targets: [
          'AI/ML educators with 10k+ followers',
          'Technical founders with active audiences',
          'Career coaches in tech space',
          'Open source maintainers in AI'
        ],
        valueProp: 'Cross-promotion to aligned audiences',
        approach: 'Personalized outreach with collaboration ideas',
        timeline: 'ongoing'
      },
      {
        type: 'Company Partnership',
        targets: [
          'AI tool companies (LangChain, OpenAI, etc.)',
          'Developer platforms (Vercel, AWS, etc.)',
          'Educational platforms',
          'VC firms with technical focus'
        ],
        valueProp: 'Technical content and authentic audience',
        approach: 'Demonstrate value through existing content',
        timeline: '6-12 months'
      },
      {
        type: 'Media Features',
        targets: [
          'Tech publications (TechCrunch, Hacker News)',
          'AI newsletters (The Rundown, Ben\'s Bites)',
          'Podcasts in AI/tech space',
          'Industry blogs and publications'
        ],
        valueProp: 'Expert commentary and unique insights',
        approach: 'PR outreach and thought leadership content',
        timeline: 'ongoing'
      }
    ];
  }

  private static planMonetization(targets: TargetMetrics): MonetizationPlan {
    return {
      newsletter: {
        model: 'freemium',
        freeTier: 'weekly content',
        paidTier: 'exclusive tutorials, templates, community',
        pricing: '$10-15/month',
        targetSubscribers: targets.newsletterSubscribers,
        projectedRevenue: this.calculateRevenue(targets.newsletterSubscribers, 0.05, 12)
      },
      courses: {
        model: 'premium',
        topics: ['Production AI', 'Technical Founder Skills', 'Content Creation for Engineers'],
        pricing: '$199-499',
        targetStudents: 100,
        projectedRevenue: 30000
      },
      consulting: {
        model: 'hourly/project',
        services: ['AI architecture consulting', 'Content strategy', 'Technical advising'],
        pricing: '$150-300/hour',
        targetClients: 5-10 per year,
        projectedRevenue: 50000
      },
      products: {
        model: 'digital products',
        offerings: ['Templates', 'Tools', 'E-books'],
        pricing: '$29-99',
        targetCustomers: 500,
        projectedRevenue: 15000
      }
    };
  }

  private static calculateRevenue(subscribers: number, conversionRate: number, avgPrice: number): number {
    return Math.floor(subscribers * conversionRate * avgPrice * 12);
  }

  private static setMilestones(targets: TargetMetrics, timeline: number): Milestone[] {
    const monthlyGrowth = {
      newsletter: targets.newsletterSubscribers / timeline,
      twitter: targets.twitterFollowers / timeline,
      engagement: targets.engagementRate / timeline
    };

    return Array.from({ length: timeline }, (_, i) => ({
      month: i + 1,
      newsletterTarget: Math.floor(monthlyGrowth.newsletter * (i + 1)),
      twitterTarget: Math.floor(monthlyGrowth.twitter * (i + 1)),
      engagementTarget: parseFloat((monthlyGrowth.engagement * (i + 1)).toFixed(2)),
      keyInitiatives: this.getMonthlyInitiatives(i + 1)
    }));
  }

  private static getMonthlyInitiatives(month: number): string[] {
    const initiatives = {
      1: ['Launch content calendar', 'Set up analytics', 'Begin SEO optimization'],
      2: ['Start community building', 'Launch first collaboration', 'Create content templates'],
      3: ['Launch video content', 'Develop first mini-course', 'Optimize distribution'],
      4: ['Scale community engagement', 'Launch premium newsletter', 'Expand partnerships'],
      5: ['Launch flagship course', 'Scale video production', 'Optimize monetization'],
      6: ['Evaluate and adjust strategy', 'Plan next quarter', 'Celebrate wins']
    };

    return initiatives[month] || ['Continue optimization', 'Analyze performance', 'Plan next initiatives'];
  }

  private static estimateBudget(channels: GrowthChannel[], partnerships: PartnershipOpportunity[]): Budget {
    return {
      tools: {
        email: '$29/month (ConvertKit)',
        analytics: '$49/month (Fathom)',
        seo: '$99/month (Ahrefs)',
        design: '$20/month (Canva Pro)',
        video: '$39/month (Descript)'
      },
      advertising: {
        twitter: '$200/month',
        linkedin: '$300/month',
        google: '$500/month'
      },
      content: {
        editing: '$500/month',
        design: '$300/month',
        equipment: '$1000 (one-time)'
      },
      total: '$2036/month + $1000 setup'
    };
  }
}
```

## Usage Examples

### 1. Analyzing Your Audience

```typescript
const analysis = AudienceAnalyzer.analyzeAudience({
  newsletterSubscribers: 250,
  twitterFollowers: 1200,
  blogViews: 5000,
  linkedinConnections: 800,
  engagementData: {
    /* existing data */
  },
});

console.log("Primary segments:", analysis.segments);
console.log("Growth opportunities:", analysis.opportunities);
```

### 2. Creating Content Calendar

```typescript
const calendar = ContentCalendarGenerator.generateQuarterlyCalendar(
  analysis.segments,
  ["Production AI", "Founder Skills", "Community Building"],
  3, // posts per week
);

console.log("This week's content:", calendar.weeks[0].posts);
```

### 3. Planning Growth Strategy

```typescript
const growthPlan = GrowthStrategist.developGrowthPlan(
  { newsletterSubscribers: 250, twitterFollowers: 1200 },
  { newsletterSubscribers: 1000, twitterFollowers: 5000, engagementRate: 5 },
  6, // 6 month timeline
);

console.log("Growth channels:", growthPlan.growthChannels);
console.log("Revenue projections:", growthPlan.monetization);
```

## Best Practices

### 1. Audience Understanding

- **Survey your audience** regularly to understand evolving needs
- **Analyze engagement data** to identify what resonates
- **Create audience personas** to guide content decisions
- **Listen to feedback** and adapt accordingly

### 2. Content Strategy

- **Balance evergreen and timely content** (70/30 rule)
- **Create content pillars** that align with audience interests
- **Repurpose strategically** to maximize reach without burnout
- **Maintain consistency** in quality and publishing schedule

### 3. Growth Tactics

- **Focus on 1-2 primary channels** before expanding
- **Build community before monetization** for authentic growth
- **Collaborate with creators** in adjacent spaces
- **Provide genuine value** in every interaction

### 4. Measurement and Optimization

- **Track meaningful metrics** beyond vanity numbers
- **Test and iterate** on content formats and topics
- **Use data to inform** but not dictate creative decisions
- **Celebrate small wins** while focusing on long-term goals

## Content Templates

### 1. Newsletter Template

```markdown
# [Catchy Subject Line]

Hey [First Name],

This week's been [personal update]...

## 🔥 What I Built

[Technical project or achievement]

## 💡 Key Insight

[Main learning or discovery]
```

### 6. Building in Public Strategy

Implement systematic content creation from development work:

```typescript
// Building in public content system
export class BuildingInPublicStrategy {
  static createDailySystem(): DailyContentSystem {
    return {
      morningRoutine: {
        replyToComments: "Reply to comments on yesterday's posts",
        saveInspiration: "Save 1-3 good posts from your niche",
        setDailyGoal: "Add 1 bullet to build log: what you're shipping today",
      },
      developmentCapture: {
        artifactCapture: "Screenshot, Loom clip, or terminal output",
        buildLogBullets: [
          "Build: what changed",
          "Why: user value",
          "Lesson: what surprised you",
        ],
      },
      endOfDayRoutine: {
        selectLogItem: "Choose ONE build-log item",
        draftPost: "Draft ONE post (LinkedIn default)",
        publishOrSchedule: "Post it or schedule for tomorrow",
      },
    };
  }

  static privacyGuidelines(): PrivacyRules {
    return {
      alwaysSafe: [
        "Revenue metrics (rounded: '$5K MRR' not '$5,234.12')",
        "User growth percentages and trends",
        "Technical process without proprietary details",
        "Learning experiences and mistakes",
        "Behind-the-scenes development journey",
      ],
      neverShare: [
        "Customer names or identifying information",
        "Specific revenue figures from enterprise deals",
        "Proprietary algorithms or technical IP",
        "Private user feedback or communications",
        "Legal, financial, or security-sensitive details",
      ],
      decisionFramework: [
        "Could this help competitors? → Keep private",
        "Could this create security risk? → Keep private",
        "Is this about the pattern or learning? → Share the pattern",
        "Share the why, not the exploitable details",
      ],
    };
  }
}

interface DailyContentSystem {
  morningRoutine: Record<string, string>;
  developmentCapture: Record<string, string | string[]>;
  endOfDayRoutine: Record<string, string>;
}

interface PrivacyRules {
  alwaysSafe: string[];
  neverShare: string[];
  decisionFramework: string[];
}
```

### 7. Channel-Specific Strategy

Adapt content for different platforms while maintaining voice:

```typescript
// Multi-platform content strategy
export class ChannelStrategy {
  static adaptForLinkedIn(content: BlogContent): LinkedInStrategy {
    return {
      optimalLength: "150-300 words for professional depth",
      postingTimes: ["8-10 AM", "12-1 PM", "5-7 PM"],
      contentMix: {
        professionalInsights: "50%",
        personalJourney: "30%",
        resultsMetrics: "15%",
        promotion: "5%",
      },
      engagementStrategy: {
        postFrequency: "3-5x per week",
        respondToComments: "Within 24 hours",
        engageWithOthers: "10-15 posts daily in niche",
      },
    };
  }

  static adaptForTwitter(content: BlogContent): TwitterStrategy {
    return {
      optimalLength: "280 chars or 7-10 tweet threads",
      postingTimes: ["9-11 AM", "2-4 PM", "8-10 PM"],
      contentMix: {
        educational: "60%",
        personal: "30%",
        promotional: "10%",
      },
      growthTactics: {
        engageAuthentically: "Reply to 10-20 tweets daily",
        quoteWithTake: "Add perspective to popular tweets",
        useThreads: "Get algorithmic boost with 7-12 tweets",
      },
    };
  }
}
```

## 🛠️ Useful Resource

[Tool, article, or template]

## 🤔 Community Question

[Engaging question for readers]

[Call to action]

Cheers,
[Your Name]

````

### 2. Twitter Thread Template

```markdown
1/ [Hook that relates to a common problem]

2/ [Context and personal experience]

3/ [Technical insight or solution]

4/ [Code example or practical tip]

5/ [Results or outcome]

6/ [Key takeaway or lesson learned]

7/ [Question for engagement]

[Thread summary with link to full content]
````

This comprehensive content strategy skill provides everything needed to build an authentic personal brand, grow an engaged audience, and create sustainable content systems for technical founders building in public.
