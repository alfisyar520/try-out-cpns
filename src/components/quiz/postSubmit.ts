import { RESULT_STORAGE_KEY } from "@/components/quiz/resultKey";

type Row = { id: string };

export async function postSubmit(
  rows: Row[],
  pick: Record<string, string>,
  category: string,
): Promise<boolean> {
  const answers = rows.map((item) => ({
    questionId: item.id,
    chosen: pick[item.id]!,
  }));
  const res = await fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  });
  if (!res.ok) return false;
  const body = await res.json();
  sessionStorage.setItem(
    RESULT_STORAGE_KEY,
    JSON.stringify({ ...body, category }),
  );
  return true;
}
