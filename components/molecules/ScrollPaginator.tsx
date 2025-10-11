'use client';

import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

type Props<T> = {
  /**
   * The base key prefix for SWR caching.
   * Example: "schools?search=abc"
   */
  swrKey: string;
  /**
   * Function to fetch a page.
   */
  fetchPage: (
    page: number,
    limit: number
  ) => Promise<{
    items: T[];
    total: number;
    page: number;
    limit: number;
  }>;
  /**
   * Render each item.
   */
  renderItem: (item: T) => React.ReactNode;
  /**
   * Optional page size (default: 10)
   */
  limit?: number;
};

export default function ScrollPaginator<T>({
  swrKey,
  fetchPage,
  renderItem,
  limit = 10,
}: Props<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<T[]>([]);
  const [total, setTotal] = useState(0);

  const fullKey = `${swrKey}&page=${page}&limit=${limit}`;

  const { data, error, isValidating } = useSWR(
    fullKey,
    async () => {
      return await fetchPage(page, limit);
    },
    { revalidateOnFocus: false, dedupingInterval: 0 }
  );

  const isLoading = !data && !error && isValidating;

  // accumulate pages: when page === 1 replace, otherwise append
  useEffect(() => {
    if (!data) return;
    if (page === 1) {
      setItems(data.items);
    } else {
      setItems((prev) => [...prev, ...data.items]);
    }
    setTotal(data.total || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const hasMore = items.length < total;

  // infinite scroll logic
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      if (!el) return;
      const bottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      if (bottom < 120 && !isLoading && hasMore) {
        setPage((p) => p + 1);
      }
    };

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [isLoading, hasMore]);

  return (
    <div ref={containerRef} style={{ maxHeight: '60vh', overflow: 'auto' }}>
      <div className="space-y-3">
        {items.map((it, idx) => (
          <div key={(it as any)?._id || idx}>{renderItem(it)}</div>
        ))}
      </div>

      {(isLoading || isValidating) && (
        <div className="py-4 text-center text-gray-500">Loading...</div>
      )}
      {!hasMore && (
        <div className="py-4 text-center text-gray-500 hidden">No more results</div>
      )}
    </div>
  );
}
