"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { profileState } from '@/app/lib/entities/profile.entity';
import { authState } from '@/app/lib/entities/auth.entity';
import { getDashboardPathForAudience } from '@/app/lib/utils/audienceDashboard';

const SIDEBAR_TYPE_TO_AUDIENCE: Record<string, string> = {
  school: 'Admin',
  teacher: 'Staff',
  student: 'Student',
};

/**
 * Defense-in-depth guard: even though login redirects to the right portal,
 * nothing stops a logged-in Staff/Student account from typing/bookmarking
 * `/school/*` directly. This bounces them back to their own portal if the
 * persisted audience doesn't match the portal the layout was asked to render.
 */
export default function useEnforcePortalAccess(sidebarType: string) {
  const router = useRouter();

  useEffect(() => {
    const expectedAudience = SIDEBAR_TYPE_TO_AUDIENCE[sidebarType];
    if (!expectedAudience) return; // no known mapping (e.g. 'parent') — nothing to enforce yet

    const profile = profileState.get?.();
    const audience =
      (profile && typeof profile === 'object' && 'audience' in profile
        ? (profile as { audience?: string }).audience
        : authState.get?.()?.audienceType) || undefined;

    if (!audience) return; // profile not hydrated yet — nothing to enforce
    if (audience !== expectedAudience) {
      router.replace(getDashboardPathForAudience(audience));
    }
  }, [router, sidebarType]);
}
