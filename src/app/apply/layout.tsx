import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply for Incubation & TANSEED Pathways",
  description:
    "Submit your startup idea or pre-incubation application to MASTeR Incubation Foundation at MAMCET. Access prototyping labs, mentorship, and grant pathways up to ₹15 Lakhs.",
  alternates: { canonical: "/apply" },
  openGraph: {
    title: "Apply for Incubation · MASTeR Incubation Foundation",
    description: "Join the next cohort of technology innovators at MAMCET Campus, Siruganur, Trichy.",
    url: "/apply",
  },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
