"use client";
import React from 'react';
import Cancel from '../atoms/icons/ModalIcons/Cancel';
import Button from '../atoms/form/Button';
import { cn } from '@/app/lib/utils'; // Import the 'cn' utility function if it's defined elsewhere
import { Inter_400, Inter_500 } from '@/app/lib/config/font.config';
import LogoutModalICon from '../atoms/icons/dashboard/LogoutModalICon';
import { useRouter } from 'next/navigation';
import localforage from 'localforage';
import { resetAuthState } from '@/app/lib/entities/auth.entity';
import { resetProfileState } from '@/app/lib/entities/profile.entity';
import { resetSchoolState } from '@/app/lib/entities/school.entity';

import { clearAuthCookies, clearReturnToUrl } from '@/app/lib/utils/authCookies';

const LogoutModal = ({
  open,
  close,
}: {
  open: boolean;
  close?: () => void;
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await Promise.all([
        localforage.removeItem('accessToken'),
        localforage.removeItem('refreshToken'),
        localforage.removeItem('signupEmail'),
      ]);

      clearAuthCookies();
      clearReturnToUrl();

      // reset persisted entities
      resetAuthState();
      resetProfileState();
      resetSchoolState();

  if (close) close();

  router.replace('/');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.debug('logout failed', err);
      // fallback redirect
        try {
          router.replace('/');
        } catch {
          window.location.href = '/';
        }
    }
  };
  if (!open) return null; // Hide the modal when `isOpen` is false

  return (
    <div className="fixed inset-0 bg-[rgb(0,0,0,0.25)] flex items-center justify-center z-50 w-full">
      <div className="bg-white rounded-lg tablet:w-[434px] xxs:w-full shadow-lg">
        <div className="flex justify-end pt-3 pr-3">
          <Button
            onClick={close}
            className="text-gray-500 hover:text-gray-800 bg-gray4 rounded-full h-8 w-8"
          >
            <Cancel />
          </Button>
        </div>
        <div className="flex items-center justify-center mb-4">
          <LogoutModalICon />
        </div>

        <main className="flex flex-col items-center justify-center text-center px-6">
          {/* Add modal content here */}
          <h3 className="text-xl mb-4 ">Are you sure you want to log out?</h3>
          <p
            className={cn(
              'text-sm text-gray9 text-center px-[34px]',
              Inter_400.className
            )}
          >
            Are you sure you want to logout of this account? you will have to
            login back before you access your account
          </p>
        </main>

        <div className="w-full mt-8 mb-6 text-center flex justify-center gap-4">
          <Button
            onClick={close}
            round
            className={cn(
              'bg-transparent border text-gray8 text-base border-gray8 h-[44px] w-[185px]',
              Inter_500.className
            )}
          >
            Cancel
          </Button>
          <Button
            round
            className={cn(
              'text-base bg-r text-white h-[44px] w-[185px]',
              Inter_500.className
            )}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
