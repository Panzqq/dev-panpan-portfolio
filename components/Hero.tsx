"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Github, Linkedin } from "lucide-react";

const ROLES = ["Full Stack Developer", "UI/UX Enthusiast", "Open Source Contributor"];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Hero() {
  const roleRef = useRef<HTMLSpanElement>(null);
  const roleIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const currentRole = ROLES[roleIndex.current];
      const el = roleRef.current;
      if (!el) return;

      if (!isDeleting.current) {
        el.textContent = currentRole.slice(0, charIndex.current + 1);
        charIndex.current++;
        if (charIndex.current === currentRole.length) {
          isDeleting.current = true;
          timeout = setTimeout(type, 1800);
          return;
        }
      } else {
        el.textContent = currentRole.slice(0, charIndex.current - 1);
        charIndex.current--;
        if (charIndex.current === 0) {
          isDeleting.current = false;
          roleIndex.current = (roleIndex.current + 1) % ROLES.length;
        }
      }

      timeout = setTimeout(type, isDeleting.current ? 60 : 90);
    };

    timeout = setTimeout(type, 800);
    return () => clearTimeout(timeout);
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      {/* Radial spotlight */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/8 via-transparent to-transparent pointer-events-none" />

      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-cyan-400 border border-cyan-400/20">
            <Sparkles size={14} className="animate-pulse-slow" />
            <span>Available for freelance & full-time roles</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-white/50 font-mono mb-3 tracking-widest uppercase"
        >
          Hello, World! 👋 I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl font-extrabold tracking-tight mb-4 leading-none"
        >
          <span className="gradient-text text-glow-cyan">Dev</span>{" "}
          <span className="text-white">panpan</span>
        </motion.h1>

        {/* Animated role */}
        <motion.div
          variants={itemVariants}
          className="text-xl md:text-2xl font-medium text-white/60 mb-6 h-8 flex items-center justify-center gap-2"
        >
          <span className="text-cyan-400 font-mono">&gt;</span>
          <span ref={roleRef} className="text-white/80 font-mono" />
          <span className="inline-block w-0.5 h-6 bg-cyan-400 animate-pulse ml-1" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-white/50 max-w-xl mx-auto leading-relaxed mb-10"
        >
          Building{" "}
          <span className="text-cyan-400 font-semibold">seamless digital experiences</span>{" "}
          through clean code, bold design, and a passion for performance.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <motion.button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative px-8 py-3.5 rounded-xl font-semibold text-white overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-300 group-hover:opacity-90" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-400 to-purple-500 blur-md" />
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </span>
          </motion.button>

          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3.5 rounded-xl font-semibold text-white/80 glass border border-white/10 hover:border-cyan-400/40 hover:text-white hover:glow-cyan transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Contact Me
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4"
        >
          {[
            { icon: Github, href: "https://github.com", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-400/30 border border-white/10 transition-all duration-300"
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-cyan-400 transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
      >
        <span className="text-xs tracking-widest uppercase font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
