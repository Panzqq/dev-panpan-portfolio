"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Terminal as TerminalIcon, Send, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface GuestbookEntry {
  id?: string | number;
  name: string;
  message: string;
  created_at?: string;
}

interface TerminalGuestbookProps {
  className?: string;
}

export default function TerminalGuestbook({ className = "" }: TerminalGuestbookProps) {
  const [entries, setEntries] = useState<GuestbookEntry[]>([
    {
      id: "initial-1",
      name: "system",
      message: "guestbook_daemon initialized. Leave your message for dev-panpan.",
      created_at: new Date().toISOString(),
    },
  ]);
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  // Fetch guestbook messages from Supabase
  const fetchEntries = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("guestbook")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(30);

      if (error) {
        console.warn("Supabase fetch notice:", error.message);
      } else if (data && data.length > 0) {
        setEntries(data);
      }
    } catch (err) {
      console.warn("Guestbook connection notice:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  // Submit new entry to Supabase guestbook with anonymous fallback
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setStatusNotice("POSTING_TO_DATABASE...");

    // Fallback: If name is empty, automatically assign 'anonymous'
    const finalName = name.trim() === "" ? "anonymous" : name.trim();

    try {
      const newEntry = {
        name: finalName,
        message: message.trim(),
      };

      const { data, error } = await supabase
        .from("guestbook")
        .insert([newEntry])
        .select();

      if (error) {
        throw error;
      }

      setStatusNotice("MESSAGE_RECORDED_SUCCESSFULLY");
      setMessage("");
      if (data && data.length > 0) {
        setEntries((prev) => [data[0], ...prev]);
      } else {
        await fetchEntries();
      }
      setTimeout(() => setStatusNotice(null), 3000);
    } catch (err: unknown) {
      console.error("Supabase insert error:", err);
      // Optimistic local push fallback
      const optimisticEntry: GuestbookEntry = {
        id: Date.now(),
        name: finalName,
        message: message.trim(),
        created_at: new Date().toISOString(),
      };
      setEntries((prev) => [optimisticEntry, ...prev]);
      setMessage("");
      setStatusNotice("LOCAL_STREAM_OK (DATABASE_SYNCING)");
      setTimeout(() => setStatusNotice(null), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimestamp = (timestamp?: string): string => {
    if (!timestamp) return "00:00:00";
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "00:00:00";
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div
      className={`glass-card bg-[#0A0A0A] rounded-3xl p-5 md:p-6 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 relative font-mono flex flex-col justify-between w-full h-[340px] md:h-[360px] overflow-hidden shadow-2xl group ${className}`}
    >
      {/* Ambient background glow effect */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#00FFA3]/5 rounded-full blur-2xl pointer-events-none" />

      {/* 1. Terminal macOS Header */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/[0.08] relative z-20 shrink-0">
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
            <span className="text-emerald-400/80">~/guestbook.log</span>
          </div>
        </div>

        {/* Live Status & Refresh */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchEntries}
            disabled={isLoading}
            className="p-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-emerald-400 transition-colors border border-white/[0.06] cursor-pointer"
            title="Refresh messages"
          >
            <RefreshCw size={13} className={isLoading ? "animate-spin text-emerald-400" : ""} />
          </button>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#00FFA3] animate-pulse" />
            <span className="text-[11px] font-mono text-emerald-400/90 font-medium tracking-wide uppercase">
              ONLINE
            </span>
          </div>
        </div>
      </div>

      {/* 2. Message Log Area (CLI Log stream) */}
      <div className="bg-black/70 rounded-2xl p-3 md:p-3.5 border border-white/[0.06] relative flex flex-col justify-end flex-1 my-2 overflow-hidden shadow-inner">
        {/* Terminal scanline grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[length:100%_4px] pointer-events-none opacity-25 rounded-2xl z-0" />

        {/* Log stream container */}
        <div className="relative z-10 w-full h-full overflow-y-auto flex flex-col gap-1.5 pr-1 text-xs font-mono scrollbar-thin scrollbar-thumb-emerald-950 scrollbar-track-transparent">
          {entries.length === 0 ? (
            <div className="text-gray-600 text-xs py-4 text-center select-none font-mono">
              &gt; No visitor messages recorded yet. Be the first to sign.
            </div>
          ) : (
            entries.map((entry, idx) => {
              const isAnonymous =
                entry.name.toLowerCase() === "anonymous" || entry.name.toLowerCase() === "guest_user";

              return (
                <div
                  key={entry.id || idx}
                  className="flex items-start gap-2 leading-relaxed break-words hover:bg-white/[0.02] p-1 rounded transition-colors"
                >
                  {/* Timestamp */}
                  <span className="text-gray-600 shrink-0 text-[10px] select-none font-mono">
                    [{formatTimestamp(entry.created_at)}]
                  </span>

                  {/* Prefix & Author */}
                  <span
                    className={`font-semibold shrink-0 select-none ${
                      isAnonymous ? "text-emerald-600/80 italic font-normal" : "text-emerald-400"
                    }`}
                  >
                    ~ {entry.name}:
                  </span>

                  {/* Message Content */}
                  <span className="text-gray-200 flex-1 font-mono">
                    {entry.message}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Status Notice Indicator */}
      {statusNotice && (
        <div className="text-[10px] text-cyan-400 font-mono px-2 py-0.5 select-none animate-pulse">
          &gt; {statusNotice}
        </div>
      )}

      {/* 3. Input Form Area (Optional Name + Required Message Prompts) */}
      <form onSubmit={handleSubmit} className="relative z-20 pt-1 shrink-0 space-y-1.5">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          {/* Visitor Name Input (Optional) */}
          <div className="sm:col-span-4 flex items-center gap-1.5 bg-black/80 border border-white/[0.08] focus-within:border-cyan-400/50 rounded-xl px-3 py-2 transition-all">
            <span className="text-cyan-400 font-mono font-bold text-xs select-none shrink-0">
              ~ $
            </span>
            <input
              type="text"
              maxLength={30}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name / Username (Optional)..."
              className="w-full bg-transparent text-xs font-mono text-emerald-300 placeholder-gray-600 outline-none border-none p-0"
            />
          </div>

          {/* Visitor Message Input (Required) */}
          <div className="sm:col-span-8 flex items-center gap-1.5 bg-black/80 border border-white/[0.08] focus-within:border-emerald-400/50 rounded-xl px-3 py-2 transition-all">
            <span className="text-emerald-400 font-mono font-bold text-xs select-none shrink-0">
              &gt;
            </span>
            <input
              type="text"
              required
              maxLength={140}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="type your message here..."
              className="w-full bg-transparent text-xs font-mono text-white placeholder-gray-600 outline-none border-none p-0 flex-1"
            />
            <button
              type="submit"
              disabled={isSubmitting || !message.trim()}
              className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 hover:text-white hover:bg-emerald-800/80 transition-all font-mono text-[11px] font-bold flex items-center gap-1 shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={11} />
              <span>POST</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
