"use client";

import { Suspense } from "react";
import QuizForm from "@/components/quiz/QuizForm";

function Fallback() {
  return (
    <div className="flex justify-center py-16" aria-busy="true">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-amber-500" />
        <p className="text-sm font-medium text-slate-600">Menyiapkan lembar…</p>
      </div>
    </div>
  );
}

export default function QuizRunner() {
  return (
    <Suspense fallback={<Fallback />}>
      <QuizForm />
    </Suspense>
  );
}
