'use client';

import Announcement from '@/components/atoms/dashboard/announcement/Announcement';
import React from 'react';
import useSWR from 'swr';
import Empty from '../../empty/Empty';
import { NoAnnouncementIcon } from '@/components/atoms/icons/Icons';
import notificationsActions from '@/app/lib/actions/notifications.action';
import { formatDate } from '@/app/lib/utils/dateUtils';

const AnnoucementsList = ({ type }: { type?: 'school' }) => {
  const { data: resp, isLoading } = useSWR(['notifications'], () =>
    notificationsActions.fetchNotifications()
  );

  const announcements = (resp?.data || []).map((n) => ({
    id: n._id,
    headline: n.title,
    content: n.message,
    date: formatDate(n.sentAt || n.createdAt),
  }));

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 rounded-md bg-gray4" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {announcements.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 py-12">
          <Empty
            icon={<NoAnnouncementIcon />}
            title="No annoucement yet"
            description={
              type === 'school'
                ? 'You have not yet created any announcement. Click the button below to create announcement'
                : 'There are no announcements yet.'
            }
            buttonText={type === 'school' ? '+ Create Annoucement' : undefined}
            route={
              type === 'school'
                ? '/school/announcements/create-annoucement'
                : undefined
            }
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {announcements.map((announcement) => (
            <Announcement
              key={announcement.id}
              announcement={announcement}
              type={type}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnoucementsList;
