"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import SplashScreen from "@/components/ui/SplashScreen";
import Hero from "@/components/hero/Hero";
import WelcomeSection from "@/components/sections/WelcomeSection";
import DisruptiveEpicenter from "@/components/sections/DisruptiveEpicenter";
import EcosystemImpact from "@/components/sections/EcosystemImpact";
import InfrastructureDetails from "@/components/sections/InfrastructureDetails";
import FocusAreas from "@/components/sections/FocusAreas";
import CampusPhotoGallery from "@/components/sections/CampusPhotoGallery";
import JoinUsEcosystem from "@/components/sections/JoinUsEcosystem";
import EventsNews from "@/components/sections/EventsNews";
import ApplicationCTA from "@/components/sections/ApplicationCTA";

export default function HomePage() {
  const [isZooming, setIsZooming] = useState(false);
  const [splashFinished, setSplashFinished] = useState(false);

  // Check optional ?skip_splash=true parameter
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("skip_splash") === "true") {
        setSplashFinished(true);
      }
    } catch {
      // Ignore if window undefined
    }
  }, []);

  const handleZoomStart = useCallback(() => {
    setIsZooming(true);
  }, []);

  const handleComplete = useCallback(() => {
    setIsZooming(true);
    setSplashFinished(true);
  }, []);

  return (
    <>
      {/* 00. Institutional Opening Splash Screen with Dramatic Zoom-in Transition */}
      <SplashScreen onZoomStart={handleZoomStart} onComplete={handleComplete} />

      <motion.div
        initial={false}
        animate={
          splashFinished || isZooming
            ? {
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
              }
            : {
                scale: 0.96,
                opacity: 0.85,
                filter: "blur(2px)",
              }
        }
        className="flex flex-col min-h-screen origin-center"
      >
        {/* 01. Dynamic Hero Section (Zero Opacity Campus Slider, Minimized Fonts, Clean Typography) */}
        <Hero />

        {/* 02. Welcome to MASTeR Incubation Foundation (Prominent Accredited Logos & 3-Card Value Pillar) */}
        <WelcomeSection />

        {/* 03. The Epicenter of Disruptive Breakthroughs (3D Animated Floating Box with Interactive Personas) */}
        <DisruptiveEpicenter />

        {/* 04. MIF Ecosystem Impact (Positioned Immediately After Epicenter with Live Animated Counters) */}
        <EcosystemImpact />

        {/* 05. INFRASTRUCTURE DETAILS (Floating in Air Facility Showcase & Orange Verified Checklist) */}
        <InfrastructureDetails />

        {/* 06. 7 Priority Focus Areas (Real Lab Imagery + Minimal Clean Content) */}
        <FocusAreas />

        {/* 07. "Moments That Matter" Running Gallery (Flowing Left to Right + 4-Column Photo Grid Toggle) */}
        <CampusPhotoGallery />

        {/* 08. Join Us — Be Part of Our Growing Innovation Ecosystem */}
        <JoinUsEcosystem />

        {/* 09. Upcoming Workshops, Bootcamps & News Events */}
        <EventsNews />

        {/* 10. Final Application & Call to Action */}
        <ApplicationCTA />
      </motion.div>
    </>
  );
}
