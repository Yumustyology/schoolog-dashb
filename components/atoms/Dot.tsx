import React from 'react';
import { cn } from '@/app/lib/utils';

interface DotProps {
  className?: string;
}

const Dot: React.FC<DotProps> = ({ className }) => {
  return <div className={cn('mx-2 h-1.5 w-1.5 bg-gray4', className)} />;
};

export default Dot;
export { Dot };