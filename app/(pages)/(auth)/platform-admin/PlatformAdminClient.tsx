'use client';

import { useEffect, useState } from 'react';
import LoginClient from '../login/LoginClient';
import { setAuthState } from '@/app/lib/entities/auth.entity';
import { schoolState, SchoolEntity } from '@/app/lib/entities/school.entity';
import { AudienceTypes } from '@/app/lib/types/audience-types';
import { useEntity } from 'simpler-state';

type Props = {
  initialLogo: string;
  initialSchool?: Partial<SchoolEntity> | null;
};

/**
 * Unlisted entry point for platform (Platform_Admin) login — deliberately
 * not linked from the public role-selector. Pre-selects the Admin audience
 * (platform admins authenticate the same way school admins do, distinguished
 * server-side by audienceRole) and drops straight into the login form.
 */
export default function PlatformAdminClient({ initialLogo, initialSchool }: Props) {
  const currentSchool = useEntity(schoolState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAuthState('audienceType', AudienceTypes.ADMIN);
    const schoolSlugId =
      initialSchool?.slug || initialSchool?.schoolSlugId || currentSchool?.slug || currentSchool?.schoolSlugId;
    if (schoolSlugId) {
      setAuthState('schoolSlugId', schoolSlugId);
    }
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) return null;

  return <LoginClient initialLogo={initialLogo} initialSchool={initialSchool} />;
}
