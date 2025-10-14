import { poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React, { useState } from 'react';

interface NoticeMarqueeProps {
  noticeText: string;
  isAnimate?: boolean;
  className?: string;
}

const NoticeMarquee: React.FC<NoticeMarqueeProps> = ({
  noticeText,
  isAnimate = true,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const isStatic = !isAnimate || isHovered;

  return (
    <div
      className={cn(
        'relative rounded-lg overflow-hidden bg-[#FF95000A] text-[#FF9500] w-full px-4 py-2'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          poppins_500.className,
          isStatic ? 'whitespace-normal overflow-visible text-start' : 'whitespace-nowrap animate-marquee',
          className
        )}
        style={{ whiteSpace: isStatic ? 'normal' : 'nowrap' }}
      >
        {noticeText}
      </div>
    </div>
  );
};

export default NoticeMarquee;
