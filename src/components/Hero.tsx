export default function Hero() {
  return (
    <section id="top" className="min-h-screen bg-[#f5f4f0] pt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full pt-10 pb-20 lg:pt-14 lg:pb-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
          <div className="max-w-2xl lg:self-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black leading-[1.05] tracking-tight mb-6">
              Websites built to turn visitors into booked jobs.
            </h1>

            <p className="text-neutral-500 text-xl leading-relaxed mb-10 max-w-xl">
              We design and build clean, conversion-focused websites for service businesses that need more calls, more form fills, and a stronger first impression.
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

          <div className="bg-white border border-black/10 shadow-[0_24px_80px_rgba(0,0,0,0.08)] p-6 sm:p-8">
            <p className="text-neutral-400 text-xs font-semibold uppercase tracking-[0.24em] mb-4">Book Appointment</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3">Tell us about your business first.</h2>
            <p className="text-neutral-500 text-sm leading-relaxed mb-6">
              Fill this out, then you will go straight to the booking page to choose a time.
            </p>

            <form action="/api/leads" method="post" className="space-y-4">
              <input type="hidden" name="source" value="website" />
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="block text-xs font-medium text-neutral-500 mb-2">Name</span>
                  <input
                    name="name"
                    type="text"
                    placeholder="Jane Smith"
                    required
                    className="w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black placeholder-neutral-400 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-medium text-neutral-500 mb-2">Business</span>
                  <input
                    name="business"
                    type="text"
                    placeholder="Smith Plumbing"
                    className="w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black placeholder-neutral-400 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </label>
              </div>

              <label className="block">
                <span className="block text-xs font-medium text-neutral-500 mb-2">Email</span>
                <input
                  name="email"
                  type="email"
                  placeholder="jane@business.com"
                  required
                  className="w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black placeholder-neutral-400 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-medium text-neutral-500 mb-2">Phone</span>
                <input
                  name="phone"
                  type="tel"
                  placeholder="(555) 555-5555"
                  className="w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black placeholder-neutral-400 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-medium text-neutral-500 mb-2">What do you need?</span>
                <textarea
                  name="details"
                  rows={4}
                  placeholder="New website, redesign, landing page, better lead flow, or anything else."
                  className="w-full px-4 py-3 bg-[#f5f4f0] border border-black/10 text-black placeholder-neutral-400 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-black"
                />
              </label>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-black hover:bg-neutral-800 text-white font-semibold text-sm transition-colors"
              >
                Continue To Booking
              </button>
            </form>

            <p className="text-neutral-400 text-xs mt-4">
              Step 2 opens immediately after you submit this form.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
