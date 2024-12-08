import AuthWrapper from '@/app/components/atoms/form/AuthWrapper';
import Button from '@/app/components/atoms/form/Button';
import Input from '@/app/components/atoms/form/Input';
import {
  Inter_400,
  poppins_400,
  poppins_600,
} from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

function Login() {
  return (
    <div className="py-28 mx-auto w-full tablet:px-6 laptop:px-20 px-8 ">
      <div className="flex flex-col gap-4 justify-center w-full ">
        <div
          className={cn(
            'pt-18 mx-auto text-center mb-6',
            poppins_400.className
          )}
        >
          <h1 className={cn('text-[26px] mb-2', poppins_600.className)}>
            Welcome to <span className="text-primary"> EduSpaher </span>
          </h1>
          <p className={cn('text-gray text-sm', Inter_400.className)}>
            Lorem ipsum dolor sit amet consectetur. <br /> Sapien ipsum lorem
            volutpat magna tortor.
          </p>
        </div>

        <AuthWrapper>
          <form
            action=""
            className="max-w-[50rem] mx-auto w-full xxs:px-2 tablet:px-10  laptop:px-28"
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

            <Input
              id="emailLogin-password"
              label="Password"
              type="password"
              labelClassName="label mt-6"
              name="password"
              className="h-14 rounded-lg"
              placeholder="Password"
              // value={loginInfo.password}
              // handleChange={updateLoginInfo}
            />

            <Button round wide className="mt-12 rounded-full h-12 text-base">
              Login
            </Button>
          </form>
        </AuthWrapper>

        <div
          className={cn(
            'text-center mt-8 text-[#323232] text-base',
            poppins_400.className
          )}
        >
          <p className={cn('text-base', poppins_400.className)}>
            Don't have an account?{' '}
            <Link href="signup" className={cn('text-primary')}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
