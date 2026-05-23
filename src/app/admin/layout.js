import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-navy-950">
      {/* Sidebar */}
      <aside
        className="w-56 flex-shrink-0 border-r flex flex-col"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "#0B2447" }}
      >
        <div
          className="px-5 py-5 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p className="text-sm text-sky tracking-wider uppercase font-semibold">
            Admin Panel
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Monitor Sholat</p>
        </div>

        <nav className="flex-1 py-4 flex flex-col gap-0.5 px-2">
          {/* Dashboard */}
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-navy-700 hover:text-white transition-all duration-200"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
            Dashboard
          </Link>

          {/* Pengaturan */}
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-navy-700 hover:text-white transition-all duration-200"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
            Pengaturan
          </Link>

          {/* API & Lokasi */}
          <Link
            href="/admin/api-settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-navy-700 hover:text-white transition-all duration-200"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <ellipse cx="12" cy="12" rx="4" ry="9" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3.6" y1="7" x2="20.4" y2="7" />
              <line x1="3.6" y1="17" x2="20.4" y2="17" />
            </svg>
            API &amp; Lokasi
          </Link>

          {/* Iqomah */}
          <Link
            href="/admin/iqomah"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-navy-700 hover:text-white transition-all duration-200"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="13" r="9" />
              <path d="M12 8v5l3.5 2" />
              <path d="M9 2h6" />
            </svg>
            Iqomah
          </Link>

          {/* Pengumuman */}
          <Link
            href="/admin/announcements"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-navy-700 hover:text-white transition-all duration-200"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
            Pengumuman
          </Link>

          {/* Cuaca */}
          <Link
            href="/admin/weather"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-navy-700 hover:text-white transition-all duration-200"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 19a4.5 4.5 0 0 1 0-9h.5A5 5 0 0 1 17 13h.5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            Cuaca
          </Link>
        </nav>

        <div
          className="px-4 py-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-sky transition-colors"
          >
            ← Lihat Display
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
