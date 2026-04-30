import { NextResponse } from "next/server";
import type { SubmitAnswer, SubmitPayload } from "@/lib/types";
import { getQuestionById } from "@/data/get-questions";
import { requireApiUser } from "@/lib/auth-api";

function isAnswer(value: unknown): value is SubmitAnswer {
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  const keys = ["A", "B", "C", "D"];
  return (
    typeof row.questionId === "string" &&
    typeof row.chosen === "string" &&
    keys.includes(row.chosen)
  );
}

export async function POST(request: Request) {
  const user = await requireApiUser();
  if (user instanceof NextResponse) return user;
  let body: SubmitPayload;
  try {
    body = (await request.json()) as SubmitPayload;
  } catch {
    return NextResponse.json({ error: "JSON tidak valid." }, { status: 400 });
  }
  if (!body?.answers || !Array.isArray(body.answers)) {
    return NextResponse.json({ error: "Format jawaban salah." }, { status: 400 });
  }
  const answers = body.answers.filter(isAnswer);
  let correct = 0;
  const details: Array<{
    questionId: string;
    ok: boolean;
    correctKey?: string;
  }> = [];
  for (const answer of answers) {
    const question = await getQuestionById(answer.questionId);
    if (!question) {
      details.push({ questionId: answer.questionId, ok: false });
      continue;
    }
    const ok = question.correctKey === answer.chosen;
    if (ok) correct += 1;
    details.push({
      questionId: answer.questionId,
      ok,
      correctKey: question.correctKey,
    });
  }
  const total = details.length;
  const score = total === 0 ? 0 : Math.round((correct / total) * 100);
  return NextResponse.json({ correct, total, score, details });
}
