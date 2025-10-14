import React from 'react';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';

interface Props {
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

const FormSectionHeader: React.FC<Props> = ({ title, description, className }) => {
  return (
    <div className={cn('mb-12 mt-6', className)}>
      <h2 className={cn('text-xl text-gray1 mb-1', poppins_500.className)}>{title}</h2>
      {description ? (
        <p className={cn('text-sm text-gray3', poppins_400.className)}>{description}</p>
      ) : null}
    </div>
  );
};

export default FormSectionHeader;
