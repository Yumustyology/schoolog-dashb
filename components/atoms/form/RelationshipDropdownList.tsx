'use client';
import { useState } from 'react';
import { Dropdown } from '@/components/atoms/form/Dropdown';


export function RelationshipDropdownList() {

  const [selectedRelationshipType, setSelectedRelationType] = useState('');
  const relationshipTypes = [
    { value: 'father', label: 'Father' },
    { value: 'mother', label: 'Mother' },
    { value: 'sister', label: 'Sister' },
    { value: 'brother', label: 'Brother' },
  ]

  return (
    <>
      <Dropdown label='Relationship' options={relationshipTypes} selectedOption={selectedRelationshipType} onChange={setSelectedRelationType} placeholder="Select relationship" />
    </>
  );
}
