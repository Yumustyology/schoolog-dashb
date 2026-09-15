'use client';
import React from 'react';
import useSWR from 'swr';
import { cn } from '@/app/lib/utils';
import { Inter_400, Inter_500 } from '@/app/lib/config/font.config';
import Empty from '@/components/molecules/empty/Empty';
import { NoBooksIcon } from '@/components/atoms/icons/Icons';
import libraryActions from '@/app/lib/actions/library.action';
import { formatDate } from '@/app/lib/utils/dateUtils';

export default function BookReadersList({ bookId }: { bookId: string }) {
  const { data, isLoading } = useSWR(['library-book-readers', bookId], () =>
    libraryActions.getBookReaders(bookId, { limit: 50 })
  );

  const readers = data?.data || [];
  const count = data?.meta?.count ?? readers.length;

  if (isLoading) {
    return <p className="text-sm text-gray6 py-6">Loading readers...</p>;
  }

  if (readers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-500 py-12">
        <Empty
          icon={<NoBooksIcon />}
          title="No readers yet"
          description="Nobody has opened this book yet."
        />
      </div>
    );
  }

  return (
    <div>
      <p className={cn('text-sm text-gray6 mb-4', Inter_400.className)}>
        {count} {count === 1 ? 'person has' : 'people have'} read this book
      </p>
      <div className="flex flex-col gap-2">
        {readers.map((reader) => (
          <div
            key={reader.audienceId}
            className="flex items-center justify-between border-b border-gray4 py-3"
          >
            <div>
              <p className={cn('text-sm text-black1', Inter_500.className)}>
                {reader.audienceName || 'Unknown'}
              </p>
              <p className="text-xs text-gray6">{reader.audienceType}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray1">
                Opened {reader.readCount} {reader.readCount === 1 ? 'time' : 'times'}
              </p>
              <p className="text-xs text-gray6">
                Last read {formatDate(reader.lastReadAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
