'use client';
import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';

export function usePaginatedSearch() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [hasEverLoadedData, setHasEverLoadedData] = useState(false);

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
      }, 500),
    []
  );

  useEffect(() => () => debouncedSetSearch.cancel(), [debouncedSetSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSetSearch(value);
  };

  return {
    search,
    debouncedSearch,
    setSearch,
    handleSearchChange,
    page,
    setPage,
    pageSize,
    setPageSize,
    hasEverLoadedData,
    setHasEverLoadedData,
  };
}
