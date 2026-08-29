"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Server, GitCommit, Zap, Layers, Sparkles, Activity, CheckCircle2 } from "lucide-react";

// Color-coded progress bar item
interface SkillProgress {
  name: string;
  percentage: number;
  color: string;
  glowColor: string;
  barGradient: string;
  tag: string;
}

const FRONTEND_SKILLS: SkillProgress[] = [
  {
    name: "Next.js / React 18",
    percentage: 95,
    color: "#00F0FF",
    glowColor: "rgba(0, 240, 255, 0.4)",
    barGradient: "from-[#00F0FF] to-[#38BDF8]",
    tag: "Server Components & App Router",
  },
  {
    name: "JavaScript (ESNext)",
    percentage: 92,
    color: "#FFE600",
    glowColor: "rgba(255, 230, 0, 0.4)",
    barGradient: "from-[#FFE600] to-[#F59E0B]",
    tag: "Modern V8 & Event Loop",
  },
  {
    name: "TypeScript",
    percentage: 90,
    color: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.4)",
    barGradient: "from-[#38BDF8] to-[#2563EB]",
    tag: "Strict Type Architecture",
  },
  {
    name: "Three.js / 3D Web",
    percentage: 84,
    color: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.4)",
    barGradient: "from-[#C084FC] to-[#A855F7]",
    tag: "R3F & Shaders",
  },
];

const BACKEND_SKILLS: SkillProgress[] = [
  {
    name: "Node.js / Express",
    percentage: 88,
    color: "#22C55E",
    glowColor: "rgba(34, 197, 94, 0.4)",
    barGradient: "from-[#4ADE80] to-[#22C55E]",
    tag: "REST, WebSockets & Microservices",
  },
  {
    name: "Supabase & PostgreSQL",
    percentage: 91,
    color: "#00FFA3",
    glowColor: "rgba(0, 255, 163, 0.4)",
    barGradient: "from-[#00FFA3] to-[#10B981]",
    tag: "RLS, Indexing & Real-time",
  },
  {
    name: "Prisma ORM & DB Schema",
    percentage: 87,
    color: "#06B6D4",
    glowColor: "rgba(6, 182, 212, 0.4)",
    barGradient: "from-[#22D3EE] to-[#0891B2]",
    tag: "Type-Safe Migrations",
  },
  {
    name: "DevOps & Vercel Edge",
    percentage: 89,
    color: "#FFFFFF",
    glowColor: "rgba(255, 255, 255, 0.3)",
    barGradient: "from-white to-gray-400",
    tag: "CI/CD & Serverless Functions",
  },
];

// Tech stack items for Infinite Marquee
const MARQUEE_TECH = [
  "Next.js 14",
  "React 18",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Supabase",
  "PostgreSQL",
  "Three.js",
  "Tailwind CSS",
  "Framer Motion",
  "Prisma ORM",
  "Docker",
  "GraphQL",
  "Vercel Edge",
];

// Generate 18 weeks of realistic GitHub contribution dummy heatmap (7 rows per week)
const HEATMAP_WEEKS = 20;
const HEATMAP_DATA: number[][] = Array.from({ length: HEATMAP_WEEKS }, (_, weekIndex) =>
  Array.from({ length: 7 }, (_, dayIndex) => {
    // Generate realistic distribution of commit intensities (0, 1, 2, 3, 4)
    const seed = (weekIndex * 7 + dayIndex) % 13;
    if (seed === 0 || seed === 6) return Math.random() > 0.4 ? 1 : 0; // weekends
    const rand = Math.random();
    if (rand < 0.15) return 0;
    if (rand < 0.45) return 1;
    if (rand < 0.75) return 2;
    if (rand < 0.92) return 3;
    return 4;
  })
);

function getHeatmapColor(level: number): string {
  switch (level) {
    case 1:
      return "bg-[#064E3B]/80 hover:bg-[#064E3B]";
    case 2:
      return "bg-[#059669] hover:bg-[#10B981]";
    case 3:
      return "bg-[#10B981] hover:bg-[#34D399]";
    case 4:
      return "bg-[#00FFA3] hover:bg-white shadow-[0_0_8px_#00FFA3]";
    default:
      return "bg-white/[0.04] hover:bg-white/[0.08]";
  }
}

