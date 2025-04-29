'use client';
import { useState } from 'react';
import { Dropdown } from '@/components/atoms/form/Dropdown';


export function TeachersRoleDropdownList() {

  const [selectedRole, setSelectedRole] = useState('');
  const roles = [
    { value: 'headTeacher', label: 'Head Teacher' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'principal', label: 'Principal' },
    { value: 'vicePrincipal', label: 'Vice Principal' },
  ]

  return (
    <>
      <Dropdown label='Role' options={roles} selectedOption={selectedRole} onChange={setSelectedRole} placeholder="Select role" />
    </>
  );
}
