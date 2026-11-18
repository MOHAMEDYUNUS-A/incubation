import React from "react";
import Hero from "@/components/hero/Hero";
import WelcomeSection from "@/components/sections/WelcomeSection";
import EmpoweringInnovation from "@/components/sections/EmpoweringInnovation";
import InfrastructureDetails from "@/components/sections/InfrastructureDetails";
import DisruptiveEpicenter from "@/components/sections/DisruptiveEpicenter";
import EcosystemImpact from "@/components/sections/EcosystemImpact";
import FocusAreas from "@/components/sections/FocusAreas";
import Programs from "@/components/sections/Programs";
import JoinUsEcosystem from "@/components/sections/JoinUsEcosystem";
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
      {/* 01. Full-width Dynamic Hero Slider (As Per Reference Image 1) */}
      <Hero />

      {/* 02. Welcome to MASTeR Incubation Foundation (As Requested: "AFTER THAT WELCOME TO MASTER INCUBATION") */}
      <WelcomeSection />

      {/* 03. "Empowering Innovation and Entrepreneurship" 3-Pillar Cards (Reference Image 2) */}
      <EmpoweringInnovation />

      {/* 04. "INFRASTRUCTURE DETAILS" with Seminar Hall Photo & Checklist (Reference Image 3) */}
      <InfrastructureDetails />

      {/* 05. "The Epicenter of Disruptive Breakthroughs" + Interactive Persona Selector (Reference Image 4) */}
      <DisruptiveEpicenter />

      {/* 06. "MIF Ecosystem Impact" Constellation Network & Milestones (Reference Image 5) */}
      <EcosystemImpact />

      {/* 07. 7 Priority Technology Focus Areas */}
      <FocusAreas />

      {/* 08. 4-Stage Incubation Programs & 6 Core Services */}
      <Programs />

      {/* 09. "Join Us — Be Part of Our Growing Innovation Ecosystem" 8 Stakeholder Cards (Reference Image 6) */}
      <JoinUsEcosystem />

      {/* 10. Startup Portfolio & Cohort Directory */}
      <StartupPortfolio />

      {/* 11. Facilities & Prototyping Infrastructure */}
      <Facilities />

      {/* 12. Mentors & Advisory Ecosystem */}
      <MentorsEcosystem />

      {/* 13. Events, Workshops & Hackathons */}
      <EventsNews />

      {/* 14. Live Social Feed (Instagram & LinkedIn Updates) */}
      <SocialFeedSection />

      {/* 15. MASTeR AI Innovation Hub */}
      <AIHub />

      {/* 16. Founder Voices & Testimonials */}
      <Testimonials />

      {/* 17. Statutory Affiliations & Partners */}
      <Partners />

      {/* 18. High-Conversion Application CTA */}
      <ApplicationCTA />
    </div>
  );
}
