"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Code, Globe } from "lucide-react";

const highlights = [
  {
    icon: Code,
    title: "Clean Code",
    desc: "Writing maintainable, scalable code with best practices.",
  },
  {
    icon: Globe,
    title: "Full Stack",
    desc: "From pixel-perfect UI to robust backend architecture.",
  },
  {
    icon: Zap,
    title: "Performance",
    desc: "Optimizing for speed, accessibility, and great UX.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-28 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section label */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
            <span className="text-cyan-400 font-mono text-sm">01.</span>
            <span className="text-white/40 text-sm uppercase tracking-widest font-mono">About Me</span>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/30 to-transparent" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text side */}
            <div>
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              >
                Crafting the{" "}
                <span className="gradient-text">web of tomorrow</span>,{" "}
                <span className="text-white/80">today.</span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-white/60 text-base leading-relaxed mb-5"
              >
                Hey! I&apos;m <span className="text-white font-semibold">Dev panpan</span> — a passionate full-stack
                developer who loves turning ideas into elegant digital products. I thrive at
                the intersection of <span className="text-cyan-400">design and engineering</span>, obsessing over
                every pixel while also ensuring the backend is solid and scalable.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-white/60 text-base leading-relaxed mb-8"
              >
                When I&apos;m not coding, you can find me exploring new tech stacks, contributing
                to open-source projects, or diving deep into UI/UX design patterns. I believe
                great software is built on{" "}
                <span className="text-purple-400">clean code, clear thinking</span>, and a lot of ☕.
              </motion.p>

              <motion.div variants={itemVariants}>
                <motion.button
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-sm text-cyan-400 border border-cyan-400/30 hover:border-cyan-400 hover:bg-cyan-400/5 px-6 py-2.5 rounded-lg font-mono transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {"<"} See my work {"/>"}
                </motion.button>
              </motion.div>
            </div>

            {/* Highlight cards */}
            <motion.div variants={itemVariants} className="grid gap-4">
              {highlights.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  className="glass rounded-2xl p-5 flex items-start gap-4 border border-white/5 hover:border-cyan-400/20 group transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 4 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center shrink-0 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                    <Icon size={18} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
