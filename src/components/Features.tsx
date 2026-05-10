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

const reviewFunnelSteps = [
  {
    title: "Review Requests",
    description: "Send customers a simple follow-up after the job while the experience is still fresh.",
  },
  {
    title: "5-Star Routing",
    description: "Guide happy customers straight to the review page so leaving feedback feels effortless.",
  },
  {
    title: "Private Feedback",
    description: "Give unhappy customers a cleaner way to raise concerns before they post publicly.",
  },
  {
    title: "Reputation Lift",
    description: "Build stronger local trust so prospects see proof before they ever call.",
  },
];

const missedCallSteps = [
  {
    title: "Missed Call Trigger",
    description: "When someone calls and nobody answers, the automation starts immediately.",
  },
  {
    title: "Instant Text-Back",
    description: "The lead gets a fast text so they know your company saw the call and will follow up.",
  },
  {
    title: "Email Follow-Up",
    description: "Send a second touchpoint with the next step, booking link, or service intake details.",
  },
  {
    title: "Lead Protection",
    description: "Reduce the chance that the lead calls a competitor just because they answered first.",
  },
];

const softwareSteps = [
  {
    title: "Lead Inbox",
    description: "See new calls, forms, texts, and emails in one place instead of chasing scattered messages.",
  },
  {
    title: "Pipeline Control",
    description: "Track every opportunity from new lead to estimate, booked job, follow-up, and won work.",
  },
  {
    title: "Calendar and Tasks",
    description: "Keep appointments, callbacks, and reminders organized so nothing important slips.",
  },
  {
    title: "Simple Reporting",
    description: "Understand where leads are coming from and what is actually turning into customers.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-24 border-t border-black/8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="text-black text-lg font-medium uppercase tracking-widest mb-4">What we do:</p>
        </div>

        <div className="grid gap-10 border border-black/10 bg-[#f5f4f0] p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center">
          <div>
            <p className="mb-4 text-lg font-semibold uppercase tracking-widest text-black">01</p>
            <h2 className="mb-5 text-3xl font-bold leading-tight text-black sm:text-4xl">
              We build you a professional website, tailored to your business.
            </h2>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-black">
              A polished site gives customers a clear reason to trust you, call you, and choose you over the cheaper option. We build the full foundation so your business looks sharp and converts better from the first visit.
            </p>

            <div className="grid gap-px bg-black/8 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="bg-white p-5">
                  <h3 className="mb-2 text-lg font-semibold text-black">{feature.title}</h3>
                  <p className="text-lg leading-relaxed text-black">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden border border-black/10 bg-white p-5 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
            <div className="mb-5 flex items-center gap-2 border-b border-black/8 pb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              <div className="ml-3 h-7 flex-1 bg-[#f5f4f0]" />
            </div>

            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
                <div>
                  <div className="mb-3 h-7 w-3/4 animate-[previewPulse_4s_ease-in-out_infinite] bg-black" />
                  <div className="mb-2 h-3 w-full bg-neutral-200" />
                  <div className="mb-5 h-3 w-5/6 bg-neutral-200" />
                  <div className="h-10 w-36 bg-black" />
                </div>
                <div className="min-h-28 bg-[#f5f4f0]" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="h-20 bg-[#f5f4f0] p-3">
                    <div className="mb-3 h-3 w-12 bg-black/80" />
                    <div className="h-2 w-full bg-neutral-300" />
                  </div>
                ))}
              </div>

              <div className="grid gap-3">
                {[72, 88, 64].map((width, index) => (
                  <div key={width} className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-black" />
                    <div className="h-3 flex-1 bg-neutral-200">
                      <div
                        className="h-full animate-[barGrow_3.5s_ease-in-out_infinite] bg-black"
                        style={{ width: `${width}%`, animationDelay: `${index * 0.35}s` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-5 right-5 w-44 border border-black/10 bg-black p-4 text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
              <p className="mb-1 text-base text-white/60">Lead flow</p>
              <p className="text-2xl font-bold">Ready</p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-10 border border-black/10 bg-white p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center">
          <div>
            <p className="mb-4 text-lg font-semibold uppercase tracking-widest text-black">02</p>
            <h2 className="mb-5 text-3xl font-bold leading-tight text-black sm:text-4xl">
              We build you a magic review funnel to make sure that all of your customers leave 5-star reviews.
            </h2>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-black">
              The review funnel helps you ask at the right time, send happy customers to the right place, and catch bad experiences before they hurt your reputation.
            </p>

            <div className="grid gap-px bg-black/8 sm:grid-cols-2">
              {reviewFunnelSteps.map((step) => (
                <div key={step.title} className="bg-[#f5f4f0] p-5">
                  <h3 className="mb-2 text-lg font-semibold text-black">{step.title}</h3>
                  <p className="text-lg leading-relaxed text-black">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden border border-black/10 bg-[#f5f4f0] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
            <div className="mx-auto flex max-w-72 flex-col gap-4">
              <div className="border border-black/10 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
                <p className="mb-2 text-base font-semibold uppercase tracking-widest text-black">Customer check-in</p>
                <p className="mb-4 text-lg font-bold text-black">How was your service?</p>
                <div className="mb-4 flex gap-1">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <span
                      key={star}
                      className="animate-[starPop_2.8s_ease-in-out_infinite] text-2xl text-black"
                      style={{ animationDelay: `${star * 0.16}s` }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="h-10 bg-black" />
              </div>

              <div className="ml-auto w-60 border border-black/10 bg-black p-4 text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
                <p className="mb-1 text-base text-white/60">Happy customer</p>
                <p className="text-xl font-bold">Sent to Google</p>
              </div>

              <div className="w-60 border border-black/10 bg-white p-4">
                <p className="mb-1 text-base text-black">Needs attention</p>
                <p className="text-base font-semibold text-black">Private feedback captured</p>
              </div>
            </div>

            <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-3">
              {["Ask", "Route", "Grow"].map((label, index) => (
                <div key={label} className="bg-white p-3 text-center">
                  <div className="mx-auto mb-2 h-2 w-10 animate-[barGrow_3.5s_ease-in-out_infinite] bg-black" style={{ animationDelay: `${index * 0.3}s` }} />
                  <p className="text-base font-semibold text-black">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-10 border border-black/10 bg-[#f5f4f0] p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center">
          <div>
            <p className="mb-4 text-lg font-semibold uppercase tracking-widest text-black">03</p>
            <h2 className="mb-5 text-3xl font-bold leading-tight text-black sm:text-4xl">
              We automate text-back and email follow-up when a lead calls your company and you don&apos;t pick up.
            </h2>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-black">
              This drops the likelihood of losing leads to competitors because someone else answered and you didn&apos;t. Your business follows up fast, even when you miss the call.
            </p>

            <div className="grid gap-px bg-black/8 sm:grid-cols-2">
              {missedCallSteps.map((step) => (
                <div key={step.title} className="bg-white p-5">
                  <h3 className="mb-2 text-lg font-semibold text-black">{step.title}</h3>
                  <p className="text-lg leading-relaxed text-black">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden border border-black/10 bg-white p-5 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
            <div className="mx-auto flex max-w-80 flex-col gap-4">
              <div className="border border-black/10 bg-[#f5f4f0] p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center bg-black text-white">
                    <span className="animate-[ringPulse_2.4s_ease-in-out_infinite] text-xl font-bold">!</span>
                  </div>
                  <div>
                    <p className="text-base font-semibold uppercase tracking-widest text-black">Missed call</p>
                    <p className="text-lg font-bold text-black">New lead waiting</p>
                  </div>
                </div>
                <div className="h-3 w-full bg-neutral-300" />
              </div>

              <div className="ml-auto w-64 border border-black/10 bg-black p-4 text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
                <p className="mb-2 text-base text-white/60">Auto text-back</p>
                <p className="text-lg leading-relaxed">
                  Thanks for calling. We missed you, but can help. What service do you need?
                </p>
              </div>

              <div className="w-64 border border-black/10 bg-[#f5f4f0] p-4">
                <p className="mb-2 text-base text-black">Email follow-up</p>
                <div className="mb-2 h-3 w-40 bg-black" />
                <div className="mb-2 h-2 w-full bg-neutral-300" />
                <div className="h-2 w-4/5 bg-neutral-300" />
              </div>

              <div className="ml-auto w-64 border border-black/10 bg-white p-4">
                <p className="mb-2 text-base text-black">Next step</p>
                <div className="h-10 bg-black" />
              </div>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 border border-black/10 bg-[#f5f4f0] p-4">
              <div className="h-3 flex-1 bg-neutral-300">
                <div className="h-full animate-[barGrow_3.5s_ease-in-out_infinite] bg-black" style={{ width: "78%" }} />
              </div>
              <p className="text-base font-semibold text-black">Follow-up sent</p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-10 border border-black/10 bg-white p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center">
          <div>
            <p className="mb-4 text-lg font-semibold uppercase tracking-widest text-black">04</p>
            <h2 className="mb-5 text-3xl font-bold leading-tight text-black sm:text-4xl">
              We give you complete management and control over your company with our easy to use, all-in-one software.
            </h2>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-black">
              Your leads, messages, appointments, follow-ups, and reporting live in one simple system so you can run the front end of your business without jumping between tools.
            </p>

            <div className="grid gap-px bg-black/8 sm:grid-cols-2">
              {softwareSteps.map((step) => (
                <div key={step.title} className="bg-[#f5f4f0] p-5">
                  <h3 className="mb-2 text-lg font-semibold text-black">{step.title}</h3>
                  <p className="text-lg leading-relaxed text-black">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden border border-black/10 bg-[#f5f4f0] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
            <div className="grid h-full min-h-[380px] grid-cols-[96px_1fr] border border-black/10 bg-white">
              <div className="border-r border-black/8 bg-black p-4">
                <div className="mb-8 h-7 w-12 bg-white" />
                {["Leads", "Inbox", "Jobs", "Stats"].map((item) => (
                  <div key={item} className="mb-4">
                    <div className="mb-2 h-2 w-12 bg-white/70" />
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">{item}</p>
                  </div>
                ))}
              </div>

              <div className="p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="mb-2 text-base font-semibold uppercase tracking-widest text-black">Company dashboard</p>
                    <div className="h-6 w-40 bg-black" />
                  </div>
                  <div className="h-9 w-24 bg-[#f5f4f0]" />
                </div>

                <div className="mb-5 grid grid-cols-3 gap-3">
                  {[12, 8, 5].map((value, index) => (
                    <div key={value} className="bg-[#f5f4f0] p-3">
                      <p className="mb-2 text-base text-black">{["New", "Booked", "Won"][index]}</p>
                      <p className="text-2xl font-bold text-black">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3">
                  {["New roof estimate", "Painter follow-up", "Window cleaning quote", "Drywall repair lead"].map(
                    (item, index) => (
                      <div key={item} className="flex items-center gap-3 border border-black/8 bg-white p-3">
                        <div className="h-8 w-8 bg-black" />
                        <div className="flex-1">
                          <p className="text-lg font-semibold text-black">{item}</p>
                          <div className="mt-2 h-2 bg-neutral-200">
                            <div
                              className="h-full animate-[barGrow_3.5s_ease-in-out_infinite] bg-black"
                              style={{ width: `${72 - index * 10}%`, animationDelay: `${index * 0.2}s` }}
                            />
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="absolute bottom-5 right-5 w-44 border border-black/10 bg-black p-4 text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
              <p className="mb-1 text-base text-white/60">Control center</p>
              <p className="text-2xl font-bold">Live</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes previewPulse {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.72; transform: translateY(2px); }
        }

        @keyframes barGrow {
          0%, 100% { transform: scaleX(0.72); transform-origin: left; }
          50% { transform: scaleX(1); transform-origin: left; }
        }

        @keyframes starPop {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.75; }
          50% { transform: translateY(-2px) scale(1.08); opacity: 1; }
        }

        @keyframes ringPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.65; transform: scale(1.18); }
        }
      `}</style>
    </section>
  );
}
