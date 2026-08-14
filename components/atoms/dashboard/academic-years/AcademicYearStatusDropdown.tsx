import React from 'react';
import SelectComp from '../../form/Select';

const STATUS_OPTIONS = [
  { name: 'All Statuses', id: 'all' },
  { name: 'Active', id: 'active' },
  { name: 'Completed', id: 'completed' },
  { name: 'Upcoming', id: 'upcoming' },
];

export const AcademicYearStatusDropdown: React.FC<{
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}> = ({ value = '', onChange = () => {}, className }) => {
  return (
    <SelectComp
      triggerClasses='h-[38px]'
      options={STATUS_OPTIONS}
      value={value}
      onValueChange={onChange}
      className={className}
    />
  );
};
