import type { SubmitAnswer } from "@/lib/types";

const OPTION_KEYS = ["A", "B", "C", "D"] as const;

export function isSubmitAnswer(value: unknown): value is SubmitAnswer {
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.questionId === "string" &&
    typeof row.chosen === "string" &&
    OPTION_KEYS.includes(row.chosen as (typeof OPTION_KEYS)[number])
  );
}
