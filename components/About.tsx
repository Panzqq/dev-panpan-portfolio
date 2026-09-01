"use client";

import { motion } from "framer-motion";
import { User, GraduationCap, Briefcase, TrendingUp } from "lucide-react";

const HIGHLIGHT_CARDS = [
  {
    icon: <GraduationCap size={15} />,
    color: "text-emerald-400",
    label: "EDUCATION & LOCATION",
    title: "11th Grade High School Student",
    subtitle: "Purbalingga, Central Java, Indonesia",
  },
  {
    icon: <Briefcase size={15} />,
    color: "text-[#00F0FF]",
    label: "EXTRACURRICULAR & BUSINESS",
    title: "KIR IT Division",
    subtitle: "Beku-Beku Frozen Food Business Project",
  },
  {
    icon: <TrendingUp size={15} />,
    color: "text-[#FFE600]",
    label: "FUTURE ACADEMIC FOCUS",
    title: "Finance & Accounting",
    subtitle: "Bridging Technology & Financial Systems",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
  },
};

export default function About() {
  return (
    <section id="about" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="glass-card rounded-3xl p-8 md:p-10 border border-white/[0.08] relative overflow-hidden"
        >
          {/* Ambient Background Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"
          />

          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2.5 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3"
          >
            <User size={14} />
            <span>BACKGROUND_&_BIOGRAPHY</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-6"
          >
            About Me
          </motion.h2>

          {/* Bio Text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.26 }}
            className="text-gray-300 text-base md:text-lg leading-relaxed max-w-4xl font-normal mb-8"
          >
            I am Panpan (Dev Panpan), an 11th-grade high school student and dedicated Full Stack
            Developer based in Purbalingga, Indonesia with over 3 years of active coding experience.
            My core passion lies in software engineering, with a focus on modern web applications
            (React, Next.js, Node.js), API automations, and resilient database architectures. In
            parallel with software development, I am proactively preparing for comprehensive future
            academic studies in Finance and Accounting.
          </motion.p>

          {/* Highlights Grid — staggered reveal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/[0.06]"
          >
            {HIGHLIGHT_CARDS.map((card) => (
              <motion.div
                key={card.label}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 cursor-default"
              >
                <div className={`flex items-center gap-2 text-xs font-mono mb-1.5 ${card.color}`}>
                  {card.icon}
                  <span>{card.label}</span>
                </div>
                <p className="text-white text-sm font-semibold">{card.title}</p>
                <p className="text-gray-400 text-xs mt-0.5">{card.subtitle}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
