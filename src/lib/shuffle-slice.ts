export function shuffleSlice<T>(items: T[], limit: number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  const capped = Math.min(Math.max(limit, 1), copy.length);
  return copy.slice(0, capped);
}
