"use client";
import { useState } from "react";

export default function WeatherPage() {
  const [cfg, setCfg] = useState({
    enabled: true,
    provider: "openmeteo",
    apiKey: "",
    latitude: "-8.0953",
    longitude: "112.1683",
    showTemp: true,
    showHumid: true,
    showQibla: true,
    unit: "C",
  });
  const [saved, setSaved] = useState(true);

  const set = (k) => (v) => {
    setCfg((p) => ({ ...p, [k]: v }));
    setSaved(false);
  };
  const setE = (k) => (e) => set(k)(e.target.value);
  const handleSave = () => setSaved(true);

  return (
    <div className="w-full">
      {/* ── HEADER ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Widget Cuaca
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Konfigurasi tampilan cuaca dan arah kiblat pada display publik.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* ── KIRI — Provider & Koordinat ── */}
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
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 19a4.5 4.5 0 0 1 0-9h.5A5 5 0 0 1 17 13h.5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          }
          title="Provider Cuaca"
          desc="Sumber data cuaca dan koordinat lokasi."
          saved={saved}
        >
          <div className="flex flex-col gap-5">
            {/* Enable toggle */}
            <div
              className="flex items-center justify-between p-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div>
                <p className="text-sm text-slate-200 font-medium">
                  Aktifkan Widget Cuaca
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Tampilkan cuaca di display publik
                </p>
              </div>
              <Toggle
                checked={cfg.enabled}
                onChange={() => set("enabled")(!cfg.enabled)}
              />
            </div>

            {cfg.enabled && (
              <>
                <Field label="Provider">
                  <select
                    className="admin-input"
                    value={cfg.provider}
                    onChange={setE("provider")}
                  >
                    <option value="openmeteo">
                      Open-Meteo (Gratis, tanpa API key)
                    </option>
                    <option value="openweathermap">OpenWeatherMap</option>
                  </select>
                </Field>

                {cfg.provider === "openweathermap" && (
                  <Field label="API Key">
                    <input
                      className="admin-input"
                      type="password"
                      value={cfg.apiKey}
                      onChange={setE("apiKey")}
                      placeholder="OWM API Key"
                    />
                  </Field>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Latitude">
                    <input
                      className="admin-input font-mono text-[13px]"
                      value={cfg.latitude}
                      onChange={setE("latitude")}
                    />
                  </Field>
                  <Field label="Longitude">
                    <input
                      className="admin-input font-mono text-[13px]"
                      value={cfg.longitude}
                      onChange={setE("longitude")}
                    />
                  </Field>
                </div>
              </>
            )}
          </div>
        </Shell>

        {/* ── KANAN — Tampilan & Satuan ── */}
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
          title="Tampilan Widget"
          desc="Komponen yang ditampilkan dan satuan suhu."
        >
          <div className="flex flex-col gap-5">
            {/* Toggle rows */}
            <div
              className="rounded-xl overflow-hidden divide-y divide-white/[0.04]"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <ToggleRow
                label="Tampilkan Suhu"
                desc="Suhu udara saat ini"
                checked={cfg.showTemp}
                onChange={() => set("showTemp")(!cfg.showTemp)}
              />
              <ToggleRow
                label="Tampilkan Kelembapan"
                desc="Persentase kelembapan udara"
                checked={cfg.showHumid}
                onChange={() => set("showHumid")(!cfg.showHumid)}
              />
              <ToggleRow
                label="Tampilkan Arah Kiblat"
                desc="Kompas arah kiblat"
                checked={cfg.showQibla}
                onChange={() => set("showQibla")(!cfg.showQibla)}
              />
            </div>

            {/* Satuan suhu */}
            <Field label="Satuan Suhu">
              <div className="flex gap-2">
                {["C", "F"].map((u) => (
                  <button
                    key={u}
                    onClick={() => set("unit")(u)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95"
                    style={
                      cfg.unit === u
                        ? { background: "#00aeef", color: "#050d18" }
                        : {
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "#94a3b8",
                          }
                    }
                  >
                    °{u}
                  </button>
                ))}
              </div>
            </Field>
          </div>
        </Shell>
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
          Simpan Pengaturan Cuaca
        </button>
      </div>
    </div>
  );
}

// ── Shell ──
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
        {saved && (
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

// ── Toggle (knob only) ──
function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className="relative w-9 h-5 rounded-full flex-shrink-0 transition-colors duration-200"
      style={{ background: checked ? "#00aeef" : "rgba(255,255,255,0.1)" }}
    >
      <span
        className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200"
        style={{ left: checked ? "18px" : "2px" }}
      />
    </button>
  );
}

// ── Toggle Row ──
function ToggleRow({ label, desc, checked, onChange }) {
  return (
    <div className="px-4 py-3.5 flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-slate-200 font-medium">{label}</p>
        <p className="text-[11px] text-slate-500 mt-0.5">{desc}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}
