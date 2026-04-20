const features = [
  {
    icon: "📞",
    title: "Answers Every Call",
    description:
      "Your AI agent picks up every call instantly — no hold music, no voicemail, no lost leads. Customers get help immediately, day or night.",
  },
  {
    icon: "📅",
    title: "Books Appointments",
    description:
      "Integrates directly with your calendar to schedule, reschedule, and confirm appointments without any manual work on your end.",
  },
  {
    icon: "🎯",
    title: "Qualifies Leads",
    description:
      "Asks the right questions, captures contact info, and routes high-value callers to you immediately while handling routine inquiries automatically.",
  },
  {
    icon: "🗣️",
    title: "Sounds Human",
    description:
      "Powered by the latest voice AI — natural pauses, realistic tone, and conversational flow that callers trust and respond well to.",
  },
  {
    icon: "🔗",
    title: "Connects Your Tools",
    description:
      "Syncs with your CRM, scheduling software, and notification tools so nothing falls through the cracks.",
  },
  {
    icon: "📊",
    title: "Reports & Insights",
    description:
      "See exactly how many calls were handled, what customers asked about, and where opportunities are slipping through.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-slate-950 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything your front desk does — automated
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Your AI voice agent handles the whole call lifecycle, so you and your team can focus on the actual work.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-white/5 bg-white/2 hover:bg-white/5 p-6 transition-all hover:-translate-y-1"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
