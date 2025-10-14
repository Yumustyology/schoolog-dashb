import React from 'react';
import FormSectionHeader from './FormSectionHeader';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';
import DropdownMultiSelect, { OptionType } from '@/components/atoms/form/DropdownMultiSelect';
import { createSubjectEntity } from '@/app/lib/entities/subject.entity';
import { useEntity } from 'simpler-state';


const periodOptions: OptionType[] = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
];

function Step3() {
  const createSubject = useEntity(createSubjectEntity);

  // Use entity timetable (default initialized to Mon-Fri in the entity)
  const entries = createSubject.timetable || [
    { day: 'Monday', periods: [] },
    { day: 'Tuesday', periods: [] },
    { day: 'Wednesday', periods: [] },
    { day: 'Thursday', periods: [] },
    { day: 'Friday', periods: [] },
  ];

  const updateEntryPeriods = (idx: number, periods: number[]) => {
    const next = entries.map((e, i) => (i === idx ? { ...e, periods } : e));
    createSubjectEntity.set((prev) => ({ ...prev, timetable: next }));
  };

  return (
    <div>
      <FormSectionHeader title={"Timetable"} description={"Select the day and time for your subject"} />

      <div className="space-y-4">
        {entries.map((entry, idx) => (
          <div key={entry.day} className="p-2 rounded">
            <div className="flex gap-4 items-end">
              <div className="w-1/4">
                <label className={cn('text-sm text-gray6 mb-2 block', poppins_400.className)}>Day</label>
                <div className="text-sm font-medium">{entry.day}</div>
              </div>

              <div className="w-3/4">
                <label className={cn('text-sm text-gray6 mb-2 block', poppins_400.className)}>Periods</label>
                <DropdownMultiSelect
                  options={periodOptions}
                  value={(entry.periods || []).map((p) => ({ value: String(p), label: String(p) }))}
                  onChange={(vals) => updateEntryPeriods(idx, vals.map((v) => Number(v.value)))}
                  placeholder="Select periods"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Step3;
