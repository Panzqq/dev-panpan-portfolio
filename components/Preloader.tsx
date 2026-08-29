"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            onComplete?.();
          }, 300);
          return 100;
        }
        const inc = Math.floor(Math.random() * 10) + 6;
        return Math.min(100, prev + inc);
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] bg-[#050C0A] flex flex-col items-center justify-center p-6 select-none"
        >
          <div className="max-w-xs w-full flex flex-col items-center">
            {/* Emerald Logo */}
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-[#00FFA3]/30 flex items-center justify-center text-[#00FFA3] font-bold text-lg mb-6 shadow-[0_0_20px_rgba(0,255,163,0.2)]">
              DP
            </div>

            {/* Brand Title */}
            <div className="text-white text-sm font-semibold tracking-tight mb-4">
              Dev Panpan <span className="text-gray-500 font-normal">| Loading</span>
            </div>

            {/* Emerald Progress Bar */}
            <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full bg-[#00FFA3] shadow-[0_0_10px_#00FFA3]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            <div className="text-xs font-mono text-gray-500">
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
