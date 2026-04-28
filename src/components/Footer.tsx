export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/8 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center w-7 h-7 bg-black text-white font-bold text-xs">V</span>
              <span className="font-semibold text-black tracking-tight text-sm">Vantage Web</span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
              Conversion-focused websites for service businesses, with room to add automation and AI once the foundation is working.
            </p>
          </div>

          <div>
            <p className="text-black text-xs font-semibold uppercase tracking-widest mb-4">Product</p>
            <ul className="flex flex-col gap-2.5 text-sm text-neutral-500">
              <li><a href="#features" className="hover:text-black transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-black transition-colors">How it Works</a></li>
              <li><a href="#faq" className="hover:text-black transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-black transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="text-black text-xs font-semibold uppercase tracking-widest mb-4">Company</p>
            <ul className="flex flex-col gap-2.5 text-sm text-neutral-500">
              <li><a href="#" className="hover:text-black transition-colors">About</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Blog</a></li>
              <li><a href="#contact" className="hover:text-black transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Vantage Web. All rights reserved.</p>
          <p>Built for service businesses that want a website that actually sells.</p>
        </div>
      </div>
    </footer>
  );
}
