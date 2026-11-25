"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GsapScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register GSAP plugins safely
    gsap.registerPlugin(ScrollTrigger);

    // Configure ScrollTrigger defaults for optimal 60fps performance
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
    });

    const ctx = gsap.context(() => {
      // 1. Lightweight Fade Up Animations (data-gsap="fade-up", data-scroll="fade-up", .scroll-fade-up)
      const fadeUpElements = document.querySelectorAll(
        '[data-gsap="fade-up"], [data-scroll="fade-up"], .scroll-fade-up'
      );
      fadeUpElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 2. Lightweight Reveal Left Animations (data-gsap="reveal-left", data-scroll="reveal-left", .scroll-reveal-left)
      const revealLeftElements = document.querySelectorAll(
        '[data-gsap="reveal-left"], [data-scroll="reveal-left"], .scroll-reveal-left'
      );
      revealLeftElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -26 },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 3. Lightweight Reveal Right Animations (data-gsap="reveal-right", data-scroll="reveal-right", .scroll-reveal-right)
      const revealRightElements = document.querySelectorAll(
        '[data-gsap="reveal-right"], [data-scroll="reveal-right"], .scroll-reveal-right'
      );
      revealRightElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 26 },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 4. Lightweight Zoom In Animations (data-gsap="zoom-in", data-scroll="zoom-in", .scroll-zoom-in)
      const zoomElements = document.querySelectorAll(
        '[data-gsap="zoom-in"], [data-scroll="zoom-in"], .scroll-zoom-in'
      );
      zoomElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 5. Lightweight 3D Tilt In Animations (data-scroll="tilt-in", .scroll-tilt-in)
      const tiltElements = document.querySelectorAll(
        '[data-scroll="tilt-in"], .scroll-tilt-in'
      );
      tiltElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28, rotateX: 6 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 6. Staggered Card Groups
      const staggerGroups = document.querySelectorAll(
        '[data-gsap-group="stagger"], [data-scroll-group="stagger"], .scroll-stagger-group'
      );
      staggerGroups.forEach((group) => {
        const cards = group.querySelectorAll(
          '[data-gsap-item="card"], [data-scroll-item="card"], .scroll-card'
        );
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 26, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.55,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: group,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // 7. GSAP Parallax Scroll Scrub (.gsap-parallax, [data-gsap="parallax"])
      const parallaxElements = document.querySelectorAll(
        '[data-gsap="parallax"], .gsap-parallax'
      );
      parallaxElements.forEach((el) => {
        gsap.to(el, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      // 8. GSAP Heading Lift (.gsap-heading, [data-gsap="heading"])
      const headingElements = document.querySelectorAll(
        '[data-gsap="heading"], .gsap-heading'
      );
      headingElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32, letterSpacing: "-0.02em" },
          {
            opacity: 1,
            y: 0,
            letterSpacing: "normal",
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 9. GSAP Smooth Image Scale Reveal (.gsap-image-reveal, [data-gsap="reveal-image"])
      const imageReveals = document.querySelectorAll(
        '[data-gsap="reveal-image"], .gsap-image-reveal'
      );
      imageReveals.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 1.08, filter: "brightness(90%)" },
          {
            opacity: 1,
            scale: 1,
            filter: "brightness(100%)",
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    // Refresh triggers on layout changes
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, [pathname]);

  return <>{children}</>;
}
