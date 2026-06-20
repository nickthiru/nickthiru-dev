/**
 * POST /api/subscribe - Newsletter subscription via Brevo DOI
 *
 * Flow:
 * 1. If contact doesn't exist → create DOI contact
 * 2. If contact exists but not confirmed → return pending confirmation message
 * 3. If contact is confirmed → return already subscribed message
 */
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { brevoClient } from "$lib/server/brevo";
import { handleBrevoError } from "$lib/server/brevo-errors";
import { BREVO_LIST_IDS } from "$lib/config/brevo-lists";
import { BREVO_TEMPLATE_IDS } from "$lib/config/brevo-email-templates";

export const POST: RequestHandler = async ({ request }) => {
  const { email, first_name } = await request.json();

  if (!email || typeof email !== "string") {
    return json({ error: "Email is required" }, { status: 400 });
  }

  const redirectUrl = `https://www.thiruailabs.com/newsletter/confirmed`;

  try {
    // Try to get existing contact
    let contact: any = null;
    try {
      contact = await brevoClient.contacts.getContactInfo({
        identifier: email,
      });
    } catch {
      // Contact doesn't exist or is unconfirmed (Brevo returns 404 for unconfirmed DOI contacts)
    }

    // Case A: Contact doesn't exist → create DOI contact
    if (!contact) {
      await brevoClient.contacts.createDoiContact({
        email,
        includeListIds: [BREVO_LIST_IDS.newsletter_subs],
        templateId: BREVO_TEMPLATE_IDS.newsletter_verify,
        redirectionUrl: redirectUrl,
        attributes: {
          FIRSTNAME: first_name || "",
        },
      });

      return json(
        {
          success: true,
          message: "Please check your email to confirm your subscription.",
        },
        { status: 201 },
      );
    }

    // Check if contact is confirmed via DOI
    // Brevo returns "1" (string) for confirmed contacts, note the hyphen in attribute name
    const isConfirmed = contact.attributes?.["DOUBLE_OPT-IN"] === "1";

    // Case B: Contact exists but not confirmed yet
    if (!isConfirmed) {
      // Update FIRSTNAME if provided and contact doesn't have one
      const existingFirstName = contact.attributes?.FIRSTNAME || "";
      if (existingFirstName === "" && first_name) {
        await brevoClient.contacts.updateContact({
          identifier: email,
          attributes: {
            FIRSTNAME: first_name,
          },
        });
      }

      return json(
        {
          success: true,
          message:
            "Please check your existing email to complete the subscription.",
          status: "pending_confirmation",
        },
        { status: 200 },
      );
    }

    // Case C: Contact exists and already confirmed
    return json(
      {
        success: true,
        message: "You're already subscribed to the newsletter.",
        status: "already_subscribed",
      },
      { status: 200 },
    );
  } catch (error) {
    const { statusCode, message } = handleBrevoError(error);
    console.error("Newsletter subscribe error:", error);
    return json({ error: message }, { status: statusCode });
  }
};
