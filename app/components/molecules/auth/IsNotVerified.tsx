import {
  Inter_400,
  Inter_800,
  poppins_500,
} from '@/app/lib/config/font.config';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import Button from '../../atoms/form/Button';
import AuthWrapper from '../../atoms/form/auth/AuthWrapper';
// import { Button } from '../../atoms/form/Button';

type IsNotVerifiedProps = {
  title: string;
};

function IsNotVerified({ title }: IsNotVerifiedProps) {
  return (
    <AuthWrapper>
      <div className="w-full py-28 px-14 mx-auto">
        <div className="flex flex-col gap-6  mx-auto w-full xxs:px-2 tablet:px-10  laptop:px-28">
          <div>
            <h2
              className={cn('text-[#101928] text-xl mb-6', Inter_800.className)}
            >
              {title}
            </h2>
            <p className={cn('text-[#101928] text-sm', Inter_400.className)}>
              Enter verification code sent{' '}
              <Link href="/" className="text-primary">
                to adekoyatoluwani5@gmail.com
              </Link>
            </p>
          </div>

          <div className="">
            <InputOTP maxLength={6}>
              <InputOTPGroup className="flex laptop:gap-4 gap-2">
                <InputOTPSlot
                  className={cn('otp-input', poppins_500.className)}
                  index={0}
                />
                <InputOTPSlot
                  className={cn('otp-input', poppins_500.className)}
                  index={1}
                />
                <InputOTPSlot
                  className={cn('otp-input', poppins_500.className)}
                  index={2}
                />
                <InputOTPSlot
                  className={cn('otp-input', poppins_500.className)}
                  index={3}
                />
                <InputOTPSlot
                  className={cn('otp-input', poppins_500.className)}
                  index={4}
                />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="text-left">
            <p
              className={cn('text-[#101928] text-sm mb-6', Inter_400.className)}
            >
              Didn’t get the code?{' '}
              <Link href="/" className="text-primary">
                Resend
              </Link>
            </p>
            <p className={cn('text-primary text-sm', Inter_400.className)}>
              34 secs
            </p>
          </div>

          <Button round wide className="mt-6 rounded-full h-12 text-base">
            Verify Account
          </Button>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default IsNotVerified;
