"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

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

  // Dynamic milestone message based on progress percentage
  const getMilestoneMessage = (pct: number) => {
    if (pct < 25) return "INITIALIZING MASTeR ECOSYSTEM...";
    if (pct < 50) return "LOADING 4,000 SQ. FT. PROTOTYPING BAYS...";
    if (pct < 75) return "CONNECTING STARTUPTN & MSME RECOGNITION...";
    if (pct < 95) return "SYNCHRONIZING DIGITAL STARTUP PASSPORTS...";
    return "MASTeR INCUBATION PORTAL READY";
  };

  // Check reduced motion preference and lock body scroll on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Optional query param ?skip_splash=true for automated CI test bypass or session bypass
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("skip_splash") === "true") {
      setPhase("complete");
      if (onComplete) onComplete();
      return () => mediaQuery.removeEventListener("change", handleMotionChange);
    }

    // Low-network & Session Storage Check: never get stuck on repeat loads
    try {
      if (sessionStorage.getItem("mif_splash_viewed") === "1") {
        setPhase("complete");
        if (onComplete) onComplete();
        return () => mediaQuery.removeEventListener("change", handleMotionChange);
      }
    } catch (e) {}

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

    try {
      sessionStorage.setItem("mif_splash_viewed", "1");
    } catch (e) {}

    setPhase("zooming");
    if (onZoomStart) {
      onZoomStart();
    }

    const zoomDuration = prefersReducedMotion ? 300 : 650;
    zoomTimerRef.current = setTimeout(() => {
      setPhase("complete");
      document.body.style.overflow = "";
      if (onComplete) {
        onComplete();
      }
    }, zoomDuration);
  }, [phase, prefersReducedMotion, onZoomStart, onComplete]);

  // Dynamic Hold with Low-Network Acceleration & Safety Timeout (Never Gets Stuck)
  useEffect(() => {
    if (phase !== "loading") return;

    const nav = typeof navigator !== "undefined" ? (navigator as any) : null;
    const isSlow =
      nav?.connection?.saveData ||
      nav?.connection?.effectiveType === "2g" ||
      nav?.connection?.effectiveType === "slow-2g";

    // Adaptive duration: 1.0s on slow connections, 1.6s standard
    const HOLD_DURATION = isSlow ? 1000 : 1600;
    const startTime = Date.now();

    // Absolute fallback hard timeout: guarantee completion under any network condition
    const safetyTimer = setTimeout(() => {
      startZoom();
    }, isSlow ? 1500 : 2200);

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

  // Handle immediate user skip
  const handleSkip = useCallback(() => {
    startZoom();
  }, [startZoom]);

  // Keyboard shortcut: Escape to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase === "loading") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, handleSkip]);

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
          duration: prefersReducedMotion ? 0.3 : 0.7,
          delay: prefersReducedMotion ? 0 : 0.08,
          ease: [0.4, 0, 0.2, 1],
        },
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050b14] overflow-hidden select-none pointer-events-auto"
      role="dialog"
      aria-label="MASTeR Incubation Foundation Loading Screen"
      onClick={handleSkip}
    >
      {/* Subtle Ambient Radial Backdrops (#772b38 Burgundy Glow & Deep Royal Navy) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(119,43,56,0.28)_0%,rgba(9,27,52,0.85)_45%,#030712_85%)] pointer-events-none" />

      {/* Decorative Animated Concentric Rings (#772b38 and Deep Navy) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{
            scale: isZooming ? (prefersReducedMotion ? 1 : 16) : [1, 1.08, 1],
            opacity: isZooming ? 0 : [0.25, 0.5, 0.25],
          }}
          transition={{
            scale: isZooming
              ? { duration: 0.75, ease: [0.7, 0, 0.2, 1] }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" },
            opacity: isZooming
              ? { duration: 0.5 }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          className="w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] rounded-full border border-blue-400/20"
        />
        <motion.div
          animate={{
            scale: isZooming ? (prefersReducedMotion ? 1 : 20) : [1, 1.15, 1],
            opacity: isZooming ? 0 : [0.15, 0.4, 0.15],
          }}
          transition={{
            scale: isZooming
              ? { duration: 0.75, ease: [0.7, 0, 0.2, 1] }
              : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
            opacity: isZooming
              ? { duration: 0.5 }
              : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
          }}
          className="w-[500px] h-[500px] sm:w-[620px] sm:h-[620px] rounded-full border border-[#772b38]/35"
        />
      </div>

      {/* Top Skip Button */}
      <div className="absolute top-6 right-6 z-20" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleSkip}
          className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-slate-200 hover:text-white backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-[#772b38]/40 shadow-sm"
          aria-label="Skip splash screen"
        >
          <span>Enter Portal</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-white transition-transform" />
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
                    duration: prefersReducedMotion ? 0.35 : 0.8,
                    ease: [0.65, 0, 0.35, 1],
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
          title="Click to enter"
        >
          {/* Outer Ambient Glow Halo in #772b38 and Royal Navy */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#772b38]/40 via-blue-500/25 to-[#772b38]/40 blur-2xl opacity-90 animate-pulse pointer-events-none" />

          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white p-3.5 flex items-center justify-center border border-white/30 shadow-2xl shadow-rose-950/70">
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
            transition={{ delay: 0.2, duration: 0.35, type: "spring" }}
            className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#772b38] text-[10px] font-bold text-white shadow-md border border-white/40 flex items-center gap-1"
          >
            <Sparkles className="w-2.5 h-2.5 text-[#ff8097]" />
            <span>MIF · StartupTN</span>
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#772b38]/25 border border-[#772b38]/50 text-rose-200 text-[11px] font-bold uppercase tracking-wider shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#ff8097]" />
            <span>StartupTN Recognised Pre-Incubation Centre</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight font-display leading-tight">
            MAST<span className="text-[#ff8097]">e</span>R{" "}
            <span className="font-extrabold text-slate-100">Incubation Foundation</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-semibold">
            M.A.M. College of Engineering & Technology · Trichy
          </p>
          <p className="text-[11px] text-slate-400 font-medium tracking-wide">
            Section 8 Non-Profit Company · MSME Host Institution
          </p>
        </motion.div>

        {/* Sleek Progress Bar & Dynamic Milestone Counter */}
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
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5 text-[10.5px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff8097] animate-ping inline-block" />
              {getMilestoneMessage(progress)}
            </span>
            <span className="font-bold text-white text-xs">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700/80 p-0.5 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-[#ff8097] via-[#772b38] to-blue-500 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-2 text-center">
            Press ESC or click anywhere to enter immediately
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
