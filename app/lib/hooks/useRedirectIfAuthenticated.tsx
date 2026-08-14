"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import localforage from 'localforage';
import { profileState } from '@/app/lib/entities/profile.entity';
import { authState } from '@/app/lib/entities/auth.entity';

/**
 * Hook: useRedirectIfAuthenticated
 * - Checks localforage for an access token and redirects logged-in users
 *   to a destination derived from persisted profileState or authState.
 * - Returns `checking` boolean while it determines auth status.
 */
export default function useRedirectIfAuthenticated() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const token = await localforage.getItem('accessToken');
        if (mounted && token) {
          const profile = profileState.get?.();
          const audience =
            (profile && typeof profile === 'object' && 'audience' in profile
              ? (profile as { audience?: string }).audience
              : authState.get?.()?.audienceType) || undefined;

          const dest = audience === 'Admin' ? '/school' : '/';
          // use replace so user can't go back to auth pages
          router.replace(dest);
          return;
        }
      } catch (e) {
        // ignore storage/read errors
        // eslint-disable-next-line no-console
        console.debug('useRedirectIfAuthenticated failed', e);
      } finally {
        if (mounted) setChecking(false);
      }
    })();

    return () => {
      mounted = false;
    };
    // empty deps: we want to run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return checking;
}
