export default function CTA() {
  return (
    <section id="contact" className="bg-[#f5f4f0] py-24 border-t border-black/8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-xl">
          <p className="text-neutral-400 text-sm font-medium uppercase tracking-widest mb-4">Get Started</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Start with the website your business should already have.
          </h2>
          <p className="text-neutral-500 text-lg mb-8">
            Book a strategy call and we will map out what your site needs to say, what it needs to do, and where automation can come later.
          </p>

          <a
            href="#top"
            className="inline-flex px-6 py-3 bg-black hover:bg-neutral-800 text-white font-semibold text-sm transition-colors whitespace-nowrap"
          >
            Book Strategy Call
          </a>

          <p className="text-neutral-400 text-xs mt-4">
            No spam. We will reach out within 1 business day to schedule the call.
          </p>
        </div>
      </div>
    </section>
  );
}
