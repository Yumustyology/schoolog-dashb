import React from 'react';
import { DrawerSide } from '../DrawerSide';
import { Typography } from '@material-tailwind/react';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import Button from '@/components/atoms/form/Button';
import type { AnnouncementCardData } from '@/components/atoms/dashboard/announcement/Announcement';

const AnnoucementSideDrawer = ({
  open,
  closeDrawer,
  announcement,
}: {
  open: boolean;
  closeDrawer: () => void;
  announcement?: AnnouncementCardData;
}) => {
  return (
    <DrawerSide
      open={open}
      close={closeDrawer}
      title="Announcement details"
      subtitle={announcement?.date}
    >
      <div className="p-6 overflow-y-auto max-h-[calc(100vh-140px)]">
        <div className="mt-6">
          <Typography>
            <h2
              className={cn(
                'text-[20px] text-gray1 mb-4',
                poppins_500.className
              )}
            >
              {announcement?.headline}
            </h2>
            <p className={cn('text-sm text-[#071E3B]', poppins_400.className)}>
              {announcement?.content}
            </p>
          </Typography>
        </div>
      </div>
      <div className="px-6 mt-6">
        <Button
          onClick={closeDrawer}
          round
          wide
          className="absolute bottom-3 bg-primary left-0 right-0 w-full text-white flex gap-3"
        >
          Okay
        </Button>
      </div>
    </DrawerSide>
  );
};

export default AnnoucementSideDrawer;
