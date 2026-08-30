"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, FolderGit2 } from "lucide-react";

interface ProjectItem {
  title: string;
  description: string;
  image: string;
  icon: string;
  tags: string[];
  buttonText: string;
  link: string;
}

const projects: ProjectItem[] = [
  {
    title: "Renvy WhatsApp Bot",
    description:
      "Advanced WhatsApp bot with AI integration, automated responses, media handling, and group management. Supports multiple commands and custom features for business automation.",
    image: "/renvy-bot.jpg",
    icon: "🤖",
    tags: ["Baileys", "Node.js", "AI/ML", "Socket.io"],
    buttonText: "Contact Bot",
    link: "https://wa.me/6285702107250",
  },
  {
    title: "Dash Renvy API",
    description:
      "Comprehensive REST API platform providing multiple endpoints for developers. Features high performance, reliability, and extensive documentation for seamless integration.",
    image: "/dash-api.png",
    icon: "🔥",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    buttonText: "Visit API",
    link: "https://api.renvy.my.id",
  },
];

export default function ProjectShowcase() {
  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-[#00FFA3]/30 text-[#00FFA3] text-xs font-mono mb-3 shadow-[0_0_15px_rgba(0,255,163,0.15)]">
              <FolderGit2 size={13} />
              <span>PROJECT_SHOWCASE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Featured Projects
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-md font-normal leading-relaxed">
            Production-ready bots, APIs, and scalable automation engines engineered with modern web technologies.
          </p>
        </div>

        {/* Bento Grid: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -4 }}
              className="bg-[#0A0A0A] border border-emerald-900/30 rounded-2xl p-5 flex flex-col gap-4 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-300 group relative overflow-hidden glass-card"
            >
              {/* Image Container with Ambient Border */}
              <div className="relative w-full h-48 rounded-xl overflow-hidden border border-emerald-900/20 group-hover:border-emerald-500/30 transition-colors bg-black/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                {/* Subtle Scanline Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_51%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
              </div>

              {/* Header: Icon + Title */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-2xl select-none" role="img" aria-label={project.title}>
                  {project.icon}
                </span>
                <h3 className="text-white font-bold text-xl tracking-tight group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed flex-grow font-normal">
                {project.description}
              </p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 rounded-full select-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-lg border border-emerald-500 text-emerald-400 font-mono font-bold hover:bg-emerald-500 hover:text-[#0A0A0A] transition-all flex justify-center items-center gap-2 cursor-pointer mt-auto shadow-[0_0_15px_rgba(0,255,163,0.1)] active:scale-[0.99] select-none"
              >
                <span>{project.buttonText}</span>
                <ArrowUpRight size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
