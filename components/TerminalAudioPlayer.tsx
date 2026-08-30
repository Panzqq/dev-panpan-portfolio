"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Terminal as TerminalIcon } from "lucide-react";

interface LyricLine {
  time: number;
  text: string;
}

const lyricsData: LyricLine[] = [
  { time: 0.0, text: "> initializing audio_stream..." },
  { time: 0.8, text: "Oh, golden boy, you shined a light on your home" },
  { time: 5.5, text: "And at your best, you were magic, we were sold" },
  { time: 8.5, text: "But don't tell 'em what you told me" },
  { time: 10.5, text: "Don't even tell 'em that you know me" },
  { time: 13.5, text: "I would rather burn forever" },
  { time: 16.5, text: "But you should know that I died slow" },
  { time: 19.0, text: "Running through the halls of your haunted home" },
  { time: 22.0, text: "> system_pause: instrumental_break..." },
  { time: 24.5, text: "And the toughest part is that we both know" },
  { time: 29.0, text: "What happened to you" },
  { time: 31.0, text: "Why you're out on your own" },
  { time: 34.0, text: "Merry Christmas, please don't call." },
  { time: 38.0, text: "> track_complete. connection_terminated." }
];

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";
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

  // Synchronize audio playback state
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const audio = e.currentTarget;
    setCurrentTime(audio.currentTime);
    if (audio.duration && !isNaN(audio.duration) && duration === 0) {
      setDuration(audio.duration);
    }
  };

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const dur = e.currentTarget.duration;
    if (dur && !isNaN(dur)) {
      setDuration(dur);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (audioRef.current && duration > 0) {
      setCurrentTime(duration);
    }
  };

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // If song finished, restart from 0
      if (duration > 0 && currentTime >= duration - 0.5) {
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
      }
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio play was interrupted or blocked:", err);
          setIsPlaying(false);
        });
    }
  }, [isPlaying, currentTime, duration]);

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
      className={`glass-card bg-[#0A0A0A] rounded-3xl p-5 md:p-6 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 relative font-mono flex flex-col justify-between w-full h-auto min-h-[320px] shadow-2xl group ${className}`}
    >
      {/* Hidden HTML5 Audio Element with .mpeg source */}
      <audio
        ref={audioRef}
        src="/pan.mpeg"
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onDurationChange={handleLoadedMetadata}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="hidden"
      />

      {/* Ambient background glow effect */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#00FFA3]/5 rounded-full blur-2xl pointer-events-none" />

      {/* 1. Terminal Window Header (macOS style dots + title) */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/[0.08] relative z-10 shrink-0">
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

        {/* Live Status Badge & Volume Mute */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleMute}
            className="p-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-emerald-400 transition-colors border border-white/[0.06]"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>
          <div className="flex items-center gap-1.5">
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
      </div>

      {/* 2. Terminal Screen & Isolated Scrolling Lyrics Display */}
      <div className="bg-black/70 rounded-2xl p-3.5 md:p-4 border border-white/[0.06] relative flex flex-col justify-between my-2 shadow-inner">
        {/* Terminal subtle scanline grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[length:100%_4px] pointer-events-none opacity-30 rounded-2xl" />

        {/* Isolated Lyrics Window (overflow-hidden strictly isolated here) */}
        <div className="relative w-full h-[130px] overflow-hidden flex flex-col justify-start mt-2 mb-2 gap-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleLyrics.map((lyric, idx) => {
              const originalIndex = startIdx + idx;
              const isActive = originalIndex === activeIndex;

              return (
                <motion.div
                  key={`${lyric.text}-${originalIndex}`}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`w-full flex items-start gap-2.5 text-xs md:text-sm font-mono transition-colors duration-200 shrink-0 ${
                    isActive
                      ? "text-emerald-400 font-semibold drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                      : "text-emerald-900/40 select-none"
                  }`}
                >
                  {/* Terminal Prompt Indicator */}
                  <span
                    className={`shrink-0 font-mono text-[11px] select-none ${
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
                    className={`shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded select-none ${
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

        {/* Audio Equalizer Visualizer Bars & Time (Fixed Height & items-end prevents jitter completely) */}
        <div className="relative z-10 pt-2.5 mt-1 border-t border-white/[0.04] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            {/* Visualizer container strictly locked with h-6 items-end */}
            <div className="h-6 flex items-end gap-1 overflow-hidden">
              {[40, 75, 55, 90, 65, 30, 80, 50, 95, 60, 45, 70].map((height, i) => (
                <motion.span
                  key={i}
                  animate={
                    isPlaying
                      ? {
                          height: [
                            `${Math.max(4, height * 0.16)}px`,
                            `${Math.min(22, height * 0.24)}px`,
                            `${Math.max(4, height * 0.12)}px`,
                            `${Math.min(22, height * 0.24)}px`,
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
            </div>
            <span className="text-[10px] text-gray-500 font-mono hidden sm:inline select-none">
              44.1kHz • stereo
            </span>
          </div>

          <div className="text-[11px] font-mono text-gray-400 select-none flex items-center gap-1">
            <span className="text-emerald-400 font-semibold">{formatTime(currentTime)}</span>
            <span className="text-gray-600">/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* 3. Audio Progress Bar & Interactive Click/Drag Scrubber */}
      <div className="py-2 relative z-10 shrink-0">
        <div className="relative w-full h-2 bg-black/80 rounded-full overflow-hidden border border-white/[0.08] p-0.5">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-[#00FFA3] to-[#00FFA3] rounded-full shadow-[0_0_10px_#00FFA3] transition-[width] duration-100 ease-linear"
            style={{
              width: duration > 0 ? `${Math.min(100, (currentTime / duration) * 100)}%` : "0%",
            }}
          />
        </div>
        {/* Transparent range slider on top for precise scrubbing */}
        <input
          type="range"
          min="0"
          max={duration > 0 ? duration : 100}
          step="0.05"
          value={currentTime}
          onChange={handleSeek}
          aria-label="Audio scrubber"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* 4. Restored Clickable Play / Pause Button */}
      <button
        onClick={togglePlay}
        type="button"
        className="w-full mt-auto py-3 bg-emerald-950/40 border border-emerald-800/50 rounded-xl text-emerald-400 font-mono font-bold hover:bg-emerald-900/60 hover:border-emerald-500/50 hover:text-[#00FFA3] transition-all cursor-pointer relative z-10 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,255,163,0.1)] active:scale-[0.99] select-none"
      >
        {isPlaying ? (
          <>
            <Pause size={15} className="fill-emerald-400 text-emerald-400" />
            <span>[ || ] PAUSE STREAM</span>
          </>
        ) : (
          <>
            <Play size={15} className="fill-emerald-400 text-emerald-400 ml-0.5" />
            <span>[ &gt; ] PLAY AUDIO</span>
          </>
        )}
      </button>
    </motion.div>
  );
}
