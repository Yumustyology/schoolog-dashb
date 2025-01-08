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
  open,
  close
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  open: boolean;
  close?: ()=>void;
}) {

  return (
    <React.Fragment>
      <Drawer placement="right" open={open} size={494}>
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
            onClick={close}
          >
            <Cancel />
          </div>
        </div>
        <div className="h-full overflow-y-auto">{children}</div>
      </Drawer>
    </React.Fragment>
  );
}
