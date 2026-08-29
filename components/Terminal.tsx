"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, Cpu, Play, Sparkles, RefreshCw, Layers, ShieldCheck } from "lucide-react";

interface OutputLine {
  id: string;
  type: "input" | "output" | "error" | "ascii" | "success";
  text?: string;
  component?: React.ReactNode;
}

const ASCII_ART = `
██████╗ ███████╗██╗   ██╗    ██████╗  █████╗ ███╗   ██╗██████╗  █████╗ ███╗   ██╗
██╔══██╗██╔════╝██║   ██║    ██╔══██╗██╔══██╗████╗  ██║██╔══██╗██╔══██╗████╗  ██║
██║  ██║█████╗  ██║   ██║    ██████╔╝███████║██╔██╗ ██║██████╔╝███████║██╔██╗ ██║
██║  ██║██╔══╝  ╚██╗ ██╔╝    ██╔═══╝ ██╔══██║██║╚██╗██║██╔═══╝ ██╔══██║██║╚██╗██║
██████╔╝███████╗ ╚████╔╝     ██║     ██║  ██║██║ ╚████║██║     ██║  ██║██║ ╚████║
╚═════╝ ╚══════╝  ╚═══╝      ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝
`;

const QUICK_COMMANDS = ["help", "neofetch", "skills", "projects", "stats", "matrix", "clear"];

