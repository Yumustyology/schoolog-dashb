import * as React from 'react';
import useSWR from 'swr';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Inter_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import classGradeActions from '@/app/lib/actions/class-grade.actions';
import { ClassGrade } from '@/app/lib/types/class.types';
import { ResponseType } from '@/app/lib/types/response';

type ClassGradeResponse = {
  data?: ClassGrade[];
};

export function ClassGradeDropdown({
  className,
  value,
  onValueChange,
  placeholder = 'Select class/level',
}: {
  className?: string;
  value?: string;
  onValueChange?: (v: string) => void;
  placeholder?: string;
}) {
  const swrKey = '/class-grades/all';

  const { data, isLoading } = useSWR(swrKey, () =>
    classGradeActions.fetchClassGradesAll({ limit: -1 })
  );

  const resp = data as ResponseType<ClassGradeResponse> | undefined;
  const classGrades: ClassGrade[] = (resp?.data?.data as ClassGrade[]) || [];

  return (
    <Select value={value} onValueChange={(v) => onValueChange && onValueChange(v)}>
      <SelectTrigger
        className={cn(
          'rounded-full min-w-[130px]',
          Inter_400.className,
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={Inter_400.className}>
        <SelectGroup>
          {isLoading ? (
            <SelectItem value="loading" disabled>
              Loading...
            </SelectItem>
          ) : classGrades.length === 0 ? (
            <SelectItem value="no-classes" disabled>
              No classes available
            </SelectItem>
          ) : (
            classGrades.map((classGrade) => (
              <SelectItem key={classGrade._id} value={classGrade._id}>
                {classGrade.name} 
                {/* {classGrade.level ? `- ${classGrade.level}` : ''} */}
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
