"use client";

import { motion } from "framer-motion";
import { User, GraduationCap, Briefcase, TrendingUp } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-3xl p-8 md:p-10 border border-white/[0.08] relative overflow-hidden"
        >
          {/* Subtle Ambient Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Section Heading */}
          <div className="flex items-center gap-2.5 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
            <User size={14} />
            <span>BACKGROUND_&_BIOGRAPHY</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-6">
            About Me
          </h2>

          {/* Authentic Bio Text in English with Panpan name */}
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-4xl font-normal mb-8">
            I am Panpan (Dev Panpan), an 11th-grade high school student and dedicated Full Stack Developer based in Purbalingga, Indonesia with over 3 years of active coding experience. My core passion lies in software engineering, with a focus on modern web applications (React, Next.js, Node.js), API automations, and resilient database architectures. In parallel with software development, I am proactively preparing for comprehensive future academic studies in Finance and Accounting.
          </p>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/[0.06]">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono mb-1.5">
                <GraduationCap size={15} />
                <span>EDUCATION & LOCATION</span>
              </div>
              <p className="text-white text-sm font-semibold">11th Grade High School Student</p>
              <p className="text-gray-400 text-xs mt-0.5">Purbalingga, Central Java, Indonesia</p>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4">
              <div className="flex items-center gap-2 text-[#00F0FF] text-xs font-mono mb-1.5">
                <Briefcase size={15} />
                <span>EXTRACURRICULAR & BUSINESS</span>
              </div>
              <p className="text-white text-sm font-semibold">KIR IT Division</p>
              <p className="text-gray-400 text-xs mt-0.5">Beku-Beku Frozen Food Business Project</p>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4">
              <div className="flex items-center gap-2 text-[#FFE600] text-xs font-mono mb-1.5">
                <TrendingUp size={15} />
                <span>FUTURE ACADEMIC FOCUS</span>
              </div>
              <p className="text-white text-sm font-semibold">Finance & Accounting</p>
              <p className="text-gray-400 text-xs mt-0.5">Bridging Technology & Financial Systems</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
