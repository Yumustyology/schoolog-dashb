import { cn } from '@/app/lib/utils';

function Skeleton({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const cls = className ?? '';

  // If caller already supplied an explicit height/min-height (Tailwind h- or min-h- classes)
  // don't add a default. Otherwise add a small min-height to reserve vertical space
  // and avoid content jumping while the real image/logo loads.
  const hasHeight = /\b(h-|h\[|min-h-|min-h\[)/.test(cls);
  const defaultMinH = 'min-h-[24px]';

  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', hasHeight ? cls : `${cls} ${defaultMinH}`)}
      style={style}
      {...props}
    />
  );
}

export { Skeleton };
