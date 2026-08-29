"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Terminal, Sparkles, Star } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  status: string;
  statusColor: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  highlight: string;
  cardColor: string;
  shadowColor: string;
}

const PROJECTS: Project[] = [
  {
    id: "PRJ_01",
    title: "NEXUSMART ENGINE",
    category: "FULL_STACK_ECOMMERCE",
    status: "PRODUCTION_LIVE",
    statusColor: "bg-brutal-lime text-black",
    description:
      "Enterprise e-commerce platform built for high volume. Features real-time stock sync with Supabase, automated Stripe webhooks, and sub-100ms page transitions.",
    tech: ["Next.js 14", "TypeScript", "Supabase", "Stripe API", "Tailwind CSS"],
    github: "https://github.com/Panzqq",
    live: "https://nexusmart.devpanpan.dev",
    highlight: "99.9% Checkout Success Rate",
    cardColor: "border-brutal-cyan",
    shadowColor: "shadow-brutal-cyan",
  },
  {
    id: "PRJ_02",
    title: "COLLABBOARD WORKSPACE",
    category: "REAL_TIME_COLLAB",
    status: "STABLE_RELEASE",
    statusColor: "bg-brutal-cyan text-black",
    description:
      "Multiplayer collaborative workspace with live cursor tracking, instant block synchronization via WebSockets, markdown exporting, and encrypted team rooms.",
    tech: ["React 18", "Node.js", "Socket.io", "MongoDB", "Framer Motion"],
    github: "https://github.com/Panzqq",
    live: "https://collab.devpanpan.dev",
    highlight: "< 15ms Broadcast Latency",
    cardColor: "border-brutal-lime",
    shadowColor: "shadow-brutal-lime",
  },
  {
    id: "PRJ_03",
    title: "AIINSIGHT ANALYTICS",
    category: "AI_INTELLIGENCE",
    status: "V2.0_DEPLOYED",
    statusColor: "bg-brutal-yellow text-black",
    description:
      "Intelligent analytics dashboard that ingests raw telemetry data and outputs automated natural language executive summaries powered by GPT-4 and interactive charts.",
    tech: ["Next.js 14", "OpenAI API", "PostgreSQL", "Prisma", "Recharts"],
    github: "https://github.com/Panzqq",
    live: "https://aiinsight.devpanpan.dev",
    highlight: "Automated Data Synthesis",
    cardColor: "border-brutal-yellow",
    shadowColor: "shadow-brutal-yellow",
  },
  {
    id: "PRJ_04",
    title: "PORTFOLIOCMS ENGINE",
    category: "HEADLESS_CMS",
    status: "OPEN_SOURCE",
    statusColor: "bg-brutal-pink text-white",
    description:
      "Ultra-minimal, developer-first headless content management system with automatic GraphQL endpoint generation, edge caching, and Instant Vercel Deploy.",
    tech: ["TypeScript", "GraphQL", "Prisma ORM", "SQLite", "TipTap"],
    github: "https://github.com/Panzqq",
    live: "https://cms.devpanpan.dev",
    highlight: "Sub-50ms Response Times",
    cardColor: "border-brutal-pink",
    shadowColor: "shadow-brutal-pink",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 md:px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-4 h-4 bg-brutal-pink border-2 border-black shadow-brutal-sm" />
          <span className="font-mono text-sm tracking-widest uppercase text-brutal-pink font-bold">
            05. ARCHIVED_DEPLOYMENTS // PROJECTS
          </span>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-2">
              FEATURED <span className="bg-brutal-cyan text-black px-2 border-2 border-black">WORKS</span>
            </h2>
            <p className="text-white/60 font-sans text-sm md:text-base">
              Real software solutions deployed to production. Inspect codebases and live previews.
            </p>
          </div>

          <a
            href="https://github.com/Panzqq"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutal bg-brutal-surface border-2 border-black px-4 py-2 font-mono font-bold text-xs text-white hover:bg-brutal-yellow hover:text-black shadow-brutal-sm flex items-center gap-2"
          >
            <Github size={14} />
            VIEW_ALL_REPOSITORIES
          </a>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className={`bg-brutal-surface border-4 border-black p-6 shadow-brutal-lg card-brutal flex flex-col justify-between relative group`}
            >
              {/* Top metadata row */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-white/10 font-mono text-xs">
                  <span className="font-black text-white/50">{project.id}</span>
                  <span className="text-white/70 font-bold uppercase">{project.category}</span>
                  <span className={`px-2 py-0.5 border border-black font-extrabold shadow-[1px_1px_0px_#000] text-[10px] ${project.statusColor}`}>
                    {project.status}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-brutal-cyan transition-colors">
                  {project.title}
                </h3>

                {/* Highlight banner */}
                <div className="inline-block bg-brutal-card border border-white/20 px-2.5 py-1 font-mono text-xs text-brutal-yellow font-bold mb-4">
                  ⚡ {project.highlight}
                </div>

                {/* Description */}
                <p className="text-xs md:text-sm text-white/70 font-sans leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="bg-black border border-white/20 px-2.5 py-1 text-white/80 font-bold shadow-[2px_2px_0px_#000]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t-2 border-white/10 flex items-center justify-between gap-3 font-mono text-xs">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brutal flex-1 text-center bg-brutal-card border-2 border-black py-2 text-white font-bold hover:bg-white hover:text-black shadow-brutal-sm flex items-center justify-center gap-1.5"
                >
                  <Github size={14} />
                  <span>SOURCE_CODE</span>
                </a>

                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brutal flex-1 text-center bg-brutal-lime border-2 border-black py-2 text-black font-black hover:bg-brutal-yellow shadow-brutal-sm flex items-center justify-center gap-1.5"
                >
                  <ExternalLink size={14} />
                  <span>LAUNCH_DEMO</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
