import type { Question, QuestionCategory } from "@/lib/types";

type Row = {
  id: string;
  category: string;
  text: string;
  options: unknown;
  correctKey: string;
};

export function mapDbRowToQuestion(row: Row): Question {
  return {
    id: row.id,
    category: row.category as QuestionCategory,
    text: row.text,
    options: row.options as Question["options"],
    correctKey: row.correctKey as Question["correctKey"],
  };
}
