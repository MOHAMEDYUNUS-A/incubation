import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alumni Guild & Venture Network",
  description:
    "Explore graduates and alumni ventures accelerated by MASTeR Incubation Foundation at MAMCET. Mentorship, angel syndicate connections, and peer founder networking.",
  alternates: { canonical: "/alumni" },
  openGraph: {
    title: "Alumni Guild · MASTeR Incubation Foundation",
    description: "Graduated startups, alumni founders, and peer advisory network.",
    url: "/alumni",
  },
};

export default function AlumniLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