// Single Animated Progress Bar
function SkillBarItem({ skill, delay }: { skill: SkillProgress; delay: number }) {
  return (
    <div className="space-y-1.5 group">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-white group-hover:text-[#00FFA3] transition-colors flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{ backgroundColor: skill.color }}
          />
          {skill.name}
        </span>
        <span className="font-mono text-gray-400 font-medium">
          {skill.percentage}%
        </span>
      </div>

      {/* Progress Track */}
      <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-white/[0.06] p-0.5 relative">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percentage}%` }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 1.2, delay: delay, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${skill.barGradient} relative`}
          style={{
            boxShadow: `0 0 10px ${skill.glowColor}`,
          }}
        >
          {/* Subtle moving highlight shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-60 rounded-full" />
        </motion.div>
      </div>

      <div className="text-[11px] text-gray-500 font-mono flex items-center justify-between">
        <span>{skill.tag}</span>
      </div>
    </div>
  );
}

export default function Skills() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-[#00FFA3]/30 text-[#00FFA3] text-xs font-mono mb-3 shadow-[0_0_15px_rgba(0,255,163,0.15)]">
              <Sparkles size={13} />
              <span>SKILLS_&_CAPABILITIES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Technical Arsenal
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-md font-normal leading-relaxed">
            Engineered with deep architectural mastery across the full spectrum of modern web development.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* BENTO BOX GRID LAYOUT */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {/* BENTO 1: Frontend Systems (Span 6 columns on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-6 glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:border-[#00F0FF]/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.12)]"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#00F0FF]/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                    <Code2 size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      Frontend Architecture
                    </h3>
                    <span className="text-xs text-gray-400 font-mono">
                      Component-Driven & 3D Web
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] text-[11px] font-mono font-semibold border border-[#00F0FF]/20">
                  Tier 1
                </span>
              </div>

              {/* Progress Bars List */}
              <div className="space-y-4">
                {FRONTEND_SKILLS.map((skill, i) => (
                  <SkillBarItem key={skill.name} skill={skill} delay={i * 0.1} />
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-500 font-mono">
              <span>Lighthouse 98+ Score</span>
              <span className="text-[#00F0FF]">High Interactivity</span>
            </div>
          </motion.div>

          {/* BENTO 2: Backend & Database Engine (Span 6 columns on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-6 glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:border-[#00FFA3]/30 hover:shadow-[0_0_30px_rgba(0,255,163,0.12)]"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#00FFA3]/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#00FFA3]/10 border border-[#00FFA3]/30 text-[#00FFA3] flex items-center justify-center shadow-[0_0_15px_rgba(0,255,163,0.2)]">
                    <Server size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      Backend & Database
                    </h3>
                    <span className="text-xs text-gray-400 font-mono">
                      APIs, Schemas & Edge Storage
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#00FFA3]/10 text-[#00FFA3] text-[11px] font-mono font-semibold border border-[#00FFA3]/20">
                  Scalable
                </span>
              </div>

              {/* Progress Bars List */}
              <div className="space-y-4">
                {BACKEND_SKILLS.map((skill, i) => (
                  <SkillBarItem key={skill.name} skill={skill} delay={i * 0.1 + 0.1} />
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-500 font-mono">
              <span>PostgreSQL & RLS Compliant</span>
              <span className="text-[#00FFA3]">Sub-50ms Latency</span>
            </div>
          </motion.div>

          {/* BENTO 3: GitHub Activity Heatmap Card (Span 7 columns on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-7 glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#10B981]/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-[#10B981]/30 text-[#00FFA3] flex items-center justify-center">
                    <GitCommit size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                      Continuous Shipping Matrix
                      <span className="inline-block w-2 h-2 rounded-full bg-[#00FFA3] animate-pulse" />
                    </h3>
                    <span className="text-xs text-gray-400 font-mono">
                      1,480+ Contributions in the last year
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
                  <span>Less</span>
                  <span className="w-2.5 h-2.5 rounded-sm bg-white/[0.04] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#064E3B] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#059669] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#00FFA3] inline-block" />
                  <span>More</span>
                </div>
              </div>

              {/* Interactive GitHub Activity Heatmap Grid */}
              <div className="overflow-x-auto pb-2 scrollbar-none">
                <div className="flex gap-1.5 min-w-[420px]">
                  {HEATMAP_DATA.map((week, wIndex) => (
                    <div key={wIndex} className="flex flex-col gap-1.5 flex-1">
                      {week.map((level, dIndex) => (
                        <div
                          key={dIndex}
                          title={`Contributions level: ${level}`}
                          className={`w-full aspect-square rounded-[3px] transition-all duration-200 cursor-pointer ${getHeatmapColor(
                            level
                          )}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono text-gray-400">
              <span className="text-[#00FFA3] font-semibold flex items-center gap-1.5">
                <CheckCircle2 size={13} /> High Commit Velocity
              </span>
              <span>Streak: 48 Days Active</span>
            </div>
          </motion.div>

          {/* BENTO 4: Core Engineering Philosophy / Performance (Span 5 columns on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-5 glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#FFE600]/30 hover:shadow-[0_0_30px_rgba(255,230,0,0.1)]"
          >
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/[0.06]">
              <div className="w-10 h-10 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 flex items-center justify-center">
                <Zap size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Performance Metrics
                </h3>
                <span className="text-xs text-gray-400 font-mono">
                  Benchmark Standards
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 my-2">
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-3.5">
                <div className="text-xs text-gray-400 font-mono mb-1">SSR Render</div>
                <div className="text-xl font-bold text-[#00FFA3] font-mono">&lt; 85ms</div>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-3.5">
                <div className="text-xs text-gray-400 font-mono mb-1">Type Safety</div>
                <div className="text-xl font-bold text-white font-mono">100% Strict</div>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-3.5">
                <div className="text-xs text-gray-400 font-mono mb-1">SEO / A11y</div>
                <div className="text-xl font-bold text-yellow-400 font-mono">100 / 100</div>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-3.5">
                <div className="text-xs text-gray-400 font-mono mb-1">Architecture</div>
                <div className="text-xl font-bold text-[#00F0FF] font-mono">Modular</div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/[0.04] text-[11px] font-mono text-gray-500">
              Clean code without technical debt.
            </div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* INFINITE TECH STACK MARQUEE STRIP */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pt-4"
        >
          <div className="relative w-full overflow-hidden py-3 glass-card rounded-2xl border border-white/[0.06]">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#050C0A] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050C0A] to-transparent z-10 pointer-events-none" />

            <div className="flex gap-4 whitespace-nowrap animate-marquee">
              {MARQUEE_TECH.concat(MARQUEE_TECH).map((tech, idx) => (
                <div
                  key={`${tech}-${idx}`}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono font-medium text-gray-300 hover:text-[#00FFA3] hover:border-[#00FFA3]/40 transition-colors cursor-default"
                >
                  <span className="text-[#00FFA3]">✦</span>
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
