"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  name: string;
  email: string;
};

function getInitial(name: string) {
  return (name.trim().charAt(0) || "U").toUpperCase();
}

export default function UserAccountMenu({ name, email }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const initial = getInitial(name);

  useEffect(() => {
    function onOutside(event: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(event.target as Node)) setOpen(false);
    }
    window.addEventListener("mousedown", onOutside);
    return () => window.removeEventListener("mousedown", onOutside);
  }, []);

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full px-1 py-1 transition hover:bg-white/10"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-300 text-sm font-black text-slate-900">
          {initial}
        </span>
      </button>
      {open && (
        <div className="absolute right-0 z-30 mt-2 w-[22rem] rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-2xl">
          <p className="text-xs font-semibold text-slate-500">
            Saat ini menggunakan
          </p>
          <div className="mt-3 rounded-2xl border-2 border-lime-400 p-3">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lime-300 text-xl font-black text-slate-900">
                {initial}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xl font-bold leading-tight">{name}</p>
                <p className="truncate text-xs text-slate-600">{email}</p>
              </div>
            </div>
          </div>
          <form action="/api/auth/logout" method="post" className="mt-2">
            <button
              type="submit"
              className="w-full rounded-xl px-3 py-2 text-left text-base font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Keluar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
