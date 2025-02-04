import React from 'react';
import CircleMark from '../../atoms/icons/CircleMark';

import { cn } from '@/lib/utils';
import { Inter_400, Inter_800 } from '@/app/lib/config/font.config';
import Button from '../../atoms/form/Button';
import AuthWrapper from '../../atoms/form/auth/AuthWrapper';

function IsVerified() {
  return (
    <AuthWrapper>
      <main className=" w-full flex items-center justify-center min-h-screen py-28 px-14 mx-auto">
        <div className="flex flex-col items-center justify-center max-w-lg w-full ">
          <div className="mx-auto mb-8">
            <CircleMark />
          </div>

          <div className="text-center">
            <h1
              className={cn(
                'mb-4 text-[28px] text-black1',
                Inter_800.className
              )}
            >
              {' '}
              Successful
            </h1>
            <p className={cn('text-[#667085] text-xl', Inter_400.className)}>
              Your account has been <br /> successfully verified!
            </p>
          </div>

          <Button round wide className="mt-10 rounded-full h-14 text-sm">
            {' '}
            Continue
          </Button>
        </div>
      </main>
    </AuthWrapper>
  );
}

export default IsVerified;
