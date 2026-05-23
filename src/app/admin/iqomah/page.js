"use client";
import { useState } from "react";

const PRAYERS = [
  {
    key: "subuh",
    label: "Subuh",
    icon: "M12 3v1M12 20v1M4.22 4.22l.7.7M19.07 19.07l.7.7M3 12h1M20 12h1M4.22 19.78l.7-.7M19.07 4.93l.7-.7",
    default: 10,
  },
  {
    key: "dzuhur",
    label: "Dzuhur",
    icon: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41",
    default: 10,
  },
  {
    key: "ashar",
    label: "Ashar",
    icon: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41",
    default: 10,
  },
  {
    key: "maghrib",
    label: "Maghrib",
    icon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
    default: 5,
  },
  {
    key: "isya",
    label: "Isya'",
    icon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
    default: 10,
  },
];

export default function IqomahPage() {
  const [vals, setVals] = useState(
    Object.fromEntries(PRAYERS.map((p) => [p.key, p.default])),
  );
  const [saved, setSaved] = useState(true);

  const inc = (key) => {
    setVals((v) => ({ ...v, [key]: Math.min(30, v[key] + 1) }));
    setSaved(false);
  };
  const dec = (key) => {
    setVals((v) => ({ ...v, [key]: Math.max(1, v[key] - 1) }));
    setSaved(false);
  };
  const handleSave = () => setSaved(true);

  return (
    <div className="w-full">
      {/* ── HEADER ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Durasi Iqomah
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Jeda waktu antara adzan dan iqomah untuk setiap sholat.
        </p>
      </div>

      {/* ── SHELL ── */}
      <div
        className="rounded-2xl border border-white/5 overflow-hidden"
        style={{ background: "rgba(11,28,51,0.45)" }}
      >
        {/* Shell Header */}
        <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "rgba(0,174,239,0.1)",
              border: "1px solid rgba(0,174,239,0.2)",
            }}
          >
            <svg
              className="w-[17px] h-[17px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00aeef"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="13" r="9" />
              <path d="M12 8v5l3.5 2" />
              <path d="M9 2h6" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Durasi Iqomah</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Atur jeda adzan ke iqomah (menit) untuk setiap waktu sholat.
            </p>
          </div>
          {saved && (
            <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/15 px-2 py-1 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Tersimpan
            </span>
          )}
        </div>

        {/* Prayer Rows */}
        <div className="divide-y divide-white/[0.04]">
          {PRAYERS.map(({ key, label, icon }) => (
            <div key={key} className="px-5 py-4 flex items-center gap-4">
              {/* Icon */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(0,174,239,0.06)",
                  border: "1px solid rgba(0,174,239,0.12)",
                }}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00aeef"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={icon} />
                </svg>
              </div>

              {/* Label */}
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-200">{label}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Iqomah pukul +{vals[key]} menit setelah adzan
                </p>
              </div>

              {/* Stepper */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => dec(key)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 text-lg font-light transition-all hover:bg-white/5 active:scale-95"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  −
                </button>
                <span className="font-mono text-lg text-sky font-semibold w-8 text-center tabular-nums">
                  {vals[key]}
                </span>
                <button
                  onClick={() => inc(key)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 text-lg font-light transition-all hover:bg-white/5 active:scale-95"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  +
                </button>
              </div>

              {/* Menit badge */}
              <span className="text-[11px] text-slate-500 bg-white/5 px-2 py-0.5 rounded-md font-mono w-14 text-center">
                {vals[key]} mnt
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SAVE FOOTER ── */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-[11px] text-slate-600">
          Perubahan langsung diterapkan ke display publik.
        </p>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-sky text-navy-950 font-semibold text-sm hover:brightness-110 active:scale-[0.97] transition-all"
        >
          Simpan Durasi Iqomah
        </button>
      </div>
    </div>
  );
}
