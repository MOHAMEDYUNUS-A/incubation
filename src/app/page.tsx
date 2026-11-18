import React from "react";
import Hero from "@/components/hero/Hero";
import Introduction from "@/components/sections/Introduction";
import Metrics from "@/components/sections/Metrics";
import FocusAreas from "@/components/sections/FocusAreas";
import Programs from "@/components/sections/Programs";
import StartupPortfolio from "@/components/sections/StartupPortfolio";
import Facilities from "@/components/sections/Facilities";
import MentorsEcosystem from "@/components/sections/MentorsEcosystem";
import EventsNews from "@/components/sections/EventsNews";
import AIHub from "@/components/sections/AIHub";
import Testimonials from "@/components/sections/Testimonials";
import Partners from "@/components/sections/Partners";
import ApplicationCTA from "@/components/sections/ApplicationCTA";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Section 01 — Full-screen Dynamic Hero */}
      <Hero />

      {/* Section 02 — Foundation Introduction & Mission M1-M5 */}
      <Introduction />

      {/* Section 03 — Impact & Strategic Footprint */}
      <Metrics />

      {/* Section 04 — 7 Priority Technology Focus Areas */}
      <FocusAreas />

      {/* Section 05 — 4-Stage Incubation Programs & 6 Core Services */}
      <Programs />

      {/* Section 06 — Startup Portfolio & Directory */}
      <StartupPortfolio />

      {/* Section 07 — Facilities & Prototyping Infrastructure */}
      <Facilities />

      {/* Section 08 — Mentors & Advisory Ecosystem */}
      <MentorsEcosystem />

      {/* Section 09 — Events, Workshops & Hackathons */}
      <EventsNews />

      {/* Section 10 — MASTeR AI Innovation Hub */}
      <AIHub />

      {/* Section 11 — Founder Voices & Testimonials */}
      <Testimonials />

      {/* Section 12 — Statutory Affiliations & Partners */}
      <Partners />

      {/* Section 13 — High-Conversion Application CTA */}
      <ApplicationCTA />
    </div>
  );
}
