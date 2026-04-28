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
    <section className="bg-[#f5f4f0] py-24 border-t border-black/8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-16">
          <p className="text-neutral-400 text-sm font-medium uppercase tracking-widest mb-4">Results</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Real businesses, real revenue.
          </h2>
          <p className="text-neutral-500 max-w-xl text-lg">
            Hear from owners who no longer stress about missed calls.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-black/8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-[#f5f4f0] p-8 flex flex-col gap-6"
            >
              <div className="flex gap-0.5 text-black text-sm">{"★★★★★"}</div>
              <p className="text-neutral-600 text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-black/8">
                <div className="w-8 h-8 bg-black flex items-center justify-center text-white text-xs font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-black text-sm font-medium">{t.name}</p>
                  <p className="text-neutral-400 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
