"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const GOOGLE_REVIEW_URL = "https://g.page/r/CWK-bDWq-B90EAE/review";
const WEBHOOK_URL = ""; // TODO: paste Make.com webhook URL

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-10 h-10 transition-colors duration-100 ${
        filled ? "fill-yellow-400 stroke-yellow-400" : "fill-transparent stroke-neutral-300"
      }`}
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
      />
    </svg>
  );
}

type State = "rating" | "form" | "thanks";

export default function ReviewPage() {
  const [state, setState] = useState<State>("rating");
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleStarClick(rating: number) {
    if (redirectTimer.current) {
      clearTimeout(redirectTimer.current);
      redirectTimer.current = null;
    }

    setSelected(rating);

    if (rating === 5) {
      redirectTimer.current = setTimeout(() => {
        window.location.href = GOOGLE_REVIEW_URL;
      }, 400);
    } else {
      setState("form");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      formType: "review_feedback",
      rating: selected,
      fullName: formData.get("fullName") as string,
      comments: formData.get("comments") as string,
    };

    if (WEBHOOK_URL) {
      try {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error("Webhook error:", err);
      }
    } else {
      console.log("Webhook payload (no URL configured):", payload);
    }

    setSubmitting(false);
    setState("thanks");
  }

  const displayRating = hovered || selected;

  return (
    <main className="min-h-screen bg-[#f5f4f0]">
      <header className="border-b border-black/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2" aria-label="Vantage Web">
            <span className="inline-flex items-center justify-center w-7 h-7 bg-black text-white font-bold text-xs">
              V
            </span>
            <span className="font-semibold text-black tracking-tight text-sm">Vantage Web</span>
          </Link>
        </div>
      </header>

      <section className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-2xl mx-auto bg-white border border-black/10 p-6 sm:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
          {state === "thanks" ? (
            <>
              <p className="text-neutral-400 text-xs font-semibold uppercase tracking-[0.24em] mb-4">
                Thank you
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
                Your feedback was received.
              </h1>
              <p className="text-neutral-500 text-base leading-relaxed">
                We appreciate you taking the time to share this with us. We&apos;ll look into it.
              </p>
            </>
          ) : (
            <>
              <p className="text-neutral-400 text-xs font-semibold uppercase tracking-[0.24em] mb-4">
                Review
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2">
                How was your experience?
              </h1>
              <p className="text-neutral-500 text-base leading-relaxed mb-8">
                Select a rating below.
              </p>

              <div className="flex gap-2 mb-8" onMouseLeave={() => setHovered(0)}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHovered(star)}
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    className="focus:outline-none cursor-pointer"
                  >
                    <StarIcon filled={star <= displayRating} />
                  </button>
                ))}
              </div>

              {state === "form" && (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 border-t border-black/8 pt-8"
                >
                  <label className="block">
                    <span className="block text-xs font-medium text-neutral-500 mb-2">
                      Full Name
                    </span>
                    <input
                      name="fullName"
                      type="text"
                      placeholder="Jane Smith"
                      required
                      className="w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black placeholder-neutral-400 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </label>
                  <label className="block">
                    <span className="block text-xs font-medium text-neutral-500 mb-2">
                      What happened?
                    </span>
                    <textarea
                      name="comments"
                      rows={4}
                      placeholder="Tell us more…"
                      required
                      className="w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black placeholder-neutral-400 text-sm focus:outline-none focus:ring-1 focus:ring-black resize-none"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full px-6 py-4 bg-black hover:bg-neutral-800 disabled:opacity-50 text-white font-semibold text-sm transition-colors"
                  >
                    {submitting ? "Sending…" : "Send Feedback"}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
