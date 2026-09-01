"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Check, MessageSquare } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
  },
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2, margin: "-40px 0px -40px 0px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-[#00FFA3]/30 text-[#00FFA3] text-xs font-mono mb-3 shadow-[0_0_15px_rgba(0,255,163,0.15)]">
            <MessageSquare size={13} />
            <span>GET_IN_TOUCH</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Get In Touch
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2, margin: "-40px 0px -40px 0px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="md:col-span-5 space-y-4"
          >
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass-card rounded-2xl p-6 md:p-8 border border-white/[0.08]"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Let&apos;s collaborate.
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 font-normal">
                Have a project in mind or interested in hiring? Drop a message and let&apos;s build
                something great together.
              </p>

              <motion.div
                className="flex items-center gap-3 text-sm text-gray-300"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-[#00FFA3]/30 text-[#00FFA3] flex items-center justify-center shrink-0">
                  <Mail size={16} />
                </div>
                <span className="font-mono text-xs">hello@devpanpan.dev</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right form — staggered fields */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2, margin: "-40px 0px -40px 0px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            className="md:col-span-7"
          >
            <motion.form
              onSubmit={handleSubmit}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2, margin: "-30px 0px -30px 0px" }}
              className="glass-card rounded-2xl p-6 md:p-8 space-y-4 border border-white/[0.08]"
            >
              <motion.div variants={fieldVariants}>
                <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-[#00FFA3] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all"
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-[#00FFA3] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all"
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-[#00FFA3] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all resize-none"
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-emerald-pill rounded-full w-full py-3 text-sm font-semibold flex items-center justify-center gap-2 relative overflow-hidden"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0,255,163,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <AnimatePresence mode="wait">
                    {status === "sending" && (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2"
                      >
                        <motion.div
                          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </motion.span>
                    )}
                    {status === "success" && (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                      >
                        <Check size={16} />
                        Message Sent!
                      </motion.span>
                    )}
                    {status === "idle" && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2"
                      >
                        <Send size={16} />
                        Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
