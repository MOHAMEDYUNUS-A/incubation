import React from "react";
import JoinUsEcosystem from "@/components/sections/JoinUsEcosystem";
import DisruptiveEpicenter from "@/components/sections/DisruptiveEpicenter";

export const metadata = {
  title: "Join Us | Stakeholder Onboarding | MASTeR Incubation Foundation",
  description:
    "Register as a Startup, Researcher, Student, Industry Partner, Investor, or Mentor at MASTeR Incubation Foundation, MAMCET Trichy.",
  openGraph: {
    title: "Join Us | Stakeholder Onboarding | MASTeR Incubation Foundation",
    description:
      "Register as a Startup, Researcher, Student, Industry Partner, Investor, or Mentor at MASTeR Incubation Foundation, MAMCET Trichy.",
    url: "https://master-incubation.vercel.app/join-us",
    siteName: "MASTeR Incubation Foundation",
  },
};

export default function JoinUsPage() {
  return (
    <div className="pt-28 min-h-screen bg-slate-950 text-white">
      {/* Page Hero */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight font-display text-white">
            Join Our Innovation Ecosystem
          </h1>
          <p className="text-base sm:text-xl text-slate-300 mt-4 leading-relaxed font-normal">
            Whether you are an aspiring student inventor, deep-tech startup, faculty researcher, corporate industry partner, or venture investor, MIF provides tailored collaboration channels to accelerate your impact.
          </p>
        </div>
      </div>

      {/* Main Stakeholder Cards Grid with Ambient Background Video */}
      <JoinUsEcosystem />

      {/* Interactive Personalized Search Widget */}
      <div className="bg-slate-50 text-slate-900">
        <DisruptiveEpicenter />
      </div>
    </div>
  );
}
