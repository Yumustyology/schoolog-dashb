'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { profileState } from '@/app/lib/entities/profile.entity';
import { AudienceTypes } from '@/app/lib/types/audience-types';
import LayoutClient from '../LayoutClient';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { audienceRole } = profileState.use();

  useEffect(() => {
    if (audienceRole && audienceRole !== AudienceTypes.PLATFORM_ADMIN) {
      router.replace('/');
    }
  }, [audienceRole, router]);

  if (audienceRole !== AudienceTypes.PLATFORM_ADMIN) return null;

  return <LayoutClient sidebarType="super-admin">{children}</LayoutClient>;
}
