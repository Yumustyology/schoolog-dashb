import React from 'react';
import { SelectDropdown } from '../students/SelectDropdown';

const paymentStatuses = [
  { value: 'cleared', label: 'Cleared' },
  { value: 'pending', label: 'Pending' },
  { value: 'due', label: 'Due' },
];

export const PaymentStatusDropdownList = ({
  width = 150,
  className,
}: {
  width?: number;
  className?: string;
}) => {
  return (
    <SelectDropdown
      options={paymentStatuses}
      placeholder="Payment Status"
      width={width}
      className={className}
    />
  );
};
