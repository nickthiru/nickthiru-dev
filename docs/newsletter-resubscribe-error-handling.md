# Email Suppression Notifications (Resend)

## Why this exists

Our newsletter is hosted on Buttondown. If someone tries to subscribe again using an email address that was previously unsubscribed/suppressed, Buttondown may reject the resubscribe attempt. To avoid losing these signups, the app detects this condition and sends a notification email so we can follow up manually.

We use **Resend** (https://resend.com/) to send those notification emails.

## Domain + DNS setup

Domain: `nickthiru.dev`  
Registrar/DNS: **Spaceship**  
Email inbox/provider: **SpaceMail** (kept for receiving mail)

### Resend domain verification

In Resend, add the domain `nickthiru.dev` and complete verification by adding the DNS records Resend provides.

In **Spaceship → Advanced DNS**, add these as **Custom records**:

#### 1) DKIM (required)

- **Type:** `TXT`
- **Name/Host:** `resend._domainkey`
- **Value:** provided by Resend

#### 2) Sending records on the `send` subdomain (required)

Resend uses a dedicated subdomain (e.g. `send.nickthiru.dev`) for sending/bounces:

- **Type:** `MX`
- **Name/Host:** `send`
- **Value:** provided by Resend (feedback/bounce handler)
- **Priority:** provided by Resend (or the default they specify)

- **Type:** `TXT`
- **Name/Host:** `send`
- **Value:** SPF string provided by Resend (typically includes Amazon SES)

These records are on the **`send` subdomain**, so they do not interfere with SpaceMail’s MX/SPF at the root (`@`).

#### 3) DMARC (optional, recommended)

- **Type:** `TXT`
- **Name/Host:** `_dmarc`
- **Value:** provided by Resend (we started with a monitoring policy like `p=none`)

### Notes / guardrails

- Keep SpaceMail’s receiving configuration intact:
  - Do **not** replace the root (`@`) MX records (e.g. `mx1.spacemail.com`, `mx2.spacemail.com`).
- Resend “Enable receiving” can remain **off**; we only need outbound mail for notifications.

## API key configuration

### Local development

Add to `.env` file:

```
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

Get your API key from the Resend dashboard after domain verification.

### Production (Vercel)

Add the environment variable in Vercel project settings:

1. Go to project Settings → Environment Variables
2. Add `RESEND_API_KEY` with your Resend API key
3. Redeploy the site for changes to take effect

## App usage

The app sends suppression/resubscribe-failure notifications via Resend using a `from` address on our verified domain:

- **From:** `Newsletter <newsletter@nickthiru.dev>`
- **To:** `contact@nickthiru.dev`
- **Subject:** "Suppressed Subscriber Resubscribe Attempt"

The notification includes:

- Subscriber's email address
- Subscriber's name (if provided in the form)
- Full Buttondown error details for debugging

## Implementation

See `src/routes/api/subscribe/+server.ts` for the implementation details.
