"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export default function BookingContent() {
  const searchParams = useSearchParams();
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  const lead = {
    name: searchParams.get("name") ?? "",
    business: searchParams.get("business") ?? "",
    email: searchParams.get("email") ?? "",
    phone: searchParams.get("phone") ?? "",
    details: searchParams.get("details") ?? "",
  };

  const bookingUrl = useMemo(() => {
    if (!calendlyUrl) return null;

    const url = new URL(calendlyUrl);
    url.searchParams.set("hide_gdpr_banner", "1");

    if (lead.name) url.searchParams.set("name", lead.name);
    if (lead.email) url.searchParams.set("email", lead.email);

    return url.toString();
  }, [calendlyUrl, lead.email, lead.name]);

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
            {bookingUrl ? (
              <iframe
                src={bookingUrl}
                title="Book a strategy call"
                className="w-full min-w-0 h-[760px] border-0"
              />
            ) : (
              <div className="border border-dashed border-black/15 bg-[#f5f4f0] p-6 text-sm text-neutral-500 leading-relaxed">
                Add your Calendly link in <code>NEXT_PUBLIC_CALENDLY_URL</code> to show the booking page here.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
