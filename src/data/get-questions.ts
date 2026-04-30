import type { Question, QuestionCategory } from "@/lib/types";
import { findInDb, pickFromDb, pickPackageFromDb } from "@/lib/questions-from-db";

export type SessionCategory = QuestionCategory | "paket";

export async function pickQuestions(
  category: SessionCategory,
  limit: number,
  variant = 1,
): Promise<Question[]> {
  if (!process.env.DATABASE_URL?.trim()) {
    throw new Error("DATABASE_URL belum diatur.");
  }
  if (category === "paket") return pickPackageFromDb(variant);
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
