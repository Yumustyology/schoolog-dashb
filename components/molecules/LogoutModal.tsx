'use client';
import React from 'react';
import ConfirmModal from './ConfirmModal';
import LogoutModalICon from '../atoms/icons/dashboard/LogoutModalICon';
import { useRouter } from 'next/navigation';
import localforage from 'localforage';
import { resetAuthState } from '@/app/lib/entities/auth.entity';
import { resetProfileState } from '@/app/lib/entities/profile.entity';
import { resetSchoolState } from '@/app/lib/entities/school.entity';

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

  return (
    <ConfirmModal
      open={open}
      close={close}
      title="Are you sure you want to log out?"
      body="Are you sure you want to logout of this account? you will have to login back before you access your account"
      icon={<LogoutModalICon />}
      onConfirm={handleLogout}
      confirmText="Logout"
    />
  );
};

export default LogoutModal;
