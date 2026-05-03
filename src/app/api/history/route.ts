import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/auth-api";
import { prisma } from "@/lib/prisma";
import { enrichAttemptsWithPembahasan } from "@/lib/history/enrich-attempt-details";

export async function GET() {
  const user = await requireApiUser();
  if (user instanceof NextResponse) return user;
  const attempts = await prisma.attempt.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 30,
    select: {
      id: true,
      category: true,
      variant: true,
      score: true,
      correct: true,
      total: true,
      createdAt: true,
      details: true,
    },
  });
  const withPembahasan = await enrichAttemptsWithPembahasan(attempts);
  return NextResponse.json({ attempts: withPembahasan });
}
