import React from "react";
import Hero from "@/components/hero/Hero";
import WelcomeSection from "@/components/sections/WelcomeSection";
import DisruptiveEpicenter from "@/components/sections/DisruptiveEpicenter";
import InfrastructureDetails from "@/components/sections/InfrastructureDetails";
import FocusAreas from "@/components/sections/FocusAreas";
import CampusPhotoGallery from "@/components/sections/CampusPhotoGallery";
import EcosystemImpact from "@/components/sections/EcosystemImpact";
import JoinUsEcosystem from "@/components/sections/JoinUsEcosystem";
import EventsNews from "@/components/sections/EventsNews";
import Partners from "@/components/sections/Partners";
import ApplicationCTA from "@/components/sections/ApplicationCTA";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 01. Dynamic Hero Section with Animated Text Rotation */}
      <Hero />

      {/* 02. Welcome to MASTeR Incubation Foundation (Redesigned & Prestigious) */}
      <WelcomeSection />

      {/* 03. The Epicenter of Disruptive Breakthroughs + Persona Search */}
      <DisruptiveEpicenter />

      {/* 04. INFRASTRUCTURE DETAILS with 6,000+ Sq. Ft. Facility Photo & Specs */}
      <InfrastructureDetails />

      {/* 05. Priority Focus Areas (Visual Image Cards with Animations) */}
      <FocusAreas />

      {/* 06. "Moments That Matter" Running Gallery (Flowing from Left to Right) */}
      <CampusPhotoGallery />

      {/* 07. MIF Ecosystem Impact with Live Running Counters on Scroll */}
      <EcosystemImpact />

      {/* 08. Join Us — Be Part of Our Growing Innovation Ecosystem */}
      <JoinUsEcosystem />

      {/* 09. Upcoming Workshops, Bootcamps & News Events */}
      <EventsNews />

      {/* 10. Accredited Institutional Affiliations */}
      <Partners />

      {/* 11. Final Application & Call to Action */}
      <ApplicationCTA />
    </div>
  );
}
