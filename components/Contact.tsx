"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Github, Linkedin, Copy, Check, Terminal, MapPin, Radio } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "transmitting" | "success">("idle");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@devpanpan.dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("transmitting");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-4 h-4 bg-brutal-cyan border-2 border-black shadow-brutal-sm" />
          <span className="font-mono text-sm tracking-widest uppercase text-brutal-cyan font-bold">
            06. TRANSMISSION_CHANNEL // CONTACT
          </span>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Quick Channels */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-brutal-surface border-4 border-black p-6 shadow-brutal">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-brutal-lime animate-ping" />
                <span className="font-mono font-bold text-xs text-brutal-lime uppercase">
                  FREQUENCY_OPEN // LISTENING
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-3">
                LET&apos;S BUILD <span className="text-brutal-yellow">SOMETHING EPIC</span>.
              </h2>

              <p className="text-xs md:text-sm text-white/70 font-sans leading-relaxed mb-6">
                Looking for a full-stack developer who treats every line of code with obsession? Send a transmission or reach out via direct link.
              </p>

              {/* Direct Email Copy Card */}
              <div className="bg-black border-2 border-white/20 p-3 flex items-center justify-between font-mono text-xs mb-4">
                <div className="truncate mr-2">
                  <span className="text-white/40 block text-[10px]">DIRECT_INBOX</span>
                  <span className="text-brutal-cyan font-bold">hello@devpanpan.dev</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="btn-brutal bg-brutal-yellow text-black border border-black p-2 shadow-brutal-sm hover:bg-white"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>

              {/* Location & Timezone */}
              <div className="border-t border-white/10 pt-4 space-y-2 font-mono text-xs text-white/60">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-brutal-lime" />
                  <span>INDONESIA (WIB / UTC+7)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Radio size={14} className="text-brutal-pink" />
                  <span>RESPONSE TIME &lt; 24 HOURS</span>
                </div>
              </div>
            </div>

            {/* Social Direct Links */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs font-bold">
              <a
                href="https://github.com/Panzqq"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal bg-brutal-card border-3 border-black p-3 text-white hover:bg-brutal-cyan hover:text-black shadow-brutal-sm flex items-center gap-2 justify-center"
              >
                <Github size={16} />
                <span>GITHUB</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal bg-brutal-card border-3 border-black p-3 text-white hover:bg-brutal-lime hover:text-black shadow-brutal-sm flex items-center gap-2 justify-center"
              >
                <Linkedin size={16} />
                <span>LINKEDIN</span>
              </a>
            </div>
          </div>

          {/* Right Column: Transmission Terminal Form */}
          <div className="md:col-span-7 bg-brutal-surface border-4 border-black p-6 md:p-8 shadow-brutal-xl">
            <div className="bg-brutal-card border-b-2 border-white/10 pb-3 mb-6 flex items-center justify-between font-mono text-xs">
              <span className="text-white/60 font-bold">MESSAGE_PACKET_COMPOSER</span>
              <span className="text-brutal-yellow font-bold">ENCRYPTION: TLS_v1.3</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-white/70 font-bold uppercase mb-1.5">
                  OPERATOR_NAME / SENDER:
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Mercer"
                  className="w-full bg-black border-2 border-black focus:border-brutal-cyan text-white p-3 outline-none font-mono text-sm placeholder:text-white/20 shadow-brutal-sm"
                />
              </div>

              <div>
                <label className="block text-white/70 font-bold uppercase mb-1.5">
                  RETURN_FREQUENCY / EMAIL:
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  className="w-full bg-black border-2 border-black focus:border-brutal-cyan text-white p-3 outline-none font-mono text-sm placeholder:text-white/20 shadow-brutal-sm"
                />
              </div>

              <div>
                <label className="block text-white/70 font-bold uppercase mb-1.5">
                  TRANSMISSION_PAYLOAD / MESSAGE:
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe project requirements, timeline, or inquiries..."
                  className="w-full bg-black border-2 border-black focus:border-brutal-cyan text-white p-3 outline-none font-mono text-sm placeholder:text-white/20 shadow-brutal-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "transmitting"}
                className={`w-full btn-brutal border-3 border-black py-3.5 font-mono font-black text-sm uppercase tracking-wider shadow-brutal flex items-center justify-center gap-2 transition-all ${
                  status === "success"
                    ? "bg-brutal-lime text-black"
                    : status === "transmitting"
                    ? "bg-brutal-yellow text-black"
                    : "bg-brutal-cyan text-black hover:bg-brutal-lime"
                }`}
              >
                {status === "transmitting" ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>BROADCASTING_PACKET...</span>
                  </>
                ) : status === "success" ? (
                  <>
                    <Check size={16} />
                    <span>TRANSMISSION_DELIVERED_SUCCESSFULLY</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>TRANSMIT_MESSAGE_NOW</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Neobrutalist Footer */}
        <footer className="mt-24 pt-8 border-t-4 border-black flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-brutal-lime border border-black inline-block" />
            <span>DEV_PANPAN // SYSTEM ARCHITECTURE 2026</span>
          </div>
          <div>BUILT WITH NEXT.JS 14 & TAILWIND CSS</div>
        </footer>
      </div>
    </section>
  );
}
