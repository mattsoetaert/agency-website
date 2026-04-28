const features = [
  {
    title: "10+ Pages",
    description:
      "Enough room to properly present your services, service areas, trust signals, and conversion paths without cramming everything onto a single page.",
  },
  {
    title: "High-Visibility SEO",
    description:
      "Make sure your business shows up in more searches with a site structure and page coverage built to support stronger local visibility.",
  },
  {
    title: "Conversion-Focused Pages",
    description:
      "Every section has a job: build trust, answer objections, and move the visitor toward calling, booking, or submitting a form.",
  },
  {
    title: "Mobile-First Design",
    description:
      "Most traffic is on phones. We build for small screens first so the site feels sharp, readable, and easy to act on anywhere.",
  },
  {
    title: "Fast Performance",
    description:
      "A slow site bleeds trust. We keep things lean so pages load quickly and visitors do not bounce before they see your offer.",
  },
  {
    title: "Automation",
    description:
      "Once the website foundation is in place, we can layer in forms, lead routing, follow-up systems, and other automation that saves time and captures more opportunities.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-24 border-t border-black/8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-16">
          <p className="text-neutral-400 text-sm font-medium uppercase tracking-widest mb-4">Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Everything a service business website should do.
          </h2>
          <p className="text-neutral-500 max-w-3xl text-lg leading-relaxed">
            We understand the needs of local service businesses. People buy from businesses they trust, and a polished website helps create that trust from the first click. It does more than improve your odds of being found online. It shapes how prospects perceive your business and increases the likelihood that they choose you over the competition.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white p-8">
              <h3 className="text-black font-semibold text-base mb-3">{feature.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
