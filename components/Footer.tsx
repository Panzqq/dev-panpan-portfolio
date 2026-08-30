"use client";

import { Github, Mail } from "lucide-react";

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
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollTo("skills")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Skills
            </button>
            <button
              onClick={() => scrollTo("projects")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right Social Channels */}
          <div className="flex items-center gap-4 text-gray-400">
            <a
              href="https://github.com/Panzqq"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 hover:text-[#00FFA3] transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href="mailto:hello@devpanpan.dev"
              aria-label="Email"
              className="p-2 hover:text-[#00FFA3] transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Bottom Row: Minimal hacker aesthetic without emojis */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.04] text-xs font-mono text-gray-500">
          <div className="text-gray-300 font-medium">
            Crafted by Dev Panpan | Purbalingga, Central Java, Indonesia.
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Panzqq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00FFA3] hover:underline"
            >
              github.com/Panzqq
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
