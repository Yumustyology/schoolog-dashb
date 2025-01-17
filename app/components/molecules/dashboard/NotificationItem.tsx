import { Inter_500, poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import Image, { StaticImageData } from 'next/image';
import React from 'react';
import HideArrow from '../../atoms/icons/dashboard/SideBar/HideArrow';
import ClockIcon from '../../atoms/icons/ClockIcon';
import Result from '../../atoms/icons/dashboard/SideBar/Result';
import Payment from '../../atoms/icons/dashboard/SideBar/Payment';
import Annoucement from '../../atoms/icons/dashboard/SideBar/Annoucement';
import Ripples from 'react-ripples';

export type NotificationItemProps = {
  type: 'message' | 'class' | 'announcement' | 'payment' | 'result' | 'default';
  title: string;
  time: string;
  image?: string | StaticImageData;
};

const NotificationItem: React.FC<NotificationItemProps> = ({
  type,
  title,
  time,
  image,
}) => {
  const renderIcon = () => {
    switch (type) {
      case 'announcement':
        return <Annoucement />;
      case 'payment':
        return <Payment />;
      case 'result':
        return <Result />;
      default:
        return <span>🔔</span>;
    }
  };

  return (
    <Ripples className="flex w-full cursor-pointer justify-between pr-4 items-center py-[18px] px-0 bg-white border-b">
      <div className="flex items-center">
        {image ? (
          <Image
            src={image}
            alt="Notification"
            className="w-[42px] h-[42px] rounded-sm mr-4"
          />
        ) : (
          <div className="w-[42px] h-[42px] flex mr-4 justify-center items-center bg-gray4 rounded-full text-xl">
            {renderIcon()}
          </div>
        )}
        <div>
          <p
            className={cn(
              'font-medium mb-1.5 text-sm text-gray1 ',
              Inter_500.className
            )}
          >
            {title}
          </p>
          <div className="flex items-center gap-1.5">
            <ClockIcon />
            <p className={cn('text-gray-6 text-xs', poppins_400.className)}>
              {time}
            </p>
          </div>
        </div>
      </div>

      <div className={cn('transition-transform duration-300 -rotate-90')}>
        <HideArrow color="#828282" height={16} width={16} />{' '}
      </div>
    </Ripples>
  );
};

export default NotificationItem;
