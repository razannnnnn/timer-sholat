"use client";
import { motion } from "framer-motion";

export default function AdminFormShell({ title, desc, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6">
        <h1 className="font-display text-2xl text-white">{title}</h1>
        {desc && <p className="text-slate-400 text-sm mt-1">{desc}</p>}
      </div>
      <div className="glass rounded-2xl p-6 flex flex-col gap-5 max-w-2xl">
        {children}
      </div>
    </motion.div>
  );
}
