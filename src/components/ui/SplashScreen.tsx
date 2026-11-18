"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress counter up to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 18) + 12;
        return Math.min(prev + step, 100);
      });
    }, 120);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white selection:bg-none"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(37,99,235,0.08),transparent)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full">
            {/* Crest Emblem with Spring Zoom-In & Subtle Float */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-3 flex items-center justify-center border border-slate-200/90 shadow-xl shadow-blue-500/10">
                <img
                  src="/logos/master-incubation-logo.png"
                  alt="MASTeR Incubation Foundation"
                  className="w-full h-full object-contain"
                />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md bg-blue-600 text-[10px] font-bold text-white shadow-sm"
              >
                MIF
              </motion.div>
            </motion.div>

            {/* Institutional Brand Heading */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-1.5"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-bold uppercase tracking-wider mb-1">
                <span>StartupTN Recognised Pre-Incubation Centre</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                MAST<span className="text-blue-600">e</span>R Incubation Foundation
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                M.A.M. College of Engineering & Technology · Trichy
              </p>
            </motion.div>

            {/* Sleek Progress Bar & Percentage Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="w-full mt-8"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                <span>INITIALIZING ECOSYSTEM</span>
                <span className="font-bold text-blue-600">{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 p-0.5">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
