import { NextRequest, NextResponse } from "next/server";
import { requireApiUser } from "@/lib/auth-api";
import { parseExamVariant } from "@/lib/api/exam-params";
import { fetchPaketLeaderboard } from "@/lib/leaderboard/fetch-paket-leaderboard";

const LEADERBOARD_LIMIT = 50;

export async function GET(request: NextRequest) {
  const user = await requireApiUser();
  if (user instanceof NextResponse) return user;

  const variant = parseExamVariant(
    request.nextUrl.searchParams.get("variant"),
  );
  const rows = await fetchPaketLeaderboard(variant, LEADERBOARD_LIMIT);
  const entries = rows.map((row) => ({
    rank: row.rank,
    userId: row.userId,
    name: row.name,
    score: row.score,
    correct: row.correct,
    total: row.total,
    createdAt: row.createdAt.toISOString(),
    isYou: row.userId === user.id,
  }));

  return NextResponse.json({ variant, entries });
}
