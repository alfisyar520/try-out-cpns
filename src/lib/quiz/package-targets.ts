import type { QuestionCategory } from "@/lib/types";

export const PACKAGE_COUNTS: Record<QuestionCategory, number> = {
  twk: 10,
  tiu: 10,
  tkp: 10,
};

export const PACKAGE_CATEGORY_ORDER: QuestionCategory[] = [
  "twk",
  "tiu",
  "tkp",
];

export const PACKAGE_VARIANT_MIN = 1;
export const PACKAGE_VARIANT_MAX = 5;

export const PACKAGE_VARIANT_IDS = [1, 2, 3, 4, 5] as const;
