"use client";
import { motion } from "framer-motion";
import { getHijriDate } from "@/lib/prayerUtils";

const DAYS = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export default function MosqueHeader({ settings, now }) {
  const day = DAYS[now.getDay()];
  const date = now.getDate();
  const month = MONTHS[now.getMonth()];
  const year = now.getFullYear();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex items-center justify-between px-10 py-5 border-b"
      style={{ borderColor: "rgba(212,175,55,0.15)" }}
    >
      {/* Mosque identity */}
      <div className="flex items-center gap-5">
        {/* Icon dome/minaret in Gold */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center relative overflow-hidden"
          style={{
            background: "rgba(3, 13, 26, 0.7)",
            border: "1.5px solid rgba(212, 175, 55, 0.5)",
            boxShadow: "0 0 15px rgba(212,175,55,0.15)",
          }}
        >
          {/* Subtle light glow behind icon */}
          <div 
            className="absolute inset-0 animate-pulse-glow" 
            style={{ backgroundColor: "rgba(212, 175, 55, 0.08)" }}
          />
          <svg viewBox="0 0 64 64" className="w-8 h-8 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Crescent moon */}
            <path d="M32 6 C32.5 6 33 6.3 33 6.8 C33 7.8 31.8 9 30.5 9 C31.8 10 33 11.2 33 12.2 C33 12.7 32.5 13 32 13 C30.8 13 29.5 11.8 29.5 10.5 C29.5 9.2 30.8 8 32 6Z" fill="#ffd97d" />
            {/* Dome */}
            <path d="M32 13 C25 13 19 19.5 19 27 L45 27 C45 19.5 39 13 32 13Z" fill="rgba(212, 175, 55, 0.2)" stroke="#d4af37" strokeWidth="1.5" />
            {/* Minarets */}
            <rect x="13" y="21" width="3" height="23" fill="rgba(212, 175, 55, 0.2)" stroke="#d4af37" strokeWidth="1.2" />
            <path d="M12 21 L17 21 L16 16 L13 16 Z" fill="#d4af37" />
            <rect x="48" y="21" width="3" height="23" fill="rgba(212, 175, 55, 0.2)" stroke="#d4af37" strokeWidth="1.2" />
            <path d="M47 21 L52 21 L51 16 L48 16 Z" fill="#d4af37" />
            {/* Base platform */}
            <rect x="8" y="44" width="48" height="3" rx="1.5" fill="#d4af37" />
            {/* Main building */}
            <path d="M19 27 L45 27 L45 44 L19 44 Z" fill="rgba(212, 175, 55, 0.1)" stroke="#d4af37" strokeWidth="1.5" />
            {/* Arched Door */}
            <path d="M28 44 L28 36 C28 34 30 32 32 32 C34 32 36 34 36 36 L36 44 Z" fill="#ffd97d" stroke="#d4af37" strokeWidth="1.2" />
          </svg>
        </div>
        <div>
          <h1 className="font-display text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-gold-light leading-tight">
            {settings.mosqueName.toUpperCase()}
          </h1>
          <p className="text-[10px] text-slate-400 tracking-[0.25em] uppercase mt-1 font-medium flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-gold" />
            {settings.shortAddress}
          </p>
        </div>
      </div>

      {/* Date info styled inside a glass card */}
      <div 
        className="flex items-center gap-4 px-5 py-2.5 rounded-2xl border border-white/5 shadow-lg"
        style={{
          background: "linear-gradient(135deg, rgba(11,28,51,0.3) 0%, rgba(3,13,26,0.3) 100%)",
        }}
      >
        <div className="text-right">
          <p className="text-xs font-semibold text-slate-200 tracking-wide uppercase">
            {day}, {date} {month} {year}
          </p>
          <p className="text-[11px] text-gold-light font-medium tracking-wider mt-0.5">
            {getHijriDate()}
          </p>
        </div>
        <div className="w-[1px] h-8 bg-white/10" />
        <div className="font-arabic text-xl text-gold" dir="rtl">
          🕌
        </div>
      </div>
    </motion.header>
  );
}
