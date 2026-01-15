import { json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import type { RequestHandler } from "./$types";

/**
 * Sends email notification when a suppressed subscriber tries to resubscribe.
 * See docs/newsletter-resubscribe-error-handling.md for setup and configuration details.
 */
async function sendSuppressionNotification(
  email: string,
  firstName: string | undefined,
  errorData: any
) {
  const resendApiKey = env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error(
      "RESEND_API_KEY not configured - cannot send suppression notification"
    );
    return;
  }

  const emailBody = `
A suppressed subscriber attempted to resubscribe:

Email: ${email}
Name: ${firstName || "Not provided"}

Buttondown Error Details:
${JSON.stringify(errorData, null, 2)}

You may need to manually resubscribe them via the Buttondown dashboard.
  `.trim();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Newsletter <newsletter@nickthiru.dev>",
      to: "contact@nickthiru.dev",
      subject: "Suppressed Subscriber Resubscribe Attempt",
      text: emailBody,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend API error: ${response.status} ${errorText}`);
  }
}

export const POST: RequestHandler = async ({ request }) => {
  const { email, tags, metadata } = await request.json();

  if (!email || typeof email !== "string") {
    return json({ error: "Email is required" }, { status: 400 });
  }

  const apiKey = env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    console.error("BUTTONDOWN_API_KEY is not set");
    return json(
      { error: "Newsletter service not configured" },
      { status: 500 }
    );
  }

  try {
    const requestBody: {
      email_address: string;
      tags: string[];
      metadata?: Record<string, string>;
    } = {
      email_address: email,
      tags: tags || [],
    };

    if (metadata && Object.keys(metadata).length > 0) {
      requestBody.metadata = metadata;
    }

    const response = await fetch("https://api.buttondown.com/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Buttondown API error:", response.status, errorData);

      // Handle suppressed subscriber (previously unsubscribed or rejected)
      if (errorData.code === "subscriber_suppressed") {
        // Send email notification to site owner
        try {
          await sendSuppressionNotification(
            email,
            metadata?.first_name,
            errorData
          );
        } catch (emailError) {
          console.error("Failed to send suppression notification:", emailError);
        }

        // Return user-friendly message
        return json(
          {
            error:
              "We've received your subscription request. Due to a previous unsubscribe, we need to manually review it. We'll reach out to you shortly via email.",
          },
          { status: 400 }
        );
      }

      const errorMessage =
        errorData.detail || errorData.error || "Failed to subscribe";
      return json({ error: errorMessage }, { status: response.status });
    }

    const data = await response.json();
    return json({ success: true, data });
  } catch (error) {
    console.error("Subscription error:", error);
    return json({ error: "Failed to subscribe" }, { status: 500 });
  }
};
