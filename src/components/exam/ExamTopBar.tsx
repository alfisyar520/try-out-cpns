"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function formatElapsed(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

const bar =
  "fixed inset-x-0 top-0 z-30 border-b border-slate-700 bg-slate-900 " +
  "text-white shadow-lg";

const timerBox =
  "rounded-lg bg-slate-800 px-3 py-1.5 font-mono text-sm font-semibold " +
  "tabular-nums text-lime-300";

export default function ExamTopBar() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className={bar}>
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="rounded bg-lime-500 px-2 py-0.5 text-[10px] font-black text-slate-900">
            CAT
          </span>
          <span className="text-sm font-semibold text-slate-200">
            Simulasi try out
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Waktu berjalan</span>
            <span className={timerBox}>{formatElapsed(seconds)}</span>
          </div>
          <Link
            href="/try-out"
            className="rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
          >
            Keluar ke menu
          </Link>
        </div>
      </div>
    </header>
  );
}
