"use client";
import { useState } from "react";
import AdminFormShell from "@/app/admin/AdminFormShell";

const PRAYERS = [
  { key: "subuh", label: "Subuh", default: 10 },
  { key: "dzuhur", label: "Dzuhur", default: 10 },
  { key: "ashar", label: "Ashar", default: 10 },
  { key: "maghrib", label: "Maghrib", default: 5 },
  { key: "isya", label: "Isya'", default: 10 },
];

export default function IqomahPage() {
  const [vals, setVals] = useState(
    Object.fromEntries(PRAYERS.map((p) => [p.key, p.default])),
  );

  return (
    <AdminFormShell
      title="Durasi Iqomah"
      desc="Atur durasi iqomah (dalam menit) untuk setiap waktu sholat."
    >
      <div className="grid grid-cols-2 gap-4">
        {PRAYERS.map(({ key, label }) => (
          <div
            key={key}
            className="glass rounded-xl p-4 flex items-center justify-between"
          >
            <div>
              <p className="text-white font-medium">{label}</p>
              <p className="text-xs text-slate-400">
                {vals[key]} menit setelah adzan
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setVals((v) => ({ ...v, [key]: Math.max(1, v[key] - 1) }))
                }
                className="w-8 h-8 rounded-lg bg-navy-700 text-white flex items-center justify-center hover:bg-navy-600 transition-colors text-lg"
              >
                −
              </button>
              <span className="font-mono text-xl text-sky w-8 text-center font-semibold">
                {vals[key]}
              </span>
              <button
                onClick={() =>
                  setVals((v) => ({ ...v, [key]: Math.min(30, v[key] + 1) }))
                }
                className="w-8 h-8 rounded-lg bg-navy-700 text-white flex items-center justify-center hover:bg-navy-600 transition-colors text-lg"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="px-6 py-2.5 rounded-xl bg-sky text-navy-950 font-semibold text-sm hover:brightness-110 transition-all">
        Simpan Durasi Iqomah
      </button>
    </AdminFormShell>
  );
}
