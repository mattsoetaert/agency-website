import type { Metadata } from "next";
import { cookies } from "next/headers";
import BrandLogo from "@/components/BrandLogo";
import { getBillingSetupIssues, primaryBillingPlan } from "@/lib/billing/config";
import {
  isStaffCheckoutConfigured,
  isStaffSessionValueValid,
  staffSessionCookieName,
} from "@/lib/billing/staff-auth";

export const metadata: Metadata = {
  title: "Staff Checkout - Cornerstone Marketing",
  description: "Internal subscription checkout for Cornerstone Marketing clients.",
};

type SellPageProps = {
  searchParams?: Promise<{
    error?: string;
    checkout?: string;
  }>;
};

function messageForError(error?: string) {
  if (error === "invalid") return "That password did not match.";
  if (error === "unauthorized") return "Sign in before creating a checkout session.";
  if (error === "configuration") return "Billing is missing required environment variables.";
  if (error === "validation") return "Client name, email, and business name are required.";
  if (error === "stripe") return "Stripe could not create the checkout session. Check server logs.";
  return null;
}

function Header({ authorized }: { authorized: boolean }) {
  return (
    <header className="border-b border-black/10 bg-[#f5f4f0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <BrandLogo imageClassName="h-10 w-auto max-w-[180px]" />
        {authorized && (
          <form action="/api/sell/logout" method="post">
            <button className="text-sm text-neutral-500 hover:text-black transition-colors" type="submit">
              Sign out
            </button>
          </form>
        )}
      </div>
    </header>
  );
}

function AccessForm({ error }: { error?: string }) {
  return (
    <main className="min-h-[calc(100vh-56px)] bg-[#f5f4f0] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm bg-white border border-black/10 p-6 sm:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
        <p className="text-neutral-400 text-xs font-semibold uppercase tracking-[0.24em] mb-4">Staff Only</p>
        <h1 className="text-2xl font-bold text-black mb-3">Open checkout desk.</h1>
        <p className="text-neutral-500 text-sm leading-relaxed mb-6">
          Enter the staff checkout password to create subscription payment links during sales calls.
        </p>
        {error && (
          <div className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}
        {!isStaffCheckoutConfigured() && (
          <div className="mb-4 border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Add <code>STAFF_CHECKOUT_PASSWORD</code> before using this page.
          </div>
        )}
        <form action="/api/sell/access" method="post" className="space-y-4">
          <label className="block">
            <span className="block text-xs font-medium text-neutral-500 mb-2">Password</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </label>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-black hover:bg-neutral-800 text-white font-semibold text-sm transition-colors"
          >
            Unlock Checkout
          </button>
        </form>
      </div>
    </main>
  );
}

function CheckoutForm({ setupIssues, error, cancelled }: { setupIssues: string[]; error?: string; cancelled: boolean }) {
  return (
    <main className="bg-[#f5f4f0] min-h-[calc(100vh-56px)] py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <section>
            <p className="text-neutral-400 text-xs font-semibold uppercase tracking-[0.24em] mb-4">Subscription Checkout</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">Create a client payment session.</h1>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-2xl mb-8">
              Fill this in while you are on the call, then continue to Stripe Checkout to collect the first subscription payment.
            </p>

            {error && (
              <div className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            )}
            {cancelled && (
              <div className="mb-4 border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Checkout was cancelled before payment was completed.
              </div>
            )}
            {setupIssues.length > 0 && (
              <div className="mb-4 border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Missing required setup: {setupIssues.join(", ")}.
              </div>
            )}

            <form action="/api/sell/checkout" method="post" className="bg-white border border-black/10 p-6 sm:p-8 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="block text-xs font-medium text-neutral-500 mb-2">Client Name</span>
                  <input
                    name="clientName"
                    type="text"
                    placeholder="Jane Smith"
                    required
                    className="w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black placeholder-neutral-400 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-medium text-neutral-500 mb-2">Business Name</span>
                  <input
                    name="businessName"
                    type="text"
                    placeholder="Smith Plumbing"
                    required
                    className="w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black placeholder-neutral-400 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </label>
              </div>

              <label className="block">
                <span className="block text-xs font-medium text-neutral-500 mb-2">Client Email</span>
                <input
                  name="clientEmail"
                  type="email"
                  placeholder="jane@business.com"
                  required
                  className="w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black placeholder-neutral-400 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-medium text-neutral-500 mb-2">Phone</span>
                <input
                  name="phone"
                  type="tel"
                  placeholder="(555) 555-5555"
                  className="w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black placeholder-neutral-400 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-medium text-neutral-500 mb-2">Internal Notes</span>
                <textarea
                  name="notes"
                  rows={4}
                  maxLength={500}
                  placeholder="Scope, launch target, or other call notes."
                  className="w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black placeholder-neutral-400 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-black"
                />
              </label>

              <button
                type="submit"
                disabled={setupIssues.length > 0}
                className="w-full px-6 py-3 bg-black hover:bg-neutral-800 disabled:bg-neutral-300 disabled:text-neutral-500 text-white font-semibold text-sm transition-colors"
              >
                Continue To Stripe Checkout
              </button>
            </form>
          </section>

          <aside className="bg-white border border-black/10 p-6">
            <p className="text-neutral-400 text-xs font-semibold uppercase tracking-[0.24em] mb-4">Plan</p>
            <h2 className="text-xl font-bold text-black mb-2">{primaryBillingPlan.name}</h2>
            <p className="text-3xl font-bold text-black mb-6">{primaryBillingPlan.priceLabel}</p>
            <div className="space-y-3 text-sm text-neutral-500">
              <p>Stripe collects the card and creates the recurring subscription.</p>
              <p>The success webhook stores the subscription and renewal status in Supabase.</p>
              <p>Clients are sent to a confirmation page after payment.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default async function SellPage({ searchParams }: SellPageProps) {
  const cookieStore = await cookies();
  const params = await searchParams;
  const authorized = isStaffSessionValueValid(cookieStore.get(staffSessionCookieName)?.value);
  const error = messageForError(params?.error);

  return (
    <>
      <Header authorized={authorized} />
      {authorized ? (
        <CheckoutForm
          setupIssues={getBillingSetupIssues()}
          error={error ?? undefined}
          cancelled={params?.checkout === "cancelled"}
        />
      ) : (
        <AccessForm error={error ?? undefined} />
      )}
    </>
  );
}
