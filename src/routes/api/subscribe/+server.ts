import { json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const { email, tags } = await request.json();

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
    const response = await fetch("https://api.buttondown.com/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        tags: tags || [],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Buttondown API error:", response.status, errorData);
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
