"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import RadarLoader from "@/components/RadarLoader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TerminalQuote from "@/components/TerminalQuote";
import Skills from "@/components/Skills";
import ProjectShowcase from "@/components/ProjectShowcase";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AmbientSpotlight from "@/components/AmbientSpotlight";

export default function Home() {
  const [isBooting, setIsBooting] = useState<boolean>(true);

  // Smooth global scroll progress bar (Emerald Laser)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Boot timer: 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Lock page scrolling while RadarLoader is active
  useEffect(() => {
    if (isBooting) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isBooting]);

  return (
    <>
      {/* Minimalist Radar Pulse Boot Loader */}
      <AnimatePresence mode="wait">
        {isBooting && <RadarLoader key="loader" />}
      </AnimatePresence>

      {/* Global Neon Emerald Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-emerald-500 via-[#00FFA3] to-[#00F0FF] origin-left z-[999] shadow-[0_0_12px_#00FFA3] pointer-events-none"
        style={{ scaleX }}
      />

      {/* Interactive Cursor Ambient Radial Spotlight */}
      <AmbientSpotlight />

      {/* Main Portfolio Page with Subtle Dark Emerald Radial Ambient Glow */}
      <main className="relative min-h-screen bg-[#050C0A] bg-emerald-radial text-white overflow-x-hidden">
        {/* Content stack */}
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <About />
          <TerminalQuote />
          <Skills />
          <ProjectShowcase />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}
