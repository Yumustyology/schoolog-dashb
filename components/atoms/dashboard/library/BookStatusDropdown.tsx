import React from 'react';
import { SelectDropdown } from '../students/SelectDropdown';

const availabeBookstatuses = [
  { value: 'available', label: 'Available' },
  { value: 'outOfStock', label: 'Out of Stock' },
  { value: 'archived', label: 'Archived' },
];
const borrowedBooksStatuses = [
  { value: 'due', label: 'Due' },
  { value: 'pending', label: 'Pending' },
];
export const BookStatusDropdown = ({
  type = 'available',
}: {
  type: 'available' | 'borrowed';
}) => {
  return (
    <div>
      {type === 'available' ? (
        <SelectDropdown
          options={availabeBookstatuses}
          placeholder="Status"
          width={150}
        />
      ) : (
        <SelectDropdown
          options={borrowedBooksStatuses}
          placeholder="Status"
          width={150}
        />
      )}
    </div>
  );
};
