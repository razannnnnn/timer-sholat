"use client";
import { motion } from "framer-motion";
import { formatCountdown, PRAYER_ARABIC } from "@/lib/prayerUtils";

export default function NextPrayerCard({ status }) {
  const { label, next, phase, countdown } = status;
  const isIqomah = phase === "iqomah";
  const isActive = phase === "active";

  // Determine colors based on status phase
  const primaryColor = isIqomah ? "#d4af37" : isActive ? "#10b981" : "#00AEEF";
  const secondaryColor = isIqomah ? "#ffd97d" : isActive ? "#34d399" : "#38bdf8";
  const bgGradient = isIqomah
    ? "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(3,13,26,0.6) 100%)"
    : isActive
      ? "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(3,13,26,0.6) 100%)"
      : "linear-gradient(135deg, rgba(0,174,239,0.12) 0%, rgba(3,13,26,0.6) 100%)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="rounded-2xl p-6 relative overflow-hidden border"
      style={{
        background: bgGradient,
        borderColor: isIqomah ? "rgba(212,175,55,0.4)" : isActive ? "rgba(16,185,129,0.4)" : "rgba(0,174,239,0.25)",
        boxShadow: isIqomah
          ? "0 10px 30px rgba(212,175,55,0.15)"
          : isActive
            ? "0 10px 30px rgba(16,185,129,0.15)"
            : "0 10px 30px rgba(0,174,239,0.08)",
      }}
    >
      {/* Visual Ambient Glow Orb inside card */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none blur-2xl"
        style={{
          background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)`,
          opacity: 0.35
        }}
      />

      {/* Header Info badge */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[9px] tracking-[0.3em] uppercase font-bold px-2.5 py-1 rounded-full border"
          style={{
            color: primaryColor,
            borderColor: `${primaryColor}33`,
            backgroundColor: `${primaryColor}10`
          }}
        >
          {isIqomah
            ? "Iqomah"
            : isActive
              ? "Sedang Berlangsung"
              : "Sholat Berikutnya"}
        </span>
        
        {/* Calligraphy label */}
        <span 
          className="font-arabic text-2xl font-bold select-none opacity-80"
          style={{ color: primaryColor }}
        >
          {PRAYER_ARABIC[next]}
        </span>
      </div>

      {/* Main Prayer Name */}
      <div className="flex items-baseline justify-between">
        <h2 
          className="font-display text-4xl font-bold tracking-wider text-white"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
        >
          {label}
        </h2>
        <span className="text-xs text-slate-400 font-mono tracking-wider">
          {isIqomah ? "Countdown Iqomah" : isActive ? "Waktu Utama" : "Segera Masuk"}
        </span>
      </div>

      <div 
        className="h-[1px] my-4" 
        style={{
          background: `linear-gradient(90deg, ${primaryColor}33, ${secondaryColor}11, transparent)`
        }}
      />

      {/* Footer Content: Timer or Active status */}
      {!isActive && (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[0.25em] text-slate-400 uppercase font-medium mb-1.5">
              {isIqomah ? "Iqomah dalam" : "Sisa Waktu"}
            </p>
            <p
              className="font-mono text-5xl font-bold tracking-tight select-none"
              style={{
                color: primaryColor,
                textShadow: `0 0 25px ${primaryColor}66`,
              }}
            >
              {formatCountdown(countdown)}
            </p>
          </div>
          
          {/* Animated decorative ring or hourglass */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* Spinning ring segment */}
            <div 
              className="absolute inset-0 rounded-full border-2 border-white/5"
            />
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-t-transparent border-l-transparent"
              style={{ borderColor: primaryColor }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            />
            <span className="text-lg">⏳</span>
          </div>
        </div>
      )}

      {isActive && (
        <div className="flex items-center gap-3 py-1">
          <div className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
          </div>
          <p className="text-emerald-300 font-medium text-sm tracking-wide animate-pulse-glow">
            Sholat sedang berlangsung. Luruskan shaf Anda.
          </p>
        </div>
      )}
    </motion.div>
  );
}
