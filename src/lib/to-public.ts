import type { Question, PublicQuestion } from "@/lib/types";

export function toPublicQuestion(question: Question): PublicQuestion {
  return {
    id: question.id,
    category: question.category,
    text: question.text,
    options: question.options,
  };
}
