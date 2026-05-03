"use client";

import { Fragment } from "react";
import AttemptPembahasan from "@/components/AttemptPembahasan";
import type { AttemptSummary } from "@/lib/types";

type Props = { attempts: AttemptSummary[] };

function formatDate(value: string) {
  return new Date(value).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function variantLabel(category: string, variant: number) {
  if (category.toLowerCase() === "paket") return `Paket ${variant}`;
  return "—";
}

export default function HistoryList({ attempts }: Props) {
  if (!attempts.length) {
    return (
      <p className="text-sm text-slate-500">Belum ada history pengerjaan.</p>
    );
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th className="px-3 py-2 text-left">Waktu</th>
            <th className="px-3 py-2 text-left">Kategori</th>
            <th className="px-3 py-2 text-left">Varian</th>
            <th className="px-3 py-2 text-left">Skor</th>
            <th className="px-3 py-2 text-left">Benar</th>
          </tr>
        </thead>
        <tbody>
          {attempts.map((attempt) => (
            <Fragment key={attempt.id}>
              <tr className="border-t border-slate-200">
                <td className="px-3 py-2">{formatDate(attempt.createdAt)}</td>
                <td className="px-3 py-2 uppercase">{attempt.category}</td>
                <td className="px-3 py-2">
                  {variantLabel(attempt.category, attempt.variant)}
                </td>
                <td className="px-3 py-2 font-semibold">{attempt.score}</td>
                <td className="px-3 py-2">
                  {attempt.correct}/{attempt.total}
                </td>
              </tr>
              <tr className="border-t border-slate-100 bg-slate-50/90">
                <td colSpan={5} className="px-3 py-3">
                  <AttemptPembahasan details={attempt.details} />
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
