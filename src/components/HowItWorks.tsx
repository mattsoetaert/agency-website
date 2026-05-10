const steps = [
  {
    step: "01",
    title: "Demo Call",
    description:
      "We get you on the phone, answer your questions, and make sure you are a good fit before anything starts.",
  },
  {
    step: "02",
    title: "We Build Your System",
    description:
      "We build out your website, review funnel, missed-call follow-up, and software setup in 5-7 days.",
  },
  {
    step: "03",
    title: "Launch Call",
    description:
      "We introduce you to the tools you need, show you how everything works, and get the system live.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#f5f4f0] py-24 border-t border-black/8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-16">
          <p className="text-black text-lg font-medium uppercase tracking-widest mb-4">Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Simple process, fast launch.</h2>
          <p className="text-black max-w-xl text-lg">
            You get the answers first, then we build the system, then we walk you through everything on launch.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div key={step.step} className="flex flex-col">
              <span className="text-base font-semibold text-black tracking-widest mb-4">{step.step}</span>
              <h3 className="text-black font-semibold text-base mb-3">{step.title}</h3>
              <p className="text-black text-lg leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
