import Stripe from "stripe";
import { describe, expect, it } from "vitest";
import { verifyStripeWebhookSignature } from "./webhook-signature";

const stripe = new Stripe("sk_test_123", {
  apiVersion: "2026-04-22.dahlia",
  typescript: true,
});

describe("webhook signature verification", () => {
  it("constructs a Stripe event from a valid signed payload", () => {
    const payload = JSON.stringify({
      id: "evt_test",
      object: "event",
      type: "checkout.session.completed",
      created: 1777392000,
      livemode: false,
      data: { object: { id: "cs_test", object: "checkout.session" } },
    });
    const secret = "whsec_test";
    const signature = stripe.webhooks.generateTestHeaderString({ payload, secret });

    const event = verifyStripeWebhookSignature({ stripe, payload, signature, secret });

    expect(event.id).toBe("evt_test");
    expect(event.type).toBe("checkout.session.completed");
  });

  it("rejects an invalid signed payload", () => {
    const payload = JSON.stringify({ id: "evt_test", object: "event" });
    const secret = "whsec_test";
    const signature = stripe.webhooks.generateTestHeaderString({ payload, secret });

    expect(() =>
      verifyStripeWebhookSignature({
        stripe,
        payload: JSON.stringify({ id: "evt_tampered", object: "event" }),
        signature,
        secret,
      }),
    ).toThrow();
  });
});
