"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Server, GitCommit, Sparkles, Database, CheckCircle2 } from "lucide-react";
import TerminalAudioPlayer from "@/components/TerminalAudioPlayer";
import TerminalGuestbook from "@/components/TerminalGuestbook";

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
    name: "Tailwind CSS",
    percentage: 90,
    color: "#00FFA3",
    glowColor: "rgba(0, 255, 163, 0.4)",
    barGradient: "from-[#00FFA3] to-[#10B981]",
    tag: "Responsive & Modern UI",
  },
  {
    name: "React / Next.js",
    percentage: 80,
    color: "#00F0FF",
    glowColor: "rgba(0, 240, 255, 0.4)",
    barGradient: "from-[#00F0FF] to-[#38BDF8]",
    tag: "Component-Driven & SSR",
  },
  {
    name: "Interactive UI & 3D",
    percentage: 82,
    color: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.4)",
    barGradient: "from-[#C084FC] to-[#A855F7]",
    tag: "Framer Motion & Three.js",
  },
];

const BACKEND_SKILLS: SkillProgress[] = [
  {
    name: "JavaScript",
    percentage: 95,
    color: "#FFE600",
    glowColor: "rgba(255, 230, 0, 0.4)",
    barGradient: "from-[#FFE600] to-[#F59E0B]",
    tag: "Core Logic, Async & ESNext",
  },
  {
    name: "Node.js",
    percentage: 90,
    color: "#22C55E",
    glowColor: "rgba(34, 197, 94, 0.4)",
    barGradient: "from-[#4ADE80] to-[#22C55E]",
    tag: "Backend & Web Automation",
  },
  {
    name: "Web Scraping & APIs",
    percentage: 92,
    color: "#00FFA3",
    glowColor: "rgba(0, 255, 163, 0.4)",
    barGradient: "from-[#00FFA3] to-[#10B981]",
    tag: "Puppeteer & Custom Integrations",
  },
];

const TOOLS_LIST = [
  { name: "Supabase", desc: "Database, Auth & Realtime", icon: "⚡" },
  { name: "Vercel", desc: "Edge Deployment & CI/CD", icon: "▲" },
  { name: "External APIs", desc: "REST & Webhook Automation", icon: "🔗" },
  { name: "Git & GitHub", desc: "Version Control & Workflow", icon: "🐙" },
];

const MARQUEE_TECH = [
  "JavaScript",
  "Node.js",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Supabase",
  "Vercel",
  "External APIs",
  "Web Automation",
  "Web Scraping",
  "PostgreSQL",
  "Framer Motion",
  "Three.js",
  "Git",
];

