import { NextRequest, NextResponse } from "next/server";
import type { SessionCategory } from "@/data/get-questions";
import { pickQuestions } from "@/data/get-questions";
import { requireApiUser } from "@/lib/auth-api";
import { toPublicQuestion } from "@/lib/to-public";

const ALLOWED: SessionCategory[] = ["twk", "tiu", "tkp", "paket"];

function parseCategory(value: string | null): SessionCategory | null {
  if (!value) return null;
  return ALLOWED.includes(value as SessionCategory)
    ? (value as SessionCategory)
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
  const variantRaw = request.nextUrl.searchParams.get("variant");
  const variant = variantRaw ? Number.parseInt(variantRaw, 10) : 1;
  const safeVariant = Number.isFinite(variant)
    ? Math.min(5, Math.max(1, variant))
    : 1;
  const picked = await pickQuestions(category, safeLimit, safeVariant);
  const questions = picked.map(toPublicQuestion);
  return NextResponse.json({ category, variant: safeVariant, questions });
}
