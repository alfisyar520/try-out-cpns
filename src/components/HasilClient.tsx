"use client";

import Link from "next/link";
import { startTransition, useEffect, useState } from "react";
import HasilScored from "@/components/HasilScored";
import HistoryList from "@/components/HistoryList";
import { RESULT_STORAGE_KEY } from "@/components/quiz/resultKey";

type Stored = {
  correct: number;
  total: number;
  score: number;
  category?: string;
};

type Attempt = {
  id: string;
  category: string;
  variant: number;
  score: number;
  correct: number;
  total: number;
  createdAt: string;
};

function readStored(): Stored | null {
  const raw = sessionStorage.getItem(RESULT_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Stored;
  } catch {
    return null;
  }
}

const emptyBtn =
  "inline-flex min-h-11 items-center justify-center rounded-lg " +
  "bg-slate-900 px-6 text-sm font-bold text-lime-300 shadow-sm " +
  "transition hover:bg-slate-900 " +
  "focus-visible:outline focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-lime-500";

export default function HasilClient() {
  const [data, setData] = useState<Stored | null | undefined>(undefined);
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  useEffect(() => {
    startTransition(() => {
      setData(readStored());
    });
    const run = async () => {
      const res = await fetch("/api/history");
      if (!res.ok) return;
      const body = (await res.json()) as { attempts?: Attempt[] };
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
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-slate-600">Belum ada nilai tersimpan di sesi ini.</p>
        <Link className={`${emptyBtn} mt-6`} href="/try-out">
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
