import type { Metadata } from "next";
import { Suspense } from "react";
import BrandLogo from "@/components/BrandLogo";
import BookingContent from "@/components/BookingContent";

export const metadata: Metadata = {
  title: "Book Your Strategy Call — Cornerstone Marketing",
  description:
    "Complete your booking and choose a time for your website strategy call.",
};

export default function BookingPage() {
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#f5f4f0]/90 backdrop-blur border-b border-black/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center h-14">
          <BrandLogo imageClassName="h-10 w-auto max-w-[180px]" />
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
