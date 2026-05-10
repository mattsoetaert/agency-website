const includedFeatures = [
  "Custom website built around your business",
  "Conversion-focused copy and messaging",
  "Mobile-first, fast-loading design",
  "Review funnel + missed-call follow-up",
  "Software setup and integrations",
  "Launch call and walkthrough",
  "Ongoing support and improvements",
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-24 border-t border-black/8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Simple, flat pricing.
          </h2>
          <p className="text-black text-lg max-w-xl mx-auto">
            One price, everything included. No contracts, no setup fees, no suprises.
          </p>
        </div>

        <div className="border border-black/10 bg-[#f5f4f0] p-8 sm:p-12 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
          <div className="text-center mb-10">
            <p className="text-black text-base font-bold uppercase tracking-[0.24em] mb-4">
              Everything you need
            </p>
            <p className="text-5xl sm:text-6xl font-extrabold text-black mb-2">
              $297<span className="text-2xl font-bold">/month</span>
            </p>
            <p className="text-black text-lg font-semibold">
              No contracts. Cancel anytime.
            </p>
          </div>

          <ul className="flex flex-col gap-4 mb-10">
            {includedFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-black shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-black text-lg font-semibold">{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href="/start"
            className="block w-full text-center px-10 py-5 bg-black hover:bg-neutral-800 text-white font-bold text-lg sm:text-xl transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
