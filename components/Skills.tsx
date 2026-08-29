"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const techStack = [
  { name: "JavaScript", emoji: "🟨" },
  { name: "TypeScript", emoji: "🔷" },
  { name: "React", emoji: "⚛️" },
  { name: "Next.js", emoji: "▲" },
  { name: "Node.js", emoji: "🟩" },
  { name: "Tailwind CSS", emoji: "🎨" },
  { name: "Supabase", emoji: "🔋" },
  { name: "PostgreSQL", emoji: "🐘" },
  { name: "Prisma", emoji: "💎" },
  { name: "Docker", emoji: "🐳" },
  { name: "Git", emoji: "🔀" },
  { name: "Figma", emoji: "🎯" },
  { name: "REST API", emoji: "🔗" },
  { name: "GraphQL", emoji: "🔺" },
  { name: "Framer Motion", emoji: "🎭" },
  { name: "Vercel", emoji: "🚀" },
];

const skillCategories = [
  {
    category: "Frontend",
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "React / Next.js", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    category: "Backend",
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Node.js / Express", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Supabase", level: 82 },
      { name: "REST / GraphQL", level: 78 },
    ],
  },
  {
    category: "Tools & DevOps",
    color: "from-emerald-500 to-cyan-500",
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "Docker", level: 70 },
      { name: "Vercel / CI-CD", level: 85 },
      { name: "Figma", level: 75 },
    ],
  },
];

// Duplicate for seamless infinite scroll
const marqueeItems = [...techStack, ...techStack];

function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mb-4 last:mb-0">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-white/70 font-medium">{name}</span>
        <span className="text-xs text-white/40 font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <section id="skills" ref={ref} className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section label */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
            <span className="text-cyan-400 font-mono text-sm">02.</span>
            <span className="text-white/40 text-sm uppercase tracking-widest font-mono">Tech Stack</span>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/30 to-transparent" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Tools I{" "}
            <span className="gradient-text">love & use</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-white/50 text-base mb-14 max-w-lg"
          >
            A curated set of technologies I&apos;ve mastered — from crafting pixel-perfect UIs
            to building scalable backends.
          </motion.p>

          {/* Infinite Marquee */}
          <motion.div
            variants={itemVariants}
            className="marquee-container relative mb-14 overflow-hidden"
          >
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#050A14] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050A14] to-transparent z-10 pointer-events-none" />

            <div className="flex gap-3 marquee-track" style={{ animation: "marquee 30s linear infinite" }}>
              {marqueeItems.map((tech, i) => (
                <div
                  key={`${tech.name}-${i}`}
                  className="flex-shrink-0 flex items-center gap-2 glass px-4 py-2.5 rounded-xl border border-white/5 hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-all duration-300 cursor-default"
                >
                  <span className="text-base">{tech.emoji}</span>
                  <span className="text-sm text-white/70 font-medium whitespace-nowrap">{tech.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skill bars grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.category}
                variants={itemVariants}
                className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${cat.color}`} />
                  <h3 className="font-semibold text-white text-sm">{cat.category}</h3>
                </div>
                {cat.skills.map((skill) => (
                  <SkillBar key={skill.name} {...skill} color={cat.color} />
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
