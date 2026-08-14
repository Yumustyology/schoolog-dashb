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
// import classGradeActions from '@/app/lib/actions/class-grade.actions';
import { ClassGrade, ClassGradeResponse } from '@/app/lib/types/class.types';
// import { ResponseType } from '@/app/lib/types/response';
import { useClassGradeFilter } from '@/app/lib/hooks/useClassGradeFilter';

interface ClassGradeDropdownProps {
  className?: string;
  value?: string | string[];
  onValueChange?: (v: string | string[]) => void;
  placeholder?: string;
  multiselect?: boolean;
  initFirst?: boolean;
  /** When true include an "All" option with id 'all' at the start */
  full?: boolean;
  /** When true initialize the value (uses 'all' when `full` is true) */
  init?: boolean;
}

export function ClassGradeDropdown({
  className,
  value,
  onValueChange,
  placeholder = 'Select class/level',
  multiselect = false,
  initFirst,
  full = false,
  init = false,
}: ClassGradeDropdownProps) {
  const { classGrades, classGradeIsLoading: isLoading } = useClassGradeFilter({ limit: -1 });


  const options: OptionType[] = classGrades.map((cg) => ({
    value: String((cg as ClassGrade)?._id ?? ''),
    label: String((cg as ClassGrade)?.name ?? ''),
  }));

  // If `full` is enabled and classes have loaded, add an "All" option at the start
  const fullOptions: OptionType[] = classGrades && classGrades.length > 0
    ? [{ value: 'all', label: 'All' }, ...options]
    : options;

  const fontClass = Inter_400.className;
  const poppinsFont = poppins_400.className;

  React.useEffect(() => {
    const shouldInit = Boolean(init || initFirst);
    if (
      shouldInit &&
      !isLoading &&
      classGrades.length > 0 &&
      typeof value !== 'string' &&
      !Array.isArray(value)
    ) {
      // If full mode is enabled, initialize to the 'all' option, otherwise first class
      if (full) onValueChange?.('all');
      else onValueChange?.(classGrades[0]._id);
    }
  }, [initFirst, init, isLoading, classGrades, onValueChange, value, full]);

  if (multiselect) {
    let multiOptions: OptionType[] = Array.isArray(options) ? options : [];
    let multiValue = multiOptions.filter(opt => Array.isArray(value) && value.includes(opt.value));
    let multiPlaceholder = placeholder;

    if (isLoading) {
      multiOptions = [{ value: 'loading', label: 'Loading...' }];
      multiValue = [];
      multiPlaceholder = 'Loading...';
    } else if (!isLoading && multiOptions.length === 0) {
      multiOptions = [{ value: 'no-classes', label: 'No classes available' }];
      multiValue = [];
      multiPlaceholder = 'No classes available';
    }

    // Prepend 'All' when full mode is enabled and classes have loaded
    if (full && !isLoading && classGrades && classGrades.length > 0) {
      multiOptions = [{ value: 'all', label: 'All' }, ...multiOptions];
      multiValue = multiOptions.filter(opt => Array.isArray(value) && value.includes(opt.value));
    }

    return (
      <div className={cn('min-w-[130px]', poppinsFont, className)} style={{ fontSize: '14px', minHeight: '56px' }}>
        <DropdownMultiSelect
          options={multiOptions}
          value={multiValue}
          onChange={(vals) => {
            const filtered = vals.filter(v => v.value !== 'loading' && v.value !== 'no-classes');
            onValueChange?.(filtered.map((v) => v.value));
          }}
          placeholder={multiPlaceholder}
          isSearchable
          className={cn(poppinsFont)}
          style={{ fontSize: '14px', minHeight: '560px', fontFamily: poppins_400.style.fontFamily }}
        />
      </div>
    );
  }

  return (
    <Select
      value={typeof value === 'string' ? value : ''}
      onValueChange={(v) => onValueChange?.(v)}
    >
      <SelectTrigger className={cn('rounded-full min-w-[130px]', fontClass, className)}>
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
            // If full mode is enabled, render the 'All' option first
            (full ? fullOptions : options).map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
