import { cn } from '@/app/lib/utils';

type BrandSpinnerProps = {
  size?: number;
  className?: string;
};

export default function BrandSpinner({ size = 40, className }: BrandSpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      style={{ width: size, height: size, borderWidth: Math.max(2, Math.round(size / 10)) }}
      className={cn('animate-spin rounded-full border-gray4 border-t-primary', className)}
    />
  );
}
