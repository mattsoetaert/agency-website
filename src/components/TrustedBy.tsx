const industries = [
  "Painters",
  "Roofers",
  "Carpenters",
  "Window Washers",
  "Cleaners",
  "Drywall Pros",
  "Fence Installers",
  "Flooring Crews",
  "Landscapers",
  "Gutter Installers",
  "Handyman Services",
  "Garage Door Pros",
];

export default function TrustedBy() {
  return (
    <section className="bg-white border-y border-black/8 py-10 overflow-hidden">
      <p className="text-center text-xs font-medium tracking-widest uppercase text-neutral-400 mb-8">
        Built for mid-ticket contractor and home service businesses
      </p>
      <div className="relative flex gap-12 overflow-hidden">
        <div className="flex gap-12 animate-[scroll_25s_linear_infinite] whitespace-nowrap shrink-0">
          {[...industries, ...industries].map((name, i) => (
            <span key={i} className="text-neutral-500 font-medium text-sm">
              {name}
            </span>
          ))}
        </div>
        <div className="flex gap-12 animate-[scroll_25s_linear_infinite] whitespace-nowrap shrink-0" aria-hidden>
          {[...industries, ...industries].map((name, i) => (
            <span key={i} className="text-neutral-500 font-medium text-sm">
              {name}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
