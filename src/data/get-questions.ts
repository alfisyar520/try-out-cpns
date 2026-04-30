import type { Question, QuestionCategory } from "@/lib/types";
import { findInDb, pickFromDb } from "@/lib/questions-from-db";

export async function pickQuestions(
  category: QuestionCategory,
  limit: number,
): Promise<Question[]> {
  if (!process.env.DATABASE_URL?.trim()) {
    throw new Error("DATABASE_URL belum diatur.");
  }
  return pickFromDb(category, limit);
}

export async function getQuestionById(
  id: string,
): Promise<Question | undefined> {
  if (!process.env.DATABASE_URL?.trim()) {
    throw new Error("DATABASE_URL belum diatur.");
  }
  return findInDb(id);
}
