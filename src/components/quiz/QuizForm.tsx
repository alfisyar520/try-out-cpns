"use client";

import QuizNav from "@/components/quiz/QuizNav";
import QuizOptionRow from "@/components/quiz/QuizOptionRow";
import QuizProgress from "@/components/quiz/QuizProgress";
import { useTesSession } from "@/components/quiz/useTesSession";

const muted = "text-center text-slate-600";
const error = "text-center text-sm font-bold text-red-700";

const panel =
  "rounded-xl border border-slate-300 bg-white p-6 shadow-md sm:p-8";

export default function QuizForm() {
  const session = useTesSession();
  const {
    busy,
    msg,
    rows,
    step,
    setStep,
    row,
    isLast,
    allChosen,
    choose,
    finish,
    pick,
  } = session;

  if (busy) {
    return (
      <div className="flex justify-center py-16">
        <p className={`${muted} animate-pulse text-sm`}>Memuat bank soal…</p>
      </div>
    );
  }
  if (msg) return <p className={error}>{msg}</p>;
  if (!row) return <p className={muted}>Bank soal kosong untuk filter ini.</p>;

  return (
    <div className="space-y-6">
      <QuizProgress step={step} total={rows.length} />
      <article className={panel}>
        <h2 className="text-lg font-semibold leading-relaxed text-slate-900 sm:text-xl">
          {row.text}
        </h2>
        <div className="mt-6 flex flex-col gap-3">
          {row.options.map((option) => (
            <QuizOptionRow
              key={option.key}
              option={option}
              active={pick[row.id] === option.key}
              onPick={choose}
            />
          ))}
        </div>
        <QuizNav
          step={step}
          isLast={isLast}
          allChosen={allChosen}
          onPrev={() => setStep((value) => Math.max(0, value - 1))}
          onNext={() => setStep((value) => value + 1)}
          onFinish={finish}
        />
      </article>
    </div>
  );
}
