export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden pt-16">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          AI Voice Agents — Available 24/7
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
          Never Miss a{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Customer Call
          </span>{" "}
          Again
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed">
          We build custom AI voice agents that answer calls, book appointments, and qualify leads
          for your business — 24 hours a day, 7 days a week. No hold times. No missed revenue.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="px-8 py-4 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-base transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-400/30 hover:-translate-y-0.5"
          >
            Book a Free Demo
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-base transition-all"
          >
            See How It Works
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { value: "< 1s", label: "Response Time" },
            { value: "24/7", label: "Always On" },
            { value: "97%", label: "Call Answer Rate" },
            { value: "3×", label: "More Bookings" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/5 bg-white/3 p-4">
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
