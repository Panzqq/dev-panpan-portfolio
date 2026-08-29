"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";

interface Project {
  title: string;
  description: string;
  longDesc: string;
  tags: string[];
  color: string;
  accent: string;
  github: string;
  live: string;
  featured?: boolean;
  emoji: string;
}

const projects: Project[] = [
  {
    title: "NexusMart",
    description: "Full-stack E-Commerce Platform",
    longDesc:
      "A feature-rich e-commerce platform with real-time inventory, Stripe payments, role-based auth, and an admin dashboard with analytics.",
    tags: ["Next.js", "TypeScript", "Supabase", "Stripe", "Tailwind"],
    color: "from-cyan-500/20 to-blue-500/20",
    accent: "border-cyan-400/30 hover:border-cyan-400/60",
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
    emoji: "🛒",
  },
  {
    title: "CollabBoard",
    description: "Real-time Collaboration Tool",
    longDesc:
      "A Notion-inspired workspace with real-time collaborative editing, drag-and-drop blocks, nested pages, and team management.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "Redux"],
    color: "from-purple-500/20 to-pink-500/20",
    accent: "border-purple-400/30 hover:border-purple-400/60",
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
    emoji: "📋",
  },
  {
    title: "AIInsight",
    description: "AI-Powered Analytics Dashboard",
    longDesc:
      "An intelligent dashboard that connects to your data sources and generates insights, charts, and summaries using OpenAI GPT-4.",
    tags: ["Next.js", "OpenAI API", "Prisma", "PostgreSQL", "Recharts"],
    color: "from-emerald-500/20 to-cyan-500/20",
    accent: "border-emerald-400/30 hover:border-emerald-400/60",
    github: "https://github.com",
    live: "https://example.com",
    emoji: "🤖",
  },
  {
    title: "PortfolioCMS",
    description: "Headless CMS for Developers",
    longDesc:
      "A lightweight, developer-first CMS with a beautiful editor, REST & GraphQL API, and one-click deployment to Vercel.",
    tags: ["Next.js", "GraphQL", "Prisma", "SQLite", "TipTap"],
    color: "from-orange-500/20 to-yellow-500/20",
    accent: "border-orange-400/30 hover:border-orange-400/60",
    github: "https://github.com",
    live: "https://example.com",
    emoji: "📝",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      variants={itemVariants}
      className={`relative glass rounded-2xl p-6 border ${project.accent} transition-all duration-300 group cursor-default overflow-hidden`}
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl`}
      />

      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 flex items-center gap-1 text-xs text-yellow-400/80 font-mono">
          <Star size={10} fill="currentColor" />
          <span>Featured</span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        <div className="text-3xl mb-4">{project.emoji}</div>

        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <p className="text-xs text-white/40 font-mono uppercase tracking-wider mb-3">
          {project.description}
        </p>
        <p className="text-sm text-white/60 leading-relaxed mb-5">
          {project.longDesc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-white/50 border border-white/5 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={15} />
            <span>Source</span>
          </motion.a>

          <div className="w-px h-4 bg-white/10" />

          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={15} />
            <span>Live Demo</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section label */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
            <span className="text-cyan-400 font-mono text-sm">03.</span>
            <span className="text-white/40 text-sm uppercase tracking-widest font-mono">Projects</span>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/30 to-transparent" />
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
            Things I&apos;ve{" "}
            <span className="gradient-text">built</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-white/50 text-base mb-14 max-w-lg">
            A selection of real-world projects that showcase my skills across design,
            engineering, and product thinking.
          </motion.p>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>

          {/* View More CTA */}
          <motion.div variants={itemVariants} className="flex justify-center mt-12">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/50 hover:text-white border border-white/10 hover:border-cyan-400/40 px-6 py-3 rounded-xl font-mono transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Github size={16} />
              View all projects on GitHub
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
