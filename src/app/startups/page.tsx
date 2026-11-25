import React from "react";
import StartupPortfolio from "@/components/sections/StartupPortfolio";

export const metadata = {
  title: "Startup Directory | MASTeR Incubation Foundation (MIF)",
  description: "Browse incubated startups and student ventures supported by MASTeR Incubation Foundation at MAMCET.",
};

export default function StartupsPage() {
  return (
    <div className="pt-20 sm:pt-24 min-h-screen bg-slate-50">
      <StartupPortfolio />
    </div>
  );
}
