"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface AnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// Global Ultra-Lightweight Scroll Progress Indicator (GPU accelerated, transforms scaleX)
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#772b38] via-[#0f2c59] to-[#ff8097] origin-left z-[9999] pointer-events-none shadow-[0_1px_8px_rgba(119,43,56,0.5)]"
      style={{ scaleX }}
    />
  );
}

// 1. Left-to-Right Reveal Animation (Lightweight Horizontal X-axis entrance)
export function RevealLeft({ children, className = "", delay = 0 }: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
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
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 3. Zoom-In Lightweight Animation (Subtle scale up from 0.95 to 1 with Fade)
export function ZoomIn({ children, className = "", delay = 0 }: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 4. Zoom-Out Lightweight Animation (Subtle scale down from 1.04 to 1 with Fade)
export function ZoomOut({ children, className = "", delay = 0 }: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
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
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      style={{ willChange: "opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 6. Fade-Up Animation (Lightweight Vertical Y-axis with Opacity)
export function FadeUp({
  children,
  className = "",
  delay = 0,
  distance = 20,
}: AnimationProps & { distance?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 7. ScrollTiltIn Animation (Subtle 3D Perspective Entrance on Scroll)
export function ScrollTiltIn({
  children,
  className = "",
  delay = 0,
}: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotateX: 6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform, opacity", perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 8. StaggerContainer & StaggerItem (For Grid of Cards to cascade on scroll)
export function StaggerContainer({
  children,
  className = "",
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  y = 22,
  x = 0,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  x?: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y, x, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Aliases for Convenience
export const ScrollFadeUp = FadeUp;
export const ScrollRevealLeft = RevealLeft;
export const ScrollRevealRight = RevealRight;
export const ScrollZoomIn = ZoomIn;
export const RevealUp = FadeUp;

// 9. Interactive Lightweight Hover Transition Card
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
          y: -5,
          boxShadow: "0 18px 36px -10px rgba(15, 23, 42, 0.12)",
        }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{ willChange: "transform" }}
        className={`transition-all duration-200 ${className}`}
      >
        <div>{children}</div>
      </motion.div>
    </div>
  );
}

export const InteractiveCard = XYZCard;

