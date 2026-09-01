"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function AmbientSpotlight() {
  const [mounted, setMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Ultra-smooth spring physics for organic cursor following
  const springX = useSpring(mouseX, { stiffness: 120, damping: 24, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 24, mass: 0.1 });

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted || isTouchDevice) return null;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-500 overflow-hidden"
      style={{
        background: `radial-gradient(550px circle at ${springX}px ${springY}px, rgba(0, 255, 163, 0.045), transparent 70%)`,
      }}
    />
  );
}
