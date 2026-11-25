"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SplashScreenProps {
  onZoomStart?: () => void;
  onComplete?: () => void;
}

export default function SplashScreen({ onZoomStart, onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"loading" | "zooming" | "complete">("loading");
  const [progress, setProgress] = useState(0);
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

  // Trigger smooth dramatic zoom transition out
  const startZoom = useCallback(() => {
    if (phase !== "loading") return;

    try {
      sessionStorage.setItem("mif_splash_viewed", "1");
    } catch {
      // ignore
    }

    setPhase("zooming");
    if (onZoomStart) {
      onZoomStart();
    }

    const zoomDuration = prefersReducedMotion ? 300 : 700;
    zoomTimerRef.current = setTimeout(() => {
      setPhase("complete");
      document.body.style.overflow = "";
      if (onComplete) {
        onComplete();
      }
    }, zoomDuration);
  }, [phase, prefersReducedMotion, onZoomStart, onComplete]);

  // Dynamic Progress Hold (Smooth & Responsive, never gets stuck)
  useEffect(() => {
    if (phase !== "loading") return;

    const nav = typeof navigator !== "undefined" ? (navigator as any) : null;
    const isSlow =
      nav?.connection?.saveData ||
      nav?.connection?.effectiveType === "2g" ||
      nav?.connection?.effectiveType === "slow-2g";

    // Adaptive duration: 1.0s on slow connections, 1.5s standard
    const HOLD_DURATION = isSlow ? 1000 : 1500;
    const startTime = Date.now();

    const safetyTimer = setTimeout(() => {
      startZoom();
    }, isSlow ? 1500 : 2000);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / HOLD_DURATION) * 100), 100);
      setProgress(pct);

      if (elapsed >= HOLD_DURATION) {
        clearInterval(interval);
        clearTimeout(safetyTimer);
        startZoom();
      }
    }, 20);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimer);
    };
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
      key="master-incubation-splash"
      initial={{ opacity: 1 }}
      animate={{
        opacity: isZooming ? 0 : 1,
        transition: {
          duration: prefersReducedMotion ? 0.3 : 0.65,
          ease: [0.4, 0, 0.2, 1],
        },
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-hidden select-none cursor-pointer"
      role="dialog"
      aria-label="MASTeR Incubation Foundation"
      onClick={startZoom}
    >
      {/* Pure White Background with Subtle Light Radial Diffusion */}
      <div className="absolute inset-0 bg-white pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(119,43,56,0.05)_0%,rgba(255,255,255,0.8)_50%,#ffffff_100%)] pointer-events-none" />

      {/* Top Right Minimal Skip Button */}
      <motion.button
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: isZooming ? 0 : 1, y: isZooming ? -6 : 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        onClick={(e) => {
          e.stopPropagation();
          startZoom();
        }}
        className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
        aria-label="Skip to portal"
      >
        <span>Enter Portal</span>
        <ArrowRight className="w-3.5 h-3.5 text-[#772b38]" />
      </motion.button>

      {/* Elegant Concentric Ambient Rings - Expands Dramatically on Zoom */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{
            scale: isZooming ? (prefersReducedMotion ? 1 : 22) : [1, 1.06, 1],
            opacity: isZooming ? 0 : [0.35, 0.6, 0.35],
          }}
          transition={{
            scale: isZooming
              ? { duration: 0.65, ease: [0.65, 0, 0.35, 1] }
              : { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
            opacity: isZooming
              ? { duration: 0.45 }
              : { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border border-[#772b38]/15"
        />
        <motion.div
          animate={{
            scale: isZooming ? (prefersReducedMotion ? 1 : 26) : [1, 1.1, 1],
            opacity: isZooming ? 0 : [0.2, 0.4, 0.2],
          }}
          transition={{
            scale: isZooming
              ? { duration: 0.65, ease: [0.65, 0, 0.35, 1] }
              : { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
            opacity: isZooming
              ? { duration: 0.45 }
              : { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
          }}
          className="w-[450px] h-[450px] sm:w-[580px] sm:h-[580px] rounded-full border border-slate-200/60"
        />
      </div>

      {/* Central Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 max-w-xl text-center">
        {/* Central Official Logo Card with Zoom-In Portal Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={
            isZooming
              ? {
                  scale: prefersReducedMotion ? 1 : 24,
                  opacity: [1, 0.85, 0],
                  filter: prefersReducedMotion ? "none" : ["blur(0px)", "blur(2px)", "blur(14px)"],
                  transition: {
                    duration: prefersReducedMotion ? 0.35 : 0.75,
                    ease: [0.65, 0, 0.35, 1],
                  },
                }
              : {
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                  y: [0, -3, 0],
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  },
                }
          }
          style={{ willChange: "transform, opacity", transformOrigin: "center center" }}
          className="relative mb-8 cursor-pointer"
          title="Click to enter portal"
        >
          {/* Soft Ambient Halo */}
          <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-[#772b38]/15 via-rose-200/25 to-[#0f2c59]/15 blur-2xl opacity-80 pointer-events-none" />

          {/* Clean Pristine Logo Card on Pure White */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-white p-5 sm:p-6 flex items-center justify-center border border-slate-200/90 shadow-[0_20px_50px_rgba(15,44,89,0.08),0_10px_25px_rgba(119,43,56,0.06)]">
            <img
              src="/logos/official-mif-logo.png"
              alt="MASTeR Incubation Foundation"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Brand Heading - Contains ONLY (MASTeR Incubation Foundation) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isZooming ? 0 : 1,
            y: isZooming ? 12 : 0,
          }}
          transition={{
            duration: isZooming ? 0.25 : 0.45,
            ease: "easeOut",
            delay: isZooming ? 0 : 0.15,
          }}
          className="pointer-events-none"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-display text-slate-900 leading-tight">
            MAST<span className="text-[#772b38]">e</span>R{" "}
            <span className="text-[#0f2c59]">Incubation Foundation</span>
          </h1>
        </motion.div>

        {/* Sleek Minimalist 2px Progress Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: isZooming ? 0 : 1,
            y: isZooming ? 8 : 0,
          }}
          transition={{
            duration: isZooming ? 0.2 : 0.3,
            ease: "easeOut",
            delay: isZooming ? 0 : 0.25,
          }}
          className="w-full max-w-xs mt-8 pointer-events-none"
        >
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
            <motion.div
              className="h-full bg-gradient-to-r from-[#772b38] via-[#0f2c59] to-[#ff8097] rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
