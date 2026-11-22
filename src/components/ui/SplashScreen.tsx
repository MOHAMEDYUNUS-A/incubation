"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface SplashScreenProps {
  onZoomStart?: () => void;
  onComplete?: () => void;
}

export default function SplashScreen({ onZoomStart, onComplete }: SplashScreenProps) {
  // Always start in loading state on every page load/reload
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

    // Optional query param ?skip_splash=true for automated CI test bypass
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

  // Trigger zoom sequence
  const startZoom = useCallback(() => {
    if (phase !== "loading") return;

    setPhase("zooming");
    if (onZoomStart) {
      onZoomStart();
    }

    const zoomDuration = prefersReducedMotion ? 350 : 800;
    zoomTimerRef.current = setTimeout(() => {
      setPhase("complete");
      document.body.style.overflow = "";
      if (onComplete) {
        onComplete();
      }
    }, zoomDuration);
  }, [phase, prefersReducedMotion, onZoomStart, onComplete]);

  // 3-Second Hold with smooth linear/organic progress, then trigger zoom
  useEffect(() => {
    if (phase !== "loading") return;

    const HOLD_DURATION = 3000; // Exact 3-second hold requested by user
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / HOLD_DURATION) * 100), 100);
      setProgress(pct);

      if (elapsed >= HOLD_DURATION) {
        clearInterval(interval);
        startZoom();
      }
    }, 25);

    return () => clearInterval(interval);
  }, [phase, startZoom]);

  // Handle immediate user skip
  const handleSkip = () => {
    startZoom();
  };

  // Keyboard shortcut: Escape to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase === "loading") {
        handleSkip();
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
          duration: prefersReducedMotion ? 0.3 : 0.75,
          delay: prefersReducedMotion ? 0 : 0.1,
          ease: [0.4, 0, 0.2, 1],
        },
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden select-none pointer-events-auto"
      role="dialog"
      aria-label="MASTeR Incubation Foundation Loading Screen"
    >
      {/* Subtle Ambient Radial Backdrops */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.06)_0%,rgba(15,44,89,0.05)_45%,#ffffff_85%)] pointer-events-none" />

      {/* Decorative Animated Concentric Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{
            scale: isZooming ? (prefersReducedMotion ? 1 : 16) : [1, 1.08, 1],
            opacity: isZooming ? 0 : [0.35, 0.6, 0.35],
          }}
          transition={{
            scale: isZooming
              ? { duration: 0.75, ease: [0.7, 0, 0.2, 1] }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" },
            opacity: isZooming
              ? { duration: 0.5 }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          className="w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] rounded-full border border-blue-200/50"
        />
        <motion.div
          animate={{
            scale: isZooming ? (prefersReducedMotion ? 1 : 20) : [1, 1.15, 1],
            opacity: isZooming ? 0 : [0.2, 0.4, 0.2],
          }}
          transition={{
            scale: isZooming
              ? { duration: 0.75, ease: [0.7, 0, 0.2, 1] }
              : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
            opacity: isZooming
              ? { duration: 0.5 }
              : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
          }}
          className="w-[500px] h-[500px] sm:w-[620px] sm:h-[620px] rounded-full border border-orange-200/40"
        />
      </div>

      {/* Top Skip Button */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={handleSkip}
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          aria-label="Skip splash screen"
        >
          <span>Skip</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-slate-700 transition-transform" />
        </button>
      </div>

      {/* Central Brand Stage with Smooth Logo Transition */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg w-full origin-center">
        {/* The Official Emblem with Ambient Floating & Buttery Zoom-through */}
        <motion.div
          animate={
            isZooming
              ? {
                  scale: prefersReducedMotion ? 1 : 22,
                  opacity: [1, 0.85, 0],
                  filter: prefersReducedMotion ? "none" : ["blur(0px)", "blur(2px)", "blur(14px)"],
                  transition: {
                    duration: prefersReducedMotion ? 0.35 : 0.85,
                    ease: [0.65, 0, 0.35, 1], // Smooth cinematic acceleration
                  },
                }
              : {
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                  y: [0, -5, 0],
                  transition: {
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  },
                }
          }
          style={{ willChange: "transform, opacity", transformOrigin: "center center" }}
          className="relative mb-6 cursor-pointer"
          onClick={handleSkip}
          title="Click to enter"
        >
          {/* Outer Ambient Glow Halo */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-orange-400/20 via-blue-500/20 to-orange-400/20 blur-xl opacity-80 animate-pulse pointer-events-none" />

          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white p-3.5 flex items-center justify-center border border-slate-200/90 shadow-2xl shadow-blue-900/10">
            <img
              src="/logos/official-mif-logo.png"
              alt="MASTeR Incubation Foundation Emblem"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Verified Incubator Indicator Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.25, duration: 0.35, type: "spring" }}
            className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#0f2c59] text-[10px] font-bold text-white shadow-md border border-white flex items-center gap-1"
          >
            <Sparkles className="w-2.5 h-2.5 text-orange-400" />
            <span>MIF</span>
          </motion.div>
        </motion.div>

        {/* Institutional Brand Heading - Smooth Fade Out on Zoom */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: isZooming ? 0 : 1,
            y: isZooming ? 12 : 0,
          }}
          transition={{
            duration: isZooming ? 0.25 : 0.45,
            ease: "easeOut",
            delay: isZooming ? 0 : 0.15,
          }}
          className="space-y-2 pointer-events-none"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-orange-700 text-[11px] font-bold uppercase tracking-wider shadow-2xs">
            <span>StartupTN Recognised Pre-Incubation Centre</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f2c59] tracking-tight font-display leading-tight">
            MAST<span className="text-[#ea580c]">e</span>R{" "}
            <span className="font-extrabold text-slate-800">Incubation Foundation</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            M.A.M. College of Engineering & Technology · Trichy
          </p>
          <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
            Launchpad for your Entrepreneurial Success
          </p>
        </motion.div>

        {/* Sleek Progress Bar & Percentage Counter - Smooth Fade Out on Zoom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: isZooming ? 0 : 1,
            y: isZooming ? 10 : 0,
          }}
          transition={{
            duration: isZooming ? 0.22 : 0.3,
            ease: "easeOut",
            delay: isZooming ? 0 : 0.25,
          }}
          className="w-full max-w-xs mt-7 pointer-events-none"
        >
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-2">
            <span className="font-semibold text-slate-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping inline-block" />
              ENTERING INCUBATOR
            </span>
            <span className="font-bold text-[#0f2c59]">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/70 p-0.5 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-[#ea580c] via-blue-600 to-[#0f2c59] rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
