import React from 'react';
import useSWR from 'swr';
import { poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import DropdownMultiSelect, {
  OptionType,
} from '../../form/DropdownMultiSelect';
import studentActions from '@/app/lib/actions/student.actions';
import { MultiValue } from 'react-select';

type SelectedStudentsProps = {
  selectedStudentIds: string[];
  onChange: (ids: string[]) => void;
  classGradeId?: string;
};

export const SelectedStudents = ({
  selectedStudentIds,
  onChange,
  classGradeId,
}: SelectedStudentsProps) => {
  const { data, isLoading } = useSWR(
    ['students-picker', classGradeId],
    () => studentActions.fetchStudents({ classGradeId, limit: 200 })
  );

  const students = (data?.data || []) as Record<string, unknown>[];

  const options: OptionType[] = students.map((s) => ({
    value: String(s._id ?? ''),
    label: `${String(s.firstName ?? '')} ${String(s.lastName ?? '')}`.trim(),
  }));

  const value: MultiValue<OptionType> = options.filter((o) =>
    selectedStudentIds.includes(o.value)
  );

  return (
    <div>
      <div className="mt-10">
        <div className="max-w-sm mx-auto">
          <p className={cn('text-base text-gray1 mb-2', poppins_400.className)}>
            Select Students
          </p>
          <DropdownMultiSelect
            options={options}
            value={value}
            onChange={(newValue) => onChange(newValue.map((v) => v.value))}
            placeholder={isLoading ? 'Loading students…' : 'Search students...'}
          />
        </div>
      </div>
    </div>
  );
};
