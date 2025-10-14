import React from 'react';
import { cn } from '@/app/lib/utils';
import { Inter_500, poppins_400, poppins_600 } from '@/app/lib/config/font.config';
import Button from '@/components/atoms/form/Button';
import { AdditionIcon, NoSubjectIcon } from '@/components/atoms/icons/Icons';

interface NoSubjectCreatedProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

const NoSubjectCreated: React.FC<NoSubjectCreatedProps> = ({
  title = 'No subjects found for this school.',
  description = 'You have not yet created any subject. Click on the button below to create a subject',
  buttonText = 'Add new Subject',
  buttonLink = '/school/subjects/create-new-subject',
}) => {
  return (
    <div className="col-span-full text-center text-gray-500 p-10 min-h-[360px]">
      <div className="w-full flex justify-center">
        <NoSubjectIcon />
      </div>
      <h3
        className={cn(
          'text-lg font-semibold text-black1 mt-8',
          poppins_600.className
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          'text-sm text-gray-600 mt-3',
          poppins_400.className
        )}
      >
        {description}
      </p>
      <div className="mt-4">
        <Button
          round
          className="bg-primary text-white h-[44px] py-3 px-6 flex gap-2"
          to={buttonLink}
        >
          <AdditionIcon color={'white'} />
          <span className={cn('text-base', Inter_500.className)}>
            {buttonText}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default NoSubjectCreated;
