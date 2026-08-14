import { AcademicYear } from '@/app/lib/types/academicYear.types';

export const normalizeAcademicYear = (data?: AcademicYear) => {
  if (!data) return null;

  return {
    _id: data._id,
    name: data.name,
    startDate: data.startDate?.slice(0, 10) || '',
    endDate: data.endDate?.slice(0, 10) || '',
    isActive: data.isActive ?? false,
    terms: (data.terms || []).map((t) => ({
      id: t._id || crypto.randomUUID(),
      _id: t._id,
      name: t.name,
      startDate: t.startDate?.slice(0, 10) || '',
      endDate: t.endDate?.slice(0, 10) || '',
      isCurrentlyActive: t.isCurrentlyActive ?? false,
      holidays: (t.holidays || []).map((h) => ({
        id: h.id || crypto.randomUUID(),
        name: h.name,
        date: h.date,
        type: h.type,
      })),
    })),
  };
};