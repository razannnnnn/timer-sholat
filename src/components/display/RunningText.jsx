"use client";
import { useState, useEffect } from "react";

export default function RunningText({ announcements }) {
  const text = announcements.join("   ✦   ");

  return (
    <div className="flex items-center flex-1 overflow-hidden h-full gap-4 mr-5">
      {/* Label Badge */}
      <div
        className="flex-shrink-0 flex items-center gap-2 px-4 py-1.5 rounded-xl border"
        style={{
          background: "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(3,13,26,0.3) 100%)",
          borderColor: "rgba(212,175,55,0.35)",
          boxShadow: "0 0 10px rgba(212,175,55,0.1)",
        }}
      >
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
        </div>
        <span className="text-gold-light text-[9px] font-display tracking-[0.25em] font-bold uppercase whitespace-nowrap">
          PENGUMUMAN
        </span>
      </div>

      {/* Scrolling text */}
      <div className="flex-1 overflow-hidden relative flex items-center">
        <p 
          className="text-slate-200 text-sm whitespace-nowrap animate-marquee font-medium tracking-wide"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
