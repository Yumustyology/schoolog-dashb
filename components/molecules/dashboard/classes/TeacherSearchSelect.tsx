'use client';

import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';
import { fetchTeachers, Teacher } from '@/app/(pages)/(dashboards)/school/classes/mock/teachers';
import SearchInput from '@/components/atoms/form/SearchInput';
import Image from 'next/image';
import ScrollPaginator from '@/components/molecules/ScrollPaginator';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';

type Selected = { id: string; name: string }[];

export default function TeacherSearchSelect({ value, onChange }: { value: Selected; onChange: (s: Selected) => void; }) {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // debounce typing to avoid too many requests
  useEffect(() => {
    const d = debounce((v: string) => setQuery(v), 300);
    d(search);
    return () => d.cancel();
  }, [search]);

  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleDocKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('click', handleDocClick);
    document.addEventListener('keydown', handleDocKey);
    return () => {
      document.removeEventListener('click', handleDocClick);
      document.removeEventListener('keydown', handleDocKey);
    };
  }, []);

  const key = useMemo(() => `teachers-search=${query}`, [query]);

  // single-select: clicking an item selects it and closes the dropdown
  const renderItem = useCallback((t: Teacher) => {
    const selected = value.length > 0 && value[0].id === t.id;
    return (
      <div
        key={t.id}
        className={cn('flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer', poppins_400.className)}
        onClick={() => {
          if (selected) {
            onChange([]);
          } else {
            onChange([{ id: t.id, name: t.name }]);
            setOpen(false);
          }
        }}
      >
        <div className="flex items-center gap-3">
          <Image src={t.teacherImg || '/assets/images/avatar.png'} alt={t.name} width={36} height={36} className="rounded-full" />
          <div>
            <div className={cn('text-sm text-[#111827]', poppins_400.className)}>{t.name}</div>
            <div className={cn('text-xs text-gray-500', poppins_400.className)}>{t.email}</div>
          </div>
        </div>
        <div className="text-sm text-gray-500">{selected ? 'Selected' : ''}</div>
      </div>
    );
  }, [value, onChange]);

  return (
    <div className="w-full relative" ref={wrapperRef}>
      <div onClick={() => setOpen((o) => !o)}>
        <SearchInput
          placeholder="Search teacher"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          className="border border-[#E0E0E0] rounded-lg p-3"
        />
      </div>

      {open && (
        <div className="absolute z-40 left-0 right-0 mt-2 bg-white border border-gray-100 rounded shadow max-h-[260px]">
          <ScrollPaginator<Teacher>
            key={key}
            swrKey={key}
            fetchPage={async (page, limit) => await fetchTeachers({ page, limit, search: query })}
            renderItem={renderItem}
            loader={3}
            limit={20}
            containerMaxHeight="260px"
          />
        </div>
      )}
    </div>
  );
}
