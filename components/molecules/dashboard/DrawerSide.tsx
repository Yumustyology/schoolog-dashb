'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Drawer } from '@material-tailwind/react';
import Cancel from '../../atoms/icons/ModalIcons/Cancel';
import { cn } from '@/app/lib/utils';
import { Inter_400, Inter_600 } from '@/app/lib/config/font.config';

export function DrawerSide({
  children,
  title,
  subtitle,
  open,
  close,
  className,
  headerClassName,
  cancelClassName,
  titleClassName,
  subTitleClassName,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  open: boolean;
  close?: () => void;
  className?: string;
  headerClassName?: string;
  cancelClassName?: string;
  titleClassName?: string;
  subTitleClassName?: string;
}) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = open ? 'hidden' : 'auto';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  useEffect(() => {
    let portalDiv = document.getElementById('drawer-portal');
    if (!portalDiv && typeof window !== 'undefined') {
      portalDiv = document.createElement('div');
      portalDiv.id = 'drawer-portal';
      portalDiv.style.zIndex = '500';
      document.body.appendChild(portalDiv);
    }
    setPortalRoot(portalDiv);

    // return () => {
    //   if (portalDiv && portalDiv.parentNode) {
    //     portalDiv.parentNode.removeChild(portalDiv);
    //   }
    // };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open && close) {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, close]);

  if (!portalRoot) return null;

  const drawerContent = (
    <Drawer
      className={cn('', className)}
      placement="right"
      open={open}
      overlayProps={{
        className:
          'fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[999]',
      }}
      size={494}
    >
      <div
        className={cn(
          'bg-primary text-white text-[16px] flex justify-between items-center w-full p-4',
          headerClassName
        )}
      >
        <div>
          <p className={cn('text-[16px]', Inter_600.className, titleClassName)}>
            {' '}
            {title}
          </p>
          <p
            className={cn(
              'text-[16px]',
              Inter_400.className,
              subTitleClassName
            )}
          >
            {subtitle}
          </p>
        </div>
        <div
          className={cn(
            'h-[32px] w-[32px] bg-white cursor-pointer rounded-full flex items-center justify-center',
            cancelClassName
          )}
          onClick={close}
        >
          <Cancel />
        </div>
      </div>
      <div className="h-full overflow-y-auto">{children}</div>
    </Drawer>
  );

  return createPortal(drawerContent, portalRoot);
}
