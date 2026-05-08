"use client";

import { useMemo } from "react";
import Script from "next/script";
import { useSearchParams } from "next/navigation";

const GHL_BOOKING_URL =
  "https://api.getcornerstonemarketing.com/widget/booking/5XLhwB7TZlSvDnCbyiRK";

const GHL_FORM_EMBED_SCRIPT =
  "https://api.getcornerstonemarketing.com/js/form_embed.js";

export default function BookingContent() {
  const searchParams = useSearchParams();

  const lead = {
    name: searchParams.get("name") ?? "",
    business: searchParams.get("business") ?? "",
    email: searchParams.get("email") ?? "",
    phone: searchParams.get("phone") ?? "",
    details: searchParams.get("details") ?? "",
  };

  // Build the GHL booking URL with pre-filled lead info so the user
  // doesn't retype their name/email/phone in the booking form.
  const bookingUrl = useMemo(() => {
    const url = new URL(GHL_BOOKING_URL);

    if (lead.name) {
      const parts = lead.name.trim().split(/\s+/);
      const firstName = parts[0] ?? "";
      const lastName = parts.slice(1).join(" ");
      if (firstName) url.searchParams.set("first_name", firstName);
      if (lastName) url.searchParams.set("last_name", lastName);
    }
    if (lead.email) url.searchParams.set("email", lead.email);
    if (lead.phone) url.searchParams.set("phone", lead.phone);

    return url.toString();
  }, [lead.email, lead.name, lead.phone]);

  return (
    <section className="bg-[#f5f4f0] min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start">
          <div className="bg-white border border-black/10 p-6 sm:p-8">
            <p className="text-neutral-400 text-xs font-semibold uppercase tracking-[0.24em] mb-4">Step 2</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">Choose your time.</h1>
            <p className="text-neutral-500 text-sm leading-relaxed mb-6">
              Your details are already carried over. Pick the slot that works best for you.
            </p>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-neutral-400 mb-1">Name</p>
                <p className="text-black">{lead.name || "Not provided"}</p>
              </div>
              <div>
                <p className="text-neutral-400 mb-1">Business</p>
                <p className="text-black">{lead.business || "Not provided"}</p>
              </div>
              <div>
                <p className="text-neutral-400 mb-1">Email</p>
                <p className="text-black">{lead.email || "Not provided"}</p>
              </div>
              <div>
                <p className="text-neutral-400 mb-1">Phone</p>
                <p className="text-black">{lead.phone || "Not provided"}</p>
              </div>
              <div>
                <p className="text-neutral-400 mb-1">Project details</p>
                <p className="text-black whitespace-pre-wrap">{lead.details || "Not provided"}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-black/10 shadow-[0_24px_80px_rgba(0,0,0,0.08)] p-3 sm:p-4">
            <iframe
              src={bookingUrl}
              title="Book a strategy call"
              className="w-full min-w-0 h-[760px] border-0"
              scrolling="no"
              id="ghl-booking-iframe"
            />
            {/* GHL embed script auto-resizes the iframe to its content height */}
            <Script src={GHL_FORM_EMBED_SCRIPT} strategy="afterInteractive" />
          </div>
        </div>
      </div>
    </section>
  );
}
