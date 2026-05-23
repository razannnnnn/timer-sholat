"use client";
import { useState } from "react";

const MOCK = [
  { id: 1, text: "Mohon luruskan dan rapatkan shaf.", active: true },
  {
    id: 2,
    text: "Kajian rutin ba'da Maghrib setiap malam Jumat.",
    active: true,
  },
  {
    id: 3,
    text: "Penyaluran Zakat Maal Triwulan — Ahad, 24 Mei 2026.",
    active: false,
  },
];

export default function AnnouncementsPage() {
  const [list, setList] = useState(MOCK);
  const [draft, setDraft] = useState("");
  const [saved, setSaved] = useState(true);

  const toggle = (id) => {
    setList((l) =>
      l.map((a) => (a.id === id ? { ...a, active: !a.active } : a)),
    );
    setSaved(false);
  };
  const remove = (id) => {
    setList((l) => l.filter((a) => a.id !== id));
    setSaved(false);
  };
  const add = () => {
    if (!draft.trim()) return;
    setList((l) => [
      ...l,
      { id: Date.now(), text: draft.trim(), active: true },
    ]);
    setDraft("");
    setSaved(false);
  };
  const handleSave = () => setSaved(true);

  const activeCount = list.filter((a) => a.active).length;

  return (
    <div className="w-full">
      {/* ── HEADER ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Pengumuman
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Kelola running text yang tampil di display publik.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* ── KIRI — Tambah Pengumuman ── */}
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
              <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
          }
          title="Tambah Pengumuman"
          desc="Tulis teks baru untuk ditampilkan di running text."
        >
          <div className="flex flex-col gap-4">
            <Field label="Teks Pengumuman">
              <textarea
                className="admin-input resize-none"
                rows={4}
                placeholder="Tulis pengumuman baru..."
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  (e.preventDefault(), add())
                }
              />
            </Field>
            <p className="text-[11px] text-slate-600">
              Tekan Enter untuk tambah, Shift+Enter untuk baris baru.
            </p>
            <button
              onClick={add}
              className="self-start px-5 py-2.5 rounded-xl bg-sky text-navy-950 font-semibold text-sm hover:brightness-110 active:scale-[0.97] transition-all"
            >
              + Tambah Pengumuman
            </button>
          </div>
        </Shell>

        {/* ── KANAN — Daftar Pengumuman ── */}
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
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <circle cx="3" cy="6" r="1" />
              <circle cx="3" cy="12" r="1" />
              <circle cx="3" cy="18" r="1" />
            </svg>
          }
          title="Daftar Pengumuman"
          desc={`${activeCount} aktif dari ${list.length} total pengumuman.`}
          saved={saved}
        >
          <div className="flex flex-col gap-2">
            {list.length === 0 && (
              <p className="text-sm text-slate-600 py-4 text-center">
                Belum ada pengumuman.
              </p>
            )}
            {list.map((a) => (
              <div
                key={a.id}
                className="flex items-start gap-3 px-4 py-3.5 rounded-xl transition-all"
                style={{
                  background: a.active
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(255,255,255,0.02)",
                  border: `1px solid ${a.active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"}`,
                  opacity: a.active ? 1 : 0.5,
                }}
              >
                {/* Toggle dot */}
                <button
                  onClick={() => toggle(a.id)}
                  className="mt-0.5 w-4 h-4 rounded-full flex-shrink-0 border-2 transition-all"
                  style={{
                    background: a.active ? "#00aeef" : "transparent",
                    borderColor: a.active ? "#00aeef" : "rgba(255,255,255,0.2)",
                  }}
                />
                {/* Text */}
                <p
                  className={`flex-1 text-sm leading-relaxed ${a.active ? "text-slate-200" : "text-slate-500 line-through"}`}
                >
                  {a.text}
                </p>
                {/* Status badge */}
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-md flex-shrink-0 ${
                    a.active
                      ? "text-emerald-400 bg-emerald-400/10 border border-emerald-400/15"
                      : "text-slate-600 bg-white/5 border border-white/5"
                  }`}
                >
                  {a.active ? "Aktif" : "Nonaktif"}
                </span>
                {/* Delete */}
                <button
                  onClick={() => remove(a.id)}
                  className="text-slate-600 hover:text-red-400 transition-colors text-lg leading-none flex-shrink-0"
                >
                  ×
                </button>
              </div>
            ))}
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
          Simpan Urutan
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
