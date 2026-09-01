"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal as TerminalIcon, Quote } from "lucide-react";

const QUOTE_TEXT =
  "Kamu tidak akan menemukan seseorang yang sama untuk kedua kalinya, bahkan tidak dalam diri orang itu sendiri, setelah waktu dan keadaan mengubahnya.";

interface TerminalQuoteProps {
  className?: string;
}

export default function TerminalQuote({ className = "" }: TerminalQuoteProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;

    let index = 0;
    const initialDelay = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < QUOTE_TEXT.length) {
          setDisplayedText(QUOTE_TEXT.slice(0, index + 1));
          index++;
        } else {
          setIsDone(true);
          clearInterval(interval);
        }
      }, 35);

      return () => clearInterval(interval);
    }, 400);

    return () => clearTimeout(initialDelay);
  }, [isInView]);

  return (
    <section className={`py-4 px-6 relative ${className}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2, margin: "-40px 0px -40px 0px" }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
          className="glass-card bg-[#0A0A0A] rounded-3xl p-6 md:p-8 border border-emerald-900/30 hover:border-emerald-500/30 transition-all duration-300 relative font-mono overflow-hidden shadow-2xl group"
        >
          {/* Subtle Ambient Background Glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#00FFA3]/5 rounded-full blur-2xl pointer-events-none" />

          {/* 1. Terminal macOS Header */}
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.08] relative z-20 shrink-0">
            <div className="flex items-center gap-3">
              {/* macOS Traffic Light Buttons */}
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 shadow-[0_0_6px_rgba(255,95,86,0.4)] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 shadow-[0_0_6px_rgba(255,189,46,0.4)] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/60 shadow-[0_0_6px_rgba(39,201,63,0.4)] inline-block" />
              </div>

              <div className="flex items-center gap-2 pl-1 text-xs text-gray-400 font-mono">
                <TerminalIcon size={14} className="text-emerald-400" />
                <span className="text-gray-300 font-semibold tracking-tight hidden sm:inline">
                  dev-panpan@system:
                </span>
                <span className="text-emerald-400/80">~/thoughts.sh</span>
              </div>
            </div>

            {/* Right Status Badge */}
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isDone
                    ? "bg-emerald-400 shadow-[0_0_8px_#00FFA3]"
                    : "bg-cyan-400 animate-pulse shadow-[0_0_8px_#22D3EE]"
                }`}
              />
              <span className="text-[11px] font-mono text-emerald-400/90 font-medium tracking-wide uppercase">
                {isDone ? "EXECUTED" : "STREAMING"}
              </span>
            </div>
          </div>

          {/* 2. Terminal Content Body */}
          <div className="space-y-3 relative z-10">
            {/* Line 1: Command line execution prompt */}
            <div className="text-xs md:text-sm font-mono text-emerald-700/80 flex items-center gap-2 select-none">
              <span className="text-emerald-400 font-bold">&gt;</span>
              <span>executing ~/thoughts.sh...</span>
            </div>

            {/* Line 2: Empty line spacing */}
            <div className="h-0.5" />

            {/* Line 3: Typing Animated Quote */}
            <div className="bg-black/50 rounded-2xl p-4 md:p-6 border border-white/[0.04] relative">
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[length:100%_4px] pointer-events-none opacity-20 rounded-2xl z-0" />

              <div className="relative z-10 flex items-start gap-3">
                <Quote size={20} className="text-emerald-500/40 shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base md:text-lg text-emerald-400 font-mono leading-relaxed font-medium tracking-wide">
                  &ldquo;{displayedText}&rdquo;
                  <span className="inline-block text-emerald-400 font-bold ml-1 animate-pulse drop-shadow-[0_0_8px_#00FFA3]">
                    _
                  </span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
