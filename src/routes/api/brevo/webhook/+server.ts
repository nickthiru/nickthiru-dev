/**
 * POST /api/brevo/webhook - Brevo DOI confirmation webhook handler
 *
 * Receives list_addition events when contacts confirm their email via DOI.
 * Sends welcome email for newsletter subscribers.
 */
import { json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import type { RequestHandler } from "./$types";
import { brevoClient } from "$lib/server/brevo";
import { handleBrevoError } from "$lib/server/brevo-errors";
import { BREVO_LIST_IDS } from "$lib/config/brevo-lists";
import { BREVO_TEMPLATE_IDS } from "$lib/config/brevo-email-templates";

export const POST: RequestHandler = async ({ request }) => {
  // Verify Bearer token
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (token !== env.BREVO_WEBHOOK_SECRET) {
    console.log("Webhook: Unauthorized - token mismatch");
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: any;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  // Handle list_addition event (DOI confirmation)
  // Brevo sends event as "list_addition" (snake_case)
  if (payload.event !== "list_addition" && payload.event !== "listAddition") {
    return json({ success: true }); // Ignore other events
  }

  // Check if this is newsletter_subs list
  // Brevo sends list_id as an array: [11]
  const payloadListId = Array.isArray(payload.list_id)
    ? payload.list_id[0]
    : payload.list_id;

  if (Number(payloadListId) !== BREVO_LIST_IDS.newsletter_subs) {
    return json({ success: true }); // Not our newsletter list
  }

  const { email } = payload;

  try {
    // Fetch contact to get attributes (webhook payload doesn't include them)
    const contact = await brevoClient.contacts.getContactInfo({
      identifier: email,
    });

    const attrs = contact.attributes as Record<string, any> | undefined;
    const firstName = attrs?.FIRSTNAME || "there";

    // Send welcome email
    const emailResult = await brevoClient.transactionalEmails.sendTransacEmail({
      templateId: BREVO_TEMPLATE_IDS.welcome,
      to: [{ email }],
      params: {
        first_name: firstName,
      },
    });

    console.log(
      "Webhook: Welcome email sent to",
      email,
      ", messageId:",
      emailResult.messageId,
    );

    return json({ success: true }, { status: 200 });
  } catch (error) {
    const { statusCode, message } = handleBrevoError(error);
    console.error("Webhook handler error:", error);
    return json({ error: message }, { status: statusCode });
  }
};
