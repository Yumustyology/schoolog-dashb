'use client';
import { useState } from 'react';
import { Dropdown } from '@/components/atoms/form/Dropdown';


export function BanksDropdownList() {

  const [selectedBank, setSelectedBank] = useState('');
  const banks = [
    { value: 'jaiz', label: 'Jaiz Bank' },
    { value: 'first', label: 'First Bank' },
    { value: 'wema', label: 'Wema Bank' },
    { value: 'access', label: 'Access Bank' },
  ]

  return (
    <>
      <Dropdown label='Bank name' options={banks} selectedOption={selectedBank} onChange={setSelectedBank} placeholder="Select role" />
    </>
  );
}
