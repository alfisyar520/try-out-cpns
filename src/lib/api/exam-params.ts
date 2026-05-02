import {
  PACKAGE_VARIANT_MAX,
  PACKAGE_VARIANT_MIN,
} from "@/lib/quiz/package-targets";

const QUESTION_LIMIT_MIN = 1;
const QUESTION_LIMIT_MAX = 50;

export function clampQuestionLimit(value: number): number {
  return Math.min(
    QUESTION_LIMIT_MAX,
    Math.max(QUESTION_LIMIT_MIN, Math.floor(value)),
  );
}

export function parseQuestionLimit(raw: string | null): number {
  if (!raw) return 10;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) return 10;
  return clampQuestionLimit(n);
}

export function clampExamVariant(value: number): number {
  return Math.min(
    PACKAGE_VARIANT_MAX,
    Math.max(PACKAGE_VARIANT_MIN, Math.floor(value)),
  );
}

export function parseExamVariant(raw: string | null): number {
  if (!raw) return PACKAGE_VARIANT_MIN;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) return PACKAGE_VARIANT_MIN;
  return clampExamVariant(n);
}
