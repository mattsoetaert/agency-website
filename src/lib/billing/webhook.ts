import type Stripe from "stripe";

type StripeIdValue = string | { id: string } | null | undefined;

export type SubscriptionRecord = {
  stripe_subscription_id: string;
  stripe_customer_id: string;
  stripe_checkout_session_id: string | null;
  stripe_latest_invoice_id: string | null;
  status: Stripe.Subscription.Status;
  plan_id: string | null;
  price_id: string | null;
  client_name: string | null;
  client_email: string | null;
  business_name: string | null;
  phone: string | null;
  notes: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  canceled_at: string | null;
  latest_event_id: string;
  livemode: boolean;
  updated_at: string;
};

export type BillingPersistence = {
  recordWebhookEvent: (event: Stripe.Event) => Promise<boolean>;
  markWebhookEventProcessed: (eventId: string) => Promise<void>;
  markWebhookEventFailed: (eventId: string, reason: string) => Promise<void>;
  upsertSubscription: (subscription: SubscriptionRecord) => Promise<void>;
};

export type WebhookStripeClient = {
  subscriptions: {
    retrieve: (subscriptionId: string) => Promise<Stripe.Subscription>;
  };
};

export type WebhookHandleResult = {
  status: "processed" | "ignored" | "duplicate";
};

function stripeId(value: StripeIdValue) {
  if (!value) return null;
  return typeof value === "string" ? value : value.id;
}

function timestampToIso(timestamp: number | null | undefined) {
  return timestamp ? new Date(timestamp * 1000).toISOString() : null;
}

function invoiceSubscriptionId(invoice: Stripe.Invoice) {
  return stripeId(invoice.parent?.subscription_details?.subscription);
}

function subscriptionLatestInvoiceId(subscription: Stripe.Subscription, invoice?: Stripe.Invoice) {
  return stripeId(subscription.latest_invoice) ?? invoice?.id ?? null;
}

export function buildSubscriptionRecord({
  subscription,
  eventId,
  session,
  invoice,
}: {
  subscription: Stripe.Subscription;
  eventId: string;
  session?: Stripe.Checkout.Session;
  invoice?: Stripe.Invoice;
}): SubscriptionRecord {
  const metadata = {
    ...subscription.metadata,
    ...session?.metadata,
  };
  const firstItem = subscription.items.data[0];

  return {
    stripe_subscription_id: subscription.id,
    stripe_customer_id: stripeId(subscription.customer) ?? "",
    stripe_checkout_session_id: session?.id ?? null,
    stripe_latest_invoice_id: subscriptionLatestInvoiceId(subscription, invoice),
    status: subscription.status,
    plan_id: metadata.plan_id ?? null,
    price_id: firstItem?.price.id ?? metadata.price_id ?? null,
    client_name: metadata.client_name ?? session?.customer_details?.name ?? invoice?.customer_name ?? null,
    client_email:
      metadata.client_email ??
      session?.customer_details?.email ??
      session?.customer_email ??
      invoice?.customer_email ??
      null,
    business_name: metadata.business_name ?? null,
    phone: metadata.client_phone ?? session?.customer_details?.phone ?? null,
    notes: metadata.staff_notes ?? null,
    current_period_start: timestampToIso(firstItem?.current_period_start),
    current_period_end: timestampToIso(firstItem?.current_period_end),
    cancel_at_period_end: subscription.cancel_at_period_end,
    canceled_at: timestampToIso(subscription.canceled_at),
    latest_event_id: eventId,
    livemode: subscription.livemode,
    updated_at: new Date().toISOString(),
  };
}

export async function processStripeWebhookEvent(
  event: Stripe.Event,
  stripe: WebhookStripeClient,
  persistence: BillingPersistence,
) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const subscriptionId = stripeId(session.subscription);

      if (session.mode !== "subscription" || !subscriptionId) return false;

      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      await persistence.upsertSubscription(buildSubscriptionRecord({ subscription, session, eventId: event.id }));
      return true;
    }
    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = invoiceSubscriptionId(invoice);

      if (!subscriptionId) return false;

      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      await persistence.upsertSubscription(buildSubscriptionRecord({ subscription, invoice, eventId: event.id }));
      return true;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await persistence.upsertSubscription(buildSubscriptionRecord({ subscription, eventId: event.id }));
      return true;
    }
    default:
      return false;
  }
}

export async function handleStripeWebhookEvent(
  event: Stripe.Event,
  stripe: WebhookStripeClient,
  persistence: BillingPersistence,
): Promise<WebhookHandleResult> {
  const isNewEvent = await persistence.recordWebhookEvent(event);

  if (!isNewEvent) {
    return { status: "duplicate" };
  }

  try {
    const handled = await processStripeWebhookEvent(event, stripe, persistence);
    await persistence.markWebhookEventProcessed(event.id);
    return { status: handled ? "processed" : "ignored" };
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown webhook processing error.";
    await persistence.markWebhookEventFailed(event.id, reason);
    throw error;
  }
}
