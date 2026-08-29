"use client";

import { motion } from "framer-motion";
import { CheckSquare, ShieldCheck, Terminal, Compass, Flame, Coffee } from "lucide-react";

const PRINCIPLES = [
  {
    icon: Flame,
    title: "HIGH-VELOCITY EXECUTION",
    desc: "Ship fast without sacrificing code maintainability or rock-solid stability.",
    color: "bg-brutal-pink text-white",
  },
  {
    icon: ShieldCheck,
    title: "TYPE-SAFE & ROBUST",
    desc: "Strict TypeScript discipline ensures bugs are squashed at compile-time.",
    color: "bg-brutal-cyan text-black",
  },
  {
    icon: Compass,
    title: "NEOBRUTAL AESTHETICS",
    desc: "Creating bold, unforgettable visual identities that break the boring web mold.",
    color: "bg-brutal-yellow text-black",
  },
  {
    icon: Coffee,
    title: "PASSION FOR CRAFT",
    desc: "Endless curiosity exploring cutting-edge web specs, open-source & UI patterns.",
    color: "bg-brutal-lime text-black",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-4 md:px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-4 h-4 bg-brutal-lime border-2 border-black shadow-brutal-sm" />
          <span className="font-mono text-sm tracking-widest uppercase text-brutal-lime font-bold">
            03. DOSSIER // ABOUT_OPERATOR
          </span>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Main Bio Card */}
          <div className="md:col-span-7 bg-brutal-surface border-4 border-black p-6 md:p-8 shadow-brutal-lg relative">
            <div className="bg-brutal-lime border-2 border-black inline-block px-3 py-1 text-black font-mono font-black text-xs uppercase mb-4 shadow-brutal-sm">
              BIOGRAPHY_RECORD
            </div>

            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 leading-tight">
              BUILDING <span className="bg-brutal-yellow text-black px-2 border-2 border-black">DIGITAL DYNAMISM</span> FROM RAW LOGIC.
            </h2>

            <div className="space-y-4 font-sans text-sm md:text-base text-white/80 leading-relaxed">
              <p>
                Hello! I&apos;m <span className="text-brutal-cyan font-bold">Dev panpan</span> — a full-stack engineer and digital architect based in Indonesia. I engineer web applications that combine high-performance software architecture with unapologetically bold visual design.
              </p>

              <p>
                Whether it&apos;s crafting <span className="text-brutal-yellow font-bold">fluid Framer Motion animations</span>, structuring complex <span className="text-brutal-lime font-bold">Next.js full-stack architectures</span>, or tuning database query latencies on Supabase and PostgreSQL, I treat code as a high-precision craft.
              </p>

              <p>
                My philosophy is simple: <span className="bg-brutal-card border-2 border-black px-2 py-0.5 text-brutal-pink font-mono font-bold">Clean code. Fast load times. Unforgettable UX.</span>
              </p>
            </div>

            {/* Quick Checklist */}
            <div className="mt-6 pt-6 border-t-2 border-white/10 grid sm:grid-cols-2 gap-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-brutal-lime font-bold">✔</span>
                <span>Production Ready CI/CD</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brutal-lime font-bold">✔</span>
                <span>Pixel-Perfect Responsive</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brutal-lime font-bold">✔</span>
                <span>Optimized Lighthouse 98+</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brutal-lime font-bold">✔</span>
                <span>Clean Git Flow & Testing</span>
              </div>
            </div>
          </div>

          {/* Core Principles Grid */}
          <div className="md:col-span-5 space-y-4">
            {PRINCIPLES.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div
                  key={principle.title}
                  className="bg-brutal-surface border-3 border-black p-5 shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 border-2 border-black shadow-[2px_2px_0px_#000] ${principle.color}`}>
                      <Icon size={16} />
                    </div>
                    <h3 className="font-mono font-black text-sm uppercase tracking-wide text-white">
                      {principle.title}
                    </h3>
                  </div>
                  <p className="text-xs text-white/60 font-sans leading-relaxed">
                    {principle.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
