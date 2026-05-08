export default function Hero() {
  return (
    <section id="top" className="min-h-screen bg-[#f5f4f0] pt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full pt-10 pb-20 lg:pt-14 lg:pb-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black leading-[1.05] tracking-tight mb-6">
              Supercharge your online presence and turn visitors into customers.
            </h1>

            <p className="text-neutral-500 text-xl leading-relaxed mb-10 max-w-xl">
              We build conversion focused websites for service companies that want more calls, want to bid higher, and want a stronger first impression.
            </p>
            <div className="flex flex-wrap gap-12">
              {[
                { value: "Fast", label: "Load times" },
                { value: "Clear", label: "Messaging" },
                { value: "Mobile", label: "First design" },
                { value: "Built", label: "To convert" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-black">{stat.value}</div>
                  <div className="text-sm text-neutral-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <a
            href="/start"
            className="group block bg-white border border-black/10 shadow-[0_24px_80px_rgba(0,0,0,0.08)] p-8 sm:p-10 hover:shadow-[0_28px_90px_rgba(0,0,0,0.12)] transition-shadow"
          >
            <p className="text-neutral-400 text-xs font-semibold uppercase tracking-[0.24em] mb-4">
              Watch first
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3 leading-tight">
              See exactly what we do for your business.
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed mb-8">
              A 5-minute walkthrough of how we turn websites into customers.
            </p>

            <div className="relative aspect-video bg-black mb-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-black" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/95 group-hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all group-hover:scale-110">
                  <svg
                    className="w-7 h-7 text-black ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <span className="inline-flex w-full items-center justify-center px-6 py-4 bg-black group-hover:bg-neutral-800 text-white font-semibold text-sm transition-colors">
              Check Out a Video of What We Do →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
