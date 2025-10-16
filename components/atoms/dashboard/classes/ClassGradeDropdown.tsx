
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
import { Inter_400, poppins_400 } from '@/app/lib/config/font.config';
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
  const poppinsFont = poppins_400.className;

  if (multiselect) {
    // Multi-select mode
    let multiOptions: OptionType[] = Array.isArray(options) ? options : [];
    let multiValue = multiOptions.filter(opt => Array.isArray(value) && value.includes(opt.value));
    let multiPlaceholder = placeholder;
    const isMultiLoading = isLoading;

    // Only show loading if SWR is loading
    if (isMultiLoading) {
      multiOptions = [{ value: 'loading', label: 'Loading...' }];
      multiValue = [];
      multiPlaceholder = 'Loading...';
    } else if (!isMultiLoading && multiOptions.length === 0) {
      multiOptions = [{ value: 'no-classes', label: 'No classes available' }];
      multiValue = [];
      multiPlaceholder = 'No classes available';
    }

    return (
      <div className={cn('min-w-[130px]', poppinsFont, className)} style={{ fontSize: '14px', minHeight: '56px' }}>
        <DropdownMultiSelect
          options={multiOptions}
          value={multiValue}
          onChange={(vals) => {
            // Prevent selection of loading/no-classes
            const filtered = vals.filter(v => v.value !== 'loading' && v.value !== 'no-classes');
            if (onValueChange) onValueChange(filtered.map((v) => v.value));
          }}
          placeholder={multiPlaceholder}
          isSearchable={true}
          className={cn(poppinsFont)}
          style={{ fontSize: '14px', minHeight: '560px', fontFamily: poppins_400.style.fontFamily }}
        />
      </div>
    );
  }

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
