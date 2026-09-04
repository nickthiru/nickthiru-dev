import { BrevoClient } from "@getbrevo/brevo";
import * as dotenv from "dotenv";

// Load .env file from project root
dotenv.config();

async function testNewsletterInjection() {
  const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY!, // ← use process.env, not SvelteKit env
  });

  // ✅ Replace these two values before running
  const TEMPLATE_ID = 11; // 👈 paste your template ID here after uploading
  const TEST_LIST_ID = 16; // 👈 paste your Brevo test subscriber list ID here

  try {
    const response = await brevo.emailCampaigns.createEmailCampaign({
      name: "Newsletter Test - Injection Check",
      sender: {
        name: "Nick",
        email: "newsletter@nickthiru.dev", // 👈 your verified Brevo sender email
      },
      subject: "Test: {{ params.post_title }}",
      previewText: "Test: {{ params.preview_text }}",
      templateId: TEMPLATE_ID,
      recipients: {
        listIds: [TEST_LIST_ID],
      },
      params: {
        personal_note:
          "This week was a bit of a humbling one. I caught myself about to solve a problem I didn't actually have yet. Sometimes the best engineering decision is the one you don't make.",
        articles: [
          {
            title: "PolicyForge — Real options, not one draft",
            hook: "Most AI tools hand you one answer and hope it's right. I spent this stretch of PolicyForge's build figuring out how to make the engine tell you when it's actually sure — and how to do that without ever touching your private data. Here's what that took.",
            url: "https://nickthiru.dev/writing/policyforge-generation-engine",
            publishedAt: "Aug 26, 2026",
          },
          {
            title: "PolicyForge — Why you'll always have the final say",
            hook: "Every compliance buyer asks the same question about AI tools: who's actually accountable when the machine gets it wrong? I spent a week designing PolicyForge's answer, and it forced me to rethink what the product was actually for. Here's the approval workflow that resulted, and the moment I realized I'd been building the wrong mental model the whole time.",
            url: "https://nickthiru.dev/writing/policyforge-human-approval",
            publishedAt: "Aug 28, 2026",
          },
        ],
      },
    });

    console.log("✅ Draft campaign created successfully!");
    console.log("Campaign ID:", response.id);
    console.log("👉 Go to Brevo > Marketing > Campaigns to preview the draft.");
  } catch (error) {
    console.error("❌ Campaign creation failed:", error);
  }
}

testNewsletterInjection();
