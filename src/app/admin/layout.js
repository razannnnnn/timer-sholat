"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
  },
  {
    href: "/admin/settings",
    label: "Pengaturan",
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </>
    ),
  },
  {
    href: "/admin/api-settings",
    label: "API & Lokasi",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <line x1="3" y1="12" x2="21" y2="12" />
      </>
    ),
  },
  {
    href: "/admin/iqomah",
    label: "Iqomah",
    icon: (
      <>
        <circle cx="12" cy="13" r="9" />
        <path d="M12 8v5l3.5 2" />
        <path d="M9 2h6" />
      </>
    ),
  },
  {
    href: "/admin/announcements",
    label: "Pengumuman",
    icon: (
      <>
        <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" />
        <path d="M22 6l-10 7L2 6" />
      </>
    ),
  },
  {
    href: "/admin/weather",
    label: "Cuaca",
    icon: (
      <>
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 19a4.5 4.5 0 0 1 0-9h.5A5 5 0 0 1 17 13h.5a3.5 3.5 0 0 1 0 7H6" />
      </>
    ),
  },
];

function NavIcon({ children }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-navy-950">
      <aside
        className="w-[220px] flex-shrink-0 flex flex-col"
        style={{
          background: "#071525",
          borderRight: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Brand */}
        <div
          className="px-4 py-5 flex items-center gap-2.5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="w-8 h-8 rounded-[9px] flex items-center justify-center flex-shrink-0"
            style={{
              background: "rgba(0,174,239,0.15)",
              border: "1px solid rgba(0,174,239,0.25)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00aeef"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <p className="text-[12px] font-bold text-sky tracking-widest uppercase">
              Admin Panel
            </p>
            <p className="text-[10px] text-slate-700 mt-0.5">Monitor Sholat</p>
          </div>
        </div>

        <nav className="flex-1 px-2 py-3 flex flex-col gap-px">
          <p className="text-[9.5px] text-slate-800 uppercase tracking-widest font-semibold px-2.5 pt-2 pb-1.5">
            Menu
          </p>
          {NAV_ITEMS.map(({ href, label, icon }) => {
            const isActive = pathname === href; // ← di dalam map, bukan di luar
            return (
              <Link
                key={href}
                href={href}
                className={`group flex items-center gap-2.5 px-2.5 py-2.5 rounded-[10px] transition-all duration-150 ${
                  isActive
                    ? "bg-sky/10 text-white"
                    : "text-slate-600 hover:text-slate-300 hover:bg-white/[0.04]"
                }`}
              >
                <NavIcon>{icon}</NavIcon>
                <span className="text-[13px] font-medium">{label}</span>
                {isActive && (
                  <span className="ml-auto w-1 h-4 rounded-full bg-sky flex-shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className="px-2 py-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-[10px] transition-all hover:bg-white/[0.04] group"
          >
            <div
              className="w-[26px] h-[26px] rounded-[8px] flex items-center justify-center text-[10px] font-bold text-sky flex-shrink-0"
              style={{
                background: "rgba(0,174,239,0.12)",
                border: "1px solid rgba(0,174,239,0.2)",
              }}
            >
              N
            </div>
            <div className="min-w-0">
              <p className="text-[12px] text-slate-500 font-medium group-hover:text-slate-300 transition-colors">
                Admin
              </p>
              <p className="text-[10px] text-slate-800 group-hover:text-sky transition-colors mt-0.5">
                Lihat Display →
              </p>
            </div>
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
