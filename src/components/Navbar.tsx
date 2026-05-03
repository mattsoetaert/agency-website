"use client";

import { useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import { highLevelLoginUrl } from "@/lib/highlevel";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#f5f4f0]/90 backdrop-blur border-b border-black/8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <BrandLogo href="/" imageClassName="h-10 w-auto max-w-[180px]" priority />

        <div className="hidden md:flex items-center gap-8 text-sm text-neutral-500">
          <a href="#features" className="hover:text-black transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-black transition-colors">How it Works</a>
          <a href="#faq" className="hover:text-black transition-colors">FAQ</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={highLevelLoginUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-neutral-500 hover:text-black transition-colors"
          >
            Log in
          </a>
          <a
            href="#contact"
            className="text-sm px-4 py-2 bg-black hover:bg-neutral-800 text-white font-medium transition-colors"
          >
            Book a Call
          </a>
        </div>

        <button
          className="md:hidden text-neutral-500 hover:text-black"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-black/8 bg-[#f5f4f0] px-4 py-4 flex flex-col gap-4 text-sm">
          <a href="#features" className="text-neutral-500 hover:text-black" onClick={() => setOpen(false)}>Features</a>
          <a href="#how-it-works" className="text-neutral-500 hover:text-black" onClick={() => setOpen(false)}>How it Works</a>
          <a href="#faq" className="text-neutral-500 hover:text-black" onClick={() => setOpen(false)}>FAQ</a>
          <a
            href={highLevelLoginUrl}
            target="_blank"
            rel="noreferrer"
            className="text-center px-4 py-2 border border-black/15 text-black font-medium hover:bg-white"
            onClick={() => setOpen(false)}
          >
            Client Login
          </a>
          <a
            href="#contact"
            className="text-center px-4 py-2 bg-black hover:bg-neutral-800 text-white font-medium"
            onClick={() => setOpen(false)}
          >
            Book a Call
          </a>
        </div>
      )}
    </nav>
  );
}
