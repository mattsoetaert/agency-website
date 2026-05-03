import type Stripe from "stripe";
import { describe, expect, it, vi } from "vitest";
import type { BillingPersistence } from "./webhook";
import { handleStripeWebhookEvent } from "./webhook";

function createPersistence(recordWebhookEvent = true): BillingPersistence {
  return {
    recordWebhookEvent: vi.fn().mockResolvedValue(recordWebhookEvent),
    markWebhookEventProcessed: vi.fn().mockResolvedValue(undefined),
    markWebhookEventFailed: vi.fn().mockResolvedValue(undefined),
    upsertSubscription: vi.fn().mockResolvedValue(undefined),
  };
}

function createSubscription(overrides: Partial<Stripe.Subscription> = {}) {
  return {
    id: "sub_123",
    object: "subscription",
    customer: "cus_123",
    status: "active",
    metadata: {
      plan_id: "website-management-monthly",
      client_name: "Jane Smith",
      client_email: "jane@example.com",
      business_name: "Smith Plumbing",
      client_phone: "555-555-5555",
      staff_notes: "Sold on the April strategy call.",
    },
    items: {
      data: [
        {
          price: { id: "price_123" },
          current_period_start: 1777392000,
          current_period_end: 1779984000,
        },
      ],
    },
    latest_invoice: "in_123",
    cancel_at_period_end: false,
    canceled_at: null,
    livemode: false,
    ...overrides,
  } as unknown as Stripe.Subscription;
}

function createEvent(type: Stripe.Event.Type, object: unknown) {
  return {
    id: "evt_123",
    object: "event",
    type,
    created: 1777392000,
    livemode: false,
    data: { object },
  } as Stripe.Event;
}

describe("webhook handling", () => {
  it("persists a completed subscription checkout session", async () => {
    const subscription = createSubscription();
    const stripe = {
      subscriptions: {
        retrieve: vi.fn().mockResolvedValue(subscription),
      },
    };
    const persistence = createPersistence();
    const event = createEvent("checkout.session.completed", {
      id: "cs_123",
      object: "checkout.session",
      mode: "subscription",
      subscription: "sub_123",
      metadata: {
        plan_id: "website-management-monthly",
        client_email: "jane@example.com",
      },
    });

    const result = await handleStripeWebhookEvent(event, stripe, persistence);

    expect(result.status).toBe("processed");
    expect(stripe.subscriptions.retrieve).toHaveBeenCalledWith("sub_123");
    expect(persistence.upsertSubscription).toHaveBeenCalledWith(
      expect.objectContaining({
        stripe_subscription_id: "sub_123",
        stripe_customer_id: "cus_123",
        stripe_checkout_session_id: "cs_123",
        stripe_latest_invoice_id: "in_123",
        status: "active",
        plan_id: "website-management-monthly",
        price_id: "price_123",
        client_email: "jane@example.com",
        business_name: "Smith Plumbing",
        current_period_start: "2026-04-28T16:00:00.000Z",
        current_period_end: "2026-05-28T16:00:00.000Z",
      }),
    );
    expect(persistence.markWebhookEventProcessed).toHaveBeenCalledWith("evt_123");
  });

  it("updates the subscription record after a paid renewal invoice", async () => {
    const subscription = createSubscription({ status: "active" });
    const stripe = {
      subscriptions: {
        retrieve: vi.fn().mockResolvedValue(subscription),
      },
    };
    const persistence = createPersistence();
    const event = createEvent("invoice.payment_succeeded", {
      id: "in_renewal",
      object: "invoice",
      customer_email: "jane@example.com",
      customer_name: "Jane Smith",
      parent: {
        subscription_details: {
          subscription: "sub_123",
        },
      },
    });

    const result = await handleStripeWebhookEvent(event, stripe, persistence);

    expect(result.status).toBe("processed");
    expect(stripe.subscriptions.retrieve).toHaveBeenCalledWith("sub_123");
    expect(persistence.upsertSubscription).toHaveBeenCalledWith(
      expect.objectContaining({
        stripe_subscription_id: "sub_123",
        stripe_latest_invoice_id: "in_123",
        latest_event_id: "evt_123",
      }),
    );
  });

  it("skips duplicate webhook events", async () => {
    const stripe = {
      subscriptions: {
        retrieve: vi.fn(),
      },
    };
    const persistence = createPersistence(false);
    const event = createEvent("customer.subscription.updated", createSubscription());

    const result = await handleStripeWebhookEvent(event, stripe, persistence);

    expect(result.status).toBe("duplicate");
    expect(stripe.subscriptions.retrieve).not.toHaveBeenCalled();
    expect(persistence.upsertSubscription).not.toHaveBeenCalled();
  });
});
