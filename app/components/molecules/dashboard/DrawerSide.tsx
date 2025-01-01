import React from 'react';
import { Drawer, Typography } from '@material-tailwind/react';
import Cancel from '../../atoms/icons/ModalIcons/Cancel';
import { cn } from '@/lib/utils';
import {
  Inter_400,
  Inter_600,
  poppins_400,
  poppins_500,
} from '@/app/lib/config/font.config';
import { activities1 } from '@/app/assets';
import Image from 'next/image';
import Dot from '../../atoms/dashboard/subjects/Dot';
import CalendarIcon from '../../atoms/icons/dashboard/CalendarIcon';
import CategoryIcon from '../../atoms/icons/dashboard/CategoryIcon';
import Button from '../../atoms/form/Button';

export function DrawerSide({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <React.Fragment>
      <Button onClick={openDrawer}>Open Drawer</Button>
      <Drawer placement="right" open={open} onClose={closeDrawer} size={494}>
        <div className="bg-primary text-white text-[16px] flex justify-between items-center w-full p-4">
          <div>
            <p className={cn('text-[16px] ', Inter_600.className)}> {title}</p>
            <p className={cn('text-[16px] ', Inter_400.className)}>
              {' '}
              {subtitle}
            </p>
          </div>
          <div
            className="h-[32px] w-[32px] bg-white cursor-pointer  rounded-full flex items-center justify-center"
            onClick={closeDrawer}
          >
            <Cancel />
          </div>
        </div>
        <div>{children}</div>
      </Drawer>
    </React.Fragment>
  );
}
