"use client";

type Attempt = {
  id: string;
  category: string;
  variant: number;
  score: number;
  correct: number;
  total: number;
  createdAt: string;
};

type Props = { attempts: Attempt[] };

function formatDate(value: string) {
  return new Date(value).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function HistoryList({ attempts }: Props) {
  if (!attempts.length) {
    return <p className="text-sm text-slate-500">Belum ada history pengerjaan.</p>;
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
            <tr key={attempt.id} className="border-t border-slate-200">
              <td className="px-3 py-2">{formatDate(attempt.createdAt)}</td>
              <td className="px-3 py-2 uppercase">{attempt.category}</td>
              <td className="px-3 py-2">Paket {attempt.variant}</td>
              <td className="px-3 py-2 font-semibold">{attempt.score}</td>
              <td className="px-3 py-2">
                {attempt.correct}/{attempt.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
