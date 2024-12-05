// import { Button } from '@/app/components/atoms/Button';
import Button from '@/app/components/atoms/form/Button';
import Input from '@/app/components/atoms/form/Input';
import {
  poppins_400,
  poppins_600,
  roboto_300,
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
            'pt-18 mx-auto text-center mb-4',
            poppins_400.className
          )}
        >
          <h1 className={cn('text-2xl mb-2', poppins_600.className)}>
            {' '}
            Welcome to <span className="text-primary"> EduSpaher </span>{' '}
          </h1>
          <p className="text-gray text-xs  ">
            Lorem ipsum dolor sit amet consectetur. <br /> Sapien ipsum lorem
            volutpat magna tortor.
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
            className="input"
            name="email"
            placeholder="Email Address"
            // value={loginInfo.password}
            // handleChange={updateLoginInfo}
          />

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

          <div className="mt-16">
            <Button wide>Log in</Button>
          </div>
        </form>

        <div
          className={cn(
            'text-center mt-8 text-[#323232] text-base',
            poppins_400.className
          )}
        >
          <p>
            {' '}
            Don't have an account?{' '}
            <Link href="register" className="text-primary">
              {' '}
              Sign up{' '}
            </Link>{' '}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
