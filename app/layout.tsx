import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/organisms/ThemeProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TenantHeadManager from '@/components/organisms/TenantHeadManager';
import { getTenantFromHost } from './lib/tenant';
import { headers } from 'next/headers';

// dynamic metadata with short cache to speed up dev refresh
export const revalidate = 300;

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// server-side metadata builder: resolves tenant from host and fetches school info
export async function generateMetadata(): Promise<Metadata> {
  let host = '';
  let proto = 'http';
  try {
    const h = await headers();
    host = h.get('host') || '';
    proto = h.get('x-forwarded-proto') || h.get('x-forwarded-protocol') || proto;
  } catch {
    host = '';
    proto = 'http';
  }
  const origin = host ? `${proto}://${host}` : '';
  const url = origin ? new URL(origin) : undefined;
  const tenant = getTenantFromHost(host);

  // compute tenant header value the same way client code does
  let tenantKey = tenant.hostname;
  if (tenant.isCustomDomain) tenantKey = tenant.hostname;
  else if (tenant.isSubdomain) tenantKey = tenant.id;

  const backend = (process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:5080').replace(/\/$/, '');
  const endpoint = `${backend}/school/tenant`;

  // do a few retries for transient network errors (ECONNRESET etc.)
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(endpoint, { 
        headers: { 'X-Tenant': tenantKey }, 
        next: { revalidate: 300 } // cache for 5 minutes in dev
      });
      if (!res.ok) {
        const body = await res.text().catch(() => '');
        console.warn('[generateMetadata] tenant endpoint returned non-ok', res.status, body);
        break;
      }

      const data = await res.json().catch(() => null);
      const school = data?.school ?? data?.data ?? data ?? null;
      if (school && school.name) {
        const icon = school.schoolImage ?? '/schoolog-logo.png';
        const iconUrl = typeof icon === 'string' && icon.startsWith('http') ? icon : (url ? `${url.origin}${icon}` : icon);
        return {
          title: String(school.name),
          description: 'School management just got easier',
          icons: { icon: iconUrl },
        };
      }

      if (tenant.isSubdomain) {
        return {
          title: 'Schoolog+',
          description: 'School management just got easier',
          icons: { icon: school?.schoolImage || '/schoolog-logo.png' },
        };
      }

      break;
    } catch (err) {
      // transient network error — retry with backoff
  console.warn('[generateMetadata] fetch attempt', attempt, 'failed:', String(err));
      if (attempt === maxAttempts) {
        break;
      }
      // exponential backoff: 100ms * 2^(attempt-1)
      const backoff = 100 * Math.pow(2, attempt - 1);
      await new Promise((r) => setTimeout(r, backoff));
    }
  }

  return {
    title: 'Schoolog+',
    description: 'School management just got easier',
    icons: { icon: '/schoolog-logo.png' },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ThemeProvider>
          <TenantHeadManager />
          {children}
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
