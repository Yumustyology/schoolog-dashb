'use client';

import React from 'react';
import useSWR from 'swr';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { formatDateTime } from '@/app/lib/utils/dateUtils';
import Button from '@/components/atoms/form/Button';
import Empty from '@/components/molecules/empty/Empty';
import { Video } from 'lucide-react';
import liveClassActions from '@/app/lib/actions/liveClass.action';
import {
  openCreateLiveClassModal,
  openLiveClassRoom,
} from '@/app/lib/entities/liveClass.entity';
import { CreateLiveClassModal } from '@/components/atoms/dashboard/live-classes/CreateLiveClassModal';
import { LiveClassRoomContainer } from '@/components/atoms/dashboard/live-classes/LiveClassRoomContainer';
import type { LiveClass } from '@/app/lib/types/liveClass.types';

const statusStyles: Record<LiveClass['status'], string> = {
  scheduled: 'bg-blue-100 text-blue-700',
  live: 'bg-green-100 text-green-700',
  ended: 'bg-gray-100 text-gray-700',
  cancelled: 'bg-red-100 text-red-700',
};

export const LiveClassesList = () => {
  const { data, isLoading } = useSWR(
    ['live-classes'],
    () => liveClassActions.fetchLiveClasses()
  );

  const liveClasses = data?.data || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className={cn('text-lg text-black1', poppins_500.className)}>
          Live Classes
        </h2>
        <Button round onClick={openCreateLiveClassModal} className="px-6">
          + Create Live Class
        </Button>
      </div>

      {!isLoading && liveClasses.length === 0 && (
        <Empty
          icon={<Video size={40} />}
          title="No live classes yet"
          description="Schedule a live class to get started"
        />
      )}

      <div className="flex flex-col gap-3">
        {liveClasses.map((liveClass) => (
          <div
            key={liveClass._id}
            className="flex items-center justify-between border border-gray4 rounded-xl p-4"
          >
            <div>
              <h3 className={cn('text-sm text-black1', poppins_500.className)}>
                {liveClass.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <p className={cn('text-xs text-gray', poppins_400.className)}>
                  {formatDateTime(liveClass.scheduledStart)}
                </p>
                <span
                  className={cn(
                    'text-xs px-2 py-0.5 rounded-full capitalize',
                    statusStyles[liveClass.status]
                  )}
                >
                  {liveClass.status}
                </span>
              </div>
            </div>

            <Button
              round
              flat
              disabled={liveClass.status === 'ended' || liveClass.status === 'cancelled'}
              onClick={() => openLiveClassRoom(liveClass._id)}
              className="px-5"
            >
              Join
            </Button>
          </div>
        ))}
      </div>

      <CreateLiveClassModal />
      <LiveClassRoomContainer />
    </div>
  );
};
