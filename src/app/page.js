"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MosqueHeader from "@/components/display/MosqueHeader";
import DigitalClock from "@/components/display/DigitalClock";
import NextPrayerCard from "@/components/display/NextPrayerCard";
import PrayerGrid from "@/components/display/PrayerGrid";
import IqomahBanner from "@/components/display/IqomahBanner";
import RunningText from "@/components/display/RunningText";
import WeatherWidget from "@/components/display/WeatherWidget";
import { getPrayerStatus } from "@/lib/prayerUtils";

// ── Mock data (ganti dengan fetch ke /api/prayer-times & /api/settings) ──
const MOCK_SETTINGS = {
  mosqueName: "Masjid Al-Ikhlas",
  shortAddress: "Jl. Merdeka No. 1 · Blitar",
  timezone: "Asia/Jakarta",
};

const MOCK_PRAYER = {
  subuh: "04:32",
  dzuhur: "11:54",
  ashar: "15:18",
  maghrib: "17:51",
  isya: "19:04",
};

const MOCK_IQOMAH = {
  subuh: 10,
  dzuhur: 10,
  ashar: 10,
  maghrib: 5,
  isya: 10,
};

const MOCK_WEATHER = {
  temp: 29,
  humidity: 68,
  qibla: "295° NW",
};

const MOCK_ANNOUNCEMENTS = [
  "Mohon luruskan dan rapatkan shaf.",
  "Kajian rutin ba'da Maghrib setiap malam Jumat.",
  "Penyaluran Zakat Maal Triwulan — Ahad, 24 Mei 2026.",
];

export default function DisplayPage() {
  const [now, setNow] = useState(null);
  const [prayerStatus, setPrayerStatus] = useState(null);

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setNow(n);
      setPrayerStatus(getPrayerStatus(n, MOCK_PRAYER, MOCK_IQOMAH));
    };
    tick(); // jalankan langsung
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!now || !prayerStatus) return null; // ← guard keduanya
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-radial-navy bg-ornament flex flex-col font-body selection:bg-gold/20 selection:text-gold">
      
      {/* ── AMBIENT GLOWS ── */}
      {/* Glow top-right */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full bg-glow-sky opacity-40" />
      {/* Glow left center */}
      <div
        className="pointer-events-none absolute top-[20%] left-[-150px] w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
        }}
      />
      {/* Glow bottom-right */}
      <div
        className="pointer-events-none absolute -bottom-24 right-[10%] w-[450px] h-[450px] rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(0,174,239,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── HEADER ── */}
      <MosqueHeader settings={MOCK_SETTINGS} now={now} />

      {/* ── MAIN CONTENT ── */}
      <div className="flex flex-1 gap-6 px-10 py-6 min-h-0 items-stretch z-10">
        
        {/* LEFT — Clock Card + Next Prayer Card */}
        <div className="flex flex-col gap-5 w-[42%] justify-center">
          
          {/* Clock Card */}
          <div className="relative glass rounded-3xl p-6 overflow-hidden border border-white/5 shadow-2xl mihrab-border flex flex-col items-center justify-center">
            {/* Subtle Arch Silhouette Background */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.02] z-0" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 150'%3E%3Cpath d='M0,150 L0,40 C0,15 20,5 50,0 C80,5 100,15 100,40 L100,150 Z' fill='%23d4af37'/%3E%3C/svg%3E")`,
                backgroundSize: "cover",
                backgroundPosition: "center top"
              }}
            />
            
            {/* Hanging Lanterns inside Clock Card */}
            <div className="absolute top-0 left-6 pointer-events-none z-10 opacity-30">
              <LanternSVG className="w-7 h-20 animate-sway" />
            </div>
            <div className="absolute top-0 right-6 pointer-events-none z-10 opacity-30">
              <LanternSVG className="w-6 h-16 animate-sway" style={{ animationDelay: "-1.5s", animationDuration: "7s" }} />
            </div>

            <div className="relative z-10 w-full flex flex-col items-center">
              <DigitalClock now={now} />
            </div>
          </div>

          {/* Next Prayer Card */}
          <AnimatePresence mode="wait">
            {prayerStatus && (
              <NextPrayerCard key={prayerStatus.next} status={prayerStatus} />
            )}
          </AnimatePresence>
        </div>

        {/* VERTICAL DIVIDER WITH AN ISLAMIC GLOW */}
        <div
          className="w-px self-stretch relative"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(212,175,55,0.25) 30%, rgba(0,174,239,0.25) 70%, transparent)",
          }}
        >
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
          <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky shadow-[0_0_10px_rgba(0,174,239,0.8)]" />
        </div>

        {/* RIGHT — Prayer Grid */}
        <div className="flex flex-col justify-center flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-slate-500" />
            <p className="text-[10px] tracking-[0.3em] text-slate-400 uppercase font-display font-medium">
              Jadwal Sholat Lima Waktu
            </p>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-500/40 to-transparent" />
          </div>
          <PrayerGrid
            prayers={MOCK_PRAYER}
            iqomah={MOCK_IQOMAH}
            status={prayerStatus}
          />
        </div>
      </div>

      {/* ── IQOMAH BANNER (muncul saat waktu adzan masuk) ── */}
      <AnimatePresence>
        {prayerStatus?.phase === "iqomah" && (
          <IqomahBanner status={prayerStatus} />
        )}
      </AnimatePresence>

      {/* ── BOTTOM BAR ── */}
      <div className="divider mx-10" />
      <div className="flex items-center h-16 px-10 gap-0">
        <RunningText announcements={MOCK_ANNOUNCEMENTS} />
        <WeatherWidget data={MOCK_WEATHER} />
      </div>
    </div>
  );
}

// ── SUB-COMPONENTS ──
function LanternSVG({ className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hanging Chain */}
      <line x1="50" y1="0" x2="50" y2="90" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* Lantern Cap */}
      <path d="M35 90 L65 90 L58 75 L42 75 Z" fill="#d4af37" />
      {/* Dome Frame */}
      <path d="M22 130 L78 130 C78 105 68 90 50 90 C32 90 22 105 22 130 Z" fill="rgba(212,175,55,0.08)" stroke="#d4af37" strokeWidth="1.5" />
      {/* Hexagonal body */}
      <path d="M22 130 L78 130 L70 175 L30 175 Z" fill="rgba(212, 175, 55, 0.12)" stroke="#d4af37" strokeWidth="1.5" />
      {/* Inner Glow Bulb */}
      <circle cx="50" cy="130" r="16" fill="url(#lantern-glow)" />
      {/* Vertical inner lines */}
      <path d="M50 90 L50 175" stroke="rgba(212,175,55,0.35)" strokeWidth="1" />
      <path d="M35 100 C43 115 43 145 35 165" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
      <path d="M65 100 C57 115 57 145 65 165" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
      {/* Bottom base */}
      <path d="M30 175 L70 175 L60 185 L40 185 Z" fill="#d4af37" />
      <circle cx="50" cy="193" r="6" stroke="#d4af37" strokeWidth="1.5" />
      <line x1="50" y1="199" x2="50" y2="218" stroke="#d4af37" strokeWidth="1.5" />
      <defs>
        <radialGradient id="lantern-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd97d" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#d4af37" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
