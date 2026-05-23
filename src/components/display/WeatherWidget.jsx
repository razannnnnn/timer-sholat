"use client";
import { motion } from "framer-motion";

export default function WeatherWidget({ data }) {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="flex-shrink-0 flex items-center gap-3.5 px-4 h-full border-l"
      style={{ borderColor: "rgba(212,175,55,0.15)" }}
    >
      <Stat 
        icon={
          <svg className="w-4 h-4 text-[#ff7b54]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
          </svg>
        } 
        label="Suhu" 
        value={`${data.temp}°C`} 
      />
      
      <Stat 
        icon={
          <svg className="w-4 h-4 text-sky" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z" />
          </svg>
        } 
        label="Kelembapan" 
        value={`${data.humidity}%`} 
      />
      
      <Stat 
        icon={
          <div className="relative w-4 h-4">
            <svg className="w-full h-full text-gold animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="rgba(212,175,55,0.2)" />
            </svg>
          </div>
        } 
        label="Arah Kiblat" 
        value={data.qibla} 
      />
    </motion.div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div 
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/5 shadow-inner"
      style={{
        background: "rgba(11, 28, 51, 0.25)",
      }}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="text-left leading-none">
        <p className="text-[8px] text-slate-500 uppercase tracking-widest font-semibold">
          {label}
        </p>
        <p className="text-[11px] font-mono font-bold text-slate-200 mt-0.5">
          {value}
        </p>
      </div>
    </div>
  );
}
