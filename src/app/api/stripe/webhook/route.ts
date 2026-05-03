import { NextResponse } from "next/server";
import { createSupabaseBillingPersistence } from "@/lib/billing/supabase";
import { getStripe } from "@/lib/billing/stripe";
import { handleStripeWebhookEvent } from "@/lib/billing/webhook";
import { verifyStripeWebhookSignature } from "@/lib/billing/webhook-signature";

export async function POST(request: Request) {
  const stripe = getStripe();
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Stripe webhook is not configured." }, { status: 400 });
  }

  try {
    const event = verifyStripeWebhookSignature({
      stripe,
      payload,
      signature,
      secret: webhookSecret,
    });

    const result = await handleStripeWebhookEvent(event, stripe, createSupabaseBillingPersistence());
    return NextResponse.json({ received: true, status: result.status });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid Stripe webhook.";
    console.error("Stripe webhook failed", error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
