"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PROJECTS_DATA = [
  {
    num: "01",
    title: "Modern Point of Sales (POS)",
    description:
      "A high-performance cashier and inventory management platform featuring master data organization and real-time transaction reporting.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    link: "https://github.com/Panzqq",
  },
  {
    num: "02",
    title: "Automated Business Dashboard",
    description:
      "Integrated web application with Supabase database for seamless operational workflows and dynamic data visualization.",
    tags: ["React", "Supabase", "Node.js", "Recharts"],
    link: "https://github.com/Panzqq",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading matching reference */}
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-8">
          Project Section
        </h2>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Numbered List Layout matching reference */}
          <div className="lg:col-span-7 space-y-6">
            {PROJECTS_DATA.map((project, idx) => (
              <motion.div
                key={project.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="glass-card rounded-2xl p-6 md:p-8 flex items-start gap-5 group cursor-pointer"
                onClick={() => window.open(project.link, "_blank")}
              >
                {/* Number Badge with Emerald Glow */}
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-[#00FFA3]/40 text-[#00FFA3] flex items-center justify-center font-mono font-bold text-sm shrink-0 shadow-[0_0_15px_rgba(0,255,163,0.15)] group-hover:scale-110 group-hover:border-[#00FFA3] transition-all">
                  {project.num}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight group-hover:text-[#00FFA3] transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight
                      size={18}
                      className="text-gray-500 group-hover:text-[#00FFA3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                    />
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4 font-normal">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-gray-300 border border-white/[0.06] font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Mini Dark Emerald Analytics Chart Preview Card matching reference */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 glass-card rounded-2xl p-6 border border-white/[0.08] relative overflow-hidden"
          >
            {/* Top dots / window header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/10" />
              </div>
              <span className="text-xs font-mono text-gray-500">Live Analytics</span>
            </div>

            {/* Glowing SVG Curve Graph */}
            <div className="relative h-44 w-full flex items-center justify-center">
              <svg
                viewBox="0 0 320 140"
                className="w-full h-full overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Gradient area below curve */}
                <defs>
                  <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00FFA3" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#00FFA3" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  d="M 10 110 C 60 110, 80 40, 130 50 C 180 60, 200 100, 240 70 C 270 50, 290 30, 310 25 L 310 140 L 10 140 Z"
                  fill="url(#emeraldGrad)"
                />

                {/* Main Glowing Emerald Curve */}
                <path
                  d="M 10 110 C 60 110, 80 40, 130 50 C 180 60, 200 100, 240 70 C 270 50, 290 30, 310 25"
                  stroke="#00FFA3"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_8px_rgba(0,255,163,0.8)]"
                />

                {/* Glowing Apex Indicator Point */}
                <circle
                  cx="240"
                  cy="70"
                  r="5"
                  fill="#00FFA3"
                  className="animate-ping"
                  opacity="0.75"
                />
                <circle
                  cx="240"
                  cy="70"
                  r="5"
                  fill="#00FFA3"
                  stroke="#050C0A"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Bottom mini stats indicator */}
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-xs font-mono text-gray-400">
              <span>99.98% System Uptime</span>
              <span className="text-[#00FFA3] font-semibold">+34.8% Throughput</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
