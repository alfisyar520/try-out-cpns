type Props = {
  total: number;
  step: number;
  answeredMap: Record<string, string | undefined>;
  questionIds: string[];
  onJump: (index: number) => void;
};

const base =
  "flex h-9 w-9 items-center justify-center rounded-md text-sm font-bold " +
  "transition focus-visible:outline focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-lime-500";

export default function QuestionPalette({
  total,
  step,
  answeredMap,
  questionIds,
  onJump,
}: Props) {
  return (
    <section className="rounded-xl border border-slate-300 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-slate-700">
          Navigasi soal ({total})
        </p>
        <p className="text-right text-xs text-slate-500">
          Hijau: terjawab, abu: kosong
        </p>
      </div>
      <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 xl:grid-cols-5">
        {questionIds.map((id, index) => {
          const active = index === step;
          const answered = Boolean(answeredMap[id]);
          const style = active
            ? "bg-slate-900 text-white"
            : answered
              ? "bg-lime-500 text-slate-900 hover:bg-lime-400"
              : "bg-slate-200 text-slate-700 hover:bg-slate-300";
          return (
            <button
              key={id}
              type="button"
              className={`${base} ${style}`}
              onClick={() => onJump(index)}
              aria-label={`Soal ${index + 1}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </section>
  );
}
