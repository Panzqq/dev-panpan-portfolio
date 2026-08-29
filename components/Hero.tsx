"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Terminal as TerminalIcon, Sparkles, Zap, Code, ShieldCheck } from "lucide-react";

const ROLES = [
  "FULL_STACK_ARCHITECT",
  "NEXT.JS_SPECIALIST",
  "UI/UX_NEOBRUTALIST",
  "PERFORMANCE_ENGINEER",
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
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center pt-28 pb-16 px-4 md:px-6 overflow-hidden">
      {/* Ticker Caution Strip */}
      <div className="w-full bg-brutal-yellow border-y-4 border-black text-black font-mono font-black text-xs md:text-sm py-2 overflow-hidden select-none mb-12 shadow-brutal">
        <div className="flex gap-8 whitespace-nowrap animate-marquee">
          <span>⚡ DEV_PANPAN // SYSTEM ONLINE // AVAILABLE FOR HIRE 2026</span>
          <span>✦ BUILT WITH NEXT.JS 14 & TYPESCRIPT</span>
          <span>✦ NEOBRUTALISM ARCHITECTURE</span>
          <span>✦ 100% BULLETPROOF CODE</span>
          <span>⚡ DEV_PANPAN // SYSTEM ONLINE // AVAILABLE FOR HIRE 2026</span>
          <span>✦ BUILT WITH NEXT.JS 14 & TYPESCRIPT</span>
          <span>✦ NEOBRUTALISM ARCHITECTURE</span>
          <span>✦ 100% BULLETPROOF CODE</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
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
            ⚡ RAPID HIGH-SPEED SHIPPER
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

        {/* Main Headline Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-brutal-surface border-4 border-black p-6 md:p-10 shadow-brutal-xl relative mb-10 text-center"
        >
          {/* Decorative Corner Accents */}
          <div className="absolute top-2 left-2 w-3 h-3 bg-brutal-yellow border border-black" />
          <div className="absolute top-2 right-2 w-3 h-3 bg-brutal-cyan border border-black" />
          <div className="absolute bottom-2 left-2 w-3 h-3 bg-brutal-pink border border-black" />
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-brutal-lime border border-black" />

          <p className="font-mono text-sm uppercase tracking-widest text-brutal-cyan font-bold mb-3">
            &lt;OPERATOR_PROFILE /&gt;
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight uppercase leading-none mb-6">
            HI, I&apos;M <span className="bg-brutal-cyan text-black px-2 py-0.5 border-4 border-black shadow-brutal">DEV PANPAN</span>
          </h1>

          {/* Typing Role */}
          <div className="inline-flex items-center gap-2 bg-brutal-bg border-3 border-black px-4 py-2 text-base md:text-xl font-mono font-extrabold text-brutal-lime shadow-brutal mb-6">
            <span>&gt;_</span>
            <span ref={roleRef}>FULL_STACK_ARCHITECT</span>
            <span className="inline-block w-2.5 h-5 bg-brutal-lime animate-blink" />
          </div>

          <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-sans mb-8">
            Crafting high-velocity, high-conversion digital experiences with{" "}
            <span className="text-brutal-cyan font-bold">Next.js 14</span>,{" "}
            <span className="text-brutal-yellow font-bold">TypeScript</span>, and{" "}
            <span className="text-brutal-pink font-bold">Framer Motion</span>. No fluff, just raw engineering & stunning aesthetics.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-brutal bg-brutal-lime border-3 border-black px-6 py-3.5 text-black font-mono font-black text-sm uppercase shadow-brutal-lime flex items-center gap-2"
            >
              <TerminalIcon size={18} />
              OPEN_TERMINAL
            </button>

            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-brutal bg-brutal-cyan border-3 border-black px-6 py-3.5 text-black font-mono font-black text-sm uppercase shadow-brutal-cyan flex items-center gap-2"
            >
              EXPLORE_PROJECTS
              <span>→</span>
            </button>

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-brutal bg-brutal-card border-3 border-black px-6 py-3.5 text-white hover:bg-brutal-yellow hover:text-black font-mono font-black text-sm uppercase shadow-brutal"
            >
              INITIATE_CONTACT
            </button>
          </div>
        </motion.div>

        {/* Stats Punchcards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "EXPERIENCE", val: "5+ YRS", bg: "bg-brutal-card", text: "text-brutal-cyan" },
            { label: "CODEBASE COMMITS", val: "1,480+", bg: "bg-brutal-card", text: "text-brutal-lime" },
            { label: "SYSTEM UPTIME", val: "99.9%", bg: "bg-brutal-card", text: "text-brutal-yellow" },
            { label: "TECH AGILITY", val: "100%", bg: "bg-brutal-card", text: "text-brutal-pink" },
          ].map((stat, i) => (
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
