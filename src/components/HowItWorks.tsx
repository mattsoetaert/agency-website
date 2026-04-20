const steps = [
  {
    step: "01",
    title: "Discovery Call",
    description:
      "We spend 30 minutes learning your business — how you handle calls, what questions come up most, and what outcomes matter to you.",
  },
  {
    step: "02",
    title: "We Build Your Agent",
    description:
      "Our team builds and trains a custom voice agent tailored to your industry, services, and brand voice. No templates — fully bespoke.",
  },
  {
    step: "03",
    title: "Test & Refine",
    description:
      "You test the agent yourself before launch. We refine responses, tweak the flow, and make sure it sounds exactly right.",
  },
  {
    step: "04",
    title: "Go Live in Days",
    description:
      "We forward your calls (or a new number) to the agent. From day one, every call is answered and logged automatically.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-900 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Live in under 2 weeks</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            We handle the entire setup. You just need to show up for one call.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

          {steps.map((s) => (
            <div key={s.step} className="relative flex flex-col items-center text-center p-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 font-bold text-lg mb-5 z-10">
                {s.step}
              </div>
              <h3 className="text-white font-semibold text-base mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
