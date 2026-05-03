"use client";

import type { AttemptHistoryDetail } from "@/lib/types";

const summaryClass =
  "cursor-pointer select-none text-sm font-semibold text-lime-800 " +
  "underline decoration-lime-600 decoration-2 underline-offset-2 " +
  "hover:text-lime-900";

export default function AttemptPembahasan({
  details,
}: {
  details: AttemptHistoryDetail[];
}) {
  if (!details.length) {
    return (
      <p className="text-xs text-slate-500">
        Detail soal tidak tersimpan untuk percobaan ini.
      </p>
    );
  }

  return (
    <details className="group text-left">
      <summary className={summaryClass}>
        Buka pembahasan ({details.length} soal)
      </summary>
      <ul className="mt-3 max-h-80 space-y-4 overflow-y-auto border-t border-slate-200 pt-3">
        {details.map((row, index) => (
          <li
            key={`${row.questionId}-${index}`}
            className="rounded-lg border border-slate-100 bg-white p-3 text-sm shadow-sm"
          >
            <p className="font-semibold text-slate-900">
              {index + 1}. {row.questionText ?? row.questionId}
            </p>
            <p className="mt-1 text-slate-600">
              Jawaban Anda:{" "}
              <span className="font-medium">{row.chosen ?? "—"}</span>
              {" · "}
              <span className={row.ok ? "text-emerald-700" : "text-red-700"}>
                {row.ok ? "Benar" : "Salah"}
              </span>
              {!row.ok && row.correctKey ? (
                <>
                  {" · Kunci: "}
                  <span className="font-medium">{row.correctKey}</span>
                </>
              ) : null}
            </p>
            <p className="mt-2 leading-relaxed text-slate-700">
              <span className="font-bold text-slate-800">Pembahasan: </span>
              {row.explanation ?? "Pembahasan belum tersedia untuk soal ini."}
            </p>
          </li>
        ))}
      </ul>
    </details>
  );
}
