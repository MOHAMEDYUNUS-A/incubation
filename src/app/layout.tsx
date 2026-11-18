import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/animations/SmoothScroll";
import FloatingAIButton from "@/components/ai/FloatingAIButton";
import SplashScreen from "@/components/ui/SplashScreen";
import GsapScrollProvider from "@/components/animations/GsapScrollProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: "MASTeR Incubation Foundation (MIF) · MAMCET",
    description:
      "Launchpad for your Entrepreneurial Success. StartupTN Recognised Pre-Incubation Centre at MAMCET, Trichy.",
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
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-blue-100 selection:text-blue-900">
        <SplashScreen />
        <GsapScrollProvider>
          <SmoothScroll>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingAIButton />
          </SmoothScroll>
        </GsapScrollProvider>
      </body>
    </html>
  );
}
