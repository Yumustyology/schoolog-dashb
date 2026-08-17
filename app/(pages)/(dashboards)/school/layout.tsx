'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useSWR from 'swr';
import paymentsActions from '@/app/lib/actions/payments.action';
import LayoutClient from '../LayoutClient';

// Pages a school must still be able to reach even before paying for a
// plan — the billing page itself (to actually pay) and account settings.
const ALWAYS_ALLOWED = ['/school/billing', '/school/settings'];

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading } = useSWR(['my-subscription'], paymentsActions.getMySubscription);

  const planStatus = data?.data?.planStatus;
  const isAllowedPath = ALWAYS_ALLOWED.some((p) => pathname?.startsWith(p));

  useEffect(() => {
    if (isLoading || isAllowedPath) return;
    if (planStatus && planStatus !== 'active') {
      router.replace('/school/billing');
    }
  }, [planStatus, isLoading, isAllowedPath, router]);

  return <LayoutClient sidebarType="school">{children}</LayoutClient>;
}
