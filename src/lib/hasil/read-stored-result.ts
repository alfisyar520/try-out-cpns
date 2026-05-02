import { RESULT_STORAGE_KEY } from "@/lib/hasil/result-storage-key";

export type StoredResultSummary = {
  correct: number;
  total: number;
  score: number;
  category?: string;
};

export function readStoredResult(): StoredResultSummary | null {
  const raw = sessionStorage.getItem(RESULT_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredResultSummary;
  } catch {
    return null;
  }
}
