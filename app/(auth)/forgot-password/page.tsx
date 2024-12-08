import AuthWrapper from '@/app/components/atoms/form/AuthWrapper';
import Button from '@/app/components/atoms/form/Button';
import Input from '@/app/components/atoms/form/Input';
import { Inter_400, Inter_800 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import React from 'react';

function ForgotPassword() {
  return (
    <AuthWrapper>
      <div className="w-full py-28 px-14 mx-auto">
        <div className="flex flex-col gap-4  ">
          <div className="mx-auto w-full xxs:px-2 tablet:px-10  laptop:px-28">
            <h2
              className={cn(
                'text-[#101828] text-2xl mb-4',
                Inter_800.className
              )}
            >
              Forgot Password
            </h2>
            <p className={cn('text-[#667185] text-sm', Inter_400.className)}>
              Enter your registered email address.
            </p>
          </div>

          <form
            action=""
            className="mx-auto w-full xxs:px-2 tablet:px-10  laptop:px-28"
          >
            <Input
              id="email"
              label="Email Address"
              type="email"
              labelClassName="label"
              className="input h-14 rounded-lg"
              name="email"
              placeholder="Email Address"
              // value={loginInfo.password}
              // handleChange={updateLoginInfo}
            />

            <Button round wide className="mt-8 rounded-full h-12 text-base">
              Proceed
            </Button>
          </form>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default ForgotPassword;
