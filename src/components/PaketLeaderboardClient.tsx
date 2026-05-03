"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { PaketLeaderboardEntry } from "@/lib/types";
import { PACKAGE_VARIANT_IDS } from "@/lib/quiz/package-targets";

function formatShort(iso: string) {
  return new Date(iso).toLocaleString("id-ID", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

const pillBase =
  "min-h-10 rounded-lg border px-3 text-sm font-bold transition " +
  "focus-visible:outline focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-lime-600";

const pillOn = "border-lime-600 bg-lime-500 text-slate-900 shadow-sm";
const pillOff =
  "border-slate-200 bg-white text-slate-700 hover:border-slate-300";

export default function PaketLeaderboardClient() {
  const [variant, setVariant] = useState(1);
  const [entries, setEntries] = useState<PaketLeaderboardEntry[]>([]);
  const [busy, setBusy] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async (v: number) => {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch(`/api/leaderboard/paket?variant=${v}`);
      if (!res.ok) throw new Error("fail");
      const body = (await res.json()) as { entries?: PaketLeaderboardEntry[] };
      setEntries(body.entries ?? []);
    } catch {
      setErr("Gagal memuat peringkat.");
      setEntries([]);
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    void load(variant);
  }, [load, variant]);

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">
        Peringkat memakai{" "}
        <strong className="text-slate-800">skor tertinggi</strong> tiap akun
        pada paket gabungan (TWK+TIU+TKP) per varian soal.
      </p>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-slate-600">
          Varian paket
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {PACKAGE_VARIANT_IDS.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVariant(v)}
              className={`${pillBase} ${v === variant ? pillOn : pillOff}`}
            >
              Paket {v}
            </button>
          ))}
        </div>
      </div>
      {err && <p className="text-sm font-semibold text-red-700">{err}</p>}
      {busy ? (
        <p className="animate-pulse text-sm text-slate-500">Memuat…</p>
      ) : entries.length === 0 ? (
        <p className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          Belum ada data peringkat untuk paket {variant}. Kerjakan tes paket
          dulu, lalu kembali ke halaman ini.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-3 py-2 text-left">Peringkat</th>
                <th className="px-3 py-2 text-left">Nama</th>
                <th className="px-3 py-2 text-left">Skor</th>
                <th className="px-3 py-2 text-left">Benar</th>
                <th className="px-3 py-2 text-left">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((row) => (
                <tr
                  key={`${row.userId}-${row.createdAt}`}
                  className={
                    "border-t border-slate-200 " +
                    (row.isYou ? "bg-lime-50" : "bg-white")
                  }
                >
                  <td className="px-3 py-2 font-semibold">{row.rank}</td>
                  <td className="px-3 py-2">
                    {row.name}
                    {row.isYou ? (
                      <span className="ml-2 text-xs font-bold text-lime-800">
                        (Anda)
                      </span>
                    ) : null}
                  </td>
                  <td className="px-3 py-2 font-semibold">{row.score}</td>
                  <td className="px-3 py-2">
                    {row.correct}/{row.total}
                  </td>
                  <td className="px-3 py-2 text-slate-600">
                    {formatShort(row.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="text-xs text-slate-500">
        Ingin naik peringkat?{" "}
        <Link className="font-semibold text-lime-800 underline" href="/try-out">
          Mulai try out paket
        </Link>
        .
      </p>
    </div>
  );
}
