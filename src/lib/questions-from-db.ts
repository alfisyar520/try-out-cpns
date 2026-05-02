import { prisma } from "@/lib/prisma";
import type { Question, QuestionCategory } from "@/lib/types";
import { mapDbRowToQuestion } from "@/lib/map-db-question";
import { shuffleSlice } from "@/lib/shuffle-slice";
import { buildPackageFromQuestions } from "@/lib/quiz/build-package-from-questions";

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

export async function pickPackageFromDb(variant: number): Promise<Question[]> {
  const rows = await prisma.question.findMany();
  const mapped = rows.map(mapDbRowToQuestion);
  return buildPackageFromQuestions(mapped, variant);
}

export async function findInDb(id: string): Promise<Question | undefined> {
  const row = await prisma.question.findUnique({ where: { id } });
  return row ? mapDbRowToQuestion(row) : undefined;
}
