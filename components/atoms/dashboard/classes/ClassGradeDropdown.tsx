
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
import DropdownMultiSelect, { OptionType } from '@/components/atoms/form/DropdownMultiSelect';
import { Inter_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import classGradeActions from '@/app/lib/actions/class-grade.actions';
import { ClassGrade } from '@/app/lib/types/class.types';
import { ResponseType } from '@/app/lib/types/response';

type ClassGradeResponse = {
  data?: ClassGrade[];
};

interface ClassGradeDropdownProps {
  className?: string;
  value?: string | string[];
  onValueChange?: (v: string | string[]) => void;
  placeholder?: string;
  multiselect?: boolean;
}

export function ClassGradeDropdown({
  className,
  value,
  onValueChange,
  placeholder = 'Select class/level',
  multiselect = false,
}: ClassGradeDropdownProps) {
  const swrKey = '/class-grades/all';
  const { data, isLoading } = useSWR(swrKey, () =>
    classGradeActions.fetchClassGradesAll({ limit: -1 })
  );
  const resp = data as ResponseType<ClassGradeResponse> | undefined;
  const classGrades: ClassGrade[] = (resp?.data?.data as ClassGrade[]) || [];
  const options: OptionType[] = classGrades.map((cg) => ({ value: cg._id, label: cg.name }));

  // Font usage
  const fontClass = Inter_400.className;

  if (multiselect) {
    // Multi-select mode
    return (
      <DropdownMultiSelect
        options={options}
        value={options.filter(opt => Array.isArray(value) && value.includes(opt.value))}
        onChange={(vals) => onValueChange && onValueChange(vals.map((v) => v.value))}
        placeholder={placeholder}
        isSearchable={true}
      />
    );
  }

  // Single-select mode
  return (
    <Select value={typeof value === 'string' ? value : ''} onValueChange={(v) => onValueChange && onValueChange(v)}>
      <SelectTrigger
        className={cn(
          'rounded-full min-w-[130px]',
          fontClass,
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={fontClass}>
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
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
