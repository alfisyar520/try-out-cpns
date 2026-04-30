import { prisma } from "@/lib/prisma";
import type { Question, QuestionCategory } from "@/lib/types";
import { mapDbRowToQuestion } from "@/lib/map-db-question";
import { shuffleSlice } from "@/lib/shuffle-slice";

const PACKAGE_TARGET: Record<QuestionCategory, number> = {
  twk: 10,
  tiu: 10,
  tkp: 10,
};

export async function pickFromDb(
  category: QuestionCategory,
  limit: number,
): Promise<Question[]> {
  const rows = await prisma.question.findMany({
    where: { category },
  });
  const mapped = rows.map(mapDbRowToQuestion);
  return shuffleSlice(mapped, limit);
}

function toSeededOrder(questions: Question[], seed: number): Question[] {
  return [...questions].sort((a, b) => {
    const av = Math.abs(hash(`${a.id}-${seed}`));
    const bv = Math.abs(hash(`${b.id}-${seed}`));
    return av - bv;
  });
}

function hash(value: string) {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) {
    h = (h << 5) - h + value.charCodeAt(i);
    h |= 0;
  }
  return h;
}

export async function pickPackageFromDb(variant: number): Promise<Question[]> {
  const rows = await prisma.question.findMany();
  const mapped = rows.map(mapDbRowToQuestion);
  const byCategory: Record<QuestionCategory, Question[]> = {
    twk: [],
    tiu: [],
    tkp: [],
  };
  for (const item of mapped) byCategory[item.category].push(item);

  const selected: Question[] = [];
  const leftovers: Question[] = [];
  const order: QuestionCategory[] = ["twk", "tiu", "tkp"];

  for (const category of order) {
    const source = toSeededOrder(byCategory[category], variant);
    const need = PACKAGE_TARGET[category];
    selected.push(...source.slice(0, need));
    leftovers.push(...source.slice(need));
  }

  const targetTotal = PACKAGE_TARGET.twk + PACKAGE_TARGET.tiu + PACKAGE_TARGET.tkp;
  const shortfall = targetTotal - selected.length;
  if (shortfall > 0) {
    selected.push(...toSeededOrder(leftovers, variant).slice(0, shortfall));
  }

  return toSeededOrder(selected, variant);
}

export async function findInDb(id: string): Promise<Question | undefined> {
  const row = await prisma.question.findUnique({ where: { id } });
  return row ? mapDbRowToQuestion(row) : undefined;
}
