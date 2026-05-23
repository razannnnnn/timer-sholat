"use client";
import { motion } from "framer-motion";
import { PRAYER_ARABIC, addMinutesToTime } from "@/lib/prayerUtils";

const PRAYERS = ["subuh", "dzuhur", "ashar", "maghrib", "isya"];
const LABELS = {
  subuh: "Subuh",
  dzuhur: "Dzuhur",
  ashar: "Ashar",
  maghrib: "Maghrib",
  isya: "Isya'",
};

export default function PrayerGrid({ prayers, iqomah, status }) {
  return (
    <div className="grid grid-cols-5 gap-3.5">
      {PRAYERS.map((key, i) => {
        const isNext = status?.next === key && status?.phase === "countdown";
        const isIqomah = status?.next === key && status?.phase === "iqomah";
        const isActive = status?.next === key && status?.phase === "active";
        const isCurrentActive = isNext || isIqomah || isActive;

        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
            className={`rounded-2xl p-4 text-center relative overflow-hidden transition-all duration-500 border ${
              isCurrentActive
                ? "glass-active border-gold/50"
                : "glass border-white/5"
            }`}
          >
            {/* Top gold accent line for current active sholat */}
            {isCurrentActive && (
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #d4af37, transparent)",
                }}
              />
            )}

            {/* Glowing background halo inside card for active sholat */}
            {isCurrentActive && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gold/10 blur-xl pointer-events-none" />
            )}

            {/* SVG Prayer Icons */}
            <div className="flex justify-center mb-3 mt-1 text-slate-400">
              <PrayerIcon type={key} active={isCurrentActive} />
            </div>

            {/* Prayer name */}
            <p
              className={`font-display text-[10px] tracking-[0.2em] uppercase font-bold mb-3 ${
                isCurrentActive ? "text-gold-light" : "text-slate-400"
              }`}
            >
              {LABELS[key]}
            </p>

            {/* Prayer Time */}
            <p
              className={`font-mono text-[28px] font-bold tracking-tighter leading-none mb-3.5 ${
                isCurrentActive
                  ? "text-white select-all drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
                  : "text-slate-200"
              }`}
            >
              {prayers[key]}
            </p>

            {/* Iqomah time indicator */}
            <div
              className="text-[9px] tracking-wide mt-2.5 pt-2.5 border-t border-white/5 select-none"
              style={{
                color: isCurrentActive
                  ? "rgba(212,175,55,0.7)"
                  : "rgba(148,163,184,0.4)",
              }}
            >
              Iqomah {addMinutesToTime(prayers[key], iqomah[key] ?? 10)}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── UNIQUE SVG PRAYER ICONS ──
function PrayerIcon({ type, active }) {
  const strokeColor = active ? "#d4af37" : "rgba(148,163,184,0.5)";
  const fillColor = active ? "rgba(212,175,55,0.15)" : "transparent";

  switch (type) {
    case "subuh": // Sunrise Fajr Icon
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v4M12 18H3M21 18h-3M4.22 10.22l2.83 2.83M19.78 10.22l-2.83 2.83" />
          <path d="M8 18a4 4 0 0 1 8 0" fill={fillColor} />
          <line x1="1" y1="22" x2="23" y2="22" />
        </svg>
      );
    case "dzuhur": // Noon Sun Icon
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" fill={fillColor} />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    case "ashar": // Afternoon Tilted Sun/Shadow Icon
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="9" r="4" fill={fillColor} />
          <path d="M22 22L13 13" strokeDasharray="2 2" />
          <path d="M9 2v2M2 9h2M4.05 4.05l1.42 1.42M13.95 13.95l1.41 1.41" />
          <line x1="1" y1="22" x2="23" y2="22" />
        </svg>
      );
    case "maghrib": // Sunset Icon
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 18a4 4 0 0 0 8 0H4a4 4 0 0 0 8 0z" fill={fillColor} />
          <path d="M12 10V2M5.22 5.22l1.42 1.42M18.78 5.22l-1.42 1.42" />
          <line x1="1" y1="22" x2="23" y2="22" />
        </svg>
      );
    case "isya": // Crescent Moon Icon
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z"
            fill={fillColor}
          />
          <path d="M19 3v4M21 5h-4" strokeWidth="1" />
        </svg>
      );
    default:
      return null;
  }
}
