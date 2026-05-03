import { readFileSync } from "fs";
import path from "path";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const root = path.join(__dirname, "..");
  const filePath = path.join(root, "data", "questions.json");
  const explainPath = path.join(root, "data", "question-explanations.json");
  const raw = readFileSync(filePath, "utf-8");
  const explainRaw = readFileSync(explainPath, "utf-8");
  const explanations = JSON.parse(explainRaw) as Record<string, string>;
  const { questions } = JSON.parse(raw) as {
    questions: Array<{
      id: string;
      category: string;
      text: string;
      options: unknown;
      correctKey: string;
    }>;
  };

  for (const question of questions) {
    const explanation = explanations[question.id] ?? null;
    await prisma.question.upsert({
      where: { id: question.id },
      create: {
        id: question.id,
        category: question.category,
        text: question.text,
        options: question.options as Prisma.InputJsonValue,
        correctKey: question.correctKey,
        explanation,
      },
      update: {
        category: question.category,
        text: question.text,
        options: question.options as Prisma.InputJsonValue,
        correctKey: question.correctKey,
        explanation,
      },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
