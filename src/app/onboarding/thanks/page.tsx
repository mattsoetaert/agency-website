import type { Metadata } from "next";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "Onboarding Received - Cornerstone Marketing",
  description: "Your website onboarding form has been received.",
};

export default function OnboardingThanksPage() {
  return (
    <main className="min-h-screen bg-[#f5f4f0]">
      <header className="border-b border-black/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <BrandLogo href="/" imageClassName="h-10 w-auto max-w-[180px]" />
        </div>
      </header>

      <section className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-2xl mx-auto bg-white border border-black/10 p-6 sm:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
          <p className="text-black text-base font-semibold uppercase tracking-[0.24em] mb-4">Received</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">Your onboarding form was submitted.</h1>
          <p className="text-black text-base leading-relaxed mb-8">
            We have the details needed to start mapping your website. If anything is missing, we will follow up by email.
          </p>
          <Link href="/" className="inline-flex px-5 py-3 bg-black hover:bg-neutral-800 text-white font-semibold text-lg transition-colors">
            Back to homepage
          </Link>
        </div>
      </section>
    </main>
  );
}
