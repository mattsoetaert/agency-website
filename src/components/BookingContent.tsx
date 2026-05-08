"use client";

import { useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { useSearchParams } from "next/navigation";

const GHL_BOOKING_URL =
  "https://api.getcornerstonemarketing.com/widget/booking/5XLhwB7TZlSvDnCbyiRK";

const GHL_FORM_EMBED_SCRIPT =
  "https://api.getcornerstonemarketing.com/js/form_embed.js";

const TIMEZONES = [
  { label: "Pacific", value: "America/Los_Angeles", short: "PT" },
  { label: "Mountain", value: "America/Denver", short: "MT" },
  { label: "Central", value: "America/Chicago", short: "CT" },
  { label: "Eastern", value: "America/New_York", short: "ET" },
] as const;

type TimezoneValue = (typeof TIMEZONES)[number]["value"];

// Map a browser-detected IANA timezone to our 4 US zones (closest match).
function detectUSTimezone(): TimezoneValue {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (TIMEZONES.some((t) => t.value === tz)) return tz as TimezoneValue;
    // Common aliases that map to one of our 4 zones
    if (/Vancouver|Tijuana|Pacific/i.test(tz)) return "America/Los_Angeles";
    if (/Phoenix|Edmonton|Boise|Mountain/i.test(tz)) return "America/Denver";
    if (/Winnipeg|Mexico_City|Regina|Central/i.test(tz)) return "America/Chicago";
    if (/Toronto|Detroit|Halifax|Eastern/i.test(tz)) return "America/New_York";
  } catch {
    // ignore
  }
  return "America/Los_Angeles";
}

export default function BookingContent() {
  const searchParams = useSearchParams();
  const [timezone, setTimezone] = useState<TimezoneValue>("America/Los_Angeles");

  useEffect(() => {
    setTimezone(detectUSTimezone());
  }, []);

  const lead = {
    name: searchParams.get("name") ?? "",
    business: searchParams.get("business") ?? "",
    email: searchParams.get("email") ?? "",
    phone: searchParams.get("phone") ?? "",
    details: searchParams.get("details") ?? "",
  };

  // Build the GHL booking URL with pre-filled lead info + selected timezone,
  // so the widget shows times in the user's chosen US timezone immediately.
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
    url.searchParams.set("timezone", timezone);

    return url.toString();
  }, [lead.email, lead.name, lead.phone, timezone]);

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
                <p className="text-neutral-400 mb-1">Email</p>
                <p className="text-black">{lead.email || "Not provided"}</p>
              </div>
              <div>
                <p className="text-neutral-400 mb-1">Phone</p>
                <p className="text-black">{lead.phone || "Not provided"}</p>
              </div>
            </div>
          </div>

          <div>
            {/* Timezone selector — restricts choice to North American zones */}
            <div className="mb-4">
              <p className="text-neutral-500 text-xs font-medium mb-2">Your time zone</p>
              <div className="grid grid-cols-4 gap-2">
                {TIMEZONES.map((tz) => {
                  const selected = timezone === tz.value;
                  return (
                    <button
                      key={tz.value}
                      type="button"
                      onClick={() => setTimezone(tz.value)}
                      className={`px-3 py-3 text-sm font-semibold border transition-colors ${
                        selected
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-black/10 hover:border-black/30"
                      }`}
                    >
                      <span className="block leading-tight">{tz.label}</span>
                      <span className="block text-[10px] font-normal opacity-70 mt-0.5">{tz.short}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white border border-black/10 shadow-[0_24px_80px_rgba(0,0,0,0.08)] p-3 sm:p-4">
              <iframe
                key={bookingUrl}
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
      </div>
    </section>
  );
}
