"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GsapScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register GSAP plugins safely
    gsap.registerPlugin(ScrollTrigger);

    // Configure ScrollTrigger defaults
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });

    const ctx = gsap.context(() => {
      // 1. Lightweight Fade Up Animations
      const fadeUpElements = document.querySelectorAll('[data-gsap="fade-up"]');
      fadeUpElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              once: true,
            },
          }
        );
      });

      // 2. Lightweight Reveal Left Animations
      const revealLeftElements = document.querySelectorAll('[data-gsap="reveal-left"]');
      revealLeftElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              once: true,
            },
          }
        );
      });

      // 3. Lightweight Reveal Right Animations
      const revealRightElements = document.querySelectorAll('[data-gsap="reveal-right"]');
      revealRightElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              once: true,
            },
          }
        );
      });

      // 4. Lightweight Zoom In Animations
      const zoomElements = document.querySelectorAll('[data-gsap="zoom-in"]');
      zoomElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              once: true,
            },
          }
        );
      });

      // 5. Staggered Card Groups
      const staggerGroups = document.querySelectorAll('[data-gsap-group="stagger"]');
      staggerGroups.forEach((group) => {
        const cards = group.querySelectorAll('[data-gsap-item="card"]');
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: group,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return <>{children}</>;
}
