"use client";

import { useState } from "react";

export default function Hero() {
  const [growthInterest, setGrowthInterest] = useState<"yes" | "no" | null>(null);
  const canSubmit = growthInterest === "yes";

  return (
    <section id="top" className="min-h-screen bg-[#f5f4f0] pt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full pt-10 pb-20 lg:pt-14 lg:pb-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
          <div className="max-w-2xl lg:self-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black leading-[1.05] tracking-tight mb-6">
              Supercharge your online precense and turn visitors into customers.
            </h1>

            <p className="text-neutral-500 text-xl leading-relaxed mb-10 max-w-xl">
              We build conversion focused websites for service companies that want more calls, want to bid higher, and want a stronger first impression.
            </p>
            <div className="flex flex-wrap gap-12">
              {[
                { value: "Fast", label: "Load times" },
                { value: "Clear", label: "Messaging" },
                { value: "Mobile", label: "First design" },
                { value: "Built", label: "To convert" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-black">{stat.value}</div>
                  <div className="text-sm text-neutral-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-black/10 shadow-[0_24px_80px_rgba(0,0,0,0.08)] p-6 sm:p-8">
            <p className="text-neutral-400 text-xs font-semibold uppercase tracking-[0.24em] mb-4">Book Appointment</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3">Tell us about your business</h2>
            <p className="text-neutral-500 text-sm leading-relaxed mb-6">
              Fill this out, then you will go to the booking page to choose a time for a quick call to answer questions.
            </p>

            <form action="/api/leads" method="post" className="space-y-4">
              <input type="hidden" name="source" value="website" />
              <input
                type="hidden"
                name="details"
                value={growthInterest === "yes" ? "Interested in growing their business: Yes" : ""}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="block text-xs font-medium text-neutral-500 mb-2">Name</span>
                  <input
                    name="name"
                    type="text"
                    placeholder="Jane Smith"
                    required
                    className="w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black placeholder-neutral-400 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-medium text-neutral-500 mb-2">Business</span>
                  <input
                    name="business"
                    type="text"
                    placeholder="Smith Plumbing"
                    className="w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black placeholder-neutral-400 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </label>
              </div>

              <label className="block">
                <span className="block text-xs font-medium text-neutral-500 mb-2">Email</span>
                <input
                  name="email"
                  type="email"
                  placeholder="jane@business.com"
                  required
                  className="w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black placeholder-neutral-400 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
              </label>

              <fieldset>
                <legend className="block text-xs font-medium text-neutral-500 mb-2">
                  Are you interested in growing your business?
                </legend>
                <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Business growth interest">
                  {[
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" },
                  ].map((option) => {
                    const selected = growthInterest === option.value;

                    return (
                      <label
                        key={option.value}
                        className={`flex cursor-pointer items-center justify-center border px-4 py-3 text-sm font-semibold transition-colors ${
                          selected
                            ? "border-black bg-black text-white"
                            : "border-black/10 bg-[#f5f4f0] text-black hover:border-black/30"
                        }`}
                      >
                        <input
                          className="sr-only"
                          name="growthInterest"
                          type="radio"
                          value={option.value}
                          checked={selected}
                          onChange={() => setGrowthInterest(option.value as "yes" | "no")}
                          required
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
                {growthInterest === "no" ? (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    Please choose Yes before continuing to booking.
                  </p>
                ) : null}
              </fieldset>

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full px-6 py-3 bg-black text-white font-semibold text-sm transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
              >
                Continue To Booking
              </button>
            </form>

            <p className="text-neutral-400 text-xs mt-4">
              Step 2 opens immediately after you submit this form.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
