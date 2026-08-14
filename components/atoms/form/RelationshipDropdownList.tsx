'use client';
import { useEffect, useState } from 'react';
import { Dropdown } from '@/components/atoms/form/Dropdown';

type Props = {
  value?: string | null;
  onChange?: (v: string | null) => void;
};

export function RelationshipDropdownList({ value, onChange }: Props) {
  const [selectedRelationshipType, setSelectedRelationType] = useState<string>(
    value || ''
  );
  const relationshipTypes = [
    { value: 'Father', label: 'Father' },
    { value: 'Mother', label: 'Mother' },
    { value: 'Guardian', label: 'Guardian' },
    { value: 'Other', label: 'Other' },
  ];

  useEffect(() => {
    setSelectedRelationType(value || '');
  }, [value]);

  const handleChange = (v: string) => {
    setSelectedRelationType(v);
    onChange?.(v || null);
  };

  return (
    <>
      <Dropdown
        label="Relationship"
        options={relationshipTypes}
        selectedOption={selectedRelationshipType}
        onChange={handleChange}
        placeholder="Select relationship"
      />
    </>
  );
}
