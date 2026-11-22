import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Incubation Desk & Operations",
  description:
    "Get in touch with the Incubation Manager and coordinators at MASTeR Incubation Foundation, MAMCET Campus, Siruganur, Trichy. Enquire about admissions, lab facilities, and TANSEED seed funding.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact MASTeR Incubation Foundation · MAMCET Trichy",
    description: "Connect with MIF leadership, incubation managers, and startup coordinators.",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
