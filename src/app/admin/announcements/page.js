"use client";
import { useState } from "react";
import AdminFormShell from "@/app/admin/AdminFormShell";

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

  const toggle = (id) =>
    setList((l) =>
      l.map((a) => (a.id === id ? { ...a, active: !a.active } : a)),
    );

  const remove = (id) => setList((l) => l.filter((a) => a.id !== id));

  const add = () => {
    if (!draft.trim()) return;
    setList((l) => [
      ...l,
      { id: Date.now(), text: draft.trim(), active: true },
    ]);
    setDraft("");
  };

  return (
    <AdminFormShell
      title="Pengumuman"
      desc="Kelola running text yang tampil di display publik."
    >
      {/* Add */}
      <div className="flex gap-3">
        <input
          className="admin-input flex-1"
          placeholder="Tulis pengumuman baru..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
        />
        <button
          onClick={add}
          className="px-5 py-2.5 rounded-xl bg-sky text-navy-950 font-semibold text-sm hover:brightness-110 transition-all whitespace-nowrap"
        >
          + Tambah
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2 mt-2">
        {list.map((a) => (
          <div
            key={a.id}
            className={`glass rounded-xl px-4 py-3 flex items-center gap-3 transition-all ${!a.active ? "opacity-50" : ""}`}
          >
            <button
              onClick={() => toggle(a.id)}
              className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors ${a.active ? "bg-sky border-sky" : "bg-transparent border-slate-600"}`}
            />
            <p className="flex-1 text-sm text-slate-200">{a.text}</p>
            <button
              onClick={() => remove(a.id)}
              className="text-slate-500 hover:text-red-400 transition-colors text-lg leading-none"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button className="px-6 py-2.5 rounded-xl bg-sky text-navy-950 font-semibold text-sm hover:brightness-110 transition-all">
        Simpan Urutan
      </button>
    </AdminFormShell>
  );
}
