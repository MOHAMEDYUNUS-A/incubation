import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Startup Passport & Registry Verification",
  description:
    "Official digital credential and journey verification system for startups incubated at MASTeR Incubation Foundation (MIF), MAMCET Siruganur, Trichy. Tamper-evident milestone logs and cryptographic proof.",
  alternates: { canonical: "/startup-passport" },
  openGraph: {
    title: "Digital Startup Passport · MASTeR Incubation Foundation",
    description: "Verifiable digital identity, milestone certifications, and governance seals.",
    url: "/startup-passport",
  },
};

export default function StartupPassportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
