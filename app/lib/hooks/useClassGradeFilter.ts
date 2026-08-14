'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import useSWR from 'swr';
import { useUrlFilter } from './useUrlFilter';
import classGradeActions from '../actions/class-grade.actions';
import { ClassGrade } from '../types/class.types';

interface UseClassGradeFilterOptions {
  limit?: number;
  disableUrlSync?: boolean;
}

export function useClassGradeFilter({ limit = 10, disableUrlSync = false }: UseClassGradeFilterOptions = {}) {
  const {
    data,
    isLoading,
    error,
    mutate: mutateClassGrades,
  } = useSWR(
    `/class-grades/school-all?limit=${limit}`,
    () => classGradeActions.fetchClassGradesAll({ limit }),
    { revalidateOnFocus: false }
  );

  const classGrades: ClassGrade[] = useMemo(
    () => (data?.data as ClassGrade[]) || [],
    [data]
  );

  const { value: urlClassGrade, setValue: setUrlClassGrade } = useUrlFilter({
    paramName: 'classGrade',
    defaultValue: undefined,
    setDefaultWhenEmpty: false,
    disableUrlSync,
  });

  const hasClassGradeInUrl =
    typeof urlClassGrade === 'string' && urlClassGrade.trim() !== '';

  const [selectedLocalGrade, setSelectedLocalGrade] = useState<string | undefined>(
    disableUrlSync ? undefined : (hasClassGradeInUrl ? urlClassGrade : undefined)
  );

  const setSelectedClassGrade = useCallback((id?: string) => {
    setSelectedLocalGrade(id);
    if (!disableUrlSync) {
      setUrlClassGrade(id);
    }
  }, [setUrlClassGrade, disableUrlSync]);

  useEffect(() => {
    if (disableUrlSync) return;
    if (urlClassGrade && urlClassGrade !== selectedLocalGrade) {
      setSelectedLocalGrade(urlClassGrade);
    }
  }, [urlClassGrade, selectedLocalGrade, disableUrlSync]);

  useEffect(() => {
    if (disableUrlSync) return;
    if (!hasClassGradeInUrl && classGrades.length > 0) {
      const firstId = classGrades[0]?._id;
      if (typeof firstId === 'string') {
        setSelectedClassGrade(firstId);
      }
    }
  }, [hasClassGradeInUrl, classGrades, setSelectedClassGrade, disableUrlSync]);

  useEffect(() => {
    if (disableUrlSync) return;
    if (
      selectedLocalGrade &&
      selectedLocalGrade !== 'all' &&
      classGrades.length > 0 &&
      !classGrades.some((g) => g._id === selectedLocalGrade)
    ) {
      setSelectedClassGrade(classGrades[0]._id);
    }
  }, [classGrades, selectedLocalGrade, setSelectedClassGrade, disableUrlSync]);

  const shouldShowSkeleton = isLoading && !hasClassGradeInUrl;

  return {
    classGrades,
    classGradeIsLoading: isLoading,
    classGradeError: error,
    mutateClassGrades,
    selectedClassGrade: selectedLocalGrade, 
    setSelectedClassGrade,
    hasClassGradeInUrl,
    shouldShowSkeleton,
  };
}
