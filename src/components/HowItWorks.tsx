const steps = [
  {
    step: "01",
    title: "Discovery Call",
    description:
      "We learn your service, market, offer, and what should happen when a qualified visitor lands on your site.",
  },
  {
    step: "02",
    title: "Strategy & Wireframe",
    description:
      "We map the structure, headlines, sections, and calls to action before we move into design and build.",
  },
  {
    step: "03",
    title: "Design & Build",
    description:
      "We turn the strategy into a polished website that feels modern, loads fast, and works cleanly across devices.",
  },
  {
    step: "04",
    title: "Launch & Improve",
    description:
      "Once live, we refine based on what users click, where leads come from, and what additional systems are worth layering in.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#f5f4f0] py-24 border-t border-black/8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-16">
          <p className="text-neutral-400 text-sm font-medium uppercase tracking-widest mb-4">Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">A better website, without guesswork.</h2>
          <p className="text-neutral-500 max-w-xl text-lg">
            We handle the messaging, structure, design, and build so you are not piecing it together yourself.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step) => (
            <div key={step.step} className="flex flex-col">
              <span className="text-xs font-semibold text-neutral-400 tracking-widest mb-4">{step.step}</span>
              <h3 className="text-black font-semibold text-base mb-3">{step.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
