export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500 text-white font-bold text-sm">V</span>
              <span className="font-semibold text-white tracking-tight">VoiceFlow AI</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Custom AI voice agents that answer calls, book appointments, and grow your service business — automatically.
            </p>
          </div>

          <div>
            <p className="text-white text-sm font-semibold mb-4">Product</p>
            <ul className="flex flex-col gap-2 text-sm text-slate-500">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <p className="text-white text-sm font-semibold mb-4">Company</p>
            <ul className="flex flex-col gap-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} VoiceFlow AI. All rights reserved.</p>
          <p>Built for service businesses that are serious about growth.</p>
        </div>
      </div>
    </footer>
  );
}
