import React from "react";
import Hero from "@/components/hero/Hero";
import WelcomeSection from "@/components/sections/WelcomeSection";
import Introduction from "@/components/sections/Introduction";
import Metrics from "@/components/sections/Metrics";
import FocusAreas from "@/components/sections/FocusAreas";
import Programs from "@/components/sections/Programs";
import StartupPortfolio from "@/components/sections/StartupPortfolio";
import Facilities from "@/components/sections/Facilities";
import MentorsEcosystem from "@/components/sections/MentorsEcosystem";
import EventsNews from "@/components/sections/EventsNews";
import SocialFeedSection from "@/components/sections/SocialFeedSection";
import AIHub from "@/components/sections/AIHub";
import Testimonials from "@/components/sections/Testimonials";
import Partners from "@/components/sections/Partners";
import ApplicationCTA from "@/components/sections/ApplicationCTA";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Section 01 — Full-screen Dynamic Hero Slider (As Per Reference Image 1) */}
      <Hero />

      {/* Section 02 — Welcome to MASTeR Incubation Foundation (As Requested: "AFTER THAT WELCOME TO MASTER INCUBATION") */}
      <WelcomeSection />

      {/* Section 03 — Institutional Profile & Official Mission M1-M5 */}
      <Introduction />

      {/* Section 04 — Impact & Strategic Footprint */}
      <Metrics />

      {/* Section 05 — 7 Priority Technology Focus Areas */}
      <FocusAreas />

      {/* Section 06 — 4-Stage Incubation Programs & 6 Core Services */}
      <Programs />

      {/* Section 07 — Startup Portfolio & Directory */}
      <StartupPortfolio />

      {/* Section 08 — Facilities & Prototyping Infrastructure */}
      <Facilities />

      {/* Section 09 — Mentors & Advisory Ecosystem */}
      <MentorsEcosystem />

      {/* Section 10 — Events, Workshops & Hackathons */}
      <EventsNews />

      {/* Section 11 — Live Community Stream: Instagram & LinkedIn Updates */}
      <SocialFeedSection />

      {/* Section 12 — MASTeR AI Innovation Hub */}
      <AIHub />

      {/* Section 13 — Founder Voices & Testimonials */}
      <Testimonials />

      {/* Section 14 — Statutory Affiliations & Partners */}
      <Partners />

      {/* Section 15 — High-Conversion Application CTA */}
      <ApplicationCTA />
    </div>
  );
}
