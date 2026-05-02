function hashString(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) {
    h = (h << 5) - h + value.charCodeAt(i);
    h |= 0;
  }
  return h;
}

export function toSeededOrder<T extends { id: string }>(
  items: T[],
  seed: number,
): T[] {
  return [...items].sort((a, b) => {
    const av = Math.abs(hashString(`${a.id}-${seed}`));
    const bv = Math.abs(hashString(`${b.id}-${seed}`));
    return av - bv;
  });
}
