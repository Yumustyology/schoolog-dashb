'use client';

import React from 'react';
import AsyncSearchSelect, { SearchSelectOption } from '@/components/atoms/form/AsyncSearchSelect';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';
import { fetchStudents } from '@/app/lib/actions/student.actions';
import staffActions, { StaffListItem } from '@/app/lib/actions/staff.action';

export type Borrower = {
  id: string;
  name: string;
  type: 'Student' | 'Staff';
};

type Props = {
  value: Borrower | null;
  onChange: (borrower: Borrower | null) => void;
};

let staffCache: StaffListItem[] | null = null;

async function searchStudents(query: string): Promise<SearchSelectOption[]> {
  const res = await fetchStudents({ search: query, limit: 15 });
  return (res.data || []).map((s) => {
    const record = s as Record<string, unknown>;
    return {
      id: String(record._id),
      label: `${(record.firstName as string) || ''} ${(record.lastName as string) || ''}`.trim() || 'Unnamed',
    };
  });
}

async function searchStaff(query: string): Promise<SearchSelectOption[]> {
  if (!staffCache) {
    const res = await staffActions.fetchSchoolStaff();
    staffCache = res.data || [];
  }
  const q = query.trim().toLowerCase();
  const options = staffCache.map((s) => ({
    id: s._id,
    label: `${s.firstName} ${s.lastName}`.trim(),
  }));
  const filtered = q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
  return filtered.slice(0, 15);
}

export default function BorrowerSearchSelect({ value, onChange }: Props) {
  const [audience, setAudience] = React.useState<'Student' | 'Staff'>(value?.type ?? 'Student');

  const selected: SearchSelectOption | null = value ? { id: value.id, label: value.name } : null;

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-2">
        {(['Student', 'Staff'] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => {
              setAudience(type);
              onChange(null);
            }}
            className={cn(
              'text-xs px-3 py-1.5 rounded-full border',
              poppins_400.className,
              audience === type
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray6 border-gray4'
            )}
          >
            {type}
          </button>
        ))}
      </div>

      <AsyncSearchSelect
        cacheKey={`borrower-${audience}`}
        placeholder={`Search ${audience.toLowerCase()}...`}
        emptyText={`No ${audience.toLowerCase()} found`}
        value={selected}
        onChange={(option) => onChange(option ? { id: option.id, name: option.label, type: audience } : null)}
        fetchOptions={audience === 'Student' ? searchStudents : searchStaff}
      />
    </div>
  );
}
