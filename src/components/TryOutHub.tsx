"use client";

import { useState } from "react";
import CategoryCards from "@/components/CategoryCards";
import LimitSelect from "@/components/LimitSelect";

export default function TryOutHub() {
  const [limit, setLimit] = useState(8);
  return (
    <div className="space-y-8">
      <div className="text-sm text-slate-600">
        <span className="font-medium text-slate-500">Beranda</span>
        <span className="mx-2 text-slate-300">/</span>
        <span className="font-semibold text-slate-800">Try Out</span>
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Menu try out SKD
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Pilih jumlah soal per sesi, lalu mapel TWK, TIU, atau TKP. Sistem
          menilai jawaban di server.
        </p>
      </div>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-800">
          Pengaturan sesi
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Jumlah soal berlaku untuk satu kali mulai tes.
        </p>
        <div className="mt-5">
          <LimitSelect value={limit} onChange={setLimit} />
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-800">
          Pilih subtansi ujian
        </h2>
        <CategoryCards limit={limit} />
      </section>
    </div>
  );
}
