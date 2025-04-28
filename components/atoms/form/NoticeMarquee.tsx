import { poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React, { useState } from 'react';


interface NoticeMarqueeProps {
  noticeText: string;
}

const NoticeMarquee: React.FC<NoticeMarqueeProps> = ({ noticeText }) => {
  const [isHovered, setIsHovered] = useState(false);

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
          'whitespace-nowrap',
          poppins_500.className,
          isHovered ? 'whitespace-normal overflow-visible text-center' : 'animate-marquee'
        )}
        style={{ whiteSpace: isHovered ? 'normal' : 'nowrap' }}
      >
        {noticeText}
      </div>
    </div>
  );
};

export default NoticeMarquee;
