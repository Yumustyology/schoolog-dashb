"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/app/lib/utils';
import { Inter_400, Inter_600 } from '@/app/lib/config/font.config';
import Button from '@/components/atoms/form/Button';
import Review from '@/components/atoms/icons/ModalIcons/Review';
import { getDashboardPathForAudience } from '@/app/lib/utils/audienceDashboard';

type Props = {
  audience?: string | null;
  onClose?: () => void;
  initialSeconds?: number;
};

export default function VerifiedRedirect({ audience, onClose, initialSeconds = 4 }: Props) {
  const router = useRouter();
  const [seconds, setSeconds] = React.useState<number>(initialSeconds);
  const dest = getDashboardPathForAudience(audience);

  React.useEffect(() => {
    let mounted = true;
    if (!mounted) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          // navigate when countdown ends
          try {
            router.replace(dest);
          } catch {
            // ignore
          }
          if (onClose) onClose();
          clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [router, dest, onClose]);

  const handleProceed = React.useCallback(() => {
    try {
      router.replace(dest);
    } finally {
      if (onClose) onClose();
    }
  }, [router, dest, onClose]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-8">
          <Review />
        </div>
        <h3 className={cn('text-lg', Inter_600.className)}>ID Verified</h3>
        <p className={cn('text-center text-gray3 mt-4', Inter_400.className)}>
          Your identity has been verified successfully! You will be redirected to your dashboard in <strong>{seconds}</strong> second{seconds === 1 ? '' : 's'}.
        </p>
      </div>

      <div className="mt-6">
        <Button wide to={dest} round className="h-12" onClick={handleProceed}>
          Proceed to dashboard
        </Button>
      </div>
    </div>
  );
}
