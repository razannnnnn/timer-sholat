"use client";
import { motion } from "framer-motion";

export default function DigitalClock({ now }) {
  const pad = (n) => String(n).padStart(2, "0");
  const hh = pad(now.getHours());
  const mm = pad(now.getMinutes());
  const ss = pad(now.getSeconds());

  // Calculate percentage of the current minute
  const progressPercent = (now.getSeconds() / 60) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-5 relative w-full"
    >
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-glow" />
        <p className="text-[10px] tracking-[0.35em] text-slate-400 uppercase font-display font-medium">
          Waktu Sekarang
        </p>
        <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-glow" />
      </div>

      {/* Clock digits */}
      <div className="flex items-baseline justify-center leading-none select-none">
        <div className="flex items-center">
          <span
            className="font-mono font-bold text-[84px] text-white leading-none tracking-tight"
            style={{ textShadow: "0 0 45px rgba(212,175,55,0.3)" }}
          >
            {hh}
          </span>
          {/* Pulsing Colon */}
          <span 
            className="font-mono font-bold text-[78px] text-gold mx-1 leading-none select-none animate-pulse-glow"
            style={{ textShadow: "0 0 25px rgba(212,175,55,0.6)" }}
          >
            :
          </span>
          <span
            className="font-mono font-bold text-[84px] text-white leading-none tracking-tight"
            style={{ textShadow: "0 0 45px rgba(212,175,55,0.3)" }}
          >
            {mm}
          </span>
        </div>
        
        {/* Seconds */}
        <span 
          className="font-mono text-3xl text-sky font-semibold ml-2 select-none border-l border-white/10 pl-2"
          style={{ textShadow: "0 0 15px rgba(0,174,239,0.4)" }}
        >
          {ss}
        </span>
      </div>

      {/* Seconds Progress Bar */}
      <div className="w-[80%] max-w-[320px] mt-5 px-1">
        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5 relative">
          <div 
            className="h-full bg-gradient-to-r from-sky via-gold to-gold-light rounded-full transition-all duration-1000 ease-linear shadow-[0_0_8px_rgba(212,175,55,0.5)]" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[8px] text-slate-500 font-mono mt-1 tracking-wider">
          <span>0s</span>
          <span>15s</span>
          <span>30s</span>
          <span>45s</span>
          <span>60s</span>
        </div>
      </div>

      {/* Quote to fill empty space with spiritual beauty */}
      <div className="mt-8 text-center px-6 w-full max-w-[360px]">
        <p className="font-arabic text-base text-gold-light opacity-90 leading-relaxed mb-2 tracking-wide" dir="rtl">
          إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا
        </p>
        <p className="text-[10px] text-slate-300 italic leading-relaxed font-light font-body">
          "Sesungguhnya shalat memiliki waktu yang telah ditetapkan bagi orang-orang yang beriman."
        </p>
        <p className="text-[9px] text-slate-500 font-mono tracking-widest mt-1 uppercase">
          — QS. An-Nisa: 103 —
        </p>
      </div>
    </motion.div>
  );
}
