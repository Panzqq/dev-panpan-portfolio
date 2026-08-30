"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050C0A]/80 backdrop-blur-md border-b border-white/[0.05] transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand Name */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-sm md:text-base font-semibold tracking-tight text-white hover:opacity-80 transition-opacity"
        >
          Revan <span className="text-gray-400 font-normal">| Full Stack Developer</span>
        </a>

        {/* Minimalist Hamburger Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation Menu"
          className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Slide-out / Dropdown Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-[#050C0A]/95 backdrop-blur-xl border-b border-white/[0.08] px-6 py-6 shadow-2xl"
          >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 justify-between items-start md:items-center font-medium text-sm">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-gray-300">
                <button
                  onClick={() => handleNavClick("about")}
                  className="text-left hover:text-[#00FFA3] transition-colors cursor-pointer"
                >
                  About
                </button>
                <button
                  onClick={() => handleNavClick("skills")}
                  className="text-left hover:text-[#00FFA3] transition-colors cursor-pointer"
                >
                  Skills
                </button>
                <button
                  onClick={() => handleNavClick("projects")}
                  className="text-left hover:text-[#00FFA3] transition-colors cursor-pointer"
                >
                  Projects
                </button>
                <button
                  onClick={() => handleNavClick("contact")}
                  className="text-left hover:text-[#00FFA3] transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </div>

              <button
                onClick={() => handleNavClick("contact")}
                className="btn-emerald-pill px-5 py-2 rounded-full text-xs font-semibold cursor-pointer"
              >
                Get In Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
