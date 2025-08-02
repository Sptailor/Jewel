# Stripe Setup Guide

This guide will help you set up Stripe for payment processing in your ecommerce store.

## Prerequisites

1. Create a Stripe account at https://stripe.com
2. Access your Stripe dashboard

## Getting Your API Keys

1. In the Stripe dashboard, navigate to **Developers > API keys**
2. You'll find two types of keys:
   - **Publishable key** (starts with `pk_`)
   - **Secret key** (starts with `sk_`)

3. Copy these keys and add them to your `.env` file:
   ```env
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   ```

## Setting Up Webhooks

Webhooks are needed to handle events like successful payments.

1. In the Stripe dashboard, go to **Developers > Webhooks**
2. Click **Add endpoint**
3. Enter your webhook endpoint URL:
   - For local development: Use a tool like [Stripe CLI](https://stripe.com/docs/stripe-cli) or [ngrok](https://ngrok.com/)
   - For production: `https://yourdomain.com/api/webhooks/stripe`

4. Select the following events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

5. After creating the webhook, copy the **Signing secret** and add it to your `.env`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

## Testing Locally with Stripe CLI

1. Install Stripe CLI:
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # Windows
   scoop install stripe

   # Linux
   # Download from https://stripe.com/docs/stripe-cli
   ```

2. Login to Stripe CLI:
   ```bash
   stripe login
   ```

3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. The CLI will display your webhook signing secret. Update your `.env` file with this secret.

## Test Card Numbers

Use these test card numbers for testing:

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Requires authentication**: 4000 0025 0000 3155

Use any future date for expiration and any 3-digit number for CVC.

## Production Checklist

Before going live:

1. ✅ Switch to live API keys (remove `test_` from keys)
2. ✅ Update webhook endpoint to production URL
3. ✅ Test the entire checkout flow
4. ✅ Set up proper error handling and logging
5. ✅ Configure email notifications for successful orders
6. ✅ Review Stripe's security best practices

## Troubleshooting

### "Invalid API Key" Error
- Ensure your keys are correctly copied without extra spaces
- Check that you're using test keys for development

### Webhook Signature Verification Failed
- Make sure you're using the correct webhook secret
- For local testing, use the secret provided by Stripe CLI

### Payment Not Processing
- Check browser console for JavaScript errors
- Verify that your publishable key is accessible (NEXT_PUBLIC_ prefix)
- Ensure you're using HTTPS in production