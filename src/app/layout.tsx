import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import LeadConnectorWidget from "@/components/LeadConnectorWidget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cornerstone Marketing — Conversion-Focused Websites for Service Businesses",
  description:
    "We design and build conversion-focused websites for service businesses, with automation and AI add-ons available later as the business grows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <LeadConnectorWidget />
        <Analytics />
        <Script
          src="https://api.getcornerstonemarketing.com/js/external-tracking.js"
          data-tracking-id="tk_a3909e46fe7e4d278130676fdd2af38a"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
