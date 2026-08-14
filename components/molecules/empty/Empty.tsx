'use client';
import { poppins_400, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import Button from '@/components/atoms/form/Button';
import React, { useEffect, useState } from 'react';

type EmptyProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText?: string;
  route?: string;
};

function Empty({ icon, title, description, buttonText, route }: EmptyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="min-h-[120px] flex items-center justify-center">
        {mounted && icon}
      </div>
      <div className="flex flex-col gap-3 mt-8">
        <h2 className={cn('text-lg text-black1', poppins_600.className)}>
          {title}
        </h2>
        <p
          className={cn(
            'text-sm text-gray10 w-3/4 mx-auto',
            poppins_400.className
          )}
        >
          {description}
        </p>
      </div>
      {buttonText && (
        <Button round to={route} className="mt-12 px-8 py-3.5">
          {buttonText}
        </Button>
      )}
    </div>
  );
}

export default Empty;
