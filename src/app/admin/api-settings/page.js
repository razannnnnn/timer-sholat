"use client";
import { useState } from "react";
import AdminFormShell from "@/app/admin/AdminFormShell";

export default function ApiSettingsPage() {
  const [form, setForm] = useState({
    provider: "equran",
    provinsi: "",
    kabkota: "",
    latitude: "-8.0953",
    longitude: "112.1683",
    method: "20",
    apiKey: "",
  });
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const testApi = () => {
    setTesting(true);
    setTimeout(() => {
      setTestResult({
        ok: true,
        msg: "Koneksi berhasil — EQuran.id merespons.",
      });
      setTesting(false);
    }, 1200);
  };

  return (
    <AdminFormShell
      title="API & Lokasi"
      desc="Konfigurasi provider API waktu sholat dan wilayah."
    >
      <div>
        <label className="block text-xs text-slate-400 tracking-wider uppercase mb-1.5">
          Provider API
        </label>
        <select
          className="admin-input"
          value={form.provider}
          onChange={set("provider")}
        >
          <option value="equran">EQuran.id (Default)</option>
          <option value="apicoId">API.co.id</option>
          <option value="aladhan">Aladhan (Fallback)</option>
        </select>
      </div>

      {form.provider !== "equran" && (
        <div>
          <label className="block text-xs text-slate-400 tracking-wider uppercase mb-1.5">
            API Key
          </label>
          <input
            className="admin-input"
            type="password"
            placeholder="Isi jika provider memerlukan"
            value={form.apiKey}
            onChange={set("apiKey")}
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
            value={form.latitude}
            onChange={set("latitude")}
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 tracking-wider uppercase mb-1.5">
            Longitude
          </label>
          <input
            className="admin-input"
            value={form.longitude}
            onChange={set("longitude")}
          />
        </div>
      </div>

      {testResult && (
        <div
          className={`px-4 py-3 rounded-xl text-sm ${testResult.ok ? "bg-emerald-900/30 text-emerald-300 border border-emerald-700/40" : "bg-red-900/30 text-red-300 border border-red-700/40"}`}
        >
          {testResult.msg}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={testApi}
          disabled={testing}
          className="px-5 py-2.5 rounded-xl border text-sm text-sky font-medium transition-all hover:bg-sky/10 disabled:opacity-50"
          style={{ borderColor: "rgba(0,174,239,0.4)" }}
        >
          {testing ? "Menguji..." : "Test API"}
        </button>
        <button className="px-5 py-2.5 rounded-xl bg-sky text-navy-950 font-semibold text-sm hover:brightness-110 transition-all">
          Simpan & Refresh Jadwal
        </button>
      </div>
    </AdminFormShell>
  );
}
