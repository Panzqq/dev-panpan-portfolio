"use client";

import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mt-20 border-t border-white/[0.06] bg-[#050C0A]/60 py-12 px-6"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Row: Navigation Links + Social Icons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left Navigation Links — stagger */}
          <motion.nav
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-6 text-sm text-gray-400 font-medium"
          >
            {NAV_LINKS.map((item) => (
              <motion.button
                key={item.label}
                variants={itemVariants}
                onClick={() =>
                  item.action ? item.action() : item.id && scrollTo(item.id)
                }
                whileHover={{ color: "#ffffff", y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.nav>

          {/* Right Social Icons */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-4 text-gray-400"
          >
            <motion.a
              href="https://github.com/Panzqq"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              whileHover={{ scale: 1.15, color: "#00FFA3", y: -3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="p-2 hover:text-[#00FFA3] transition-colors"
            >
              <Github size={18} />
            </motion.a>
            <motion.a
              href="mailto:hello@devpanpan.dev"
              aria-label="Email"
              whileHover={{ scale: 1.15, color: "#00FFA3", y: -3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="p-2 hover:text-[#00FFA3] transition-colors"
            >
              <Mail size={18} />
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.04] text-xs font-mono text-gray-500"
        >
          <div className="text-gray-300 font-medium">
            Crafted by Dev Panpan | Purbalingga, Central Java, Indonesia.
          </div>

          <div className="flex items-center gap-2">
            <motion.a
              href="https://github.com/Panzqq"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ color: "#00FFA3" }}
              className="text-[#00FFA3] hover:underline"
            >
              github.com/Panzqq
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
