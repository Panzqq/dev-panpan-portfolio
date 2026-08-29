"use client";

import { motion } from "framer-motion";

const SKILLS_DATA = [
  {
    title: "React & Next.js",
    description: "Component-driven architecture, server-side rendering, and dynamic routing.",
  },
  {
    title: "Database Design",
    description: "PostgreSQL, Supabase, schema modeling, and complex query optimization.",
  },
  {
    title: "Backend Architecture",
    description: "Node.js, Express, REST APIs, GraphQL, and microservices.",
  },
  {
    title: "Full Stack Integration",
    description: "End-to-end type safety, Prisma ORM, and seamless client-server bridges.",
  },
  {
    title: "UI/UX & 3D Web",
    description: "React Three Fiber, Three.js, Tailwind CSS, and Framer Motion micro-interactions.",
  },
  {
    title: "DevOps & Deployment",
    description: "Vercel CI/CD, Docker containerization, edge functions, and cloud monitoring.",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading matching reference */}
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-8">
          Skills
        </h2>

        {/* 3-Column Glassmorphism Grid matching reference */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS_DATA.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-card rounded-2xl p-6 flex flex-col justify-start"
            >
              <h3 className="text-base font-semibold text-white tracking-tight mb-2">
                {skill.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-normal">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
