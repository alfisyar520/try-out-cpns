import { readFileSync } from "fs";
import path from "path";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, "..", "data", "questions.json");
  const raw = readFileSync(filePath, "utf-8");
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
    await prisma.question.upsert({
      where: { id: question.id },
      create: {
        id: question.id,
        category: question.category,
        text: question.text,
        options: question.options as Prisma.InputJsonValue,
        correctKey: question.correctKey,
      },
      update: {
        category: question.category,
        text: question.text,
        options: question.options as Prisma.InputJsonValue,
        correctKey: question.correctKey,
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
