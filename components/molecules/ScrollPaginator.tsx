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
  /**
   * Optional loader: either a ReactNode to render while loading or a number
   * indicating how many skeleton items to render.
   */
  loader?: React.ReactNode | number;
  /**
   * When true, the paginator will not render its own scroll container
   * and will not attach internal scroll listeners. Useful when the
   * caller wants to control scrolling in a parent element (e.g. a dropdown).
   */
  disableContainer?: boolean;
  /**
   * Optional CSS value for the container max-height (e.g. '260px' or '60vh').
   */
  containerMaxHeight?: string;
};

export default function ScrollPaginator<T>({
  swrKey,
  fetchPage,
  renderItem,
  limit = 10,
  loader,
  disableContainer = false,
  containerMaxHeight,
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
      // Prepend new page results so the newest loaded items appear at the top
      setItems((prev) => [...data.items, ...prev]);
      // after DOM updates, scroll the container to the top so the newly loaded
      // items are visible starting from the top
      requestAnimationFrame(() => {
        const el = containerRef.current;
        if (el) el.scrollTop = 0;
      });
    }
    setTotal(data.total || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const hasMore = items.length < total;

  // infinite scroll logic
  useEffect(() => {
    if (disableContainer) return; // caller will handle scrolling
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      if (!el) return;
      const bottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      if (bottom < 120 && !isValidating && hasMore) {
        setPage((p) => p + 1);
      }
    };

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [isLoading, hasMore, disableContainer, isValidating]);

  // Note: we intentionally don't auto-scroll to bottom while validating.
  // We instead make the loading indicator sticky so it's visible.

  if (disableContainer) {
    return (
      <div className="space-y-3">
        {items.map((it, idx) => {
          const keyed = it as unknown as { _id?: string; id?: string };
          const key = keyed._id || keyed.id || idx;
          return <div key={key}>{renderItem(it)}</div>;
        })}

        {(isLoading || isValidating) && (
          <div className="sticky bottom-0 bg-white py-3">
            {typeof loader === 'number' ? (
              <div className="space-y-3 px-3">
                {Array.from({ length: loader }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-2">
                    <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 animate-pulse" />
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
                    </div>
                  </div>
                ))}
                <span className="sr-only">Loading</span>
              </div>
            ) : loader ? (
              loader
            ) : (
              <div className="py-4 text-center text-gray-500">Loading...</div>
            )}
          </div>
        )}

        {!hasMore && <div className="py-4 text-center text-gray-500 hidden">No more results</div>}
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ maxHeight: containerMaxHeight || '60vh', overflow: 'auto' }}>
      <div className="space-y-3">
        {items.map((it, idx) => {
          const keyed = it as unknown as { _id?: string; id?: string };
          const key = keyed._id || keyed.id || idx;
          return <div key={key}>{renderItem(it)}</div>;
        })}
      </div>

      {(isLoading || isValidating) && (
        <div className="sticky bottom-0 bg-white py-3">
          {typeof loader === 'number' ? (
            <div className="space-y-3 px-3">
              {Array.from({ length: loader }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2">
                  <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 animate-pulse" />
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
                  </div>
                </div>
              ))}
              <span className="sr-only">Loading</span>
            </div>
          ) : loader ? (
            loader
          ) : (
            <div className="py-4 text-center text-gray-500">Loading...</div>
          )}
        </div>
      )}
      {!hasMore && (
        <div className="py-4 text-center text-gray-500 hidden">No more results</div>
      )}
    </div>
  );
}
