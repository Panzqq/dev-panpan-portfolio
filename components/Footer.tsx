"use client";

import { Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="mt-20 border-t border-white/[0.06] bg-[#050C0A]/60 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Row: Navigation Links on Left, Social Icons on Right */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6 text-sm text-gray-400 font-medium">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="hover:text-white transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollTo("skills")}
              className="hover:text-white transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => scrollTo("projects")}
              className="hover:text-white transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="hover:text-white transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Right Social Icons */}
          <div className="flex items-center gap-4 text-gray-400">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="p-2 hover:text-[#00FFA3] transition-colors"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 hover:text-[#00FFA3] transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://github.com/Panzqq"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 hover:text-[#00FFA3] transition-colors"
            >
              <Github size={18} />
            </a>
          </div>
        </div>

        {/* Bottom Row: Accent Text Left, Last Commit Right matching reference */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.04] text-xs font-mono text-gray-500">
          <div className="text-[#00FFA3] font-medium flex items-center gap-1.5">
            <span>Dev Panpan: Build something amazing 💚</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-400">Last Commit:</span>
            <span className="text-gray-300">Optimized 3D model for mobile</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">1m ago</span>
            <span className="text-gray-600">|</span>
            <a
              href="https://github.com/Panzqq/dev-panpan-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00FFA3] hover:underline flex items-center gap-1"
            >
              View 📦
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
