"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Sparkles, Music, Terminal as TerminalIcon } from "lucide-react";

interface LyricLine {
  time: number;
  text: string;
}

const lyricsData: LyricLine[] = [
  { time: 0.0, text: "> initializing audio_stream..." },
  { time: 1.5, text: "And the toughest part is that we both know" },
  { time: 4.5, text: "what happened to you, why you're out on your own" },
  { time: 8.5, text: "Merry Christmas, please don't call" },
  { time: 12.0, text: "> system_pause: instrumental_break..." },
  { time: 23.5, text: "You're in debt and you're online kid" },
  { time: 26.5, text: "moaning 'bout your baggage" },
  { time: 29.0, text: "You know I'm not your father" },
  { time: 31.5, text: "So welcome to your rough time" },
  { time: 34.0, text: "lone wolf cause I guess you like the image" },
  { time: 37.0, text: "Oh golden boy, shine a light on your own" },
  { time: 42.0, text: "And at your best, you're magic I suppose" },
  { time: 46.5, text: "Don't tell 'em what you told me" },
  { time: 48.5, text: "Don't even tell 'em that you told me" },
  { time: 51.5, text: "I would rather..." },
  { time: 54.0, text: "You should know that I passed out" },
  { time: 56.5, text: "running through the halls of your haunted house" },
  { time: 59.0, text: "> track_complete. connection_terminated." }
];

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

interface TerminalAudioPlayerProps {
  className?: string;
}

