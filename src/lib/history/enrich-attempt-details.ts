import { prisma } from "@/lib/prisma";
import { parseStoredAttemptDetails } from "@/lib/history/parse-stored-details";
import type { AttemptHistoryDetail } from "@/lib/types";

type AttemptRow = {
  details: unknown;
};

export async function enrichAttemptsWithPembahasan<T extends AttemptRow>(
  attempts: T[],
): Promise<Array<Omit<T, "details"> & { details: AttemptHistoryDetail[] }>> {
  const allIds = new Set<string>();
  for (const attempt of attempts) {
    for (const row of parseStoredAttemptDetails(attempt.details)) {
      allIds.add(row.questionId);
    }
  }

  const idList = [...allIds];
  const questions =
    idList.length === 0
      ? []
      : await prisma.question.findMany({
          where: { id: { in: idList } },
          select: { id: true, text: true, explanation: true },
        });
  const byId = new Map(
    questions.map((question) => [
      question.id,
      { text: question.text, explanation: question.explanation },
    ]),
  );

  return attempts.map((attempt) => {
    const { details: rawDetails, ...rest } = attempt;
    const details: AttemptHistoryDetail[] = parseStoredAttemptDetails(
      rawDetails,
    ).map((row) => {
      const meta = byId.get(row.questionId);
      return {
        ...row,
        questionText: meta?.text ?? null,
        explanation: meta?.explanation ?? null,
      };
    });
    return { ...rest, details };
  });
}
