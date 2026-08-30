"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RadarLoader() {
  return (
    <motion.div
      key="radar-loader"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)",
        transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A] select-none"
    >
      {/* Central Radar Pulse Animation */}
      <div className="relative flex items-center justify-center w-24 h-24">
        {/* Ring 1 */}
        <motion.div
          className="absolute w-3 h-3 rounded-full border border-emerald-500/50 pointer-events-none"
          animate={{ scale: [1, 8], opacity: [0.8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        />

        {/* Ring 2 (Offset by 0.75s) */}
        <motion.div
          className="absolute w-3 h-3 rounded-full border border-emerald-500/50 pointer-events-none"
          animate={{ scale: [1, 8], opacity: [0.8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.75 }}
        />

        {/* Core Dot */}
        <div className="relative w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_15px_#34d399] z-10" />
      </div>

      {/* Subtle Terminal Status Caption */}
      <div className="mt-8 flex flex-col items-center gap-1.5 font-mono">
        <div className="text-xs text-emerald-400 tracking-widest uppercase flex items-center gap-2 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#00FFA3]" />
          <span>INITIALIZING_SYSTEM_CORE</span>
        </div>
        <div className="text-[11px] text-gray-600">
          dev-panpan@system: ~/boot.sh
        </div>
      </div>
    </motion.div>
  );
}
