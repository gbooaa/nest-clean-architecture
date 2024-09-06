export function dateIsGreaterThan(baseDate: string, compareDate: string): boolean {
  return new Date(compareDate) > new Date(baseDate);
}
