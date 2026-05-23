"use client";
import { useState } from "react";
import AdminFormShell from "@/app/admin/AdminFormShell";

function WeatherToggle({ checked, label, onToggle }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-slate-300">{label}</span>
      <button
        onClick={onToggle}
        className={`w-10 h-5 rounded-full relative transition-colors ${checked ? "bg-sky" : "bg-navy-700"}`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`}
        />
      </button>
    </div>
  );
}

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

  const set = (k) => (v) => setCfg((p) => ({ ...p, [k]: v }));
  const setE = (k) => (e) => set(k)(e.target.value);
  return (
    <AdminFormShell
      title="Widget Cuaca"
      desc="Konfigurasi tampilan cuaca dan arah kiblat pada display publik."
    >
      <WeatherToggle
        checked={cfg.enabled}
        label="Aktifkan Widget Cuaca"
        onToggle={() => set("enabled")(!cfg.enabled)}
      />

      {cfg.enabled && (
        <>
          <div>
            <label className="block text-xs text-slate-400 tracking-wider uppercase mb-1.5">
              Provider Cuaca
            </label>
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
          </div>

          {cfg.provider === "openweathermap" && (
            <div>
              <label className="block text-xs text-slate-400 tracking-wider uppercase mb-1.5">
                API Key
              </label>
              <input
                className="admin-input"
                type="password"
                value={cfg.apiKey}
                onChange={setE("apiKey")}
                placeholder="OWM API Key"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 tracking-wider uppercase mb-1.5">
                Latitude
              </label>
              <input
                className="admin-input"
                value={cfg.latitude}
                onChange={setE("latitude")}
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 tracking-wider uppercase mb-1.5">
                Longitude
              </label>
              <input
                className="admin-input"
                value={cfg.longitude}
                onChange={setE("longitude")}
              />
            </div>
          </div>

          <div className="glass rounded-xl p-4 flex flex-col gap-1 divide-y divide-white/5">
            <WeatherToggle
              checked={cfg.showTemp}
              label="Tampilkan Suhu"
              onToggle={() => set("showTemp")(!cfg.showTemp)}
            />
            <WeatherToggle
              checked={cfg.showHumid}
              label="Tampilkan Kelembapan"
              onToggle={() => set("showHumid")(!cfg.showHumid)}
            />
            <WeatherToggle
              checked={cfg.showQibla}
              label="Tampilkan Arah Kiblat"
              onToggle={() => set("showQibla")(!cfg.showQibla)}
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 tracking-wider uppercase mb-1.5">
              Satuan Suhu
            </label>
            <div className="flex gap-2">
              {["C", "F"].map((u) => (
                <button
                  key={u}
                  onClick={() => set("unit")(u)}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${cfg.unit === u ? "bg-sky text-navy-950" : "glass text-slate-300 hover:text-white"}`}
                >
                  °{u}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <button className="px-6 py-2.5 rounded-xl bg-sky text-navy-950 font-semibold text-sm hover:brightness-110 transition-all">
        Simpan Pengaturan Cuaca
      </button>
    </AdminFormShell>
  );
}
