import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Calculator from "@/components/Calculator";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Revenue Leak Calculator — VoiceFlow AI",
  description:
    "Find out exactly how much revenue your business is losing from missed calls. Adjust the sliders to see your daily, weekly, and monthly losses.",
};

export default function CalculatorPage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-950 min-h-screen pt-16">
        <Calculator />
      </main>
      <Footer />
    </>
  );
}
