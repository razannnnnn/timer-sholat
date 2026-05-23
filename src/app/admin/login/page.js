"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: panggil signIn dari next-auth
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-radial-navy bg-ornament flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(0,174,239,0.15)",
              border: "1px solid rgba(0,174,239,0.3)",
            }}
          >
            <span className="text-2xl">🕌</span>
          </div>
          <h1 className="font-display text-2xl text-white">Admin Login</h1>
          <p className="text-slate-400 text-sm mt-1">Monitor Jadwal Sholat</p>
        </div>

        <div className="glass rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-slate-400 tracking-wider uppercase block mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white bg-navy-900
                           border border-white/10 focus:border-sky focus:outline-none transition-colors"
                placeholder="admin@masjid.id"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 tracking-wider uppercase block mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((p) => ({ ...p, password: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white bg-navy-900
                           border border-white/10 focus:border-sky focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-2.5 rounded-xl font-semibold text-sm text-navy-950 transition-all
                         bg-sky hover:brightness-110 disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
