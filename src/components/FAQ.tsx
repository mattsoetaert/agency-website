"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Will callers know they're talking to an AI?",
    a: "Most callers don't realize it, but we believe in transparency. We design agents that are upfront if asked directly. Our agents sound natural and conversational — not robotic.",
  },
  {
    q: "What happens if the agent can't answer a question?",
    a: "The agent can transfer calls to you or a team member in real-time, take a detailed message, or schedule a callback — whatever workflow makes the most sense for your business.",
  },
  {
    q: "How long does setup take?",
    a: "Most clients are live within 5–10 business days after the discovery call. We handle everything technical — you just need to review and approve the agent before launch.",
  },
  {
    q: "Does it work with my existing phone number?",
    a: "Yes. We can either forward your existing business number to the agent, or set up a new dedicated number — whichever you prefer.",
  },
  {
    q: "What scheduling and CRM tools do you integrate with?",
    a: "We integrate with Google Calendar, Calendly, Acuity, HubSpot, Salesforce, Go High Level, Zoho, and many others. If you use something not on this list, ask us — we build custom integrations.",
  },
  {
    q: "Can I change the agent's script after launch?",
    a: "Absolutely. We offer ongoing support and can update your agent's responses, add new services, or adjust the conversation flow at any time.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-slate-950 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Common questions</h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/5 bg-white/2 overflow-hidden"
            >
              <button
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-white font-medium text-sm">{faq.q}</span>
                <svg
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-4 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
