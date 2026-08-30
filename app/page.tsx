"use client";

import React, { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TerminalQuote from "@/components/TerminalQuote";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* 3D Preloader Screen */}
      <Preloader onComplete={() => setLoaded(true)} />

      {/* Main Portfolio Page with Subtle Dark Emerald Radial Ambient Glow */}
      <main className="relative min-h-screen bg-[#050C0A] bg-emerald-radial text-white overflow-x-hidden">
        {/* Content stack */}
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <About />
          <TerminalQuote />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}
