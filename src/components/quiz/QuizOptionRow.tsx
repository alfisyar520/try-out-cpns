import type { OptionKey, QuestionOption } from "@/lib/types";

type Props = {
  option: QuestionOption;
  active: boolean;
  onPick: (key: OptionKey) => void;
};

const base =
  "flex min-h-14 w-full items-start gap-3 rounded-lg border px-4 py-3.5 " +
  "text-left text-base leading-snug transition focus-visible:outline " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-lime-500";

const badge =
  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md " +
  "border border-slate-200 bg-slate-50 text-sm font-black text-[#0a1628]";

export default function QuizOptionRow({ option, active, onPick }: Props) {
  const state = active
    ? "border-lime-500 bg-lime-50 ring-1 ring-lime-500/30"
    : "border-slate-200 bg-white hover:border-lime-300 hover:bg-lime-50/40";
  return (
    <button
      type="button"
      onClick={() => onPick(option.key)}
      className={`${base} ${state}`}
    >
      <span className={badge}>{option.key}</span>
      <span className="pt-0.5 text-slate-800">{option.text}</span>
    </button>
  );
}
