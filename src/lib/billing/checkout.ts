import type Stripe from "stripe";
import type { BillingPlan } from "./config";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const metadataValueLimit = 500;

export type StaffCheckoutInput = {
  clientName: string;
  clientEmail: string;
  businessName: string;
  phone: string;
  notes: string;
};

export type StaffCheckoutValidation =
  | { ok: true; input: StaffCheckoutInput }
  | { ok: false; error: string };

function readField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function truncateMetadataValue(value: string) {
  return value.slice(0, metadataValueLimit);
}

export function parseStaffCheckoutForm(formData: FormData): StaffCheckoutInput {
  return {
    clientName: readField(formData, "clientName"),
    clientEmail: readField(formData, "clientEmail").toLowerCase(),
    businessName: readField(formData, "businessName"),
    phone: readField(formData, "phone"),
    notes: readField(formData, "notes"),
  };
}

export function validateStaffCheckoutInput(input: StaffCheckoutInput): StaffCheckoutValidation {
  if (!input.clientName || !input.clientEmail || !input.businessName) {
    return { ok: false, error: "Client name, email, and business name are required." };
  }

  if (!emailPattern.test(input.clientEmail)) {
    return { ok: false, error: "Enter a valid client email address." };
  }

  return { ok: true, input };
}

export function buildCheckoutMetadata(input: StaffCheckoutInput, plan: BillingPlan) {
  return {
    plan_id: plan.id,
    price_id: plan.priceId,
    client_name: truncateMetadataValue(input.clientName),
    client_email: truncateMetadataValue(input.clientEmail),
    business_name: truncateMetadataValue(input.businessName),
    client_phone: truncateMetadataValue(input.phone),
    staff_notes: truncateMetadataValue(input.notes),
  };
}

export function buildSubscriptionCheckoutSessionParams(
  input: StaffCheckoutInput,
  plan: BillingPlan,
  appUrl: string,
): Stripe.Checkout.SessionCreateParams {
  const metadata = buildCheckoutMetadata(input, plan);

  return {
    mode: "subscription",
    customer_email: input.clientEmail,
    client_reference_id: input.clientEmail,
    line_items: [{ price: plan.priceId, quantity: 1 }],
    metadata,
    subscription_data: {
      description: `${plan.name} for ${input.businessName}`,
      metadata,
    },
    success_url: `${appUrl}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/sell?checkout=cancelled`,
  };
}
