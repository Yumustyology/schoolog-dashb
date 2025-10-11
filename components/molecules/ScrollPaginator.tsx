"use client";

import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type Props<T> = {
  fetchPage: (page: number) => Promise<{ items: T[]; total: number; page: number; limit: number } | undefined>;
  renderItem: (item: T) => ReactNode;
  initialPage?: number;
  pageSize?: number;
};

export default function ScrollPaginator<T>({ fetchPage, renderItem, initialPage = 1 }: Props<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // initial load
    loadPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPage = async (p: number) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetchPage(p);
      if (res && res.items) {
        setItems((prev) => [...prev, ...res.items]);
        const fetchedTotal = res.items.length;
        // if less than page size or zero, we reached end
        if (fetchedTotal === 0 || items.length + fetchedTotal >= (res.total || 0)) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      if (!el) return;
      const bottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      if (bottom < 100 && hasMore && !loading) {
        const next = page + 1;
        setPage(next);
        loadPage(next);
      }
    };

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, hasMore, loading]);

  return (
    <div ref={containerRef} style={{ maxHeight: '60vh', overflow: 'auto' }}>
      <div className="space-y-3">
        {items.map((it, idx) => (
          <div key={idx}>{renderItem(it)}</div>
        ))}
      </div>
      {loading && <div className="py-4">Loading more...</div>}
      {!hasMore && <div className="py-4 text-center text-gray-500">No more results</div>}
    </div>
  );
}
