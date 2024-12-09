import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

const DashboardWelcomeCard = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'w-full bg-gradient-to-r from-[#21B55A] to-[#0E4F27] flex flex-grow h-48 max-h-48 rounded-lg tablet:mr-0 overflow-hidden max-w-screen relative',
        className
      )}
    >
      <div className="w-[180px] h-[180px] tablet:w-[374px] tablet:h-[360px] rounded-full border-4 border-[#00B59566] absolute top-[10px] -right-[100px] tablet:-right-[180px] tablet:-top-[3px]"></div>

      <div className="w-[180px] h-[180px] tablet:w-[374px] rounded-full tablet:h-[360px] border-4 border-[#00B59566] absolute -left-[90px] -top-[40px] tablet:-left-[187px] tablet:-top-[120px]"></div>

      <div
        className={cn(
          'w-full absolute h-48 px-6 tablet:px-12 py-8 tablet:py-10 flex items-center'
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardWelcomeCard;
