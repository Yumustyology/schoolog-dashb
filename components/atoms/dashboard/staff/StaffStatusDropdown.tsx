import React from 'react';
import { SelectDropdown } from '../students/SelectDropdown';

const statuses = [
  { value: 'active', label: 'Active' },
  { value: 'suspended', label: 'Suspended' },
  { value: 'terminated', label: 'Terminated' },
];

export const StaffStatusDropdown = ({
  width = 120,
  className,
}: {
  width?: number;
  className?: string;
}) => {
  return (
    <SelectDropdown
      options={statuses}
      placeholder="Status"
      width={width}
      className={className}
    />
  );
};
