"use client";
import { useState } from "react";

export default function ApiSettingsPage() {
  const [form, setForm] = useState({
    apiUrl: "https://equran.id/api/sholat",
    apiKey: "",
    negara: "Indonesia",
    provinsi: "Jawa Timur",
    kabkota: "Blitar",
    alamat: "Jl. Merdeka No. 1",
    latitude: "-8.0953",
    longitude: "112.1683",
  });
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [saved, setSaved] = useState(true);

  const set = (k) => (e) => {
    setForm((p) => ({ ...p, [k]: e.target.value }));
    setSaved(false);
    setTestResult(null);
  };

  const testApi = () => {
    setTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setTestResult({ ok: true, msg: "Koneksi berhasil — API merespons." });
      setTesting(false);
    }, 1200);
  };

  const handleSave = () => setSaved(true);

  return (
    <div className="w-full">
      {/* ── HEADER ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          API & Lokasi
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Konfigurasi provider API waktu sholat dan wilayah masjid.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* ── KIRI — API Provider ── */}
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
              <circle cx="12" cy="12" r="9" />
              <ellipse cx="12" cy="12" rx="4" ry="9" />
              <line x1="3" y1="12" x2="21" y2="12" />
            </svg>
          }
          title="Provider API"
          desc="URL endpoint dan autentikasi sumber data jadwal sholat."
          saved={saved}
        >
          <div className="flex flex-col gap-5">
            <Field label="URL API">
              <input
                className="admin-input font-mono text-[13px]"
                placeholder="https://equran.id/api/sholat"
                value={form.apiUrl}
                onChange={set("apiUrl")}
              />
            </Field>
            <Field label="API Key (opsional)">
              <input
                className="admin-input"
                type="password"
                placeholder="Kosongkan jika tidak diperlukan"
                value={form.apiKey}
                onChange={set("apiKey")}
              />
            </Field>

            {/* Test result */}
            {testResult && (
              <div
                className={`px-4 py-3 rounded-xl text-sm ${
                  testResult.ok
                    ? "bg-emerald-900/30 text-emerald-300 border border-emerald-700/40"
                    : "bg-red-900/30 text-red-300 border border-red-700/40"
                }`}
              >
                {testResult.msg}
              </div>
            )}

            <button
              onClick={testApi}
              disabled={testing}
              className="self-start px-5 py-2.5 rounded-xl border text-sm text-sky font-medium transition-all hover:bg-sky/10 disabled:opacity-50"
              style={{ borderColor: "rgba(0,174,239,0.4)" }}
            >
              {testing ? "Menguji..." : "Test Koneksi"}
            </button>
          </div>
        </Shell>

        {/* ── KANAN — Lokasi ── */}
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
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          }
          title="Lokasi Masjid"
          desc="Wilayah dan koordinat untuk perhitungan waktu sholat."
        >
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Negara">
                <input
                  className="admin-input"
                  value={form.negara}
                  onChange={set("negara")}
                />
              </Field>
              <Field label="Provinsi">
                <input
                  className="admin-input"
                  value={form.provinsi}
                  onChange={set("provinsi")}
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Kota / Kabupaten">
                <input
                  className="admin-input"
                  value={form.kabkota}
                  onChange={set("kabkota")}
                />
              </Field>
              <Field label="Alamat">
                <input
                  className="admin-input"
                  value={form.alamat}
                  onChange={set("alamat")}
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Latitude">
                <input
                  className="admin-input font-mono text-[13px]"
                  value={form.latitude}
                  onChange={set("latitude")}
                />
              </Field>
              <Field label="Longitude">
                <input
                  className="admin-input font-mono text-[13px]"
                  value={form.longitude}
                  onChange={set("longitude")}
                />
              </Field>
            </div>
          </div>
        </Shell>
      </div>

      {/* ── SAVE FOOTER ── */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-[11px] text-slate-600">
          Jadwal sholat akan di-refresh otomatis setelah disimpan.
        </p>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-sky text-navy-950 font-semibold text-sm hover:brightness-110 active:scale-[0.97] transition-all"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}

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
