'use client';

import { SWRConfig } from 'swr';

/**
 * Global SWR defaults — without this, every useSWR call refetches on every
 * window focus (e.g. switching tabs and back), which reads as "polling
 * hard" even though it's just SWR's default revalidate-on-focus behavior.
 * Mirrors the config used in i-eschool-frontend's App.tsx.
 */
export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 5000,
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          const status = error?.statusCode ?? error?.response?.status;
          if (status === 429) return;
          if (status === 404) return;
          if (retryCount >= 4) return;

          setTimeout(() => revalidate({ retryCount }), 5000);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRProvider;
