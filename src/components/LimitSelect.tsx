type Props = {
  value: number;
  onChange: (value: number) => void;
};

const OPTIONS = [4, 8, 12] as const;

const focus =
  "focus-visible:outline focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-lime-500";

const off =
  "border border-slate-200 bg-white text-slate-800 " +
  "hover:border-lime-300 hover:bg-lime-50/50";

const on = "bg-slate-900 text-lime-300 shadow-inner";

export default function LimitSelect({ value, onChange }: Props) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-slate-800">Jumlah soal per sesi</p>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Pilih jumlah soal"
      >
        {OPTIONS.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option)}
              className={`min-h-11 min-w-[4.75rem] rounded-lg px-4 text-sm font-bold transition ${focus} ${
                selected ? on : off
              }`}
            >
              {option} soal
            </button>
          );
        })}
      </div>
    </div>
  );
}
