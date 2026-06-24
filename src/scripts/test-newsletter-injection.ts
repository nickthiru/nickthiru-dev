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
  const TEST_LIST_ID = 11; // 👈 paste your Brevo test subscriber list ID here

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
        post_title: "Why I Stopped Overengineering My AI Stack",
        preview_text:
          "A look at why I decided to simplify my AI infrastructure.",
        personal_note:
          "This week was a bit of a humbling one. I caught myself about to solve a problem I didn't actually have yet. Sometimes the best engineering decision is the one you don't make.",
        post_summary:
          "Three weeks ago I nearly rewrote my entire inference pipeline. Here's the decision that stopped me — and what I learned from almost making an expensive mistake.",
        exclusive_insight:
          "The real signal I use to know when I'm overengineering: if I can't explain the problem I'm solving to a non-technical person in one sentence, I'm probably solving the wrong problem.",
        post_url: "https://nickthiru.dev/posts/why-i-stopped-overengineering",
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
