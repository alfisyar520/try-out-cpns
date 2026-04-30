import Link from "next/link";

type Props = {
  category: string;
  score: number;
  correct: number;
  total: number;
};

const btn =
  "inline-flex min-h-11 items-center justify-center rounded-lg " +
  "bg-lime-500 px-6 text-sm font-bold text-slate-900 shadow-sm " +
  "transition hover:bg-lime-400 " +
  "focus-visible:outline focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-lime-600";

export default function HasilScored({ category, score, correct, total }: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-md sm:p-10">
      <p className="text-[11px] font-bold uppercase tracking-widest text-lime-700">
        Subtansi
      </p>
      <p className="mt-1 text-xl font-bold text-slate-900">{category}</p>
      <p
        className="mt-8 text-6xl font-black tabular-nums tracking-tight text-slate-900"
        aria-live="polite"
      >
        {score}
      </p>
      <p className="mt-2 text-xs font-semibold uppercase text-slate-500">
        Nilai skor (0–100)
      </p>
      <p className="mt-6 text-base text-slate-700">
        Jawaban benar{" "}
        <span className="font-bold text-slate-900">{correct}</span> dari{" "}
        <span className="font-bold text-slate-900">{total}</span> butir
      </p>
      <Link href="/try-out" className={`${btn} mt-8`}>
        Kembali ke menu try out
      </Link>
    </div>
  );
}
