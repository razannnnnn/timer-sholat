"use client";
import { useState } from "react";
import AdminFormShell from "@/app/admin/AdminFormShell";

export default function SettingsPage() {
  const [form, setForm] = useState({
    mosqueName: "Masjid Al-Ikhlas",
    shortAddress: "Jl. Merdeka No. 1 · Blitar",
    timezone: "Asia/Jakarta",
  });

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  return (
    <AdminFormShell
      title="Pengaturan Masjid"
      desc="Informasi identitas masjid/musholla pada display publik."
    >
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
      <SaveButton />
    </AdminFormShell>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs text-slate-400 tracking-wider uppercase mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function SaveButton() {
  return (
    <button className="mt-2 px-6 py-2.5 rounded-xl bg-sky text-navy-950 font-semibold text-sm hover:brightness-110 transition-all">
      Simpan Perubahan
    </button>
  );
}
