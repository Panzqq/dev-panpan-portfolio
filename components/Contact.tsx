"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Check } from "lucide-react";

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
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-8">
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Left info */}
          <div className="md:col-span-5 space-y-4">
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-2">
                Let&apos;s collaborate.
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 font-normal">
                Have a project in mind or interested in hiring? Drop a message and let&apos;s build something great together.
              </p>

              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-[#00FFA3]/30 text-[#00FFA3] flex items-center justify-center shrink-0">
                  <Mail size={16} />
                </div>
                <span className="font-mono text-xs">hello@devpanpan.dev</span>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="md:col-span-7">
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 md:p-8 space-y-4">
              <div>
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
              </div>

              <div>
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
              </div>

              <div>
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
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                className="btn-emerald-pill rounded-full w-full py-3 text-sm font-semibold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === "sending" ? (
                  <span>Sending Message...</span>
                ) : status === "success" ? (
                  <>
                    <Check size={16} />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
