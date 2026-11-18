import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/animations/SmoothScroll";
import FloatingAIButton from "@/components/ai/FloatingAIButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MASTeR Incubation Foundation (MIF) | StartupTN Pre-Incubation Centre",
  description:
    "Official incubation foundation at M.A.M. College of Engineering and Technology (MAMCET), Siruganur, Trichy. Section 8 registered not-for-profit fostering technology startups, engineering research translation, and TANSEED seed funding.",
  keywords: [
    "Incubation Foundation",
    "StartupTN",
    "MAMCET",
    "Trichy Startups",
    "Pre-Incubation Centre",
    "TANSEED",
    "AICTE Incubation",
    "Hardware Prototyping",
    "IoT Makerspace",
  ],
  authors: [{ name: "MASTeR Incubation Foundation" }],
  openGraph: {
    title: "MASTeR Incubation Foundation (MIF) · MAMCET",
    description:
      "Where Ideas Become Impact. StartupTN Recognised Pre-Incubation Centre at MAMCET, Trichy.",
    url: "https://mamcet.edu.in",
    siteName: "MASTeR Incubation Foundation",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} dark`}>
      <body className="min-h-screen bg-[#050814] text-slate-100 font-sans flex flex-col selection:bg-blue-600/30 selection:text-white">
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingAIButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
