type Props = {
  step: number;
  isLast: boolean;
  allChosen: boolean;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
};

const ghost =
  "min-h-11 rounded-lg border border-slate-300 bg-white px-5 text-sm " +
  "font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 " +
  "disabled:cursor-not-allowed disabled:opacity-40 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-lime-500";

const primary =
  "min-h-11 rounded-lg bg-lime-500 px-5 text-sm font-bold text-slate-900 " +
  "shadow-sm transition hover:bg-lime-400 " +
  "disabled:cursor-not-allowed disabled:opacity-40 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-lime-600";

export default function QuizNav({
  step,
  isLast,
  allChosen,
  onPrev,
  onNext,
  onFinish,
}: Props) {
  return (
    <div className="flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-4">
      <button
        type="button"
        className={ghost}
        disabled={step === 0}
        onClick={onPrev}
      >
        ← Soal sebelumnya
      </button>
      {isLast ? (
        <button
          type="button"
          className={primary}
          disabled={!allChosen}
          onClick={() => void onFinish()}
        >
          Selesai &amp; lihat nilai
        </button>
      ) : (
        <button type="button" className={primary} onClick={onNext}>
          Soal berikutnya →
        </button>
      )}
    </div>
  );
}
