'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { cn } from '@/app/lib/utils';
import { Inter_500, poppins_400 } from '@/app/lib/config/font.config';
import Button from '@/components/atoms/form/Button';
import { AdditionIcon, TermSessionIcon } from '@/components/atoms/icons/Icons';
import useSWR from 'swr';
import termSessionActions from '@/app/lib/actions/term-session.actions';
import { useEntity } from 'simpler-state';
import {
  createTermModalEntity,
  openCreateTermModal,
  closeCreateTermModal,
  editTermModalEntity,
  openEditTermModal,
  closeEditTermModal,
  setTermSessions,
} from '@/app/lib/entities/term-session.entity';
import CreateTermModal from '@/components/molecules/dashboard/term-sessions/CreateTermModal';
import EditTermModal from '@/components/molecules/dashboard/term-sessions/EditTermModal';
import TermCard from '@/components/molecules/dashboard/term-sessions/TermCard';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import SearchInput from '@/components/atoms/form/SearchInput';
import TermCardSkeleton from '@/components/atoms/skeleton/TermCardSkeleton';
import PaginationControl from '@/components/atoms/pagination/PaginationControl';
import { debounce } from 'lodash';

const breadcrumbs = [
//   { label: 'Timetable', href: '/school/timetable', isActive: false },
  { label: 'Term Sessions', isActive: true },
];

function TermSessionsPage() {
  const createModalOpen = useEntity(createTermModalEntity);
  const editModal = useEntity(editTermModalEntity);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [hasEverLoadedData, setHasEverLoadedData] = useState(false);

  // Pagination state
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Debounced search
  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
        setPage(1); // Reset to first page when search changes
      }, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSetSearch(value);
  };

  // Build SWR key with search and pagination parameters
  const termSessionsKey = `/term-sessions?search=${encodeURIComponent(debouncedSearch || '')}&page=${page}&limit=${pageSize}`;

  const { data: termSessionsResp, isValidating } = useSWR(termSessionsKey, () => {
    const query: Record<string, string | number | boolean> = {
      page,
      limit: pageSize,
    };
    if (debouncedSearch) query.search = debouncedSearch;
    return termSessionActions.getAllTermSessions(query);
  });

  const terms = useMemo(() => termSessionsResp?.data?.data || [], [termSessionsResp?.data?.data]);
  const meta = termSessionsResp?.data?.meta || { count: 0 };

  // Calculate total pages
  const computedTotalPages = Math.ceil((meta.count || 0) / pageSize);

  // Track if we've ever loaded data successfully
  useEffect(() => {
    if (termSessionsResp && terms.length > 0) {
      setHasEverLoadedData(true);
    }
  }, [termSessionsResp, terms.length]);

  useEffect(() => {
    if (terms.length > 0) {
      setTermSessions(terms);
    }
  }, [terms]);

  const isSearching = debouncedSearch.trim().length > 0;
  const showNoResults = terms.length === 0 && !isValidating && isSearching;
  const showNoTermsCreated = terms.length === 0 && !isValidating && !isSearching && !hasEverLoadedData;

  return (
    <main className="w-full">
      <div className="flex justify-between items-center">
        <BreadcrumbBox crumbs={breadcrumbs} className="mb-0" />
        <Button
          onClick={openCreateTermModal}
          round
          className="h-[44px] py-3 px-6 flex gap-2 bg-primary text-white"
        >
          <AdditionIcon />
          <span className={cn('text-base', Inter_500.className)}>
            Create Term Session
          </span>
        </Button>
      </div>

      <div className="bg-white min-h-[60dvh] p-6 rounded-xl mt-8">
        {(terms.length > 0 || hasEverLoadedData) && (
          <div className="mb-6">
            <SearchInput
              className="border-gray4 bg-white w-60 h-10"
              placeholder="Search term sessions"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        )}

        {isValidating && terms.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <TermCardSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        ) : showNoResults ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-6">
              <TermSessionIcon />
            </div>
            <p className={cn('text-lg font-semibold text-black1 mb-2', Inter_500.className)}>
              No term sessions found for &quot;{debouncedSearch}&quot;
            </p>
            <p className={cn('text-sm text-gray-600', poppins_400.className)}>
              Try adjusting your search terms
            </p>
          </div>
        ) : showNoTermsCreated ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-6">
              <TermSessionIcon />
            </div>
            <p className={cn('text-lg font-semibold text-black1 mb-2', Inter_500.className)}>
              No term sessions found
            </p>
            <p className={cn('text-sm text-gray-600', poppins_400.className)}>
              You haven&apos;t created any term sessions yet. <br />
              Click the button above to create your first term session.
            </p>
          </div>
        ) : terms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-6">
              <TermSessionIcon />
            </div>
            <p className={cn('text-lg font-semibold text-black1 mb-2', Inter_500.className)}>
              No term sessions found
            </p>
            <p className={cn('text-sm text-gray-600', poppins_400.className)}>
              You haven&apos;t created any term sessions yet. <br />
              Click the button above to create your first term session.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {terms.map((term) => (
                <TermCard
                  key={term._id}
                  term={term}
                  onEdit={(term) => openEditTermModal(term)}
                />
              ))}
            </div>

            {computedTotalPages > 1 && (
              <div className="mt-6">
                <PaginationControl
                  totalPages={computedTotalPages}
                  currentPage={page}
                  setCurrentPage={(p) => setPage(p)}
                  pageSize={pageSize}
                  onPageSizeChange={(s) => {
                    setPageSize(s);
                    setPage(1);
                  }}
                  hasNextPage={page < computedTotalPages}
                  hasPrevPage={page > 1}
                  recordLength={meta.count || terms.length}
                />
              </div>
            )}
          </>
        )}
      </div>

      <CreateTermModal
        open={createModalOpen}
        close={closeCreateTermModal}
      />

      <EditTermModal
        open={editModal.open}
        close={closeEditTermModal}
        term={editModal.term}
      />
    </main>
  );
}

export default TermSessionsPage;
