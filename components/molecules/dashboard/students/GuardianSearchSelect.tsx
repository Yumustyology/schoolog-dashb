'use client';

import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import useSWR from 'swr';
import debounce from 'lodash/debounce';
import SearchInput from '@/components/atoms/form/SearchInput';
import Image from 'next/image';
import ScrollPaginator from '@/components/molecules/ScrollPaginator';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';
import { fetchGuardians } from '@/app/lib/actions/guardian.actions';

export type GuardianItem = {
  id?: string;
  _id?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  phone?: string;
  relationship?: string;
  wards?: Array<{ firstName?: string; lastName?: string }> | null;
  guardianSlugId?: string;
  address?: string | null;
};

type Props = {
  value?: GuardianItem | string | null;
  onChange: (g: GuardianItem | string | null) => void;
  /** When false, do not populate the input from a selected Guardian object value */
  showSelectedInInput?: boolean;
  className?: string;
  placeholder?: string;
  label?: string;
  labelClassName?: string;
  /** optional class applied to the popover wrapper (use to control initial height) */
  popoverClassName?: string;
  /** optional class applied when there are no items (e.g. 'h-auto' or 'max-h-20') */
  initialPopoverClassName?: string;
  /** max-height for the list when items exist (e.g. '260px') */
  listMaxHeight?: string;
};

export default function GuardianSearchSelect({
  value,
  onChange,
  className,
  showSelectedInInput = true,
  placeholder,
  label,
  labelClassName,
  popoverClassName,
  initialPopoverClassName,
  listMaxHeight,
}: Props) {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // debounce input
  useEffect(() => {
    const d = debounce((v: string) => setQuery(v), 300);
    d(search);
    return () => d.cancel();
  }, [search]);

  const acceptTypedIfNoResults = useCallback(async () => {
    try {
      if (search.trim().length > 0) {
        const resp = await fetchGuardians({ page: 1, limit: 1, search });
        const items = (resp?.data || []) as GuardianItem[];
        if ((items?.length ?? 0) === 0) {
          onChange(search);
        }
      }
    } catch {
      // ignore
    } finally {
      setOpen(false);
    }
  }, [search, onChange]);

  useEffect(() => {
    function handleDocKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        void acceptTypedIfNoResults();
      }
    }

    document.addEventListener('keydown', handleDocKey);
    return () => {
      document.removeEventListener('keydown', handleDocKey);
    };
  }, [acceptTypedIfNoResults]);

  const key = useMemo(() => `guardian-list-${query}`, [query]);

  const { data: swrResp, isLoading } = useSWR(
    key,
    async () => {
      const resp = await fetchGuardians({ page: 1, limit: 20, search: query });
      return resp;
    },
    { revalidateOnFocus: false, shouldRetryOnError: false }
  );

  const hasItems = !!(swrResp && (swrResp?.data || []).length > 0);

  // keep local search state in sync with incoming `value` so the input is always editable
  useEffect(() => {
    if (typeof value === 'string') {
      setSearch(value);
    } else if (value && typeof value === 'object') {
      if (showSelectedInInput) {
        const name = (value.firstName || value.name) ? `${value.firstName || ''} ${value.lastName || ''}`.trim() || value.name || '' : '';
          setSearch(name || '');
      } else {
        // keep input empty while still treating the guardian as selected
        setSearch('');
      }
    } else if (value === null) {
      setSearch('');
    }
  }, [value, showSelectedInInput]);

  const renderItem = useCallback(
    (g: GuardianItem) => {
      const gid = g._id || '';
      const selected = !!value && typeof value !== 'string' && (value._id === gid);
      return (
        <div
          key={gid}
          className={cn('flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer', poppins_400.className)}
          onMouseDown={(e) => {
            // Prevent the input from blurring before the click fires so
            // selecting an item works immediately without requiring typing.
            // This stops the onBlur handler from assuming a typed value
            // when the user actually clicked an item in the list.
            e.preventDefault();
          }}
          onClick={() => {
            if (selected) {
              onChange(null);
            } else {
              onChange(g);
              setOpen(false);
            }
          }}
        >
          <div className="flex items-center gap-3">
            <Image src={'/assets/images/avatar.png'} alt={g.name || `${g.firstName || ''} ${g.lastName || ''}`} width={36} height={36} className="rounded-full" />
            <div>
              <div className={cn('text-sm text-[#111827]', poppins_400.className)}>{g.firstName || g.name || ''} {g.lastName || ''}</div>
              <div className={cn('text-xs text-gray-500', poppins_400.className)}>{g.email || g.phoneNumber || g.phone}</div>
            </div>
          </div>
          <div className="text-sm text-gray-500">{selected ? 'Selected' : ''}</div>
        </div>
      );
    },
    [value, onChange]
  );

  return (
    <div className={className || 'w-full relative'}>
      {label && (
        <label
          className={cn('block text-left w-full font-nunito text-base mb-3', poppins_400.className, labelClassName)}
        >
          {label}
        </label>
      )}
      <div ref={wrapperRef}>
      <div>
        <SearchInput
          placeholder={placeholder || 'Search guardian'}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
            // when typing, if parent provided a selected guardian object, clear it
            if (typeof value !== 'string' && value) onChange(null);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            // defer a tick so document.activeElement reflects the new focus
            setTimeout(() => {
              if (!wrapperRef.current) return;
              const active = document.activeElement as Element | null;
              if (!active || !wrapperRef.current.contains(active)) {
                void acceptTypedIfNoResults();
              }
            }, 0);
          }}
          className="border border-[#E0E0E0] rounded-lg p-3"
        />
      </div>

      {open && (
        <div
          className={cn(
            'absolute z-40 left-0 right-0 mt-2 bg-white border border-gray-100 rounded shadow h-auto',
            poppins_400.className,
            // when there are items, ensure the popover can scroll; otherwise allow parent to pass initial sizing class
            !hasItems ? initialPopoverClassName : undefined,
            popoverClassName
          )}
        >
          {isLoading && (
            <div className="p-3 text-center text-sm text-gray-500">Loading...</div>
          )}
          <ScrollPaginator<GuardianItem>
            key={key}
            swrKey={key}
            fetchPage={async (page, limit) => {
              const resp = await fetchGuardians({ page, limit, search: query });
              console.log(resp)
              // map axios response to ScrollPaginator shape
              const items = (resp?.data || []) as GuardianItem[];
              const total = resp?.meta?.count ?? items.length;
              return { items, total, page, limit };
            }}
            renderItem={renderItem}
            loader={3}
            limit={20}
            containerMaxHeight={hasItems ? (listMaxHeight ?? '260px') : undefined}
            disableContainer={!hasItems}
          />

          {/* Note: typed fallback is accepted automatically on blur/outside-click/escape when there are no results */}
        </div>
      )}
      </div>
    </div>
  );
}

