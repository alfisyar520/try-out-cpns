import type { AttemptDetailBase } from "@/lib/types";

function isStoredDetail(value: unknown): value is AttemptDetailBase {
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  return typeof row.questionId === "string" && typeof row.ok === "boolean";
}

export function parseStoredAttemptDetails(
  raw: unknown,
): AttemptDetailBase[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(isStoredDetail);
}
