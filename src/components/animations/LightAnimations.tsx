"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface AnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// 1. Left-to-Right Reveal Animation (Horizontal X-axis entrance)
export function RevealLeft({ children, className = "", delay = 0 }: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 2. Right-to-Left Reveal Animation (Horizontal X-axis entrance)
export function RevealRight({ children, className = "", delay = 0 }: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 3. Zoom-In Lightweight Animation (Scale up from 0.88 to 1 with Fade)
export function ZoomIn({ children, className = "", delay = 0 }: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 4. Zoom-Out Lightweight Animation (Scale down from 1.08 to 1 with Fade)
export function ZoomOut({ children, className = "", delay = 0 }: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.08 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
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
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 6. Fade-Up Animation (Subtle Vertical Y-axis with Opacity)
export function FadeUp({ children, className = "", delay = 0 }: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 7. Interactive X-Y-Z 3D Hover Transition Card (Pitch, Yaw, Lift & Z-depth)
export function XYZCard({
  children,
  className = "",
  depth = 15,
}: {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for high responsiveness without lag
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${depth * 0.4}deg`, `-${depth * 0.4}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${depth * 0.4}deg`, `${depth * 0.4}deg`]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          scale: 1.02,
          z: 20,
          boxShadow: "0 20px 35px -10px rgba(15, 23, 42, 0.12)",
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className={`transition-shadow duration-300 ${className}`}
      >
        <div style={{ transform: "translateZ(10px)" }}>{children}</div>
      </motion.div>
    </div>
  );
}

// 8. Reusable Lightweight Card Alias
export const InteractiveCard = XYZCard;
