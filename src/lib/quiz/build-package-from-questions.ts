import type { Question, QuestionCategory } from "@/lib/types";
import {
  PACKAGE_CATEGORY_ORDER,
  PACKAGE_COUNTS,
} from "@/lib/quiz/package-targets";
import { toSeededOrder } from "@/lib/quiz/seed-hash";

export function buildPackageFromQuestions(
  questions: Question[],
  variant: number,
): Question[] {
  const byCategory: Record<QuestionCategory, Question[]> = {
    twk: [],
    tiu: [],
    tkp: [],
  };
  for (const item of questions) {
    byCategory[item.category].push(item);
  }

  const selected: Question[] = [];
  const leftovers: Question[] = [];

  for (const category of PACKAGE_CATEGORY_ORDER) {
    const source = toSeededOrder(byCategory[category], variant);
    const need = PACKAGE_COUNTS[category];
    selected.push(...source.slice(0, need));
    leftovers.push(...source.slice(need));
  }

  const targetTotal =
    PACKAGE_COUNTS.twk + PACKAGE_COUNTS.tiu + PACKAGE_COUNTS.tkp;
  const shortfall = targetTotal - selected.length;
  if (shortfall > 0) {
    selected.push(...toSeededOrder(leftovers, variant).slice(0, shortfall));
  }

  return toSeededOrder(selected, variant);
}
