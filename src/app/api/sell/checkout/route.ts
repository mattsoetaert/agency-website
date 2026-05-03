import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAppUrl, getBillingSetupIssues, requirePrimaryBillingPlan } from "@/lib/billing/config";
import {
  buildSubscriptionCheckoutSessionParams,
  parseStaffCheckoutForm,
  validateStaffCheckoutInput,
} from "@/lib/billing/checkout";
import { isStaffSessionValueValid, staffSessionCookieName } from "@/lib/billing/staff-auth";
import { getStripe } from "@/lib/billing/stripe";

function redirectWithError(requestUrl: string, error: string) {
  const url = new URL("/sell", requestUrl);
  url.searchParams.set("error", error);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const staffSession = cookieStore.get(staffSessionCookieName)?.value;

  if (!isStaffSessionValueValid(staffSession)) {
    return redirectWithError(request.url, "unauthorized");
  }

  const setupIssues = getBillingSetupIssues();

  if (setupIssues.length > 0) {
    console.error("Billing checkout is not configured", { missing: setupIssues });
    return redirectWithError(request.url, "configuration");
  }

  const formData = await request.formData();
  const validation = validateStaffCheckoutInput(parseStaffCheckoutForm(formData));

  if (!validation.ok) {
    return redirectWithError(request.url, "validation");
  }

  try {
    const stripe = getStripe();
    const plan = requirePrimaryBillingPlan();
    const session = await stripe.checkout.sessions.create(
      buildSubscriptionCheckoutSessionParams(validation.input, plan, getAppUrl(request.url)),
    );

    if (!session.url) {
      throw new Error("Stripe did not return a Checkout URL.");
    }

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error("Failed to create Stripe Checkout session", error);
    return redirectWithError(request.url, "stripe");
  }
}
