"use client";
import { motion } from "framer-motion";
import Link from "next/link";

// ── Mock data (would come from API/DB in production) ──
const PRAYER_TIMES = {
  subuh: "04:32",
  dzuhur: "11:54",
  ashar: "15:18",
  maghrib: "17:51",
  isya: "19:04",
};

const IQOMAH = {
  subuh: 10,
  dzuhur: 10,
  ashar: 10,
  maghrib: 5,
  isya: 10,
};

const ANNOUNCEMENTS = [
  { text: "Mohon luruskan dan rapatkan shaf.", active: true },
  { text: "Kajian rutin ba'da Maghrib setiap malam Jumat.", active: true },
  { text: "Penyaluran Zakat Maal Triwulan — Ahad, 24 Mei 2026.", active: false },
];

// ── Helpers ──
function addMinutes(time, min) {
  const [h, m] = time.split(":").map(Number);
  const d = new Date(2000, 0, 1, h, m + min);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

const PRAYER_LABELS = {
  subuh: "Subuh",
  dzuhur: "Dzuhur",
  ashar: "Ashar",
  maghrib: "Maghrib",
  isya: "Isya",
};

// ── Reusable Stat Card ──
function StatCard({ icon, label, value, sub, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="rounded-2xl p-5 border border-white/5 flex items-start gap-4"
      style={{ background: "rgba(11,28,51,0.5)" }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium mb-1">
          {label}
        </p>
        <p className="text-xl font-semibold text-white leading-none">{value}</p>
        {sub && (
          <p className="text-[11px] text-slate-500 mt-1.5">{sub}</p>
        )}
      </div>
    </motion.div>
  );
}

// ── Quick Action Link ──
function QuickAction({ href, icon, label, desc, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
    >
      <Link
        href={href}
        className="group rounded-xl p-4 border border-white/5 flex items-center gap-3.5 transition-all duration-300 hover:border-sky/30 hover:bg-[rgba(0,174,239,0.04)]"
        style={{ background: "rgba(11,28,51,0.35)" }}
      >
        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-sky/10 border border-sky/20 text-sky group-hover:bg-sky/15 transition-colors flex-shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-sm text-slate-200 font-medium">{label}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">{desc}</p>
        </div>
        <svg className="w-4 h-4 text-slate-600 ml-auto flex-shrink-0 group-hover:text-sky transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
      </Link>
    </motion.div>
  );
}

// ══════════════════════════════════════
//  ADMIN DASHBOARD
// ══════════════════════════════════════
export default function AdminDashboard() {
  const activeAnnouncements = ANNOUNCEMENTS.filter((a) => a.active).length;
  const today = new Date();
  const dateStr = today.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-[1100px]">
      {/* ── HEADER ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Masjid Al-Ikhlas · Jl. Merdeka No. 1 — {dateStr}
        </p>
      </div>

      {/* ── TOP STAT CARDS ── */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard
          delay={0}
          color="#00AEEF"
          label="Provider API"
          value="EQuran.id"
          sub="Sinkronisasi terakhir hari ini"
          icon={
            <svg className="w-5 h-5 text-sky" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><line x1="3" y1="12" x2="21" y2="12" />
            </svg>
          }
        />
        <StatCard
          delay={0.06}
          color="#F5C542"
          label="Cache Jadwal"
          value="Mei 2026"
          sub="Berlaku s/d 31 Mei 2026"
          icon={
            <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          }
        />
        <StatCard
          delay={0.12}
          color="#10B981"
          label="Pengumuman"
          value={`${activeAnnouncements} Aktif`}
          sub={`dari ${ANNOUNCEMENTS.length} total pengumuman`}
          icon={
            <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" /><path d="M22 6l-10 7L2 6" />
            </svg>
          }
        />
        <StatCard
          delay={0.18}
          color="#00AEEF"
          label="Widget Cuaca"
          value="Aktif"
          sub="Suhu 29°C · Kelembapan 68%"
          icon={
            <svg className="w-5 h-5 text-sky" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="7" r="4" /><path d="M5.5 19a4.5 4.5 0 0 1 0-9h.5A5 5 0 0 1 17 13h.5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          }
        />
      </div>

      {/* ── MAIN CONTENT GRID: Prayer Table + Announcements ── */}
      <div className="grid grid-cols-5 gap-6 mb-8">
        
        {/* Prayer Times Table — 3 cols */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.4 }}
          className="col-span-3 rounded-2xl border border-white/5 overflow-hidden"
          style={{ background: "rgba(11,28,51,0.45)" }}
        >
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">Jadwal Sholat Hari Ini</h2>
              <p className="text-[11px] text-slate-500 mt-0.5">Sumber: EQuran.id</p>
            </div>
            <Link
              href="/admin/api-settings"
              className="text-[11px] text-sky hover:text-sky/80 transition-colors font-medium"
            >
              Ubah Sumber →
            </Link>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-[11px] text-slate-500 uppercase tracking-wider font-medium text-left px-5 py-2.5">Waktu Sholat</th>
                <th className="text-[11px] text-slate-500 uppercase tracking-wider font-medium text-left px-5 py-2.5">Adzan</th>
                <th className="text-[11px] text-slate-500 uppercase tracking-wider font-medium text-left px-5 py-2.5">Iqomah</th>
                <th className="text-[11px] text-slate-500 uppercase tracking-wider font-medium text-left px-5 py-2.5">Durasi</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(PRAYER_TIMES).map(([key, time], i) => {
                const iqMin = IQOMAH[key];
                return (
                  <tr
                    key={key}
                    className={`border-b border-white/[0.03] transition-colors hover:bg-white/[0.02] ${i === Object.keys(PRAYER_TIMES).length - 1 ? 'border-none' : ''}`}
                  >
                    <td className="px-5 py-3 text-sm text-slate-200 font-medium">{PRAYER_LABELS[key]}</td>
                    <td className="px-5 py-3 text-sm text-white font-mono">{time}</td>
                    <td className="px-5 py-3 text-sm text-white font-mono">{addMinutes(time, iqMin)}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-white/5 px-2 py-0.5 rounded-md font-mono">
                        +{iqMin} mnt
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>

        {/* Announcements Panel — 2 cols */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="col-span-2 rounded-2xl border border-white/5 overflow-hidden flex flex-col"
          style={{ background: "rgba(11,28,51,0.45)" }}
        >
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Pengumuman Aktif</h2>
            <Link
              href="/admin/announcements"
              className="text-[11px] text-sky hover:text-sky/80 transition-colors font-medium"
            >
              Kelola →
            </Link>
          </div>
          <div className="flex-1 divide-y divide-white/[0.04]">
            {ANNOUNCEMENTS.map((ann, i) => (
              <div key={i} className="px-5 py-3.5 flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${ann.active ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                <div className="min-w-0">
                  <p className={`text-sm leading-relaxed ${ann.active ? 'text-slate-200' : 'text-slate-500 line-through'}`}>
                    {ann.text}
                  </p>
                  <span className={`text-[10px] font-medium mt-1 inline-block ${ann.active ? 'text-emerald-400' : 'text-slate-600'}`}>
                    {ann.active ? "Ditampilkan" : "Nonaktif"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── QUICK ACTIONS ── */}
      <div className="mb-6">
        <h2 className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-3">
          Pengaturan Cepat
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <QuickAction
            delay={0.34}
            href="/admin/settings"
            label="Pengaturan Masjid"
            desc="Nama, alamat, timezone"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" /><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            }
          />
          <QuickAction
            delay={0.38}
            href="/admin/api-settings"
            label="API & Lokasi"
            desc="Sumber data jadwal sholat"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><line x1="3" y1="12" x2="21" y2="12" />
              </svg>
            }
          />
          <QuickAction
            delay={0.42}
            href="/admin/iqomah"
            label="Durasi Iqomah"
            desc="Atur jeda adzan ke iqomah"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="13" r="9" /><path d="M12 8v5l3.5 2" /><path d="M9 2h6" />
              </svg>
            }
          />
          <QuickAction
            delay={0.46}
            href="/admin/announcements"
            label="Pengumuman"
            desc="Kelola teks berjalan"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" /><path d="M22 6l-10 7L2 6" />
              </svg>
            }
          />
          <QuickAction
            delay={0.5}
            href="/admin/weather"
            label="Widget Cuaca"
            desc="Suhu, kelembapan, kiblat"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="7" r="4" /><path d="M5.5 19a4.5 4.5 0 0 1 0-9h.5A5 5 0 0 1 17 13h.5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            }
          />
          <QuickAction
            delay={0.54}
            href="/"
            label="Lihat Display"
            desc="Buka tampilan monitor sholat"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}
