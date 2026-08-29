"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, Send, MessageSquare, MapPin, Clock } from "lucide-react";

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    handle: "@devpanpan",
    href: "https://github.com",
    color: "hover:border-white/30 hover:text-white",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    handle: "Dev panpan",
    href: "https://linkedin.com",
    color: "hover:border-blue-400/40 hover:text-blue-400",
  },
  {
    icon: Mail,
    label: "Email",
    handle: "hello@devpanpan.dev",
    href: "mailto:hello@devpanpan.dev",
    color: "hover:border-cyan-400/40 hover:text-cyan-400",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate sending — replace with your API/Formspree/EmailJS
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" ref={ref} className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section label */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
            <span className="text-cyan-400 font-mono text-sm">04.</span>
            <span className="text-white/40 text-sm uppercase tracking-widest font-mono">Contact</span>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/30 to-transparent" />
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s{" "}
            <span className="gradient-text">work together</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-white/50 text-base mb-14 max-w-lg">
            Have a project in mind, or just want to say hi? My inbox is always open. 
            I try to respond within 24 hours.
          </motion.p>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Left - Info */}
            <motion.div variants={itemVariants} className="md:col-span-2 flex flex-col gap-5">
              {/* Quick info */}
              <div className="glass rounded-2xl p-5 border border-white/5 space-y-4">
                <div className="flex items-center gap-3 text-white/50">
                  <MapPin size={16} className="text-cyan-400 shrink-0" />
                  <span className="text-sm">Indonesia 🇮🇩</span>
                </div>
                <div className="flex items-center gap-3 text-white/50">
                  <Clock size={16} className="text-cyan-400 shrink-0" />
                  <span className="text-sm">WIB (UTC+7) — Usually online</span>
                </div>
                <div className="flex items-center gap-3 text-white/50">
                  <MessageSquare size={16} className="text-cyan-400 shrink-0" />
                  <span className="text-sm">Response within 24h</span>
                </div>
              </div>

              {/* Social links */}
              <div className="space-y-3">
                {socialLinks.map(({ icon: Icon, label, handle, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 glass rounded-xl p-4 border border-white/5 text-white/50 transition-all duration-300 group ${color}`}
                    whileHover={{ scale: 1.03, x: 4 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <Icon size={17} />
                    </div>
                    <div>
                      <div className="text-xs text-white/30 font-mono">{label}</div>
                      <div className="text-sm font-medium text-white/70 group-hover:text-current transition-colors">{handle}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div variants={itemVariants} className="md:col-span-3">
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 border border-white/5 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs text-white/40 font-mono mb-1.5 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-400/5 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs text-white/40 font-mono mb-1.5 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-400/5 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs text-white/40 font-mono mb-1.5 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-400/5 transition-all duration-300 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending || sent}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                    sent
                      ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                      : "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-[0_0_24px_rgba(34,211,238,0.35)] disabled:opacity-60"
                  }`}
                  whileHover={!sending && !sent ? { scale: 1.02 } : {}}
                  whileTap={!sending && !sent ? { scale: 0.98 } : {}}
                >
                  {sent ? (
                    <>✅ Message sent! I&apos;ll reply soon.</>
                  ) : sending ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="max-w-5xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-sm"
      >
        <div className="font-mono text-xs">
          © {new Date().getFullYear()} Dev panpan · Designed & Built with ❤️
        </div>
        <div className="flex items-center gap-4 font-mono text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Open to opportunities
          </span>
        </div>
      </motion.footer>
    </section>
  );
}
