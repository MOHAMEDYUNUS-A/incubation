"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

interface SplashScreenProps {
  onZoomStart?: () => void;
  onComplete?: () => void;
}

export default function SplashScreen({ onZoomStart, onComplete }: SplashScreenProps) {
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
    } catch (e) {}

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

  // Dynamic Progress Hold with Low-Network Acceleration (Never Gets Stuck)
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
          duration: prefersReducedMotion ? 0.3 : 0.65,
          ease: [0.4, 0, 0.2, 1],
        },
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-50 overflow-hidden select-none cursor-pointer"
      role="dialog"
      aria-label="MASTeR Incubation Foundation"
      onClick={startZoom}
    >
      {/* Light Theme Ambient Radial Glow (#772b38 Soft Tint & Clean Light Backdrop) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(119,43,56,0.08)_0%,rgba(241,245,249,0.9)_45%,#f8fafc_90%)] pointer-events-none" />

      {/* Top Right Skip Button */}
      <motion.button
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: isZooming ? 0 : 1, y: isZooming ? -8 : 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        onClick={(e) => {
          e.stopPropagation();
          startZoom();
        }}
        className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-xs font-bold text-slate-700 hover:text-slate-900 border border-slate-200/90 shadow-sm backdrop-blur-xs flex items-center gap-1.5 transition-all cursor-pointer"
        aria-label="Skip splash screen"
      >
        <span>Enter Portal</span>
        <ArrowRight className="w-3.5 h-3.5 text-[#772b38]" />
      </motion.button>

      {/* Subtle Concentric Ambient Rings - Dramatic Expand on Zoom */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{
            scale: isZooming ? (prefersReducedMotion ? 1 : 20) : [1, 1.08, 1],
            opacity: isZooming ? 0 : [0.35, 0.65, 0.35],
          }}
          transition={{
            scale: isZooming
              ? { duration: 0.65, ease: [0.65, 0, 0.35, 1] }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" },
            opacity: isZooming
              ? { duration: 0.45 }
              : { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full border-2 border-[#772b38]/20"
        />
        <motion.div
          animate={{
            scale: isZooming ? (prefersReducedMotion ? 1 : 24) : [1, 1.12, 1],
            opacity: isZooming ? 0 : [0.2, 0.45, 0.2],
          }}
          transition={{
            scale: isZooming
              ? { duration: 0.65, ease: [0.65, 0, 0.35, 1] }
              : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
            opacity: isZooming
              ? { duration: 0.45 }
              : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
          }}
          className="w-[420px] h-[420px] sm:w-[540px] sm:h-[540px] rounded-full border border-blue-400/25"
        />
      </div>

      {/* Central Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center p-4 max-w-lg text-center">
        {/* Central Official Logo Card with Old Dramatic Zoom-In Effect (Scale: 22) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={
            isZooming
              ? {
                  scale: prefersReducedMotion ? 1 : 22,
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
                  y: [0, -4, 0],
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  },
                }
          }
          style={{ willChange: "transform, opacity", transformOrigin: "center center" }}
          className="relative mb-6 cursor-pointer"
          title="Click to enter"
        >
          {/* Soft Ambient Halo Glow */}
          <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-[#772b38]/20 via-rose-300/30 to-[#772b38]/20 blur-2xl opacity-90 animate-pulse pointer-events-none" />

          {/* Clean Logo Card in Light Theme */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-white p-4.5 sm:p-5 flex items-center justify-center border border-slate-200/90 shadow-[0_20px_50px_rgba(119,43,56,0.14),0_10px_25px_rgba(15,44,89,0.08)]">
            <img
              src="/logos/official-mif-logo.png"
              alt="MASTeR Incubation Foundation"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Verified Incubator Indicator Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.35, type: "spring" }}
            className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#772b38] text-[10px] font-bold text-white shadow-md border border-white/60 flex items-center gap-1 pointer-events-none"
          >
            <Sparkles className="w-2.5 h-2.5 text-rose-300" />
            <span>MIF · MAMCET</span>
          </motion.div>
        </motion.div>

        {/* Institutional Brand Heading - Smooth Fade Out on Zoom */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: isZooming ? 0 : 1,
            y: isZooming ? 14 : 0,
          }}
          transition={{
            duration: isZooming ? 0.25 : 0.45,
            ease: "easeOut",
            delay: isZooming ? 0 : 0.15,
          }}
          className="space-y-2 pointer-events-none"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#772b38]/10 border border-[#772b38]/25 text-[#772b38] text-[11px] font-bold uppercase tracking-wider shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#772b38]" />
            <span>Technology Business Incubator · MAMCET Campus</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-display leading-tight">
            MAST<span className="text-[#772b38]">e</span>R{" "}
            <span className="font-extrabold text-slate-800">Incubation Foundation</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-semibold">
            M.A.M. College of Engineering & Technology · Trichy
          </p>
          <p className="text-[11px] text-slate-500 font-medium tracking-wide">
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
          className="w-full max-w-xs mt-6 pointer-events-none"
        >
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-2">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5 text-[10.5px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#772b38] animate-ping inline-block" />
              {getMilestoneMessage(progress)}
            </span>
            <span className="font-bold text-slate-800 text-xs">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200/90 rounded-full overflow-hidden border border-slate-300/70 p-0.5 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-[#772b38] via-rose-500 to-[#0f2c59] rounded-full transition-all duration-100"
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
