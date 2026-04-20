"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-slate-950/80 backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500 text-white font-bold text-sm">V</span>
          <span className="font-semibold text-white tracking-tight">VoiceFlow AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#contact" className="text-sm text-slate-400 hover:text-white transition-colors">Log in</a>
          <a
            href="#contact"
            className="text-sm px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-colors"
          >
            Book a Demo
          </a>
        </div>

        <button
          className="md:hidden text-slate-400 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-slate-950 px-4 py-4 flex flex-col gap-4 text-sm">
          <a href="#features" className="text-slate-400 hover:text-white" onClick={() => setOpen(false)}>Features</a>
          <a href="#how-it-works" className="text-slate-400 hover:text-white" onClick={() => setOpen(false)}>How it Works</a>
          <a href="#pricing" className="text-slate-400 hover:text-white" onClick={() => setOpen(false)}>Pricing</a>
          <a href="#faq" className="text-slate-400 hover:text-white" onClick={() => setOpen(false)}>FAQ</a>
          <a
            href="#contact"
            className="text-center px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-medium"
            onClick={() => setOpen(false)}
          >
            Book a Demo
          </a>
        </div>
      )}
    </nav>
  );
}
