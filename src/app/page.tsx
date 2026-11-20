import React from "react";
import Hero from "@/components/hero/Hero";
import WelcomeSection from "@/components/sections/WelcomeSection";
import DisruptiveEpicenter from "@/components/sections/DisruptiveEpicenter";
import InfrastructureDetails from "@/components/sections/InfrastructureDetails";
import FocusAreas from "@/components/sections/FocusAreas";
import StartupPortfolio from "@/components/sections/StartupPortfolio";
import CampusPhotoGallery from "@/components/sections/CampusPhotoGallery";
import EcosystemImpact from "@/components/sections/EcosystemImpact";
import JoinUsEcosystem from "@/components/sections/JoinUsEcosystem";
import EventsNews from "@/components/sections/EventsNews";
import Partners from "@/components/sections/Partners";
import ApplicationCTA from "@/components/sections/ApplicationCTA";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 01. Dynamic Hero Section with 0 Opacity Campus Photos & Minimized Fonts */}
      <Hero />

      {/* 02. Welcome to MASTeR Incubation Foundation (with Empowering Innovation 3-Card Grid) */}
      <WelcomeSection />

      {/* 03. The Epicenter of Disruptive Breakthroughs + Persona Search */}
      <DisruptiveEpicenter />

      {/* 04. INFRASTRUCTURE DETAILS with 6,000+ Sq. Ft. Facility Photo & Orange Checks */}
      <InfrastructureDetails />

      {/* 05. 7 Priority Focus Areas (Redesigned: Minimal Tiles, Zero Clutter) */}
      <FocusAreas />

      {/* 06. Incubated Startups Showcase with Authentic Logos & 3D Flip Rotation */}
      <StartupPortfolio />

      {/* 07. "Moments That Matter" Running Gallery (Flowing from Left to Right + 4-Col Grid Toggle) */}
      <CampusPhotoGallery />

      {/* 08. MIF Ecosystem Impact with Live Running Counters on Scroll */}
      <EcosystemImpact />

      {/* 09. Join Us — Be Part of Our Growing Innovation Ecosystem */}
      <JoinUsEcosystem />

      {/* 10. Upcoming Workshops, Bootcamps & News Events */}
      <EventsNews />

      {/* 11. Accredited Institutional Affiliations */}
      <Partners />

      {/* 12. Final Application & Call to Action */}
      <ApplicationCTA />
    </div>
  );
}
