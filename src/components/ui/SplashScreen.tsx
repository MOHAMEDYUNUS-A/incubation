"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onZoomStart?: () => void;
  onComplete?: () => void;
}

export default function SplashScreen({ onZoomStart, onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"loading" | "zooming" | "complete">("loading");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const zoomTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check reduced motion preference and lock body scroll on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Optional query param ?skip_splash=true for CI or fast bypass
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("skip_splash") === "true") {
      setPhase("complete");
      if (onComplete) onComplete();
      return () => mediaQuery.removeEventListener("change", handleMotionChange);
    }

    // Lock body scroll while splash is active
    document.body.style.overflow = "hidden";

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      document.body.style.overflow = "";
      if (zoomTimerRef.current) {
        clearTimeout(zoomTimerRef.current);
      }
    };
  }, [onComplete]);

  // Trigger smooth zoom transition out
  const startZoom = useCallback(() => {
    if (phase !== "loading") return;

    try {
      sessionStorage.setItem("mif_splash_viewed", "1");
    } catch (e) {}

    setPhase("zooming");
    if (onZoomStart) {
      onZoomStart();
    }

    const zoomDuration = prefersReducedMotion ? 300 : 600;
    zoomTimerRef.current = setTimeout(() => {
      setPhase("complete");
      document.body.style.overflow = "";
      if (onComplete) {
        onComplete();
      }
    }, zoomDuration);
  }, [phase, prefersReducedMotion, onZoomStart, onComplete]);

  // Clean concise hold timer with low-network acceleration (Never gets stuck)
  useEffect(() => {
    if (phase !== "loading") return;

    const nav = typeof navigator !== "undefined" ? (navigator as any) : null;
    const isSlow =
      nav?.connection?.saveData ||
      nav?.connection?.effectiveType === "2g" ||
      nav?.connection?.effectiveType === "slow-2g";

    // Fast, elegant hold: 1.0s on slow network, 1.8s standard
    const HOLD_DURATION = isSlow ? 1000 : 1800;

    const timer = setTimeout(() => {
      startZoom();
    }, HOLD_DURATION);

    return () => clearTimeout(timer);
  }, [phase, startZoom]);

  // Keyboard shortcut: Escape or click to skip immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase === "loading") {
        startZoom();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, startZoom]);

  if (phase === "complete") {
    return null;
  }

  const isZooming = phase === "zooming";

  return (
    <motion.div
      key="mif-splash-screen"
      initial={{ opacity: 1 }}
      animate={{
        opacity: isZooming ? 0 : 1,
        transition: {
          duration: prefersReducedMotion ? 0.3 : 0.6,
          ease: [0.4, 0, 0.2, 1],
        },
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050b14] overflow-hidden select-none cursor-pointer"
      role="dialog"
      aria-label="MASTeR Incubation Foundation"
      onClick={startZoom}
    >
      {/* Executive Ambient Radial Gradient (#772b38 Glow & Deep Navy) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(119,43,56,0.35)_0%,rgba(9,27,52,0.85)_40%,#030712_85%)] pointer-events-none" />

      {/* Subtle Concentric Ambient Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{
            scale: isZooming ? (prefersReducedMotion ? 1 : 12) : [1, 1.06, 1],
            opacity: isZooming ? 0 : [0.2, 0.45, 0.2],
          }}
          transition={{
            scale: isZooming
              ? { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" },
            opacity: isZooming
              ? { duration: 0.45 }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full border border-[#772b38]/40"
        />
        <motion.div
          animate={{
            scale: isZooming ? (prefersReducedMotion ? 1 : 16) : [1, 1.1, 1],
            opacity: isZooming ? 0 : [0.12, 0.3, 0.12],
          }}
          transition={{
            scale: isZooming
              ? { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
              : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
            opacity: isZooming
              ? { duration: 0.45 }
              : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
          }}
          className="w-[420px] h-[420px] sm:w-[540px] sm:h-[540px] rounded-full border border-blue-400/20"
        />
      </div>

      {/* Central Official Logo Only - Ultra-Smooth Entrance & Transition Out */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={
          isZooming
            ? {
                scale: prefersReducedMotion ? 1 : 1.3,
                opacity: 0,
                filter: prefersReducedMotion ? "none" : "blur(6px)",
                transition: {
                  duration: prefersReducedMotion ? 0.3 : 0.55,
                  ease: [0.4, 0, 0.2, 1],
                },
              }
            : {
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                transition: {
                  duration: 0.5,
                  ease: "easeOut",
                },
              }
        }
        style={{ willChange: "transform, opacity", transformOrigin: "center center" }}
        className="relative z-10 flex flex-col items-center justify-center p-4 pointer-events-none"
      >
        {/* Ambient Halo Glow */}
        <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-[#772b38]/45 via-rose-500/25 to-[#772b38]/45 blur-2xl opacity-90 animate-pulse pointer-events-none" />

        {/* Clean Logo Card */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-white p-4 sm:p-5 flex items-center justify-center border border-white/40 shadow-2xl shadow-rose-950/80">
          <img
            src="/logos/official-mif-logo.png"
            alt="MASTeR Incubation Foundation"
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
