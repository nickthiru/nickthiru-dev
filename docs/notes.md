# nickthiru.dev Notes

## Email Subscription Setup (Buttondown)

### Required Environment Variable

Add this to your deployment environment (Netlify, Vercel, etc.):

```
BUTTONDOWN_API_KEY=your_actual_api_key_here
```

**Where to find your API key:**

1. Log in to Buttondown: https://buttondown.com
2. Go to Settings → API
3. Copy your API key

**IMPORTANT:** Never commit this key to git. It's already in `.gitignore` via `.env`.

### How It Works

1. User submits email via `SubscribeForm.svelte`
2. Form POSTs to `/api/subscribe` (server endpoint)
3. Server endpoint authenticates with Buttondown API using `BUTTONDOWN_API_KEY`
4. Buttondown creates subscriber and sends confirmation email
5. User confirms via email link

### Subscriber Tagging

Subscribers are automatically tagged based on where they subscribe:

- `/subscribe` page → `["site"]`
- End of technical posts → `["technical"]`
- End of operator posts → `["operator"]`

Use these tags in Buttondown to send targeted emails later.
