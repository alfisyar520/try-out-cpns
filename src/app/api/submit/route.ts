import { NextResponse } from "next/server";
import type { SubmitPayload } from "@/lib/types";
import { requireApiUser } from "@/lib/auth-api";
import { prisma } from "@/lib/prisma";
import { clampExamVariant } from "@/lib/api/exam-params";
import { gradeSubmitAnswers } from "@/lib/submit/grade-submit-answers";
import { isSubmitAnswer } from "@/lib/submit/is-submit-answer";

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
    return NextResponse.json(
      { error: "Format jawaban salah." },
      { status: 400 },
    );
  }

  const answers = body.answers.filter(isSubmitAnswer);
  const { correct, total, score, details } = await gradeSubmitAnswers(answers);
  const category = body.category ?? "unknown";
  const variant = clampExamVariant(
    typeof body.variant === "number" && Number.isFinite(body.variant)
      ? body.variant
      : 1,
  );

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
