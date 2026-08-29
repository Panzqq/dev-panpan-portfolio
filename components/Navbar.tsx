"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Menu, X, Code2, Sparkles } from "lucide-react";

const navLinks = [
  { label: "CONSOLE", href: "#terminal", color: "hover:bg-brutal-cyan" },
  { label: "DOSSIER", href: "#about", color: "hover:bg-brutal-lime" },
  { label: "TECH_STACK", href: "#skills", color: "hover:bg-brutal-yellow" },
  { label: "PROJECTS", href: "#projects", color: "hover:bg-brutal-pink" },
  { label: "CONTACT", href: "#contact", color: "hover:bg-brutal-purple" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2 bg-brutal-bg/95 backdrop-blur-md border-b-4 border-black" : "py-4 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="bg-brutal-surface border-4 border-black p-2 md:p-3 shadow-brutal-cyan flex items-center justify-between">
            {/* Logo / Brand */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2 group btn-brutal bg-brutal-card border-2 border-black px-3 py-1.5 shadow-brutal-sm hover:bg-brutal-yellow hover:text-black transition-colors"
            >
              <div className="w-6 h-6 bg-brutal-cyan border-2 border-black flex items-center justify-center font-mono font-bold text-black text-xs">
                &gt;_
              </div>
              <span className="font-mono font-black text-sm md:text-base tracking-wider uppercase">
                DEV_PANPAN
              </span>
            </a>

            {/* Live Status Indicator (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 bg-brutal-bg border-2 border-black px-3 py-1 text-xs font-mono shadow-brutal-sm">
              <span className="w-2 h-2 rounded-full bg-brutal-lime animate-pulse" />
              <span className="text-white/80 font-bold">STATUS: READY_TO_BUILD</span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-2 font-mono text-xs font-bold">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`btn-brutal bg-brutal-card border-2 border-black px-3 py-1.5 text-white/90 hover:text-black ${link.color} shadow-brutal-sm transition-all`}
                >
                  {link.label}
                </button>
              ))}

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contact");
                }}
                className="btn-brutal bg-brutal-lime border-2 border-black px-4 py-1.5 text-black font-extrabold shadow-brutal-sm hover:bg-brutal-yellow transition-all"
              >
                HIRE_ME 🚀
              </a>
            </nav>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
              className="md:hidden btn-brutal bg-brutal-yellow border-2 border-black p-2 text-black shadow-brutal-sm"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-4 right-4 z-40 bg-brutal-surface border-4 border-black p-4 shadow-brutal-xl md:hidden font-mono"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-left border-2 border-black p-3 bg-brutal-card font-bold text-sm text-white/90 hover:text-black ${link.color} shadow-brutal-sm transition-colors`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("#contact")}
                className="mt-2 text-center border-2 border-black p-3 bg-brutal-lime text-black font-extrabold text-sm shadow-brutal-sm hover:bg-brutal-yellow transition-colors"
              >
                HIRE_ME 🚀
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