// Generate 20 weeks of GitHub activity heatmap
const HEATMAP_WEEKS = 20;
const HEATMAP_DATA: number[][] = Array.from({ length: HEATMAP_WEEKS }, (_, weekIndex) =>
  Array.from({ length: 7 }, (_, dayIndex) => {
    const seed = (weekIndex * 7 + dayIndex) % 13;
    if (seed === 0 || seed === 6) return Math.random() > 0.4 ? 1 : 0;
    const rand = Math.random();
    if (rand < 0.12) return 0;
    if (rand < 0.42) return 1;
    if (rand < 0.72) return 2;
    if (rand < 0.9) return 3;
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
              Technical Stack & Mastery
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-md font-normal leading-relaxed">
            Focused on the modern JavaScript ecosystem, high-efficiency backend automation, and intuitive user interfaces.
          </p>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {/* BENTO 1: Frontend (React/Next.js 80%, Tailwind CSS 90%) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-6 glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:border-[#00F0FF]/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.12)]"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#00F0FF]/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                    <Code2 size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      Frontend Development
                    </h3>
                    <span className="text-xs text-gray-400 font-mono">
                      Responsive & Interactive UI
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] text-[11px] font-mono font-semibold border border-[#00F0FF]/20">
                  Modern Web
                </span>
              </div>

              <div className="space-y-4">
                {FRONTEND_SKILLS.map((skill, i) => (
                  <SkillBarItem key={skill.name} skill={skill} delay={i * 0.1} />
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-500 font-mono">
              <span>Tailwind CSS Architecture</span>
              <span className="text-[#00F0FF]">Clean & Modular</span>
            </div>
          </motion.div>

          {/* BENTO 2: Backend & Automation (Node.js 90%, JavaScript 95%) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-6 glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:border-[#22C55E]/30 hover:shadow-[0_0_30px_rgba(34,197,94,0.12)]"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#22C55E]/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                    <Server size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      Backend & Automation
                    </h3>
                    <span className="text-xs text-gray-400 font-mono">
                      APIs, Scraping & Bot Engines
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#22C55E]/10 text-[#22C55E] text-[11px] font-mono font-semibold border border-[#22C55E]/20">
                  High Efficiency
                </span>
              </div>

              <div className="space-y-4">
                {BACKEND_SKILLS.map((skill, i) => (
                  <SkillBarItem key={skill.name} skill={skill} delay={i * 0.1 + 0.1} />
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-500 font-mono">
              <span>Node.js Web Automation</span>
              <span className="text-[#22C55E]">Automated Workflows</span>
            </div>
          </motion.div>

          {/* BENTO 3: GitHub Activity Heatmap (Span 7) */}
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
                      Continuous Coding Activity
                      <span className="inline-block w-2 h-2 rounded-full bg-[#00FFA3] animate-pulse" />
                    </h3>
                    <span className="text-xs text-gray-400 font-mono">
                      3+ Years Active Coding Experience
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

              <div className="overflow-x-auto pb-2 scrollbar-none">
                <div className="flex gap-1.5 min-w-[420px]">
                  {HEATMAP_DATA.map((week, wIndex) => (
                    <div key={wIndex} className="flex flex-col gap-1.5 flex-1">
                      {week.map((level, dIndex) => (
                        <div
                          key={dIndex}
                          title={`Activity level: ${level}`}
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
                <CheckCircle2 size={13} /> Active Project Building
              </span>
              <span>github.com/Panzqq</span>
            </div>
          </motion.div>

          {/* BENTO 4: Database & Tools (Supabase, Vercel, External APIs) (Span 5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-5 glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#00FFA3]/30 hover:shadow-[0_0_30px_rgba(0,255,163,0.1)]"
          >
            <div>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/[0.06]">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-[#00FFA3]/30 text-[#00FFA3] flex items-center justify-center">
                  <Database size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Database & Cloud Tools
                  </h3>
                  <span className="text-xs text-gray-400 font-mono">
                    Integrated Stack
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 my-2">
                {TOOLS_LIST.map((tool) => (
                  <div
                    key={tool.name}
                    className="bg-white/[0.02] border border-white/[0.05] hover:border-[#00FFA3]/30 rounded-2xl p-3.5 transition-colors"
                  >
                    <div className="text-sm font-bold text-white flex items-center gap-1.5 mb-0.5">
                      <span>{tool.icon}</span>
                      <span>{tool.name}</span>
                    </div>
                    <div className="text-[11px] text-gray-400 font-mono leading-tight">
                      {tool.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/[0.04] text-[11px] font-mono text-gray-500">
              Supabase, Vercel & API integrations ready.
            </div>
          </motion.div>

          {/* BENTO 5: Interactive Terminal Music & Video Player (Span 12) */}
          <TerminalAudioPlayer className="lg:col-span-12" />

          {/* BENTO 6: Terminal Guestbook (Supabase Integration) (Span 12) */}
          <TerminalGuestbook className="lg:col-span-12" />
        </div>

        {/* Infinite Tech Marquee Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pt-2"
        >
          <div className="relative w-full overflow-hidden py-3 glass-card rounded-2xl border border-white/[0.06]">
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
