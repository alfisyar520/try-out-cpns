type Props = { step: number; total: number };

export default function QuizProgress({ step, total }: Props) {
  const pct = total ? Math.round(((step + 1) / total) * 100) : 0;
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-semibold text-slate-600">
        <span>
          Soal {step + 1} dari {total}
        </span>
        <span className="tabular-nums text-slate-900">{pct}%</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label="Kemajuan tes"
      >
        <div
          className="h-full rounded-full bg-lime-500 transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
