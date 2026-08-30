"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Terminal as TerminalIcon, Monitor } from "lucide-react";

interface LyricLine {
  time: number;
  text: string;
}

const lyricsData: LyricLine[] = [
  { time: 0.0, text: "initializing audio_stream..." },
  { time: 0.8, text: "Oh, golden boy, you shined a light on your home" },
  { time: 5.5, text: "And at your best, you were magic, we were sold" },
  { time: 8.5, text: "But don't tell 'em what you told me" },
  { time: 10.5, text: "Don't even tell 'em that you know me" },
  { time: 13.5, text: "I would rather burn forever" },
  { time: 16.5, text: "But you should know that I died slow" },
  { time: 19.0, text: "Running through the halls of your haunted home" },
  { time: 22.0, text: "system_pause: instrumental_break..." },
  { time: 24.5, text: "And the toughest part is that we both know" },
  { time: 29.0, text: "What happened to you" },
  { time: 31.0, text: "Why you're out on your own" },
  { time: 34.0, text: "Merry Christmas, please don't call." },
  { time: 38.0, text: "track_complete. connection_terminated." }
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
  // Step 1: Two completely isolated media references
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Active mode state
  const [isVideoMode, setIsVideoMode] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  // Responsive screen listener for smooth layout expand
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Step 1: Isolated time and playback states
  const [audioTime, setAudioTime] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  const [videoTime, setVideoTime] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Step 2: Anti-Clash Mode Toggle Logic
  const handleToggleMode = () => {
    if (isVideoMode) {
      // Switching from Video to Terminal: Pause video
      videoRef.current?.pause();
      setIsVideoPlaying(false);
      setIsVideoMode(false);
    } else {
      // Switching from Terminal to Video: Pause audio
      audioRef.current?.pause();
      setIsAudioPlaying(false);
      setIsVideoMode(true);
    }
  };

  // Step 3: Dynamic Play/Pause Logic for Active Media
  const togglePlay = useCallback(() => {
    if (isVideoMode) {
      if (!videoRef.current) return;
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        if (videoDuration > 0 && videoTime >= videoDuration - 0.5) {
          videoRef.current.currentTime = 0;
          setVideoTime(0);
        }
        videoRef.current
          .play()
          .then(() => setIsVideoPlaying(true))
          .catch((err) => {
            console.warn("Video playback error:", err);
            setIsVideoPlaying(false);
          });
      }
    } else {
      if (!audioRef.current) return;
      if (isAudioPlaying) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      } else {
        if (audioDuration > 0 && audioTime >= audioDuration - 0.5) {
          audioRef.current.currentTime = 0;
          setAudioTime(0);
        }
        audioRef.current
          .play()
          .then(() => setIsAudioPlaying(true))
          .catch((err) => {
            console.warn("Audio playback error:", err);
            setIsAudioPlaying(false);
          });
      }
    }
  }, [isVideoMode, isVideoPlaying, isAudioPlaying, videoDuration, videoTime, audioDuration, audioTime]);

  const toggleMute = () => {
    const newMuted = !isMuted;
    if (audioRef.current) audioRef.current.muted = newMuted;
    if (videoRef.current) videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (isVideoMode) {
      setVideoTime(seekTime);
      if (videoRef.current) {
        videoRef.current.currentTime = seekTime;
      }
    } else {
      setAudioTime(seekTime);
      if (audioRef.current) {
        audioRef.current.currentTime = seekTime;
      }
    }
  };

  // Keyboard shortcut listener: 'p' or 'P' to toggle play/pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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

  // Step 1: Lyrics in terminal ONLY read from audioTime
  let activeIndex = 0;
  for (let i = 0; i < lyricsData.length; i++) {
    if (audioTime >= lyricsData[i].time) {
      activeIndex = i;
    } else {
      break;
    }
  }

  // Active states for current mode display
  const activeIsPlaying = isVideoMode ? isVideoPlaying : isAudioPlaying;
  const activeTime = isVideoMode ? videoTime : audioTime;
  const activeDuration = isVideoMode ? videoDuration : audioDuration;

  const maxLines = 4;
  const startIdx = Math.max(0, Math.min(activeIndex - 1, lyricsData.length - maxLines));
  const visibleLyrics = lyricsData.slice(startIdx, startIdx + maxLines);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -4 }}
      className={`glass-card bg-[#0A0A0A] rounded-3xl p-5 md:p-6 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 relative font-mono flex flex-col justify-between w-full h-auto min-h-[320px] shadow-2xl group ${className}`}
    >
      {/* Isolated Hidden HTML5 Audio Element (/pan.mp3) */}
      <audio
        ref={audioRef}
        src="/pan.mp3"
        preload="metadata"
        onTimeUpdate={(e) => setAudioTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          if (e.currentTarget.duration && !isNaN(e.currentTarget.duration)) {
            setAudioDuration(e.currentTarget.duration);
          }
        }}
        onDurationChange={(e) => {
          if (e.currentTarget.duration && !isNaN(e.currentTarget.duration)) {
            setAudioDuration(e.currentTarget.duration);
          }
        }}
        onEnded={() => {
          setIsAudioPlaying(false);
          if (audioRef.current && audioDuration > 0) {
            setAudioTime(audioDuration);
          }
        }}
        onPlay={() => setIsAudioPlaying(true)}
        onPause={() => setIsAudioPlaying(false)}
        className="hidden"
      />

      {/* Ambient background glow effect */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#00FFA3]/5 rounded-full blur-2xl pointer-events-none" />

      {/* 1. Terminal Window Header (macOS style dots + title + Mode Switcher) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.08] relative z-20 shrink-0">
        <div className="flex items-center gap-3">
          {/* macOS Traffic Light Buttons */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 shadow-[0_0_6px_rgba(255,95,86,0.4)] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 shadow-[0_0_6px_rgba(255,189,46,0.4)] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/60 shadow-[0_0_6px_rgba(39,201,63,0.4)] inline-block" />
          </div>

          <div className="flex items-center gap-2 pl-1 text-xs text-gray-400 font-mono">
            <TerminalIcon size={14} className="text-emerald-400" />
            <span className="text-gray-300 font-semibold tracking-tight hidden sm:inline">
              dev-panpan@terminal:
            </span>
            <span className="text-emerald-400/80">
              {isVideoMode ? "~/video_stream.mp4" : "~/lyrics_stream.sh"}
            </span>
          </div>
        </div>

        {/* Header Right Actions: Mode Switcher & Volume Mute */}
        <div className="flex items-center gap-2.5">
          {/* Anti-Clash Switch Mode Button */}
          <button
            type="button"
            onClick={handleToggleMode}
            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-white border border-emerald-500/30 transition-all font-mono text-[11px] font-semibold flex items-center gap-1.5 active:scale-95 shadow-[0_0_10px_rgba(0,255,163,0.1)] cursor-pointer"
            title="Switch between Terminal Lyrics and Video Player"
          >
            {isVideoMode ? (
              <>
                <TerminalIcon size={13} className="text-emerald-400" />
                <span>[ TERMINAL VIEW ]</span>
              </>
            ) : (
              <>
                <Monitor size={13} className="text-emerald-400" />
                <span>[ SWITCH TO VIDEO ]</span>
              </>
            )}
          </button>

          {/* Volume Mute */}
          <button
            type="button"
            onClick={toggleMute}
            className="p-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-emerald-400 transition-colors border border-white/[0.06]"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>

          {/* Live Status Badge */}
          <div className="hidden sm:flex items-center gap-1.5 pl-1">
            <span
              className={`w-2 h-2 rounded-full ${
                activeIsPlaying
                  ? "bg-emerald-400 shadow-[0_0_8px_#00FFA3] animate-pulse"
                  : "bg-gray-600"
              }`}
            />
            <span className="text-[11px] font-mono text-emerald-400/90 font-medium tracking-wide uppercase">
              {activeIsPlaying ? "PLAYING" : "STANDBY"}
            </span>
          </div>
        </div>
      </div>

      {/* Langkah 2 & 3: Dynamic Expanding Media Area (140px in Terminal Mode, 400px/250px in Video Mode) */}
      <motion.div
        layout
        initial={false}
        animate={{ height: isVideoMode ? (isDesktop ? 400 : 250) : 140 }}
        transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
        className="relative w-full overflow-hidden flex flex-col justify-end mt-4 mb-4 rounded-xl bg-black/40 border border-white/[0.06] shadow-inner"
      >
        {/* Continuous HTML5 Video Element (/pan-video.mp4) with object-contain to prevent cropping */}
        <video
          ref={videoRef}
          src="/pan-video.mp4"
          playsInline
          preload="metadata"
          onTimeUpdate={(e) => setVideoTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => {
            if (e.currentTarget.duration && !isNaN(e.currentTarget.duration)) {
              setVideoDuration(e.currentTarget.duration);
            }
          }}
          onDurationChange={(e) => {
            if (e.currentTarget.duration && !isNaN(e.currentTarget.duration)) {
              setVideoDuration(e.currentTarget.duration);
            }
          }}
          onEnded={() => {
            setIsVideoPlaying(false);
            if (videoRef.current && videoDuration > 0) {
              setVideoTime(videoDuration);
            }
          }}
          onPlay={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
          className={`w-full h-full object-contain object-center rounded-xl absolute inset-0 pointer-events-none transition-opacity duration-500 ${
            isVideoMode ? "opacity-95 z-10" : "opacity-0 -z-10"
          }`}
        />

        {/* Video Dark Emerald Theme Filter Overlay */}
        {isVideoMode && (
          <div className="absolute inset-0 bg-emerald-950/20 mix-blend-overlay pointer-events-none z-10 rounded-xl" />
        )}

        {/* Terminal subtle scanline grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[length:100%_4px] pointer-events-none opacity-20 rounded-xl z-10" />

        {/* Mode Switching Animation with AnimatePresence mode="popLayout" */}
        <AnimatePresence mode="popLayout">
          {!isVideoMode ? (
            /* Mode A: Terminal Lyrics View */
            <motion.div
              key="terminal-lyrics-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-20 w-full h-full p-3.5 md:p-4 flex flex-col justify-between"
            >
              {/* Terminal Lyrics Container */}
              <div className="relative w-full h-[85px] overflow-hidden flex flex-col justify-start gap-2">
                <AnimatePresence mode="popLayout" initial={false}>
                  {visibleLyrics.map((lyric, idx) => {
                    const originalIndex = startIdx + idx;
                    const isActive = originalIndex === activeIndex;

                    return (
                      <motion.div
                        key={`${lyric.text}-${originalIndex}`}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className={`w-full flex items-start gap-2.5 text-xs md:text-sm font-mono transition-colors duration-200 shrink-0 ${
                          isActive
                            ? "text-emerald-400 font-semibold drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                            : "text-emerald-900/40 select-none"
                        }`}
                      >
                        {/* SVG Terminal Prompt Chevron */}
                        {isActive ? (
                          <svg
                            className="w-3.5 h-3.5 text-emerald-400 inline-block shrink-0 mt-0.5 animate-pulse"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        ) : (
                          <span className="w-3.5 inline-block text-center font-mono text-[11px] text-emerald-900/40 shrink-0 select-none">
                            $
                          </span>
                        )}

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

              {/* Audio Equalizer Visualizer Bars & Time in Terminal Mode */}
              <div className="relative z-10 pt-2 border-t border-white/[0.04] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="h-5 flex items-end gap-1 overflow-hidden">
                    {[40, 75, 55, 90, 65, 30, 80, 50, 95, 60, 45, 70].map((height, i) => (
                      <motion.span
                        key={i}
                        animate={
                          isAudioPlaying
                            ? {
                                height: [
                                  `${Math.max(3, height * 0.14)}px`,
                                  `${Math.min(18, height * 0.2)}px`,
                                  `${Math.max(3, height * 0.1)}px`,
                                  `${Math.min(18, height * 0.2)}px`,
                                ],
                              }
                            : { height: "3px" }
                        }
                        transition={
                          isAudioPlaying
                            ? {
                                repeat: Infinity,
                                duration: 0.6 + (i % 4) * 0.15,
                                ease: "easeInOut",
                              }
                            : { duration: 0.3 }
                        }
                        className={`w-1 rounded-full transition-colors ${
                          isAudioPlaying
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
                  <span className="text-emerald-400 font-semibold">{formatTime(audioTime)}</span>
                  <span className="text-gray-600">/</span>
                  <span>{formatTime(audioDuration)}</span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Mode B: Video Floating Info Banner */
            <motion.div
              key="video-floating-banner"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-3 left-3.5 right-3.5 z-20 flex items-center justify-between bg-black/70 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/[0.08] text-[11px] font-mono shadow-lg"
            >
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold truncate">Merry Christmas, Please Don&apos;t Call</span>
              </div>
              <div className="text-gray-400 shrink-0 ml-2">
                <span className="text-emerald-400 font-semibold">{formatTime(videoTime)}</span>
                <span className="text-gray-600 mx-0.5">/</span>
                <span>{formatTime(videoDuration)}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 3. Media Progress Bar & Interactive Scrubber for Active Mode */}
      <div className="py-2 relative z-10 shrink-0">
        <div className="relative w-full h-2 bg-black/80 rounded-full overflow-hidden border border-white/[0.08] p-0.5">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-[#00FFA3] to-[#00FFA3] rounded-full shadow-[0_0_10px_#00FFA3] transition-[width] duration-100 ease-linear"
            style={{
              width: activeDuration > 0 ? `${Math.min(100, (activeTime / activeDuration) * 100)}%` : "0%",
            }}
          />
        </div>
        {/* Transparent range slider for scrubbing active media */}
        <input
          type="range"
          min="0"
          max={activeDuration > 0 ? activeDuration : 100}
          step="0.05"
          value={activeTime}
          onChange={handleSeek}
          aria-label="Media scrubber"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* 4. Dynamic Play/Pause Button for Active Mode */}
      <button
        onClick={togglePlay}
        type="button"
        className="w-full mt-auto py-3 bg-emerald-950/40 border border-emerald-800/50 rounded-xl text-emerald-400 font-mono font-bold hover:bg-emerald-900/60 hover:border-emerald-500/50 hover:text-[#00FFA3] transition-all cursor-pointer relative z-10 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,255,163,0.1)] active:scale-[0.99] select-none"
      >
        {activeIsPlaying ? (
          <>
            <Pause size={15} className="fill-emerald-400 text-emerald-400" />
            <span>{isVideoMode ? "[ PAUSE VIDEO ]" : "[ PAUSE STREAM ]"}</span>
          </>
        ) : (
          <>
            <Play size={15} className="fill-emerald-400 text-emerald-400 ml-0.5" />
            <span>{isVideoMode ? "[ PLAY VIDEO ]" : "[ PLAY AUDIO ]"}</span>
          </>
        )}
      </button>
    </motion.div>
  );
}
