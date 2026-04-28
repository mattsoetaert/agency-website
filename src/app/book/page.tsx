import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingContent from "@/components/BookingContent";

export const metadata: Metadata = {
  title: "Book Your Strategy Call — Vantage Web",
  description:
    "Complete your booking and choose a time for your website strategy call.",
};

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <main>
        <BookingContent />
      </main>
      <Footer />
    </>
  );
}
