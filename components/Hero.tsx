"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Dynamic import with SSR disabled for 3D Canvas
const Hero3D = dynamic(() => import("@/components/Hero3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] sm:h-[480px] md:h-[540px] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#00FFA3] border-t-transparent animate-spin" />
    </div>
  ),
});

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
        {/* Left Column: Heading, Real Subtitle, and Pill CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:col-span-7 flex flex-col items-start text-left"
        >
          {/* Main Tagline: Welcome to My Website */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
            Welcome to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-emerald-400">
              My Website.
            </span>
          </h1>

          {/* Subtitle with Authentic Background */}
          <p className="text-base sm:text-lg text-gray-400 font-normal leading-relaxed max-w-xl mb-8">
            Full Stack Developer based in Purbalingga, Indonesia with 3+ years of coding experience. Specializing in Node.js, Web Automation, and Modern UI.
          </p>

          {/* Pill CTA Button */}
          <motion.button
            onClick={handleScrollToProjects}
            className="btn-emerald-pill rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide cursor-pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore My Work
          </motion.button>
        </motion.div>

        {/* Right Column: 3D Android Bugdroid Canvas with overflow-visible */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="md:col-span-5 flex items-center justify-center relative overflow-visible"
        >
          <Hero3D />
        </motion.div>
      </div>

      {/* Subtle Bottom Scroll Indicator */}
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
