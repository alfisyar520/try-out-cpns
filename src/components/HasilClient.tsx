"use client";

import Link from "next/link";
import { startTransition, useEffect, useState } from "react";
import HasilScored from "@/components/HasilScored";
import HistoryList from "@/components/HistoryList";
import type { AttemptSummary } from "@/lib/types";
import { readStoredResult } from "@/lib/hasil/read-stored-result";
import { hasilEmptyCtaClass } from "@/lib/ui/exam-link-styles";

export default function HasilClient() {
  const [data, setData] = useState<
    ReturnType<typeof readStoredResult> | undefined
  >(undefined);
  const [attempts, setAttempts] = useState<AttemptSummary[]>([]);

  useEffect(() => {
    startTransition(() => {
      setData(readStoredResult());
    });
    const run = async () => {
      const res = await fetch("/api/history");
      if (!res.ok) return;
      const body = (await res.json()) as { attempts?: AttemptSummary[] };
      setAttempts(body.attempts ?? []);
    };
    void run();
  }, []);

  if (data === undefined) {
    return (
      <p className="text-center text-sm text-slate-500 animate-pulse">
        Memuat data nilai…
      </p>
    );
  }

  if (data === null) {
    return (
      <div
        className={
          "rounded-xl border border-slate-200 bg-white p-8 " +
          "text-center shadow-sm"
        }
      >
        <p className="text-slate-600">Belum ada nilai tersimpan di sesi ini.</p>
        <Link className={`${hasilEmptyCtaClass} mt-6`} href="/try-out">
          Buka menu try out
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <HasilScored
        category={(data.category ?? "-").toUpperCase()}
        score={data.score}
        correct={data.correct}
        total={data.total}
      />
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          History pengerjaan
        </h2>
        <div className="mt-3">
          <HistoryList attempts={attempts} />
        </div>
      </section>
    </div>
  );
}
