export type BillingPlan = {
  id: string;
  name: string;
  priceLabel: string;
  priceId: string;
};

export const primaryBillingPlan: BillingPlan = {
  id: "website-management-monthly",
  name: "Website Build + Monthly Management",
  priceLabel: "$300/month",
  priceId: process.env.STRIPE_WEBSITE_MONTHLY_PRICE_ID ?? process.env.STRIPE_PRICE_ID ?? "",
};

export function requirePrimaryBillingPlan() {
  if (!primaryBillingPlan.priceId) {
    throw new Error("Missing STRIPE_WEBSITE_MONTHLY_PRICE_ID.");
  }

  return primaryBillingPlan;
}

export function getAppUrl(requestUrl?: string) {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL ?? process.env.APP_URL;

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (requestUrl) {
    return new URL(requestUrl).origin;
  }

  return "http://localhost:3000";
}

export function getBillingSetupIssues() {
  const issues: string[] = [];

  if (!process.env.STRIPE_SECRET_KEY) issues.push("STRIPE_SECRET_KEY");
  if (!process.env.STRIPE_WEBHOOK_SECRET) issues.push("STRIPE_WEBHOOK_SECRET");
  if (!primaryBillingPlan.priceId) issues.push("STRIPE_WEBSITE_MONTHLY_PRICE_ID");
  if (!process.env.STAFF_CHECKOUT_PASSWORD) issues.push("STAFF_CHECKOUT_PASSWORD");
  if (!(process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL)) issues.push("SUPABASE_URL");
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) issues.push("SUPABASE_SERVICE_ROLE_KEY");

  return issues;
}
