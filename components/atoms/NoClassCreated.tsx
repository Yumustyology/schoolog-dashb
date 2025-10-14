import React from 'react';
import {
  AdditionIcon,
  NoClassIcon as NoClassSvg,
} from '@/components/atoms/icons/Icons';
import Button from './form/Button';
import { cn } from '@/app/lib/utils';
import { Inter_500 } from '@/app/lib/config/font.config';

const NoClassCreated = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="mb-6">
        <NoClassSvg />
      </div>
      <h3
        className={cn(
          'text-lg font-semibold text-[#071E3B] mb-2',
          Inter_500.className
        )}
      >
        No class created
      </h3>
      <p
        className={cn(
          'text-sm text-[#667085] mb-6 text-center max-w-[340px]',
          Inter_500.className
        )}
      >
        You have not yet created any class, click the button below to create a
        class
      </p>
      <Button
         to='/school/classes/create-new-class' 
        round
        title={'Create class'}
        className={cn('h-[44px] py-3 px-6 flex gap-2 bg-primary text-white')}
      >
        <AdditionIcon color={'white'} />
        <span className={cn('text-base ', Inter_500.className)}>Add new Class</span>
      </Button>
    </div>
  );
};

export default NoClassCreated;
