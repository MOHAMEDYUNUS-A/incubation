"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface AnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// 1. Left-to-Right Reveal Animation (Lightweight Horizontal X-axis entrance)
export function RevealLeft({ children, className = "", delay = 0 }: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 2. Right-to-Left Reveal Animation (Lightweight Horizontal X-axis entrance)
export function RevealRight({ children, className = "", delay = 0 }: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 3. Zoom-In Lightweight Animation (Subtle scale up from 0.96 to 1 with Fade)
export function ZoomIn({ children, className = "", delay = 0 }: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 4. Zoom-Out Lightweight Animation (Subtle scale down from 1.03 to 1 with Fade)
export function ZoomOut({ children, className = "", delay = 0 }: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.03 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 5. Clean Fade-In Animation (Pure Opacity)
export function FadeIn({ children, className = "", delay = 0 }: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
      style={{ willChange: "opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 6. Fade-Up Animation (Lightweight Vertical Y-axis with Opacity)
export function FadeUp({ children, className = "", delay = 0 }: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 7. Reveal-Up Animation (Alias for FadeUp with clean vertical motion)
export const RevealUp = FadeUp;

// 8. Interactive Lightweight Hover Transition Card
export function XYZCard({
  children,
  className = "",
  depth = 8,
}: {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}) {
  return (
    <div className="w-full">
      <motion.div
        whileHover={{
          y: -4,
          boxShadow: "0 14px 28px -8px rgba(15, 23, 42, 0.10)",
        }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ willChange: "transform" }}
        className={`transition-all duration-200 ${className}`}
      >
        <div>{children}</div>
      </motion.div>
    </div>
  );
}

// 8. Reusable Lightweight Card Alias
export const InteractiveCard = XYZCard;
