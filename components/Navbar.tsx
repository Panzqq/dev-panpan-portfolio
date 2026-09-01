"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    // Small delay to let menu close animation start before scroll
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 80);
  };

  const handleHomeClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#050C0A]/80 backdrop-blur-md border-b border-white/[0.05]"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand Name */}
        <motion.a
          href="#"
          onClick={handleHomeClick}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm md:text-base font-semibold tracking-tight text-white hover:opacity-80 transition-opacity"
        >
          Dev Panpan{" "}
          <span className="text-gray-400 font-normal">| Full Stack Developer</span>
        </motion.a>

        {/* Hamburger Button — touch-manipulation for Android */}
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle Navigation Menu"
          className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer touch-manipulation select-none"
          style={{ touchAction: "manipulation" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Dropdown Menu — NO overflow-hidden so touch events work on Android */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-full left-0 right-0 bg-[#050C0A]/95 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl"
          >
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center font-medium text-sm">
              {/* Nav Links */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-gray-300 w-full md:w-auto">
                {NAV_ITEMS.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: idx * 0.05 }}
                    onClick={() => handleNavClick(item.id)}
                    className="text-left py-2 md:py-0 text-gray-300 hover:text-[#00FFA3] active:text-[#00FFA3] transition-colors cursor-pointer touch-manipulation select-none w-full md:w-auto"
                    style={{ touchAction: "manipulation" }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: 0.22 }}
                onClick={() => handleNavClick("contact")}
                className="btn-emerald-pill px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer touch-manipulation select-none w-full md:w-auto text-center"
                style={{ touchAction: "manipulation" }}
              >
                Get In Touch
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
