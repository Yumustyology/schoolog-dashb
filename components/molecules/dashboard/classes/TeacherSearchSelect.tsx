'use client';

import React from 'react';
import AsyncSearchSelect, { SearchSelectOption } from '@/components/atoms/form/AsyncSearchSelect';
import staffActions from '@/app/lib/actions/staff.action';

type Selected = { id: string; name: string }[];

// Staff has no server-side search, so we fetch once and filter client-side —
// fine for a school's teacher roster, which is never large enough to page.
let teacherCache: SearchSelectOption[] | null = null;

async function searchTeachers(query: string): Promise<SearchSelectOption[]> {
  if (!teacherCache) {
    const res = await staffActions.fetchSchoolStaff();
    teacherCache = (res.data || [])
      .filter((s) => s.isTeachingStaff)
      .map((s) => ({ id: s._id, label: `${s.firstName} ${s.lastName}`.trim(), subLabel: s.email }));
  }
  const q = query.trim().toLowerCase();
  const filtered = q
    ? teacherCache.filter(
        (t) => t.label.toLowerCase().includes(q) || t.subLabel?.toLowerCase().includes(q)
      )
    : teacherCache;
  return filtered.slice(0, 20);
}

export default function TeacherSearchSelect({ value, onChange }: { value: Selected; onChange: (s: Selected) => void; }) {
  const selected = value.length > 0 ? { id: value[0].id, label: value[0].name } : null;

  return (
    <AsyncSearchSelect
      cacheKey="teachers"
      placeholder="Search teacher"
      emptyText="No teachers found"
      value={selected}
      onChange={(option) => onChange(option ? [{ id: option.id, name: option.label }] : [])}
      fetchOptions={searchTeachers}
    />
  );
}
