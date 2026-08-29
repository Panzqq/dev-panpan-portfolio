"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-2xl p-8 md:p-10 border border-white/[0.08]"
        >
          {/* Section Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
            About Me
          </h2>

          {/* Authentic Bio Text */}
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-4xl font-normal">
            Saya adalah seorang developer (kelas 11 SMA) dengan pengalaman coding lebih dari 3 tahun. Saya memiliki ketertarikan mendalam pada rekayasa perangkat lunak, berfokus pada pengembangan aplikasi web interaktif, merancang otomatisasi API, dan mengelola database untuk menciptakan ekosistem digital yang efisien.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
