import React from 'react';
import Button from '../../form/Button';
import { poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { OpenGraduateModal } from '@/app/lib/entities/student.entity';
import { GraduateModal } from './modals/GraduateModal';

type StatusButtonProps = {
  icon: React.ReactNode;
  text: string;
  OnclickFunc?: () => void;
};

export const StatusButton = ({
  icon,
  text,
  OnclickFunc,
}: StatusButtonProps) => {
  return (
    <div>
      <Button
        round
        className="h-[44px] bg-[#EBEBEB]  py-2 px-3 flex gap-2"
        onClick={OnclickFunc}
      >
        {icon}
        <span className={cn('text-sm text-gray1 ', poppins_400.className)}>
          {text}
        </span>
      </Button>
    </div>
  );
};
