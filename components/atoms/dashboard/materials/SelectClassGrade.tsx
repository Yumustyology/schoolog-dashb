import * as React from 'react';
import { ClassGradeDropdown } from '@/components/atoms/dashboard/classes/ClassGradeDropdown';

/**
 * @deprecated Use ClassGradeDropdown from '@/components/atoms/dashboard/classes/ClassGradeDropdown' instead
 * This component is kept for backward compatibility but now uses the new ClassGradeDropdown with SWR
 */
export function SelectClassGrade({
  className,
  value,
  onValueChange,
}: {
  className?: string;
  value?: string;
  onValueChange?: (v: string) => void;
}) {
  return (
    <ClassGradeDropdown
      className={className}
      value={value}
      onValueChange={(v) => onValueChange?.(Array.isArray(v) ? v[0] ?? '' : v)}
      placeholder="Select class grade"
    />
  );
}
