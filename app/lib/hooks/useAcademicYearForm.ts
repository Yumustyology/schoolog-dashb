import { useEffect } from 'react';
import { FormikProps } from 'formik';
import {
  AcademicHoliday,
  AcademicTerm,
} from '@/app/lib/types/academicYear.types';
import showToast from '@/app/lib/utils/toast';

export interface AcademicYearFormValues {
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  terms: AcademicTerm[];
}

const getTermName = (index: number) => {
  if (index === 0) return 'First Term';
  if (index === 1) return 'Second Term';
  if (index === 2) return 'Third Term';
  return `Term ${index + 1}`;
};

export const useAcademicYearForm = (
  formik: FormikProps<AcademicYearFormValues>
) => {
  /**
   * Auto-activate academic year if any term is active
   */
  useEffect(() => {
    const hasActiveTerm = formik.values.terms.some(
      (t) => t.isCurrentlyActive
    );

    if (hasActiveTerm && !formik.values.isActive) {
      formik.setFieldValue('isActive', true);
    }
  }, [
    formik.values.terms.map((t) => t.isCurrentlyActive).join(','),
    formik.values.isActive,
  ]);

  /**
   * Add term
   */
  const addTerm = () => {
    const index = formik.values.terms.length;

    const newTerm: AcademicTerm = {
      id: crypto.randomUUID(),
      name: getTermName(index),
      startDate: '',
      endDate: '',
      holidays: [],
      isCurrentlyActive: false,
    };

    formik.setFieldValue('terms', [...formik.values.terms, newTerm]);
  };

  /**
   * Remove term (must keep at least one)
   */
  const removeTerm = (id: string) => {
    if (formik.values.terms.length === 1) {
      showToast(
        'At least one term is required',
        'min-term-check',
        { type: 'error' }
      );
      return;
    }

    formik.setFieldValue(
      'terms',
      formik.values.terms.filter(
        (t) => String(t.id) !== String(id) && String(t._id) !== String(id)
      )
    );
  };

  /**
   * Update term field
   * Enforces only ONE active term
   */
  const updateTerm = (
    termId: string,
    field: keyof AcademicTerm,
    value: string | boolean
  ) => {
    formik.setFieldValue(
      'terms',
      formik.values.terms.map((t) => {
        const isTarget =
          String(t.id) === String(termId) ||
          String(t._id) === String(termId);

        if (!isTarget) {
          return field === 'isCurrentlyActive' && value === true
            ? { ...t, isCurrentlyActive: false }
            : t;
        }

        return { ...t, [field]: value };
      })
    );

    if (field === 'isCurrentlyActive' && value === true) {
      formik.setFieldValue('isActive', true);
    }
  };

  /**
   * Holiday helpers
   */
  const addHoliday = (termId: string) => {
    formik.setFieldValue(
      'terms',
      formik.values.terms.map((t) =>
        String(t.id) === String(termId) || String(t._id) === String(termId)
          ? {
              ...t,
              holidays: [
                ...(t.holidays || []),
                {
                  id: crypto.randomUUID(),
                  name: '',
                  date: '',
                  type: 'school',
                },
              ],
            }
          : t
      )
    );
  };

  const removeHoliday = (termId: string, holidayId: string | number) => {
    formik.setFieldValue(
      'terms',
      formik.values.terms.map((t) =>
        String(t.id) === String(termId) || String(t._id) === String(termId)
          ? {
              ...t,
              holidays: (t.holidays || []).filter(
                (h) => String(h.id) !== String(holidayId)
              ),
            }
          : t
      )
    );
  };

  const updateHoliday = (
    termId: string,
    holidayId: string | number,
    field: keyof AcademicHoliday,
    value: string
  ) => {
    formik.setFieldValue(
      'terms',
      formik.values.terms.map((t) =>
        String(t.id) === String(termId) || String(t._id) === String(termId)
          ? {
              ...t,
              holidays: (t.holidays || []).map((h) =>
                String(h.id) === String(holidayId)
                  ? { ...h, [field]: value }
                  : h
              ),
            }
          : t
      )
    );
  };

  const setTerms = (updater: React.SetStateAction<AcademicTerm[]>) => {
    const newTerms =
      typeof updater === 'function' ? updater(formik.values.terms) : updater;
    formik.setFieldValue('terms', newTerms);
  };

  return {
    addTerm,
    removeTerm,
    updateTerm,
    addHoliday,
    removeHoliday,
    updateHoliday,
    setTerms,
  };
};
