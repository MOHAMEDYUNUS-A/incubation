import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Startup Success Stories & Venture Chronicles",
  description:
    "Read inspiring case studies and journey chronicles of deep-tech and hardware startups scaled through MASTeR Incubation Foundation at MAMCET Trichy.",
  alternates: { canonical: "/success-stories" },
  openGraph: {
    title: "Startup Success Stories · MASTeR Incubation Foundation",
    description: "Chronicles of breakthrough technologies, TANSEED recipients, and commercial pilots.",
    url: "/success-stories",
  },
};

export default function SuccessStoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
