export default function CTA() {
  return (
    <section id="contact" className="bg-slate-900 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="relative rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-violet-500/5 px-8 py-16 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />

          <div className="relative">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Get Started Today
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Stop losing customers to voicemail
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Book a free 30-minute demo and we'll show you exactly how a custom AI voice agent would work for your business — no commitment required.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/25 whitespace-nowrap"
              >
                Book Free Demo
              </button>
            </form>

            <p className="text-slate-600 text-xs">
              No spam, ever. We'll reach out within 1 business day to schedule your demo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
