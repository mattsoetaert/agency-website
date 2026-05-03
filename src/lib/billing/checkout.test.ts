import { describe, expect, it } from "vitest";
import {
  buildSubscriptionCheckoutSessionParams,
  type StaffCheckoutInput,
  validateStaffCheckoutInput,
} from "./checkout";
import type { BillingPlan } from "./config";

const input: StaffCheckoutInput = {
  clientName: "Jane Smith",
  clientEmail: "jane@example.com",
  businessName: "Smith Plumbing",
  phone: "555-555-5555",
  notes: "Sold on the April strategy call.",
};

const plan: BillingPlan = {
  id: "website-management-monthly",
  name: "Website Build + Monthly Management",
  priceLabel: "$300/month",
  priceId: "price_123",
};

describe("checkout", () => {
  it("validates required staff checkout fields", () => {
    expect(validateStaffCheckoutInput(input)).toEqual({ ok: true, input });
    expect(validateStaffCheckoutInput({ ...input, clientEmail: "not-an-email" })).toEqual({
      ok: false,
      error: "Enter a valid client email address.",
    });
    expect(validateStaffCheckoutInput({ ...input, businessName: "" })).toEqual({
      ok: false,
      error: "Client name, email, and business name are required.",
    });
  });

  it("builds a subscription-mode Stripe Checkout session", () => {
    const params = buildSubscriptionCheckoutSessionParams(input, plan, "https://example.com");

    expect(params.mode).toBe("subscription");
    expect(params.customer_email).toBe("jane@example.com");
    expect(params.line_items).toEqual([{ price: "price_123", quantity: 1 }]);
    expect(params.success_url).toBe("https://example.com/subscription/success?session_id={CHECKOUT_SESSION_ID}");
    expect(params.cancel_url).toBe("https://example.com/sell?checkout=cancelled");
    expect(params.metadata).toMatchObject({
      client_name: "Jane Smith",
      client_email: "jane@example.com",
      business_name: "Smith Plumbing",
      plan_id: "website-management-monthly",
      price_id: "price_123",
    });
    expect(params.subscription_data).toMatchObject({
      description: "Website Build + Monthly Management for Smith Plumbing",
      metadata: params.metadata,
    });
  });
});
