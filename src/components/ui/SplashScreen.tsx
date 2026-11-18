"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Only show for 1.4 seconds on initial entrance
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
        >
          {/* Subtle Ambient Light Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_45%,rgba(37,99,235,0.08),transparent)] pointer-events-none" />

          {/* Centered Logo & Brand Content with Zoom-In & Fade-In */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-2 flex items-center justify-center border border-slate-200 shadow-md mb-5"
            >
              <img
                src="/logos/master-incubation-logo.png"
                alt="MASTeR Incubation Foundation"
                className="w-full h-full object-contain"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display"
            >
              MAST<span className="text-blue-600">e</span>R Incubation Foundation
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-xs sm:text-sm text-slate-500 font-medium mt-1 tracking-wide"
            >
              StartupTN Pre-Incubation Centre · MAMCET, Trichy
            </motion.p>

            {/* Lightweight Sleek Loading Line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "160px", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-full mt-6 overflow-hidden"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