export default function Terminal() {
  const [activeTab, setActiveTab] = useState<"shell" | "neofetch" | "matrix">("shell");
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [outputs, setOutputs] = useState<OutputLine[]>([
    {
      id: "init-1",
      type: "ascii",
      text: ASCII_ART,
    },
    {
      id: "init-2",
      type: "output",
      text: "⚡ [SYSTEM READY] Dev panpan OS v2.4.0 (x86_64-neobrutal-linux)\nType 'help' to inspect available instructions or click quick tags below.",
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Auto-scroll on new output
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [outputs, activeTab]);

  // Matrix Digital Rain effect for Matrix tab
  useEffect(() => {
    if (activeTab !== "matrix") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = "010101DEV_PANPAN_CYBER_REACT_NEXTJS_TYPESCRIPT_2026_CODE_";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    let animationFrameId: number;

    const renderMatrix = () => {
      ctx.fillStyle = "rgba(10, 11, 16, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00F0FF";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Alternate color for head char
        if (Math.random() > 0.8) {
          ctx.fillStyle = "#A3E635";
        } else {
          ctx.fillStyle = "#00F0FF";
        }

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(renderMatrix);
    };

    renderMatrix();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    // Add to history
    setHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);

    const newOutputs: OutputLine[] = [
      ...outputs,
      { id: Math.random().toString(), type: "input", text: cmd },
    ];

    switch (trimmed) {
      case "help":
        newOutputs.push({
          id: Math.random().toString(),
          type: "output",
          text: `AVAILABLE COMMANDS:\n  • neofetch    : Display developer hardware specs & system identity\n  • skills      : Output full tech stack breakdown & proficiency metrics\n  • projects    : List top engineering achievements & live links\n  • stats       : Real-time developer vitals & GitHub metrics\n  • matrix      : Enter cyberpunk digital data rain mode\n  • about       : Query Dev panpan biography & background\n  • contact     : Transmit frequency channels & reach out\n  • sudo        : Request administrative credentials\n  • clear       : Wipe console buffer`,
        });
        break;

      case "neofetch":
        setActiveTab("neofetch");
        newOutputs.push({
          id: Math.random().toString(),
          type: "success",
          text: "🚀 Switched to NEOFETCH system monitor view.",
        });
        break;

      case "skills":
        newOutputs.push({
          id: Math.random().toString(),
          type: "output",
          text: `[TECH STACK PROFILES]
  CORE     : TypeScript, JavaScript (ESNext), HTML5, CSS3/Tailwind
  FRONTEND : Next.js 14 (App Router), React 18, Framer Motion, Redux
  BACKEND  : Node.js, Express, PostgreSQL, Supabase, Prisma, REST, GraphQL
  DEVOPS   : Docker, Git/GitHub, Vercel CI/CD, Linux, AWS S3
  SPECIAL  : Neobrutalism UI/UX, High-performance Web Apps, Animations`,
        });
        break;

      case "projects":
        newOutputs.push({
          id: Math.random().toString(),
          type: "output",
          text: `[NOTABLE DEPLOYMENTS]
  1. NexusMart       -> Full-stack Next.js E-Commerce (Stripe + Supabase)
  2. CollabBoard     -> Real-time Collaborative Workspace (WebSockets)
  3. AIInsight       -> AI-Powered Analytics Dashboard (GPT-4 + Recharts)
  4. PortfolioCMS    -> Headless Developer CMS with GraphQL engine`,
        });
        break;

      case "stats":
        newOutputs.push({
          id: Math.random().toString(),
          type: "output",
          text: `[SYSTEM DIAGNOSTICS & METRICS]
  • Total Commits   : 1,480+ in 2025/2026
  • Uptime          : 99.98% Product Reliability
  • Caffeine Intake : 3.5 Espressos / Day
  • Code Style      : Pure, Strict, Type-Safe, Pixel-Perfect
  • Status          : [ONLINE] Ready for Full-Stack & Frontend Roles`,
        });
        break;

      case "about":
        newOutputs.push({
          id: Math.random().toString(),
          type: "output",
          text: `DEV PANPAN // IDENTITY:
Full-Stack Software Engineer & Digital Craftsman.
Specializing in high-performance web systems, vibrant visual identities,
and bulletproof architectures. Passionate about Next.js, TypeScript, and Framer Motion.`,
        });
        break;

      case "contact":
        newOutputs.push({
          id: Math.random().toString(),
          type: "output",
          text: `SECURE COMMUNICATION CHANNELS:
  • Email    : hello@devpanpan.dev
  • GitHub   : github.com/Panzqq
  • LinkedIn : linkedin.com/in/devpanpan
  • Location : Indonesia (WIB UTC+7)`,
        });
        break;

      case "matrix":
        setActiveTab("matrix");
        newOutputs.push({
          id: Math.random().toString(),
          type: "success",
          text: "🟢 Entered Matrix Mode. Initializing neural visual stream...",
        });
        break;

      case "sudo":
        newOutputs.push({
          id: Math.random().toString(),
          type: "error",
          text: "🔒 Permission Denied: You are not in the sudoers file. This incident will be reported to Dev panpan.",
        });
        break;

      case "clear":
        setOutputs([]);
        setInputVal("");
        return;

      default:
        newOutputs.push({
          id: Math.random().toString(),
          type: "error",
          text: `zsh: command not found: ${cmd}. Type 'help' to display valid directives.`,
        });
        break;
    }

    setOutputs(newOutputs);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < history.length) {
          setHistoryIdx(nextIdx);
          setInputVal(history[nextIdx]);
        } else {
          setHistoryIdx(-1);
          setInputVal("");
        }
      }
    }
  };

  return (
    <section id="terminal" className="py-20 px-4 md:px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Title Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-brutal-cyan border-2 border-black shadow-brutal-sm" />
            <span className="font-mono text-sm tracking-widest uppercase text-brutal-cyan font-bold">
              02. INTERACTIVE_SYSTEM_CONSOLE
            </span>
          </div>
          <div className="flex items-center gap-2 bg-brutal-surface border-2 border-black px-3 py-1 text-xs font-mono shadow-brutal-sm">
            <span className="w-2 h-2 rounded-full bg-brutal-lime animate-ping" />
            <span className="text-brutal-lime font-bold">NODE_ENV = PRODUCTION</span>
          </div>
        </div>

        {/* Neobrutalist Main Terminal Window */}
        <div className="border-4 border-black bg-brutal-surface shadow-brutal-xl rounded-none relative overflow-hidden scanlines">
          {/* Terminal Titlebar */}
          <div className="bg-brutal-card border-b-4 border-black px-4 py-3 flex flex-wrap items-center justify-between gap-3 select-none">
            {/* Window control buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOutputs([])}
                title="Clear buffer"
                className="w-3.5 h-3.5 bg-brutal-pink border-2 border-black shadow-[1px_1px_0px_#000] hover:scale-110 active:translate-y-0.5 transition-transform"
              />
              <button
                onClick={() => setActiveTab("matrix")}
                title="Matrix stream"
                className="w-3.5 h-3.5 bg-brutal-yellow border-2 border-black shadow-[1px_1px_0px_#000] hover:scale-110 active:translate-y-0.5 transition-transform"
              />
              <button
                onClick={() => setActiveTab("neofetch")}
                title="Neofetch inspect"
                className="w-3.5 h-3.5 bg-brutal-lime border-2 border-black shadow-[1px_1px_0px_#000] hover:scale-110 active:translate-y-0.5 transition-transform"
              />
              <span className="ml-3 font-mono font-bold text-xs text-white/80 hidden sm:inline">
                devpanpan@mainframe:~ (zsh)
              </span>
            </div>

            {/* Tab switchers */}
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <button
                onClick={() => setActiveTab("shell")}
                className={`px-3 py-1 font-bold border-2 border-black transition-all ${
                  activeTab === "shell"
                    ? "bg-brutal-cyan text-black shadow-brutal-sm translate-x-[-1px] translate-y-[-1px]"
                    : "bg-brutal-bg text-white/60 hover:text-white"
                }`}
              >
                CLI_SHELL
              </button>
              <button
                onClick={() => setActiveTab("neofetch")}
                className={`px-3 py-1 font-bold border-2 border-black transition-all ${
                  activeTab === "neofetch"
                    ? "bg-brutal-lime text-black shadow-brutal-sm translate-x-[-1px] translate-y-[-1px]"
                    : "bg-brutal-bg text-white/60 hover:text-white"
                }`}
              >
                NEOFETCH
              </button>
              <button
                onClick={() => setActiveTab("matrix")}
                className={`px-3 py-1 font-bold border-2 border-black transition-all ${
                  activeTab === "matrix"
                    ? "bg-brutal-pink text-black shadow-brutal-sm translate-x-[-1px] translate-y-[-1px]"
                    : "bg-brutal-bg text-white/60 hover:text-white"
                }`}
              >
                MATRIX_RAIN
              </button>
            </div>
          </div>

          {/* Terminal Body Content */}
          <div className="p-4 md:p-6 min-h-[380px] max-h-[500px] overflow-y-auto font-mono text-sm bg-[#07080d]">
            {activeTab === "shell" && (
              <div className="space-y-3">
                {outputs.map((line) => (
                  <div key={line.id} className="leading-relaxed">
                    {line.type === "ascii" && (
                      <pre className="text-brutal-cyan font-bold text-[8px] sm:text-[11px] md:text-xs overflow-x-auto leading-none mb-3 selection:bg-brutal-pink selection:text-white">
                        {line.text}
                      </pre>
                    )}
                    {line.type === "input" && (
                      <div className="flex items-center gap-2 text-brutal-yellow font-bold">
                        <span className="text-brutal-cyan">devpanpan@station:~$</span>
                        <span>{line.text}</span>
                      </div>
                    )}
                    {line.type === "output" && (
                      <pre className="text-white/80 whitespace-pre-wrap pl-0 sm:pl-4 border-l-2 border-white/10 my-1 font-sans sm:font-mono text-xs sm:text-sm">
                        {line.text}
                      </pre>
                    )}
                    {line.type === "success" && (
                      <div className="text-brutal-lime font-semibold pl-4 border-l-2 border-brutal-lime/40">
                        {line.text}
                      </div>
                    )}
                    {line.type === "error" && (
                      <div className="text-brutal-pink font-semibold pl-4 border-l-2 border-brutal-pink/40">
                        {line.text}
                      </div>
                    )}
                  </div>
                ))}

                {/* Live command prompt */}
                <div className="flex items-center gap-2 pt-2 text-brutal-cyan font-bold">
                  <span className="shrink-0">devpanpan@station:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="type 'help', 'neofetch', 'skills', etc..."
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-white/20 caret-brutal-lime"
                    autoFocus
                  />
                </div>
                <div ref={terminalEndRef} />
              </div>
            )}

            {activeTab === "neofetch" && (
              <div className="grid md:grid-cols-12 gap-6 items-center">
                {/* Neofetch ASCII Avatar / Logo */}
                <div className="md:col-span-5 bg-brutal-card border-2 border-black p-4 shadow-brutal text-center">
                  <pre className="text-brutal-lime font-bold text-[10px] sm:text-xs leading-tight inline-block">
{`   _____          _____          
  |  __ \\        |  __ \\         
  | |  | | _____ | |__) |_ _ _ _ 
  | |  | |/ _ \\ \\|  ___/ _\` | '_ \\
  | |__| |  __/\\ | |  | (_| | | | |
  |_____/ \\___| \\|_|   \\__,_|_| |_|
        [ FULL-STACK OPERATOR ]`}
                  </pre>
                  <div className="mt-3 pt-3 border-t-2 border-black/40 text-xs text-white/50">
                    <span className="text-brutal-cyan font-bold">OS:</span> Neobrutal Arch Linux x86_64
                  </div>
                </div>

                {/* Neofetch Information List */}
                <div className="md:col-span-7 space-y-2 text-xs sm:text-sm">
                  <div className="text-brutal-yellow font-bold text-base pb-1 border-b-2 border-white/10">
                    devpanpan@workspace2026
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-white/5">
                    <span className="text-brutal-cyan font-bold">HOST:</span>
                    <span className="text-white/80">Next.js 14 Full-Stack Matrix</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-white/5">
                    <span className="text-brutal-cyan font-bold">KERNEL:</span>
                    <span className="text-white/80">TypeScript 5.x Strict Runtime</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-white/5">
                    <span className="text-brutal-cyan font-bold">UPTIME:</span>
                    <span className="text-white/80">5+ Years Continuous Coding</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-white/5">
                    <span className="text-brutal-cyan font-bold">PACKAGES:</span>
                    <span className="text-white/80">React, Tailwind, Framer Motion, Supabase</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-white/5">
                    <span className="text-brutal-cyan font-bold">MEMORY:</span>
                    <span className="text-white/80">128GB High Creative Bandwidth</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-white/5">
                    <span className="text-brutal-cyan font-bold">LOCATION:</span>
                    <span className="text-brutal-lime font-bold">Indonesia 🇮🇩 (UTC+7)</span>
                  </div>

                  {/* Color Palette Indicators */}
                  <div className="flex gap-2 pt-3">
                    <div className="w-5 h-4 bg-brutal-cyan border border-black" />
                    <div className="w-5 h-4 bg-brutal-lime border border-black" />
                    <div className="w-5 h-4 bg-brutal-pink border border-black" />
                    <div className="w-5 h-4 bg-brutal-yellow border border-black" />
                    <div className="w-5 h-4 bg-brutal-purple border border-black" />
                    <div className="w-5 h-4 bg-white border border-black" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "matrix" && (
              <div className="relative w-full h-[320px]">
                <canvas ref={canvasRef} className="w-full h-full block" />
                <div className="absolute top-4 left-4 bg-black/80 border-2 border-brutal-cyan p-3 shadow-brutal-cyan text-xs">
                  <div className="text-brutal-cyan font-bold">⚡ MATRIX_STREAM_ACTIVE</div>
                  <div className="text-white/70">Neural Code Transmission in Progress...</div>
                </div>
              </div>
            )}
          </div>

          {/* Quick command buttons toolbar */}
          <div className="bg-brutal-card border-t-4 border-black p-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-white/50 font-bold uppercase mr-1">
              ⚡ Quick Execute:
            </span>
            {QUICK_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="btn-brutal bg-brutal-bg border-2 border-black hover:bg-brutal-yellow hover:text-black text-white px-2.5 py-1 text-xs font-mono font-bold shadow-brutal-sm transition-all"
              >
                ${cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
