"use client";

import { useEffect, useState } from "react";
import BrandLogo from "@/components/BrandLogo";

const YOUTUBE_VIDEO_ID = "ZNQc18mNZKc";
const YOUTUBE_THUMBNAIL = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`;

// Add real testimonial video IDs here once recorded.
const TESTIMONIALS: { id: string; name: string; business: string }[] = [
  // { id: "VIDEO_ID", name: "Jane Smith", business: "Smith Plumbing" },
];

const REVENUE_RANGES = [
  "Under $10k/month",
  "$10k - $25k/month",
  "$25k - $50k/month",
  "$50k - $100k/month",
  "$100k - $250k/month",
  "$250k+/month",
];

type Lead = {
  fullName: string;
  email: string;
  phone: string;
  ownsBusiness: string;
  monthlyRevenue: string;
};

type ModalIntent = "video" | "book";

const LEAD_STORAGE_KEY = "cornerstone_funnel_lead";

// Format raw input as a US-style phone number: (555) 555-5555
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function StartPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIntent, setModalIntent] = useState<ModalIntent>("video");
  const [videoUnlocked, setVideoUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lead, setLead] = useState<Lead | null>(null);
  const [phoneInput, setPhoneInput] = useState("");

  function buildBookHref(l: Lead) {
    return `/book?${new URLSearchParams({
      name: l.fullName,
      email: l.email,
      phone: l.phone,
      ownsBusiness: l.ownsBusiness,
      monthlyRevenue: l.monthlyRevenue,
    }).toString()}`;
  }

  function openModal(intent: ModalIntent) {
    setModalIntent(intent);
    setError(null);
    setModalOpen(true);
  }

  function handleBookClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!lead) {
      e.preventDefault();
      openModal("book");
    }
  }

  // On mount, restore lead from sessionStorage so refreshing /start
  // doesn't make the user re-watch behind the gate
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(LEAD_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Lead;
        if (parsed?.email) {
          setLead(parsed);
          setVideoUnlocked(true);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Build /book URL with lead info pre-filled in query params, so the GHL
  // booking widget auto-populates and the booking dedupes onto the same contact.
  const bookHref = lead ? buildBookHref(lead) : "/book";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      ownsBusiness: String(formData.get("ownsBusiness") ?? ""),
      monthlyRevenue: String(formData.get("monthlyRevenue") ?? ""),
    };

    try {
      const res = await fetch("/api/video-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      // Persist the lead so the Book buttons can pass it to /book
      // and GHL can dedupe the same contact when they book the call.
      const leadInfo: Lead = {
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        ownsBusiness: payload.ownsBusiness,
        monthlyRevenue: payload.monthlyRevenue,
      };
      try {
        sessionStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(leadInfo));
      } catch {
        // sessionStorage may be unavailable (private mode) — non-fatal
      }
      setLead(leadInfo);

      // Success — always unlock the video so they can come back to it later
      setVideoUnlocked(true);
      setModalOpen(false);
      setSubmitting(false);

      if (modalIntent === "book") {
        // They were trying to book — send them to /book with their info pre-filled
        window.location.href = buildBookHref(leadInfo);
        return;
      }

      // They wanted to watch the video — scroll the player into view
      setTimeout(() => {
        document
          .getElementById("video-player")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f4f0]">
      {/* Header — logo only, no nav */}
      <header className="border-b border-black/10 bg-[#f5f4f0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-center">
          <BrandLogo href="/start" imageClassName="h-10 w-auto max-w-[200px]" priority />
        </div>
      </header>

      {/* Hero + Video */}
      <section className="px-4 sm:px-6 pt-12 sm:pt-16 pb-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-neutral-400 text-xs font-semibold uppercase tracking-[0.24em] mb-4">
            Watch first
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-[1.1] mb-4 max-w-3xl mx-auto">
            A 5-minute video about exactly what we do for your business.
          </h1>
          <p className="text-neutral-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Click below to watch the walkthrough.
          </p>

          {/* Video — gated by form. Shows thumbnail + play button until form submitted. */}
          <div
            id="video-player"
            className="relative w-full aspect-video bg-black overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.12)]"
          >
            {!videoUnlocked ? (
              <button
                onClick={() => openModal("video")}
                className="absolute inset-0 w-full h-full group cursor-pointer"
                aria-label="Play video"
              >
                {/* Thumbnail */}
                <img
                  src={YOUTUBE_THUMBNAIL}
                  alt="Watch the video"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/95 group-hover:bg-white rounded-full flex items-center justify-center shadow-2xl transition-all group-hover:scale-110">
                    <svg
                      className="w-8 h-8 sm:w-10 sm:h-10 text-black ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {/* Bottom label */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-left">
                  <p className="text-white font-semibold text-sm sm:text-base">
                    ▶  Click to watch — 5 min
                  </p>
                </div>
              </button>
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`}
                title="Cornerstone Marketing — What we do"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </section>

      {/* Primary CTA — book button */}
      <section className="px-4 sm:px-6 py-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3">
            Ready to talk?
          </h2>
          <p className="text-neutral-500 text-base mb-6 max-w-lg mx-auto">
            Book a free 30-minute strategy call. We&apos;ll review your business and show
            you exactly how we&apos;d grow it.
          </p>
          <a
            href={bookHref}
            onClick={handleBookClick}
            className="inline-block px-8 py-4 bg-black hover:bg-neutral-800 text-white font-semibold text-sm tracking-wide transition-colors cursor-pointer"
          >
            Book a Free Strategy Call
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 sm:px-6 py-12 border-t border-black/8 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-neutral-400 text-xs font-semibold uppercase tracking-[0.24em] mb-3 text-center">
            What clients say
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-10">
            Real results, in their words.
          </h2>

          {TESTIMONIALS.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="bg-[#f5f4f0] border border-black/10 overflow-hidden">
                  <div className="relative w-full aspect-video bg-black">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${t.id}?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`}
                      title={`${t.name} — ${t.business}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-black text-sm">{t.name}</p>
                    <p className="text-neutral-500 text-xs">{t.business}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-[#f5f4f0] border border-dashed border-black/15 aspect-video flex items-center justify-center"
                >
                  <p className="text-neutral-400 text-xs uppercase tracking-[0.18em]">
                    Testimonial {i} coming soon
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA repeat */}
      <section className="px-4 sm:px-6 py-16 bg-black text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            See if we&apos;re a fit.
          </h2>
          <p className="text-neutral-400 text-base mb-6 max-w-lg mx-auto">
            One call, 30 minutes. No pressure, no pitch — just a clear plan for your
            business.
          </p>
          <a
            href={bookHref}
            onClick={handleBookClick}
            className="inline-block px-8 py-4 bg-white text-black hover:bg-neutral-100 font-semibold text-sm tracking-wide transition-colors cursor-pointer"
          >
            Book a Free Strategy Call
          </a>
        </div>
      </section>

      {/* Form Modal — gates the video */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget && !submitting) setModalOpen(false);
          }}
        >
          <div className="bg-white w-full max-w-md my-8 p-6 sm:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.25)] relative">
            {!submitting && (
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-black transition-colors"
                aria-label="Close"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}

            <p className="text-neutral-400 text-xs font-semibold uppercase tracking-[0.24em] mb-3">
              Quick info
            </p>
            <h2 className="text-2xl font-bold text-black mb-2">
              {modalIntent === "book"
                ? "Before you book."
                : "Get instant access to the video."}
            </h2>
            <p className="text-neutral-500 text-sm mb-6">
              {modalIntent === "book"
                ? "Fill this out and we'll send you to the booking page."
                : "Fill this out and the video starts immediately."}
            </p>

            {error && (
              <div className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="block text-xs font-medium text-neutral-500 mb-2">
                  Full Name
                </span>
                <input
                  name="fullName"
                  type="text"
                  required
                  placeholder="Jane Smith"
                  className="w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black placeholder-neutral-400 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-medium text-neutral-500 mb-2">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="jane@business.com"
                  className="w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black placeholder-neutral-400 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-medium text-neutral-500 mb-2">Phone</span>
                <input
                  name="phone"
                  type="tel"
                  required
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="(555) 555-5555"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(formatPhone(e.target.value))}
                  minLength={14}
                  className="w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black placeholder-neutral-400 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-medium text-neutral-500 mb-2">
                  Do you own a business?
                </span>
                <select
                  name="ownsBusiness"
                  required
                  defaultValue=""
                  className="w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black text-sm focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Starting one">Starting one</option>
                </select>
              </label>

              <label className="block">
                <span className="block text-xs font-medium text-neutral-500 mb-2">
                  Monthly Revenue
                </span>
                <select
                  name="monthlyRevenue"
                  required
                  defaultValue=""
                  className="w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black text-sm focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  {REVENUE_RANGES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-4 bg-black hover:bg-neutral-800 disabled:opacity-50 text-white font-semibold text-sm transition-colors mt-6"
              >
                {submitting
                  ? "Loading…"
                  : modalIntent === "book"
                  ? "Continue To Booking →"
                  : "Watch The Video →"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
