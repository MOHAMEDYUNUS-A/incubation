import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/animations/SmoothScroll";
import FloatingAIButton from "@/components/ai/FloatingAIButton";
import GsapScrollProvider from "@/components/animations/GsapScrollProvider";
import { ScrollProgressBar } from "@/components/animations/LightAnimations";
import { ContentProvider } from "@/context/ContentContext";
import JsonLd from "@/components/seo/JsonLd";

export const viewport: Viewport = {
  themeColor: "#091b34",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://incubation.mamcet.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "MASTeR Incubation Foundation (MIF) | StartupTN Pre-Incubation Centre · MAMCET",
    template: "%s | MASTeR Incubation Foundation (MIF)",
  },
  description:
    "Official Section 8 Technology Business Incubator and StartupTN Recognised Pre-Incubation Centre at M.A.M. College of Engineering and Technology (MAMCET), Siruganur, Tiruchirappalli. Empowering student & faculty ventures, IoT prototyping, TANSEED grants, and verifiable Startup Passports.",
  applicationName: "MASTeR Incubation Foundation",
  authors: [
    { name: "MASTeR Incubation Foundation", url: baseUrl },
    { name: "M.A.M. College of Engineering & Technology", url: "https://mamcet.edu.in" },
  ],
  generator: "Next.js",
  keywords: [
    // Core Entity & Geography
    "MASTeR Incubation Foundation",
    "MIF Incubation",
    "MAMCET Incubation",
    "StartupTN Trichy",
    "Pre-Incubation Centre Tiruchirappalli",
    "Siruganur Innovation Hub",
    "Tamil Nadu Startup Incubator",
    "Technology Business Incubator Trichy",
    "MAMCET Siruganur",
    // Grants & Funding
    "TANSEED Seed Grant",
    "TANSEED 4.0",
    "TANSEED 5.0",
    "MSME Idea Hackathon",
    "EDII-TN Innovation Voucher Programme",
    "IVP-A Voucher",
    "IVP-B Voucher",
    "Pre-Seed Funding Tamil Nadu",
    // Domains & Tech Focus
    "Startup Passport",
    "Digital Startup Passport",
    "Cryptographic Credential Verification",
    "Hardware Prototyping Laboratory",
    "IoT Makerspace",
    "CleanTech Incubator",
    "AgriTech Startup Innovation",
    "Drone Technology UAV Labs",
    "Autonomous Robotics Prototyping",
    "AI & DeepTech Incubation",
    "Section 8 Technology Incubator",
    "Student Entrepreneurship Cell",
  ],
  referrer: "origin-when-cross-origin",
  creator: "MASTeR Incubation Foundation",
  publisher: "M.A.M. College of Engineering and Technology (MAMCET)",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: baseUrl,
    siteName: "MASTeR Incubation Foundation",
    title: "MASTeR Incubation Foundation (MIF) · StartupTN Pre-Incubation Centre",
    description:
      "Launchpad for technology innovators at MAMCET Campus, Siruganur, Trichy. Rapid IoT/hardware prototyping, TANSEED funding facilitation, mentor advisory networks, and tamper-evident Startup Passports.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MASTeR Incubation Foundation (MIF) - StartupTN Pre-Incubation Centre at MAMCET Trichy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MASTeR Incubation Foundation (MIF) · MAMCET Trichy",
    description:
      "StartupTN Recognised Pre-Incubation Centre at MAMCET, Siruganur, Trichy. IoT prototyping, TANSEED grants, and digital Startup Passports.",
    images: ["/og-image.png"],
    creator: "@master_mif",
    site: "@master_mif",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "MIF-Google-Search-Console-Verification",
    yandex: "yandex-verification-token",
    other: {
      "msvalidate.01": "MIF-Bing-Webmaster-Verification",
    },
  },
  other: {
    // GEO (Geographic & Local SEO) Meta Tags
    "geo.region": "IN-TN",
    "geo.placename": "Siruganur, Tiruchirappalli, Tamil Nadu, India",
    "geo.position": "10.9856;78.7423",
    "ICBM": "10.9856, 78.7423",
    // Dublin Core Metadata
    "DC.title": "MASTeR Incubation Foundation (MIF)",
    "DC.creator": "MASTeR Incubation Foundation",
    "DC.subject": "Technology Incubation, Startup Acceleration, TANSEED Grants, Hardware Prototyping",
    "DC.description": "StartupTN Recognised Pre-Incubation Centre at MAMCET Campus, Siruganur, Trichy.",
    "DC.publisher": "M.A.M. College of Engineering and Technology",
    "DC.coverage": "Tamil Nadu, India",
    "revisit-after": "7 days",
    "rating": "General",
    "distribution": "Global",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <JsonLd />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
        <ScrollProgressBar />
        <ContentProvider>
          <GsapScrollProvider>
            <SmoothScroll>
              <Navbar />
              <main className="flex-1 w-full overflow-x-hidden">{children}</main>
              <Footer />
              <FloatingAIButton />
            </SmoothScroll>
          </GsapScrollProvider>
        </ContentProvider>
      </body>
    </html>
  );
}
