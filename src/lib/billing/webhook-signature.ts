import type Stripe from "stripe";

export function verifyStripeWebhookSignature({
  stripe,
  payload,
  signature,
  secret,
}: {
  stripe: Stripe;
  payload: string;
  signature: string;
  secret: string;
}) {
  return stripe.webhooks.constructEvent(payload, signature, secret);
}
