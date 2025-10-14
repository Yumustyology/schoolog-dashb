import LoginClient from './LoginClient';
import { headers } from 'next/headers';
import { appConfig } from '@/app/lib/config/app.config';

export default async function LoginPage() {
  const defaultLogo = '/assets/images/logo.png';
  let initialSchool: Record<string, unknown> | null = null;

  try {
  const h = await headers();
  const host = h.get('host') || '';
    const res = await fetch(`${appConfig.axiosBaseUrl}/school/tenant`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Tenant': host,
      },
      cache: 'no-store',
    });

    if (res.ok) {
      const payload = await res.json();
      initialSchool = payload?.data ?? payload ?? null;
    }
  } catch (e) {
    // ignore; client can fallback to persisted schoolState
    // eslint-disable-next-line no-console
    console.debug('login page tenant fetch failed', e);
  }

  return <LoginClient initialLogo={(initialSchool?.school_image as string) ?? defaultLogo} initialSchool={initialSchool} />;
}
