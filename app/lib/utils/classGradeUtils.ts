export type ClassGradeLike = { _id?: string; name?: string };

export function getClassGradeName(
  classId: string | undefined | null,
  classGrades?: ClassGradeLike[] | null,
  fallback?: string
): string | undefined {
  if (!classId) return undefined;
  if (!classGrades || classGrades.length === 0) return fallback ?? classId;
  const found = classGrades.find((c) => String(c._id) === String(classId));
  return found?.name ?? fallback ?? classId;
}
