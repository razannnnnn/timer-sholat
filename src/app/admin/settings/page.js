"use client";
import { useState } from "react";

export default function SettingsPage() {
  const [form, setForm] = useState({
    mosqueName: "Masjid Al-Ikhlas",
    shortAddress: "Jl. Merdeka No. 1 · Blitar",
    timezone: "Asia/Jakarta",
  });
  const [display, setDisplay] = useState({
    showHijri: true,
    showWeather: true,
    showQibla: false,
  });
  const [saved, setSaved] = useState(true);

  const set = (key) => (e) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
    setSaved(false);
  };
  const toggle = (key) => () => {
    setDisplay((p) => ({ ...p, [key]: !p[key] }));
    setSaved(false);
  };
  const handleSave = () => setSaved(true);

  return (
    <div className="w-full">
      {/* ── HEADER ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Pengaturan Masjid
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Masjid Al-Ikhlas · Jl. Merdeka No. 1
        </p>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* ── KOLOM KIRI (3/5) — Identitas ── */}
        <div className="col-span-3 flex flex-col gap-6">
          <Shell
            icon={
              <svg
                className="w-[17px] h-[17px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00aeef"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            }
            title="Identitas Masjid"
            desc="Nama dan lokasi yang ditampilkan di display publik."
            saved={saved}
          >
            <div className="flex flex-col gap-5">
              <Field label="Nama Masjid / Musholla">
                <input
                  className="admin-input"
                  value={form.mosqueName}
                  onChange={set("mosqueName")}
                />
              </Field>
              <Field label="Alamat Singkat">
                <input
                  className="admin-input"
                  value={form.shortAddress}
                  onChange={set("shortAddress")}
                />
              </Field>
              <Field label="Timezone">
                <select
                  className="admin-input"
                  value={form.timezone}
                  onChange={set("timezone")}
                >
                  <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                  <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                  <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                </select>
              </Field>
            </div>
          </Shell>
        </div>

        {/* ── KOLOM KANAN (2/5) — Tampilan Display ── */}
        <div className="col-span-2 flex flex-col gap-6">
          <Shell
            icon={
              <svg
                className="w-[17px] h-[17px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00aeef"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            }
            title="Tampilan Display"
            desc="Komponen yang muncul di monitor sholat."
          >
            <div className="flex flex-col divide-y divide-white/[0.04]">
              <Toggle
                label="Tanggal Hijriyah"
                desc="Tampilkan kalender Hijriyah"
                checked={display.showHijri}
                onChange={toggle("showHijri")}
              />
              <Toggle
                label="Widget Cuaca"
                desc="Suhu & kelembapan realtime"
                checked={display.showWeather}
                onChange={toggle("showWeather")}
              />
              <Toggle
                label="Arah Kiblat"
                desc="Kompas arah kiblat"
                checked={display.showQibla}
                onChange={toggle("showQibla")}
              />
            </div>
          </Shell>
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
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}

// ── Shell wrapper ──
function Shell({ icon, title, desc, saved, children }) {
  return (
    <div
      className="rounded-2xl border border-white/5 overflow-hidden"
      style={{ background: "rgba(11,28,51,0.45)" }}
    >
      <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "rgba(0,174,239,0.1)",
            border: "1px solid rgba(0,174,239,0.2)",
          }}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">{desc}</p>
        </div>
        {saved !== undefined && saved && (
          <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/15 px-2 py-1 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Tersimpan
          </span>
        )}
      </div>
      <div className="px-5 py-5">{children}</div>
    </div>
  );
}

// ── Field ──
function Field({ label, children }) {
  return (
    <div>
      <label className="block text-[10.5px] text-slate-500 tracking-wider uppercase font-medium mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

// ── Toggle row ──
function Toggle({ label, desc, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-3.5 gap-4">
      <div>
        <p className="text-sm text-slate-200 font-medium">{label}</p>
        <p className="text-[11px] text-slate-500 mt-0.5">{desc}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative w-9 h-5 rounded-full flex-shrink-0 transition-colors duration-200 ${
          checked ? "bg-sky" : "bg-white/10"
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${
            checked ? "left-[18px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
