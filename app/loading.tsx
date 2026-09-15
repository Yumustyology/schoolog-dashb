import BrandSpinner from '@/components/atoms/BrandSpinner';
import { poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';

export default function Loading() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <BrandSpinner size={40} />
        <p className={cn(poppins_400.className, 'text-sm text-gray3')}>Loading…</p>
      </div>
    </div>
  );
}
