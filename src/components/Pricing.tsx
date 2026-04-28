const plans = [
  {
    name: "AI Voice Agent",
    badge: null,
    price: "$497",
    per: "/mo",
    tagline: "Never drop what you're doing to answer a call again.",
    description: "A custom AI agent that answers every call, qualifies leads, and books appointments — 24/7, without you lifting a finger.",
    features: [
      "AI voice agent (custom to your business)",
      "24/7 inbound call handling",
      "Lead qualification & appointment booking",
      "Calendar sync",
      "SMS & email lead alerts",
      "Done-for-you setup",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Agent + Website",
    badge: "Most Popular",
    price: "$797",
    per: "/mo",
    tagline: "Capture every lead — whether they call or search online.",
    description: "Your AI agent handles every call while your website pulls in leads around the clock. Two channels, one seamless system.",
    features: [
      "Everything in AI Voice Agent",
      "Custom-built business website",
      "SEO-optimized pages",
      "Lead capture forms & booking widgets",
      "Site and agent work together seamlessly",
      "Priority support",
      "Monthly performance review",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Total Growth System",
    badge: null,
    price: "$2,000+",
    per: "/mo",
    tagline: "Your entire growth engine — built and managed for you.",
    description: "For businesses ready to scale. We handle everything — calls, web presence, ads, and a custom CRM — so you can focus on doing the work.",
    features: [
      "Everything in Agent + Website",
      "Custom CRM (track every lead & client)",
      "Automated follow-up sequences",
      "Google Ads — professionally managed",
      "Facebook & Instagram Ads — professionally managed",
      "Dedicated account manager",
      "Monthly strategy & performance review",
    ],
    cta: "Apply Now",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-24 border-t border-black/8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-16">
          <p className="text-neutral-400 text-sm font-medium uppercase tracking-widest mb-4">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Most small businesses are running on a cell phone. We fix that.
          </h2>
          <p className="text-neutral-500 max-w-xl text-lg">
            No long-term contracts. Cancel anytime. Most clients see ROI within the first 30 days.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-black/8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col gap-8 p-8 ${
                plan.highlight ? "bg-black text-white" : "bg-white"
              }`}
            >
              {plan.badge && (
                <div className="absolute top-8 right-8 px-2 py-0.5 text-xs font-semibold bg-white text-black">
                  {plan.badge}
                </div>
              )}

              <div>
                <p className={`text-xs font-semibold uppercase tracking-widest mb-4 ${plan.highlight ? "text-neutral-400" : "text-neutral-400"}`}>
                  {plan.name}
                </p>
                <div className="flex items-end gap-1 mb-3">
                  <span className={`text-4xl font-bold ${plan.highlight ? "text-white" : "text-black"}`}>{plan.price}</span>
                  <span className={`text-sm mb-1 ${plan.highlight ? "text-neutral-400" : "text-neutral-400"}`}>{plan.per}</span>
                </div>
                <p className={`text-sm font-medium mb-2 ${plan.highlight ? "text-white" : "text-black"}`}>{plan.tagline}</p>
                <p className={`text-sm leading-relaxed ${plan.highlight ? "text-neutral-400" : "text-neutral-500"}`}>{plan.description}</p>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className={`flex items-start gap-3 text-sm ${plan.highlight ? "text-neutral-300" : "text-neutral-600"}`}>
                    <svg className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? "text-white" : "text-black"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center py-3 text-sm font-semibold transition-colors ${
                  plan.highlight
                    ? "bg-white text-black hover:bg-neutral-100"
                    : "border border-black text-black hover:bg-black hover:text-white"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-neutral-400 text-xs mt-8">
          All plans include setup. Annual plans available — ask us about discounts.
        </p>
      </div>
    </section>
  );
}
