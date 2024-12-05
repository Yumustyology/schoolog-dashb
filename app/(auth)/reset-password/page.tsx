import { Button } from '@/app/components/atoms/form/Button';
import Input from '@/app/components/molecules/auth/Input';
import { Inter_400, Inter_800 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

function ResetPassword() {
  return (
    <div className=" w-full flex items-center justify-start min-h-screen py-28 tablet:px-14 laptop:px-28 mx-auto px-8">
      <div className="flex flex-col items-start max-w-lg w-full gap-6">
        <div>
          <h2
            className={cn('text-[#101828] text-2xl mb-4', Inter_800.className)}
          >
            Reset Password
          </h2>
          <p className={cn('text-[#667185] text-sm', Inter_400.className)}>
            Enter New Password
          </p>
        </div>

        <form action="" className="w-full">
          <Input
            id="emailLogin-password"
            label="Password"
            type="password"
            labelClassName="label mt-4"
            name="password"
            placeholder="**************"
            // value={loginInfo.password}
            // handleChange={updateLoginInfo}
          />

          <Input
            id="emailLogin-password"
            label="Confirm Password"
            type="password"
            labelClassName="label mt-4"
            name="password"
            placeholder="**************"
            // value={loginInfo.password}
            // handleChange={updateLoginInfo}
          />

          <div className="py-8">
            <Button name="Proceed" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
