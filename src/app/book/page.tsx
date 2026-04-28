import type { Metadata } from "next";
import { Suspense } from "react";
import BookingContent from "@/components/BookingContent";

export const metadata: Metadata = {
  title: "Book Your Strategy Call — Vantage Web",
  description:
    "Complete your booking and choose a time for your website strategy call.",
};

export default function BookingPage() {
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#f5f4f0]/90 backdrop-blur border-b border-black/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center h-14">
          <div className="flex items-center gap-2" aria-label="Vantage Web">
            <span className="inline-flex items-center justify-center w-7 h-7 bg-black text-white font-bold text-xs">V</span>
            <span className="font-semibold text-black tracking-tight text-sm">Vantage Web</span>
          </div>
        </div>
      </header>
      <main>
        <Suspense fallback={null}>
          <BookingContent />
        </Suspense>
      </main>
    </>
  );
}
