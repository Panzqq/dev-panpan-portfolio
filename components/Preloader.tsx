"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_STEPS = [
  "INITIALIZING THREE.JS WEBGL CONTEXT...",
  "COMPILING HIGH-PERFORMANCE SHADERS...",
  "LOADING CYBER ROBOT MESHES & LIGHTING...",
  "CALIBRATING DEV PANPAN NEURAL CORE...",
  "SYSTEM MATRIX READY // BOOTING WORKSPACE...",
];

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            onComplete?.();
          }, 400);
          return 100;
        }
        // Organic progress curve
        const inc = Math.floor(Math.random() * 8) + 4;
        const next = Math.min(100, prev + inc);
        const nextStep = Math.min(
          LOADING_STEPS.length - 1,
          Math.floor((next / 100) * LOADING_STEPS.length)
        );
        setStepIndex(nextStep);
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-[#07080D] flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Ambient Cyber Grid Background */}
          <div className="absolute inset-0 bg-brutal-grid opacity-30 pointer-events-none" />

          <div className="relative z-10 max-w-md w-full bg-brutal-surface border-4 border-black p-6 md:p-8 shadow-brutal-cyan text-center">
            {/* Top Status Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-white/10 font-mono text-xs">
              <div className="flex items-center gap-2 text-brutal-cyan font-bold">
                <span className="w-2.5 h-2.5 bg-brutal-cyan border border-black animate-ping" />
                <span>DEV_PANPAN_OS</span>
              </div>
              <span className="text-brutal-yellow font-bold">v2.4.0_3D</span>
            </div>

            {/* ASCII / Cyber Icon */}
            <div className="text-brutal-lime font-mono text-xs font-bold mb-4 tracking-widest">
              [ ⚡ HARDWARE_ACCELERATED_3D ]
            </div>

            {/* Huge Percentage Counter */}
            <div className="font-mono text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              <span className="text-brutal-cyan">{progress}</span>
              <span className="text-brutal-pink text-3xl font-extrabold">%</span>
            </div>

            {/* Neobrutalist Progress Bar */}
            <div className="w-full h-4 bg-black border-2 border-black p-0.5 mb-4 shadow-brutal-sm">
              <motion.div
                className="h-full bg-gradient-to-r from-brutal-cyan via-brutal-lime to-brutal-yellow border border-black"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Dynamic Status Log */}
            <div className="h-6 font-mono text-xs text-white/70 font-semibold truncate">
              &gt; {LOADING_STEPS[stepIndex]}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