export default function TerminalAudioPlayer({ className = "" }: TerminalAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Synchronize audio state
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio play was interrupted or blocked:", err);
          setIsPlaying(false);
        });
    }
  }, [isPlaying]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  // Keyboard shortcut listener: 'p' or 'P' to toggle play/pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is focused on an input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay]);

  // Determine active lyric index
  let activeIndex = 0;
  for (let i = 0; i < lyricsData.length; i++) {
    if (currentTime >= lyricsData[i].time) {
      activeIndex = i;
    } else {
      break;
    }
  }

  // Sliding window to show 3-4 lyric lines simultaneously
  const maxLines = 4;
  const startIdx = Math.max(0, Math.min(activeIndex - 1, lyricsData.length - maxLines));
  const visibleLyrics = lyricsData.slice(startIdx, startIdx + maxLines);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -4 }}
      className={`glass-card bg-[#0A0A0A] rounded-3xl p-6 md:p-7 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden font-mono flex flex-col justify-between shadow-2xl group ${className}`}
    >
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src="/pan.mp3"
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="hidden"
      />

      {/* Ambient background glow effect */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#00FFA3]/5 rounded-full blur-2xl pointer-events-none" />

      {/* 1. Terminal Window Header (macOS style dots + title) */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08] relative z-10">
        <div className="flex items-center gap-3">
          {/* macOS Traffic Light Buttons */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 shadow-[0_0_6px_rgba(255,95,86,0.4)] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 shadow-[0_0_6px_rgba(255,189,46,0.4)] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/60 shadow-[0_0_6px_rgba(39,201,63,0.4)] inline-block" />
          </div>

          <div className="flex items-center gap-2 pl-2 text-xs text-gray-400 font-mono">
            <TerminalIcon size={14} className="text-emerald-400" />
            <span className="text-gray-300 font-semibold tracking-tight">
              dev-panpan@terminal:
            </span>
            <span className="text-emerald-400/80">~/music_player.sh</span>
          </div>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isPlaying
                ? "bg-emerald-400 shadow-[0_0_8px_#00FFA3] animate-pulse"
                : "bg-gray-600"
            }`}
          />
          <span className="text-[11px] font-mono text-emerald-400/90 font-medium tracking-wide uppercase">
            {isPlaying ? "SYNC ACTIVE" : "STANDBY"}
          </span>
        </div>
      </div>

      {/* 2. Terminal Screen & Synced Lyrics Display */}
      <div className="bg-black/70 rounded-2xl p-4 md:p-5 border border-white/[0.06] relative overflow-hidden flex flex-col justify-between my-2 min-h-[170px] shadow-inner">
        {/* Terminal subtle scanline grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[length:100%_4px] pointer-events-none opacity-30" />

        {/* Lyrics Window with Framer Motion */}
        <div className="relative z-10 space-y-2.5 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {visibleLyrics.map((lyric, idx) => {
              const originalIndex = startIdx + idx;
              const isActive = originalIndex === activeIndex;

              return (
                <motion.div
                  key={`${lyric.text}-${originalIndex}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`flex items-start gap-2.5 text-xs md:text-sm font-mono transition-all duration-300 ${
                    isActive
                      ? "text-emerald-400 font-semibold drop-shadow-[0_0_10px_rgba(0,255,163,0.7)]"
                      : "text-emerald-900/50 select-none"
                  }`}
                >
                  {/* Terminal Prompt Indicator */}
                  <span
                    className={`shrink-0 font-mono text-[11px] ${
                      isActive ? "text-emerald-300 font-bold" : "text-emerald-900/40"
                    }`}
                  >
                    {isActive ? "▶" : "$"}
                  </span>

                  {/* Lyric text */}
                  <div className="flex-1 leading-relaxed break-words">
                    <span>{lyric.text}</span>
                    {isActive && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8,
                          ease: "easeInOut",
                        }}
                        className="inline-block text-emerald-400 font-bold ml-1 drop-shadow-[0_0_6px_#00FFA3]"
                      >
                        _
                      </motion.span>
                    )}
                  </div>

                  {/* Timestamp tag */}
                  <span
                    className={`shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isActive
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "text-emerald-950/60"
                    }`}
                  >
                    {formatTime(lyric.time)}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Audio Equalizer Visualizer Bars */}
        <div className="relative z-10 pt-4 mt-3 border-t border-white/[0.04] flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[40, 75, 55, 90, 65, 30, 80, 50, 95, 60, 45, 70].map((height, i) => (
              <motion.span
                key={i}
                animate={
                  isPlaying
                    ? {
                        height: [
                          `${Math.max(4, height * 0.2)}px`,
                          `${height * 0.24}px`,
                          `${Math.max(4, height * 0.15)}px`,
                          `${height * 0.28}px`,
                        ],
                      }
                    : { height: "4px" }
                }
                transition={
                  isPlaying
                    ? {
                        repeat: Infinity,
                        duration: 0.6 + (i % 4) * 0.15,
                        ease: "easeInOut",
                      }
                    : { duration: 0.3 }
                }
                className={`w-1 rounded-full transition-colors ${
                  isPlaying
                    ? "bg-emerald-400 shadow-[0_0_6px_rgba(0,255,163,0.5)]"
                    : "bg-emerald-900/40"
                }`}
              />
            ))}
            <span className="text-[10px] text-gray-500 font-mono ml-2 hidden sm:inline">
              44.1kHz • stereo
            </span>
          </div>

          <div className="text-[11px] font-mono text-gray-400">
            <span className="text-emerald-400">{formatTime(currentTime)}</span>
            <span className="text-gray-600 mx-1">/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* 3. Audio Progress Scrub Bar */}
      <div className="py-2 relative z-10">
        <input
          type="range"
          min="0"
          max={duration || 100}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          aria-label="Audio scrubber"
          className="w-full h-1.5 bg-black/80 rounded-lg appearance-none cursor-pointer accent-emerald-400 hover:accent-[#00FFA3] transition-all"
          style={{
            background: `linear-gradient(to right, #00FFA3 ${(
              (currentTime / (duration || 1)) *
              100
            ).toFixed(1)}%, rgba(255,255,255,0.08) ${(
              (currentTime / (duration || 1)) *
              100
            ).toFixed(1)}%)`,
          }}
        />
      </div>

      {/* 4. Terminal Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.08] relative z-10">
        {/* Interactive Play/Pause Text Button */}
        <button
          type="button"
          onClick={togglePlay}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 active:scale-95 text-emerald-400 hover:text-[#00FFA3] border border-emerald-500/30 hover:border-[#00FFA3]/60 transition-all font-mono font-bold text-xs shadow-[0_0_15px_rgba(0,255,163,0.15)] group/btn"
        >
          {isPlaying ? (
            <Pause size={14} className="fill-emerald-400 text-emerald-400" />
          ) : (
            <Play size={14} className="fill-emerald-400 text-emerald-400" />
          )}
          <span>[ P ] {isPlaying ? "PAUSE" : "PLAY"}</span>
        </button>

        {/* Extra info & Mute control */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <button
            type="button"
            onClick={toggleMute}
            className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-emerald-400 transition-colors border border-white/[0.06]"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          <span className="text-[11px] text-gray-500 hidden sm:inline">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-emerald-400 text-[10px]">P</kbd> to toggle
          </span>
        </div>
      </div>
    </motion.div>
  );
}
