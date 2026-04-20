const testimonials = [
  {
    quote:
      "We were losing leads every weekend when no one was in the office. Since we set up the voice agent, we've booked 40% more consultations — the agent even handles after-hours calls from out-of-state clients.",
    name: "Sarah M.",
    role: "Owner, Coastal Plumbing Co.",
    initials: "SM",
  },
  {
    quote:
      "I was skeptical it would sound natural enough. Customers have no idea they're talking to AI — I've had patients say it was the nicest receptionist we've ever had.",
    name: "Dr. James T.",
    role: "Dentist, Lakeside Dental",
    initials: "JT",
  },
  {
    quote:
      "The ROI was immediate. It replaced $3,200/month in answering service costs and books twice as many tune-ups as our old system. Best investment I've made in years.",
    name: "Mike R.",
    role: "Owner, Premier HVAC Solutions",
    initials: "MR",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Results</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Real businesses, real revenue
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Hear from owners who no longer stress about missed calls.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-white/5 bg-white/2 p-6 flex flex-col gap-4"
            >
              <div className="flex gap-1 text-indigo-400 text-lg">{"★★★★★"}</div>
              <p className="text-slate-300 text-sm leading-relaxed flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 text-xs font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
