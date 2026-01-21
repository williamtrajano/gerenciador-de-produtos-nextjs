export function clampPage(page: number, totalPages: number): number {
  if (totalPages <= 1) return 1;
  return Math.min(Math.max(1, page), totalPages);
}
