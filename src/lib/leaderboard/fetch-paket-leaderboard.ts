import { prisma } from "@/lib/prisma";

export type PaketLeaderboardRow = {
  rank: number;
  userId: string;
  name: string;
  score: number;
  correct: number;
  total: number;
  createdAt: Date;
};

function toNumber(value: unknown): number {
  if (typeof value === "bigint") return Number(value);
  if (typeof value === "number") return value;
  return Number(value);
}

export async function fetchPaketLeaderboard(
  variant: number,
  limit: number,
): Promise<PaketLeaderboardRow[]> {
  const rows = await prisma.$queryRaw<
    Array<{
      rank: unknown;
      userId: string;
      name: string;
      score: number;
      correct: number;
      total: number;
      createdAt: Date;
    }>
  >`
    WITH best AS (
      SELECT DISTINCT ON (a.user_id)
        a.user_id AS "userId",
        a.score,
        a.correct,
        a.total,
        a.created_at AS "createdAt",
        u.name AS name
      FROM attempts a
      INNER JOIN users u ON u.id = a.user_id
      WHERE LOWER(TRIM(a.category)) = 'paket' AND a.variant = ${variant}
      ORDER BY
        a.user_id,
        a.score DESC,
        a.correct DESC,
        a.total DESC,
        a.created_at ASC
    )
    SELECT
      CAST(
        DENSE_RANK() OVER (
          ORDER BY score DESC, correct DESC, total DESC
        ) AS INTEGER
      ) AS rank,
      "userId",
      name,
      score,
      correct,
      total,
      "createdAt"
    FROM best
    ORDER BY rank ASC, "createdAt" ASC
    LIMIT ${limit}
  `;
  return rows.map((row) => ({
    rank: toNumber(row.rank),
    userId: row.userId,
    name: row.name,
    score: row.score,
    correct: row.correct,
    total: row.total,
    createdAt: row.createdAt,
  }));
}
