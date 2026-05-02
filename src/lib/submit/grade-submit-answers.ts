import { getQuestionById } from "@/data/get-questions";
import type { SubmitAnswer } from "@/lib/types";

export type GradedDetail = {
  questionId: string;
  chosen?: string;
  ok: boolean;
  correctKey?: string;
};

export type GradedSubmitResult = {
  correct: number;
  total: number;
  score: number;
  details: GradedDetail[];
};

export async function gradeSubmitAnswers(
  answers: SubmitAnswer[],
): Promise<GradedSubmitResult> {
  let correct = 0;
  const details: GradedDetail[] = [];

  for (const answer of answers) {
    const question = await getQuestionById(answer.questionId);
    if (!question) {
      details.push({
        questionId: answer.questionId,
        chosen: answer.chosen,
        ok: false,
      });
      continue;
    }
    const ok = question.correctKey === answer.chosen;
    if (ok) correct += 1;
    details.push({
      questionId: answer.questionId,
      chosen: answer.chosen,
      ok,
      correctKey: question.correctKey,
    });
  }

  const total = details.length;
  const score = total === 0 ? 0 : Math.round((correct / total) * 100);
  return { correct, total, score, details };
}
