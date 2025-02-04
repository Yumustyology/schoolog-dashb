import Dot from '@/app/components/atoms/dashboard/subjects/Dot';
import CalendarIcon from '@/app/components/atoms/icons/dashboard/CalendarIcon';
import CategoryIcon from '@/app/components/atoms/icons/dashboard/CategoryIcon';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import {
  registeredActivitiesAndEvents,
} from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

function RegisteredActivitiesAndEvents() {
  return (
    <div className="w-full">
      <section className="grid grid-cols-3 gap-6">
        {registeredActivitiesAndEvents.map((activitiesAndEvent) => {
          return (
            <div
              key={activitiesAndEvent.title}
              className="flex flex-col gap-4 max-w-[333px] bg-white flex-1"
            >
              <div className="h-[161px] relative">
                <Image
                  className="w-[333px] h-[161px] object-cover rounded-[8px]"
                  src={activitiesAndEvent.image}
                  alt={activitiesAndEvent.title}
                />
                <p
                  className={cn(
                    'border border-[#FFFFFFA6] absolute top-3 right-3  bg-[#00000059] text-white rounded-[32px] py-1 px-2 ',
                    poppins_500.className
                  )}
                >
                  {activitiesAndEvent.price}
                </p>
              </div>
              <div className=" flex flex-col gap-3">
                <h2
                  className={cn('text-base text-gray1', poppins_500.className)}
                >
                  {activitiesAndEvent.title}
                </h2>

                <div
                  className={cn(
                    'flex items-center gap-2 text-gray3 text-sm',
                    poppins_500.className
                  )}
                >
                  <span className="text-gray3">{activitiesAndEvent.type} </span>
                  <Dot />
                  <span>{activitiesAndEvent.mode}</span>
                </div>
                <div
                  className={cn(
                    'flex items-center gap-2 text-gray6 text-xs',
                    poppins_400.className
                  )}
                >
                  <span className="flex items-center gap-1">
                    <CalendarIcon />
                    {activitiesAndEvent.date}{' '}
                  </span>
                  <span className="flex items-center gap-1">
                    <CategoryIcon />
                    {activitiesAndEvent.category}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default RegisteredActivitiesAndEvents;
