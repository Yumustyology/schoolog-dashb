'use client';
import { useState } from 'react';
import { Dropdown } from '@/components/atoms/form/Dropdown';

export function NonTeachingStaffDropdownRole() {
  const [selectedRole, setSelectedRole] = useState('');
  const roles = [
    { value: 'operation', label: 'Operation' },
    { value: 'finance', label: 'Finance' },
    { value: 'customerSupport', label: 'Customer Support' },
    { value: 'accountant', label: 'Accountant' },
  ];

  return (
    <>
      <Dropdown
        label="Role"
        options={roles}
        selectedOption={selectedRole}
        onChange={setSelectedRole}
        placeholder="Select role"
      />
    </>
  );
}
