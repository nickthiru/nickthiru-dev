# Newsletter Subscription System

## Overview

The newsletter subscription uses **Brevo** (formerly Sendinblue) with a **Double Opt-In (DOI)** flow. When a user subscribes, they receive a confirmation email. Only after clicking the confirmation link do they receive the welcome email.

## Architecture

```
User → POST /api/subscribe → Brevo createDoiContact() → DOI confirmation email
                                                        ↓ (user clicks link)
                                              Brevo webhook → POST /api/brevo/webhook
                                                        ↓
                                              Welcome email (template #2)
```

## Components

### 1. Subscribe Endpoint (`/api/subscribe`)

**Method:** `POST`

**Request body:**

```json
{
  "email": "user@example.com",
  "first_name": "John"
}
```

**Response (success):**

```json
{
  "success": true,
  "message": "Please check your email to confirm your subscription."
}
```

**Logic:**

1. Validates email is present
2. Calls `brevoClient.contacts.createDoiContact()` with:
   - `includeListIds: [11]` (newsletter_subs list)
   - `templateId: 7` (DOI confirmation email template)
   - `redirectionUrl: ${PUBLIC_URL}/subscribe/confirmed`
   - `attributes: { FIRSTNAME: first_name }`

### 2. Webhook Handler (`/api/brevo/webhook`)

**Method:** `POST`

**Authentication:** Bearer token via `BREVO_WEBHOOK_SECRET`

**Triggered by:** Brevo webhook on `list_addition` event (when user confirms DOI)

**Logic:**

1. Verifies Bearer token matches `BREVO_WEBHOOK_SECRET`
2. Checks event is `list_addition` (or `listAddition`)
3. Extracts `list_id` from array: `payload.list_id[0]`
4. Checks `list_id === 11` (newsletter_subs) — ignores other lists
5. Fetches contact attributes to get `FIRSTNAME`
6. Sends welcome email (template #2) with `first_name` param

**Important:** Brevo sends `list_id` as an **array** (e.g., `[11]`), not a number. The handler extracts the first element.

### 3. Confirmation Page (`/subscribe/confirmed`)

A simple landing page shown after the user clicks the DOI confirmation link.

## Environment Variables

| Variable               | Type    | Description                                               |
| ---------------------- | ------- | --------------------------------------------------------- |
| `BREVO_API_KEY`        | Private | Brevo API key for SDK authentication                      |
| `BREVO_WEBHOOK_SECRET` | Private | Shared secret for webhook Bearer token auth               |
| `PUBLIC_URL`           | Public  | Base URL for DOI redirect (e.g., `https://nickthiru.dev`) |

## Brevo Configuration

### Lists

| List Name       | ID  | Purpose                          |
| --------------- | --- | -------------------------------- |
| Newsletter Subs | 11  | Confirmed newsletter subscribers |

### Email Templates

| Template Name     | ID  | Purpose                              |
| ----------------- | --- | ------------------------------------ |
| Newsletter Verify | 7   | DOI confirmation email               |
| Welcome           | 2   | Welcome email after DOI confirmation |

### Webhook Setup

In Brevo dashboard → Settings → Webhooks:

- **URL:** `https://nickthiru.dev/api/brevo/webhook`
- **Authorization:** Bearer token (same value as `BREVO_WEBHOOK_SECRET`)
- **Events:** Check "Contact added to a list" (`list_addition`)

## Flow Diagram

```
┌─────────┐     POST /api/subscribe      ┌──────────┐
│  User   │ ────────────────────────────→ │  Brevo   │
│  Form   │                               │  (DOI)   │
└─────────┘                               └────┬─────┘
                                               │
                                    DOI confirmation email
                                               │
                                               ▼
┌─────────┐     Click confirmation link      ┌──────────┐
│  User   │ ←─────────────────────────────── │  Brevo   │
└─────────┘                                  └────┬─────┘
                                                  │
                                    Webhook (list_addition)
                                                  │
                                                  ▼
┌─────────────────────────────────────────────────────────┐
│              POST /api/brevo/webhook                     │
│  1. Verify Bearer token                                 │
│  2. Check event === "list_addition"                     │
│  3. Check list_id[0] === 11                             │
│  4. Fetch contact attributes                            │
│  5. Send welcome email (template #2)                    │
└─────────────────────────────────────────────────────────┘
```

## Testing

### Manual Test

1. Subscribe with a new email via `/subscribe`
2. Check inbox for DOI confirmation email
3. Click the confirmation link
4. Wait ~30 seconds for webhook to fire
5. Check inbox for welcome email

### Webhook Endpoint Test

```bash
curl -X POST https://nickthiru.dev/api/brevo/webhook \
  -H "Authorization: Bearer <your-secret>" \
  -H "Content-Type: application/json" \
  -d '{"event":"list_addition","email":"test@example.com","list_id":[11]}'
```

Expected response: `{"success":true}`

## Troubleshooting

### "Unauthorized" response from webhook

- Check `BREVO_WEBHOOK_SECRET` matches in both Vercel env vars and Brevo webhook config
- Redeploy after setting the env var

### Welcome email not received

- Check webhook logs in Vercel (Functions → webhook)
- Verify `list_id` is `11` in the webhook payload
- Check Brevo template #2 is active and published

### DOI email not received

- Check `BREVO_API_KEY` is set correctly
- Check Brevo sender domain is verified
- Check spam folder

## Migration History

This system replaced the previous Buttondown + Resend setup. See:

- `docs/newsletter-resubscribe-error-handling.md` (legacy, Buttondown-specific)
