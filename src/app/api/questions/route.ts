import { NextRequest, NextResponse } from "next/server";
import type { QuestionCategory } from "@/lib/types";
import { pickQuestions } from "@/data/get-questions";
import { requireApiUser } from "@/lib/auth-api";
import { toPublicQuestion } from "@/lib/to-public";

const ALLOWED: QuestionCategory[] = ["twk", "tiu", "tkp"];

function parseCategory(value: string | null): QuestionCategory | null {
  if (!value) return null;
  return ALLOWED.includes(value as QuestionCategory)
    ? (value as QuestionCategory)
    : null;
}

export async function GET(request: NextRequest) {
  const user = await requireApiUser();
  if (user instanceof NextResponse) return user;
  const category = parseCategory(request.nextUrl.searchParams.get("category"));
  if (!category) {
    return NextResponse.json({ error: "Kategori tidak valid." }, { status: 400 });
  }
  const limitRaw = request.nextUrl.searchParams.get("limit");
  const limit = limitRaw ? Number.parseInt(limitRaw, 10) : 10;
  const safeLimit = Number.isFinite(limit)
    ? Math.min(50, Math.max(1, limit))
    : 10;
  const picked = await pickQuestions(category, safeLimit);
  const questions = picked.map(toPublicQuestion);
  return NextResponse.json({ category, questions });
}
