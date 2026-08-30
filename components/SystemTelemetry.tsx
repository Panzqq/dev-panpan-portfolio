"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Database, Wifi, Users, Server } from "lucide-react";

interface SystemTelemetryProps {
  className?: string;
}

export default function SystemTelemetry({ className = "" }: SystemTelemetryProps) {
  const [latency, setLatency] = useState(24);
  const [connections, setConnections] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomize latency between 15ms and 45ms
      setLatency(Math.floor(Math.random() * 30) + 15);
      // Randomize connections between 2 and 6
      setConnections(Math.floor(Math.random() * 4) + 2);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const barHeights = [
    ["20%", "85%", "40%", "95%", "30%"],
    ["40%", "95%", "25%", "80%", "50%"],
    ["15%", "70%", "90%", "35%", "60%"],
    ["60%", "30%", "100%", "55%", "40%"],
    ["30%", "90%", "45%", "85%", "25%"],
    ["75%", "40%", "85%", "20%", "95%"],
    ["20%", "100%", "35%", "75%", "50%"],
    ["50%", "30%", "95%", "45%", "80%"],
    ["35%", "80%", "20%", "100%", "30%"],
    ["65%", "45%", "85%", "30%", "70%"],
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -4 }}
      className={`bg-[#0A0A0A] border border-emerald-900/30 rounded-3xl p-6 flex flex-col justify-between font-mono text-sm relative overflow-hidden group hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-300 glass-card ${className}`}
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header (Top) */}
      <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06] relative z-10">
        <div className="flex items-center gap-2">
          <Activity size={15} className="text-emerald-400" />
          <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase">
            SYSTEM TELEMETRY
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="text-[10px] text-emerald-400 font-semibold uppercase">HEALTHY</span>
        </div>
      </div>

      {/* Metrics List (Middle) */}
      <div className="flex flex-col gap-3 my-4 text-xs font-mono relative z-10">
        <div className="flex items-center justify-between py-1 border-b border-white/[0.03]">
          <span className="text-gray-400 flex items-center gap-1.5">
            <Server size={13} className="text-emerald-500/70" /> Uptime:
          </span>
          <span className="text-emerald-400 font-bold">99.98%</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-white/[0.03]">
          <span className="text-gray-400 flex items-center gap-1.5">
            <Database size={13} className="text-emerald-500/70" /> Database:
          </span>
          <span className="text-emerald-400 font-bold">Connected (RLS Active)</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-white/[0.03]">
          <span className="text-gray-400 flex items-center gap-1.5">
            <Wifi size={13} className="text-emerald-500/70" /> Network:
          </span>
          <span className="text-emerald-400 font-bold transition-all">{latency}ms</span>
        </div>

        <div className="flex items-center justify-between py-1">
          <span className="text-gray-400 flex items-center gap-1.5">
            <Users size={13} className="text-emerald-500/70" /> Active Users:
          </span>
          <span className="text-emerald-400 font-bold transition-all">{connections}</span>
        </div>
      </div>

      {/* Server Load Chart (Visual Bawah) */}
      <div className="pt-2 relative z-10">
        <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
          <span>Server Load Pulse</span>
          <span className="text-emerald-400/80">realtime stream</span>
        </div>
        <div className="flex items-end gap-1.5 h-12 p-2 rounded-xl bg-black/60 border border-white/[0.04] opacity-70 group-hover:opacity-100 transition-opacity">
          {barHeights.map((heightSequence, idx) => (
            <motion.div
              key={idx}
              animate={{ height: heightSequence }}
              transition={{
                duration: 1.2 + (idx % 4) * 0.35,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="w-full bg-gradient-to-t from-emerald-600 to-[#00FFA3] rounded-t-sm shadow-[0_0_6px_rgba(0,255,163,0.3)]"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
