import type Stripe from "stripe";
import type { BillingPersistence, SubscriptionRecord } from "./webhook";

type SupabaseConfig = {
  url: string;
  serviceRoleKey: string;
};

type WebhookEventStatus = {
  processing_status: "processing" | "processed" | "failed";
};

function getSupabaseConfig(): SupabaseConfig {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Missing Supabase billing configuration.");
  }

  return { url, serviceRoleKey };
}

async function supabaseFetch(path: string, init: RequestInit) {
  const { url, serviceRoleKey } = getSupabaseConfig();

  return fetch(`${url}${path}`, {
    ...init,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
}

function webhookEventRecord(event: Stripe.Event) {
  return {
    id: event.id,
    type: event.type,
    livemode: event.livemode,
    stripe_created_at: new Date(event.created * 1000).toISOString(),
    processing_status: "processing",
    payload: event,
  };
}

async function getWebhookEventStatus(eventId: string) {
  const response = await supabaseFetch(
    `/rest/v1/stripe_webhook_events?id=eq.${encodeURIComponent(eventId)}&select=processing_status`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to read Stripe webhook event status: ${response.status} ${await response.text()}`);
  }

  const rows = (await response.json()) as WebhookEventStatus[];
  return rows[0]?.processing_status ?? null;
}

async function markWebhookEventProcessing(eventId: string) {
  const response = await supabaseFetch(`/rest/v1/stripe_webhook_events?id=eq.${encodeURIComponent(eventId)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      processing_status: "processing",
      processed_at: null,
      failed_reason: null,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to reopen Stripe webhook event: ${response.status} ${await response.text()}`);
  }
}

async function recordWebhookEvent(event: Stripe.Event) {
  const response = await supabaseFetch("/rest/v1/stripe_webhook_events", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(webhookEventRecord(event)),
  });

  if (response.status === 409) {
    const status = await getWebhookEventStatus(event.id);

    if (status === "failed") {
      await markWebhookEventProcessing(event.id);
      return true;
    }

    return false;
  }

  if (!response.ok) {
    throw new Error(`Failed to record Stripe webhook event: ${response.status} ${await response.text()}`);
  }

  return true;
}

async function markWebhookEventProcessed(eventId: string) {
  const response = await supabaseFetch(`/rest/v1/stripe_webhook_events?id=eq.${encodeURIComponent(eventId)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      processing_status: "processed",
      processed_at: new Date().toISOString(),
      failed_reason: null,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to mark Stripe webhook event processed: ${response.status} ${await response.text()}`);
  }
}

async function markWebhookEventFailed(eventId: string, reason: string) {
  const response = await supabaseFetch(`/rest/v1/stripe_webhook_events?id=eq.${encodeURIComponent(eventId)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      processing_status: "failed",
      processed_at: new Date().toISOString(),
      failed_reason: reason.slice(0, 1000),
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to mark Stripe webhook event failed: ${response.status} ${await response.text()}`);
  }
}

async function upsertSubscription(subscription: SubscriptionRecord) {
  const response = await supabaseFetch("/rest/v1/client_subscriptions?on_conflict=stripe_subscription_id", {
    method: "POST",
    headers: {
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(subscription),
  });

  if (!response.ok) {
    throw new Error(`Failed to upsert client subscription: ${response.status} ${await response.text()}`);
  }
}

export function createSupabaseBillingPersistence(): BillingPersistence {
  return {
    recordWebhookEvent,
    markWebhookEventProcessed,
    markWebhookEventFailed,
    upsertSubscription,
  };
}
