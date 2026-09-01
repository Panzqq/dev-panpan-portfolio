"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles, ArrowRight } from "lucide-react";

// Dynamic import with SSR disabled for 3D Canvas
const Hero3D = dynamic(() => import("@/components/Hero3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] sm:h-[480px] md:h-[540px] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#00FFA3] border-t-transparent animate-spin" />
    </div>
  ),
});

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export default function Hero() {
  const handleScrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center pt-28 pb-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-12 gap-8 items-center">
        {/* Left Column: Staggered Heading, Live Status, Subtitle, and Pill CTA */}
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="md:col-span-7 flex flex-col items-start text-left"
        >
          {/* Live Status Pill with Radar Pulse */}
          <motion.div
            variants={heroItemVariants}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-[#00FFA3]/30 text-[#00FFA3] text-xs font-mono mb-5 shadow-[0_0_15px_rgba(0,255,163,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>SYSTEM: ONLINE &bull; READY TO COLLABORATE</span>
          </motion.div>

          {/* Main Tagline: Welcome to My Website */}
          <motion.h1
            variants={heroItemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6"
          >
            Welcome to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-emerald-400">
              My Website.
            </span>
          </motion.h1>

          {/* Subtitle with Authentic Background */}
          <motion.p
            variants={heroItemVariants}
            className="text-base sm:text-lg text-gray-400 font-normal leading-relaxed max-w-xl mb-8"
          >
            Full Stack Developer based in Purbalingga, Indonesia with 3+ years of coding experience. Specializing in Node.js, Web Automation, and Modern UI.
          </motion.p>

          {/* Pill CTA Button with Spring Hover & Arrow */}
          <motion.div variants={heroItemVariants} className="flex flex-wrap gap-4 items-center">
            <motion.button
              onClick={handleScrollToProjects}
              className="btn-emerald-pill rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide cursor-pointer flex items-center gap-2 group select-none"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,255,163,0.4)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <span>Explore My Work</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Android Bugdroid Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="md:col-span-5 flex items-center justify-center relative overflow-visible"
        >
          <Hero3D />
        </motion.div>
      </div>

      {/* Subtle Bottom Scroll Indicator with Bounce */}
      <motion.button
        onClick={handleScrollToAbout}
        aria-label="Scroll down to About"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="mt-8 text-gray-500 hover:text-[#00FFA3] transition-colors p-2 cursor-pointer"
      >
        <ChevronDown size={22} />
      </motion.button>
    </section>
  );
}
