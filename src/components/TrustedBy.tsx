const industries = [
  "Plumbers",
  "HVAC Companies",
  "Dental Offices",
  "Law Firms",
  "Auto Shops",
  "Real Estate Agents",
  "Med Spas",
  "Contractors",
  "Insurance Agencies",
  "Veterinary Clinics",
];

export default function TrustedBy() {
  return (
    <section className="bg-slate-900 border-y border-white/5 py-10 overflow-hidden">
      <p className="text-center text-xs font-medium tracking-widest uppercase text-slate-500 mb-8">
        Trusted by small service businesses across industries
      </p>
      <div className="relative flex gap-12 overflow-hidden">
        <div className="flex gap-12 animate-[scroll_25s_linear_infinite] whitespace-nowrap shrink-0">
          {[...industries, ...industries].map((name, i) => (
            <span key={i} className="text-slate-400 font-medium text-sm">
              {name}
            </span>
          ))}
        </div>
        <div className="flex gap-12 animate-[scroll_25s_linear_infinite] whitespace-nowrap shrink-0" aria-hidden>
          {[...industries, ...industries].map((name, i) => (
            <span key={i} className="text-slate-400 font-medium text-sm">
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
