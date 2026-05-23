"use client";
import { motion } from "framer-motion";
import { formatCountdown } from "@/lib/prayerUtils";

export default function IqomahBanner({ status }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="mx-10 mb-5 rounded-2xl overflow-hidden border"
      style={{
        background:
          "linear-gradient(90deg, rgba(212,175,55,0.18) 0%, rgba(3,13,26,0.5) 100%)",
        borderColor: "rgba(212,175,55,0.4)",
        boxShadow: "0 10px 30px rgba(212,175,55,0.1)",
      }}
    >
      <div className="flex items-center justify-between px-7 py-3.5">
        <div className="flex items-center gap-3">
          {/* Animated Alarm Icon */}
          <div className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gold"></span>
          </div>
          <div>
            <p className="text-gold-light font-display text-sm tracking-[0.25em] font-bold uppercase">
              IQOMAH {status.label.toUpperCase()}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
              Bersiaplah untuk mendirikan shalat berjamaah
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-300 font-mono">Iqomah dimulai dalam</span>
          <p
            className="font-mono text-3xl font-bold text-gold select-none"
            style={{ textShadow: "0 0 25px rgba(212,175,55,0.7)" }}
          >
            {formatCountdown(status.countdown, false)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
