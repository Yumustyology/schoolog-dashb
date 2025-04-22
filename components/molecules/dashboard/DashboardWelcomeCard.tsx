import { cn, getRandomBinary } from '@/app/lib/utils';
import React, { ReactNode } from 'react';
import Meteors from '../../atoms/meteors';
import Particles from '../../atoms/particles';

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
        'w-full bg-gradient-to-r-from-[#21B55A]-to-[#0E4F27] bg-gradient-primary flex flex-grow h-48 max-h-48 rounded-lg tablet:mr-0 overflow-hidden max-w-screen relative',
        className
      )}
    >
      {getRandomBinary() ? <Meteors number={20} /> : <Particles />}

      <div className="w-[180px] h-[180px] tablet:w-[274px] rounded-full tablet:h-[200px]  bg-light1 absolute -left-[90px] -top-[40px] tablet:-left-[197px] tablet:-top-[100px]"></div>
      <div className="w-[180px] h-[180px] tablet:w-[274px] rounded-full tablet:h-[200px] bg-light1 absolute -right-[190px] top-[40px] tablet:top-[100px]"></div>

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
