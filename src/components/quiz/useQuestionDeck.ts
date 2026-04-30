"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { PublicQuestion } from "@/lib/types";

export function useQuestionDeck() {
  const params = useSearchParams();
  const category = params.get("category") ?? "";
  const limit = params.get("limit") ?? "8";
  const variant = params.get("variant") ?? "1";
  const missingCategory = !category;

  const [busy, setBusy] = useState(() => !missingCategory);
  const [msg, setMsg] = useState<string | null>(() =>
    missingCategory ? "Kategori tidak ada." : null,
  );
  const [rows, setRows] = useState<PublicQuestion[]>([]);

  useEffect(() => {
    if (missingCategory) return;
    const ac = new AbortController();
    const run = async () => {
      setBusy(true);
      setMsg(null);
      try {
        const qs = new URLSearchParams({ category, limit, variant });
        const res = await fetch(`/api/questions?${qs}`, { signal: ac.signal });
        if (!res.ok) throw new Error("fail");
        const body = (await res.json()) as { questions?: PublicQuestion[] };
        setRows(body.questions ?? []);
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        setMsg("Gagal memuat soal.");
      } finally {
        setBusy(false);
      }
    };
    void run();
    return () => ac.abort();
  }, [missingCategory, category, limit, variant]);

  return { busy, msg, rows, category, variant };
}
