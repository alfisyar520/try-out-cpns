import { NextResponse } from "next/server";
import type { SubmitAnswer, SubmitPayload } from "@/lib/types";
import { getQuestionById } from "@/data/get-questions";
import { requireApiUser } from "@/lib/auth-api";
import { prisma } from "@/lib/prisma";

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
    chosen?: string;
    ok: boolean;
    correctKey?: string;
  }> = [];
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
  const category = body.category ?? "unknown";
  const variant =
    typeof body.variant === "number" && Number.isFinite(body.variant)
      ? Math.min(5, Math.max(1, Math.floor(body.variant)))
      : 1;
  const attempt = await prisma.attempt.create({
    data: {
      userId: user.id,
      category,
      variant,
      score,
      correct,
      total,
      details,
    },
    select: { id: true, createdAt: true },
  });
  return NextResponse.json({ correct, total, score, details, attempt });
}
