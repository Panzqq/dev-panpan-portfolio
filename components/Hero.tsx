"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, Sparkles, Zap, Code, ShieldCheck } from "lucide-react";

// Dynamic import with SSR disabled for 3D WebGL Canvas
const Hero3D = dynamic(() => import("@/components/Hero3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center bg-brutal-surface border-4 border-black shadow-brutal">
      <div className="font-mono text-xs text-brutal-cyan font-bold animate-pulse flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-brutal-cyan border border-black animate-ping" />
        <span>INITIALIZING_3D_ROBOT_CORE...</span>
      </div>
    </div>
  ),
});

const ROLES = [
  "FULL_STACK_ARCHITECT",
  "NEXT.JS_SPECIALIST",
  "UI/UX_NEOBRUTALIST",
  "3D_WEB_DEVELOPER",
];

export default function Hero() {
  const roleRef = useRef<HTMLSpanElement>(null);
  const roleIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const currentRole = ROLES[roleIndex.current];
      const el = roleRef.current;
      if (!el) return;

      if (!isDeleting.current) {
        el.textContent = currentRole.slice(0, charIndex.current + 1);
        charIndex.current++;
        if (charIndex.current === currentRole.length) {
          isDeleting.current = true;
          timeout = setTimeout(type, 2000);
          return;
        }
      } else {
        el.textContent = currentRole.slice(0, charIndex.current - 1);
        charIndex.current--;
        if (charIndex.current === 0) {
          isDeleting.current = false;
          roleIndex.current = (roleIndex.current + 1) % ROLES.length;
        }
      }

      timeout = setTimeout(type, isDeleting.current ? 50 : 80);
    };

    timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center items-center pt-24 pb-16 px-4 md:px-6 overflow-hidden">
      {/* Ticker Caution Strip */}
      <div className="w-full bg-brutal-yellow border-y-4 border-black text-black font-mono font-black text-xs md:text-sm py-2 overflow-hidden select-none mb-8 shadow-brutal">
        <div className="flex gap-8 whitespace-nowrap animate-marquee">
          <span>⚡ DEV_PANPAN // 3D ROBOT ONLINE // AVAILABLE FOR HIRE 2026</span>
          <span>✦ BUILT WITH NEXT.JS 14, THREE.JS & TYPESCRIPT</span>
          <span>✦ NEOBRUTALISM 3D ARCHITECTURE</span>
          <span>✦ HARDWARE-ACCELERATED PERFORMANCE</span>
          <span>⚡ DEV_PANPAN // 3D ROBOT ONLINE // AVAILABLE FOR HIRE 2026</span>
          <span>✦ BUILT WITH NEXT.JS 14, THREE.JS & TYPESCRIPT</span>
          <span>✦ NEOBRUTALISM 3D ARCHITECTURE</span>
          <span>✦ HARDWARE-ACCELERATED PERFORMANCE</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-brutal-cyan border-3 border-black text-black px-3.5 py-1.5 font-mono font-black text-xs shadow-brutal-sm -rotate-2 hover:rotate-0 transition-transform"
          >
            🚀 FULL-STACK DEVELOPER
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-brutal-lime border-3 border-black text-black px-3.5 py-1.5 font-mono font-black text-xs shadow-brutal-sm rotate-1 hover:rotate-0 transition-transform"
          >
            🤖 3D THREE.JS INTEGRATED
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-brutal-pink border-3 border-black text-white px-3.5 py-1.5 font-mono font-black text-xs shadow-brutal-sm -rotate-1 hover:rotate-0 transition-transform"
          >
            🎨 UI/UX & ANIMATION
          </motion.div>
        </div>

        {/* 2-Column Hero Grid: Left Content + Right 3D Robot */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-10">
          {/* Left Column: Headline, Bio & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-brutal-surface border-4 border-black p-6 md:p-8 shadow-brutal-xl relative"
          >
            {/* Decorative Corner Accents */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-brutal-yellow border border-black" />
            <div className="absolute top-2 right-2 w-3 h-3 bg-brutal-cyan border border-black" />
            <div className="absolute bottom-2 left-2 w-3 h-3 bg-brutal-pink border border-black" />
            <div className="absolute bottom-2 right-2 w-3 h-3 bg-brutal-lime border border-black" />

            <p className="font-mono text-sm uppercase tracking-widest text-brutal-cyan font-bold mb-2">
              &lt;OPERATOR_PROFILE // SYSTEM_v2.4 /&gt;
            </p>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase leading-tight mb-4">
              HI, I&apos;M <span className="bg-brutal-cyan text-black px-2 py-0.5 border-3 border-black shadow-brutal-sm">DEV PANPAN</span>
            </h1>

            {/* Typing Role */}
            <div className="inline-flex items-center gap-2 bg-brutal-bg border-3 border-black px-3.5 py-1.5 text-sm md:text-lg font-mono font-extrabold text-brutal-lime shadow-brutal mb-5">
              <span>&gt;_</span>
              <span ref={roleRef}>FULL_STACK_ARCHITECT</span>
              <span className="inline-block w-2 h-4 bg-brutal-lime animate-blink" />
            </div>

            <p className="text-white/70 text-xs md:text-sm leading-relaxed font-sans mb-6">
              Engineering high-velocity web systems with{" "}
              <span className="text-brutal-cyan font-bold">Next.js 14</span>,{" "}
              <span className="text-brutal-yellow font-bold">Three.js 3D Graphics</span>, and{" "}
              <span className="text-brutal-pink font-bold">Framer Motion</span>. Explore the interactive robot or execute terminal commands below.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-brutal bg-brutal-lime border-3 border-black px-5 py-3 text-black font-mono font-black text-xs md:text-sm uppercase shadow-brutal-lime flex items-center gap-2"
              >
                <TerminalIcon size={16} />
                OPEN_TERMINAL
              </button>

              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-brutal bg-brutal-cyan border-3 border-black px-5 py-3 text-black font-mono font-black text-xs md:text-sm uppercase shadow-brutal-cyan flex items-center gap-2"
              >
                EXPLORE_PROJECTS
                <span>→</span>
              </button>

              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-brutal bg-brutal-card border-3 border-black px-5 py-3 text-white hover:bg-brutal-yellow hover:text-black font-mono font-black text-xs md:text-sm uppercase shadow-brutal"
              >
                INITIATE_CONTACT
              </button>
            </div>
          </motion.div>

          {/* Right Column: 3D Robot Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-brutal-surface border-4 border-black shadow-brutal-xl overflow-hidden relative"
          >
            {/* Robot Window Header */}
            <div className="bg-brutal-card border-b-4 border-black px-4 py-2.5 flex items-center justify-between font-mono text-xs select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-brutal-pink border border-black" />
                <span className="w-3 h-3 bg-brutal-yellow border border-black" />
                <span className="w-3 h-3 bg-brutal-lime border border-black" />
                <span className="text-white/80 font-bold ml-1">CYBER_MECH.3D</span>
              </div>
              <span className="text-brutal-cyan font-bold">[TRACKING_MOUSE]</span>
            </div>

            {/* Canvas Mount */}
            <Hero3D />
          </motion.div>
        </div>

        {/* Stats Punchcards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "EXPERIENCE", val: "5+ YRS", bg: "bg-brutal-card", text: "text-brutal-cyan" },
            { label: "CODEBASE COMMITS", val: "1,480+", bg: "bg-brutal-card", text: "text-brutal-lime" },
            { label: "SYSTEM UPTIME", val: "99.9%", bg: "bg-brutal-card", text: "text-brutal-yellow" },
            { label: "3D WEB ACCELERATION", val: "60 FPS", bg: "bg-brutal-card", text: "text-brutal-pink" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`border-3 border-black p-4 ${stat.bg} shadow-brutal-sm flex flex-col justify-between`}
            >
              <span className="font-mono text-xs font-bold text-white/50">{stat.label}</span>
              <span className={`font-mono text-2xl md:text-3xl font-black ${stat.text} mt-2`}>
                {stat.val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
