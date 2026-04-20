const plans = [
  {
    name: "Starter",
    price: "$497",
    per: "/mo",
    description: "Perfect for solo operators and small teams just getting started.",
    features: [
      "1 AI voice agent",
      "Up to 500 calls/month",
      "Appointment booking",
      "Email + SMS lead alerts",
      "Basic call reports",
      "Setup included",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$997",
    per: "/mo",
    description: "For established businesses that want to scale without adding headcount.",
    features: [
      "2 AI voice agents",
      "Up to 2,000 calls/month",
      "CRM & calendar integrations",
      "Lead qualification flows",
      "Advanced analytics dashboard",
      "Priority support",
      "Monthly strategy call",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    per: "",
    description: "Multi-location businesses and franchises with high call volumes.",
    features: [
      "Unlimited agents & locations",
      "Unlimited call volume",
      "Custom integrations & APIs",
      "Dedicated account manager",
      "White-glove onboarding",
      "SLA guarantee",
    ],
    cta: "Contact Us",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-slate-900 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            No long-term contracts. Cancel anytime. ROI typically pays for itself in the first month.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 flex flex-col gap-6 ${
                plan.highlight
                  ? "border-2 border-indigo-500 bg-indigo-500/5 shadow-xl shadow-indigo-500/10"
                  : "border border-white/5 bg-white/2"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-500 text-white text-xs font-semibold">
                  Most Popular
                </div>
              )}

              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">{plan.name}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400 text-sm mb-1">{plan.per}</span>
                </div>
                <p className="text-slate-500 text-sm mt-2">{plan.description}</p>
              </div>

              <ul className="flex flex-col gap-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <svg className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.highlight
                    ? "bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/25"
                    : "border border-white/10 bg-white/5 hover:bg-white/10 text-white"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
