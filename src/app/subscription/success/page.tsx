import type { Metadata } from "next";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { getStripe } from "@/lib/billing/stripe";

export const metadata: Metadata = {
  title: "Subscription Confirmed - Cornerstone Marketing",
  description: "Your Cornerstone Marketing subscription has been confirmed.",
};

type SuccessPageProps = {
  searchParams?: Promise<{
    session_id?: string;
  }>;
};

async function getSessionDetails(sessionId?: string) {
  if (!sessionId?.startsWith("cs_")) return null;

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);

    return {
      name: session.customer_details?.name ?? null,
      email: session.customer_details?.email ?? session.customer_email ?? null,
    };
  } catch (error) {
    console.error("Could not load Stripe Checkout session for success page", error);
    return null;
  }
}

export default async function SubscriptionSuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const session = await getSessionDetails(params?.session_id);

  return (
    <main className="min-h-screen bg-[#f5f4f0]">
      <header className="border-b border-black/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <BrandLogo href="/" imageClassName="h-10 w-auto max-w-[180px]" />
        </div>
      </header>

      <section className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-2xl mx-auto bg-white border border-black/10 p-6 sm:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
          <p className="text-neutral-400 text-xs font-semibold uppercase tracking-[0.24em] mb-4">Subscription Confirmed</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">Your website plan is active.</h1>
          <p className="text-neutral-500 text-base leading-relaxed mb-8">
            Your first payment has been received. We will use the project details from your call to start onboarding and confirm the next steps by email.
          </p>

          <div className="border-y border-black/10 py-5 mb-8 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-neutral-500">Client</span>
              <span className="text-black text-right">{session?.name ?? "Confirmed"}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-neutral-500">Email</span>
              <span className="text-black text-right">{session?.email ?? "On file"}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-neutral-500">Status</span>
              <span className="text-black text-right">Paid and recurring</span>
            </div>
          </div>

          <div className="space-y-4 text-sm text-neutral-500 leading-relaxed">
            <p>Next, we will confirm access needs, content inputs, launch timeline, and the first version of your site structure.</p>
            <p>You will receive Stripe receipts separately for the subscription payment and future renewals.</p>
          </div>

          <Link
            href="/onboarding"
            className="mt-8 inline-flex px-5 py-3 bg-black hover:bg-neutral-800 text-white font-semibold text-sm transition-colors"
          >
            Complete onboarding form
          </Link>
        </div>
      </section>
    </main>
  );
}
