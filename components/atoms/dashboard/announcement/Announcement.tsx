'use client';
import React from 'react';
import Button from '../../form/Button';
import { cn } from '@/app/lib/utils';
import { Inter_400, poppins_500 } from '@/app/lib/config/font.config';
import MenuLists from '../students/MenuLists';
import { DeleteIcon, ViewProfileEyeIcon } from '../../icons/Icons';
import AnnoucementSideDrawer from '@/components/molecules/dashboard/announcement/AnnoucementSideDrawer';
import notificationsActions from '@/app/lib/actions/notifications.action';
import showToast from '@/app/lib/utils/toast';
import { useSWRConfig } from 'swr';

export type AnnouncementCardData = {
  id: string;
  headline: string;
  content: string;
  date: string;
};

const Announcement = ({
  announcement,
  type,
}: {
  announcement: AnnouncementCardData;
  type?: 'school';
}) => {
  const [openAnnoucementDrawer, setopenAnnoucementDrawer] =
    React.useState(false);
  const { mutate } = useSWRConfig();

  const handleOpenDrawer = () => {
    setopenAnnoucementDrawer(true);
  };

  const handleCloseDrawer = () => {
    setopenAnnoucementDrawer(false);
  };

  const handleDelete = async () => {
    try {
      await notificationsActions.deleteNotification(announcement.id);
      showToast('Announcement deleted', 'success', { type: 'success' });
      mutate(
        (key) => Array.isArray(key) && key[0] === 'notifications',
        undefined,
        { revalidate: true }
      );
    } catch {
      // handleRequest already surfaces a toast for API errors
    }
  };

  const menuItems = [
    {
      label: 'View details',
      onClick: handleOpenDrawer,
      icon: <ViewProfileEyeIcon />,
    },
    {
      label: 'Delete',
      onClick: handleDelete,
      icon: <DeleteIcon />,
      danger: true,
    },
  ];

  return (
    <Button
      wide
      onClick={handleOpenDrawer}
      childrenClassName="w-full !justify-between items-start gap-8"
      className="!justify-start text-left items-start flex p-3 bg-[#F8F8F8] border border-[#E5E5EA] rounded-md"
      key={announcement.id}
    >
      <div>
        <h2 className={cn('text-sm text-gray1', poppins_500.className)}>
          {announcement.headline}
        </h2>
        <p className={cn('text-sm text-[#6B6B6B] ', Inter_400.className)}>
          {announcement.content}
        </p>
      </div>
      <div className="flex flex-col justify-end  items-end">
        <p className={cn('text-sm text-[#6B6B6B] ', Inter_400.className)}>
          {announcement.date}
        </p>
        {type === 'school' && (
          <div
            className="mt-3"
            onClick={(e) => e.stopPropagation()}
          >
            <MenuLists
              label="Options"
              items={menuItems}
              placement="bottom-start"
              maxHeight="150px"
            />
          </div>
        )}
      </div>
      <AnnoucementSideDrawer
        open={openAnnoucementDrawer}
        closeDrawer={handleCloseDrawer}
        announcement={announcement}
      />
    </Button>
  );
};

export default Announcement;
