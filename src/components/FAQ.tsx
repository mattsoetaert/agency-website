"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Why do I need a website?",
    a: "Your website is your most powerful ad. About 97%-98% of consumers search online to find local businesses, a figure that has risen from 90% in 2019. If you are not on Google and ranking near the top, you are missing out on jobs and letting them go to your competitors.",
  },
  {
    q: "Who is this for?",
    a: "This is best for service businesses that need a stronger online presence and want a website built to generate real inquiries, not just sit online as a brochure.",
  },
  {
    q: "Do you write the copy too?",
    a: "Yes. We help shape the messaging, headlines, section flow, and calls to action so the site is not dependent on you handing over finished copy.",
  },
  {
    q: "How long does a website take?",
    a: "Timing depends on scope, but most sites can move from strategy to launch in a few weeks once we have the core business information and approvals.",
  },
  {
    q: "Can you work with my existing domain and brand?",
    a: "Absolutely. We can work around any existing domains or websites that you currently have.",
  },
  {
    q: "Can we add AI or automation later?",
    a: "Yes. That is the plan. We start with the website as the foundation, then layer in things like lead routing, follow-up automation, or AI call handling when the business case is clear.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. We can continue improving the site, add new pages, refine conversion points, and support future growth initiatives after the initial launch.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white py-24 border-t border-black/8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-16">
          <p className="text-neutral-400 text-sm font-medium uppercase tracking-widest mb-4">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-black">Common questions.</h2>
        </div>

        <div className="flex flex-col divide-y divide-black/8">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                className="w-full text-left py-5 flex items-center justify-between gap-4"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-black font-medium text-sm">{faq.q}</span>
                <svg
                  className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && <div className="pb-5 text-neutral-500 text-sm leading-relaxed">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
