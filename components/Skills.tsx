"use client";

import { motion } from "framer-motion";
import { Code2, Server, Wrench, Sparkles, Database, Layers } from "lucide-react";

const TECH_ITEMS_1 = [
  "NEXT.JS 14", "TYPESCRIPT", "REACT 18", "TAILWIND CSS", 
  "FRAMER MOTION", "NODE.JS", "SUPABASE", "POSTGRESQL", 
  "PRISMA ORM", "DOCKER", "GRAPHQL", "VERCEL"
];

const TECH_ITEMS_2 = [
  "REST APIS", "ZUSTAND", "REDUX TOOLKIT", "SOCKET.IO", 
  "FIGMA UI/UX", "GIT & GITHUB", "TURBOREPO", "VITEST", 
  "EDGE FUNCTIONS", "RADIX UI", "SHADCN/UI", "NEOBRUTALISM"
];

const SKILL_MATRIX = [
  {
    category: "FRONTEND_SYSTEMS",
    icon: Code2,
    badge: "bg-brutal-cyan text-black",
    skills: [
      { name: "Next.js (App Router / Server Components)", val: 95 },
      { name: "TypeScript / Strict Type Architectures", val: 92 },
      { name: "Tailwind CSS & Neobrutal Design Systems", val: 98 },
      { name: "Framer Motion & Micro-Interactions", val: 90 },
    ],
  },
  {
    category: "BACKEND_&_DATABASES",
    icon: Server,
    badge: "bg-brutal-lime text-black",
    skills: [
      { name: "Node.js / Express / Next API Handlers", val: 88 },
      { name: "PostgreSQL & Supabase Architecture", val: 86 },
      { name: "Prisma ORM & Schema Design", val: 85 },
      { name: "RESTful & GraphQL API Integrations", val: 90 },
    ],
  },
  {
    category: "DEVOPS_&_TOOLING",
    icon: Wrench,
    badge: "bg-brutal-yellow text-black",
    skills: [
      { name: "Vercel / Edge Deployment / CI-CD", val: 94 },
      { name: "Git & Collaborative GitHub Workflows", val: 92 },
      { name: "Docker Containerization", val: 78 },
      { name: "Performance Optimization & SEO Audit", val: 95 },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto mb-12">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-4 h-4 bg-brutal-yellow border-2 border-black shadow-brutal-sm" />
          <span className="font-mono text-sm tracking-widest uppercase text-brutal-yellow font-bold">
            04. TECH_ARSENAL // STACK_INVENTORY
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
          TECHNOLOGY <span className="bg-brutal-pink text-white px-2 border-2 border-black">CAPABILITIES</span>
        </h2>
        <p className="text-white/60 font-sans text-sm md:text-base max-w-xl">
          Tested, benchmarked, and production-proven tech stacks used to build high-converting software.
        </p>
      </div>

      {/* Infinite Marquee Tape 1 */}
      <div className="w-full bg-brutal-surface border-y-4 border-black py-3 mb-3 overflow-hidden select-none">
        <div className="flex gap-4 whitespace-nowrap animate-marquee">
          {TECH_ITEMS_1.concat(TECH_ITEMS_1).map((tech, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 bg-brutal-card border-2 border-black px-3 py-1 font-mono font-black text-xs md:text-sm text-brutal-cyan shadow-brutal-sm"
            >
              ✦ {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Infinite Marquee Tape 2 (Reverse) */}
      <div className="w-full bg-brutal-surface border-b-4 border-black py-3 mb-16 overflow-hidden select-none">
        <div className="flex gap-4 whitespace-nowrap animate-marquee-reverse">
          {TECH_ITEMS_2.concat(TECH_ITEMS_2).map((tech, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 bg-brutal-card border-2 border-black px-3 py-1 font-mono font-black text-xs md:text-sm text-brutal-lime shadow-brutal-sm"
            >
              ⚡ {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Skill Gauges Grid */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {SKILL_MATRIX.map((matrix) => {
          const Icon = matrix.icon;
          return (
            <div
              key={matrix.category}
              className="bg-brutal-surface border-4 border-black p-6 shadow-brutal card-brutal flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-white/10">
                  <div className="flex items-center gap-2">
                    <Icon size={18} className="text-white" />
                    <span className="font-mono font-black text-xs uppercase text-white">
                      {matrix.category}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000] ${matrix.badge}`}>
                    VERIFIED
                  </span>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  {matrix.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1 text-white/80 font-bold">
                        <span>{skill.name}</span>
                        <span className="text-brutal-cyan">{skill.val}%</span>
                      </div>
                      <div className="w-full h-3 bg-black border-2 border-white/20 p-0.5">
                        <div
                          className="h-full bg-brutal-cyan border border-black"
                          style={{ width: `${skill.val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-white/40">
                <span>STATUS: ACTIVE</span>
                <span className="text-brutal-lime">100% RELIABLE</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
