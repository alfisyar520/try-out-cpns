"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import type { OptionKey } from "@/lib/types";
import { postSubmit } from "@/components/quiz/postSubmit";
import { useQuestionDeck } from "@/components/quiz/useQuestionDeck";

export function useTesSession() {
  const router = useRouter();
  const { busy, msg, rows, category, variant } = useQuestionDeck();
  const [step, setStep] = useState(0);
  const [pick, setPick] = useState<Record<string, OptionKey>>({});
  const [sendErr, setSendErr] = useState<string | null>(null);

  const row = rows[step];
  const isLast = step === rows.length - 1;
  const allChosen =
    rows.length > 0 && rows.every((item) => pick[item.id] !== undefined);

  const choose = useCallback(
    (key: OptionKey) => {
      if (!row) return;
      setPick((prev) => ({ ...prev, [row.id]: key }));
    },
    [row],
  );

  const finish = useCallback(async () => {
    if (!allChosen) return;
    setSendErr(null);
    const ok = await postSubmit(rows, pick, category, variant);
    if (!ok) {
      setSendErr("Pengiriman jawaban gagal.");
      return;
    }
    router.push("/hasil");
  }, [allChosen, category, pick, router, rows, variant]);

  const errorText = msg ?? sendErr;

  return {
    busy,
    msg: errorText,
    rows,
    step,
    setStep,
    row,
    isLast,
    allChosen,
    choose,
    finish,
    pick,
  };
}
