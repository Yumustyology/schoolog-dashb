import React from 'react';
import Link from 'next/link';
import Input from '@/components/atoms/form/Input';
import { cn } from '@/app/lib/utils';
import {
  Inter_400,
  poppins_400,
  poppins_600,
} from '@/app/lib/config/font.config';
import Button from '@/components/atoms/form/Button';
import AuthWrapper from '@/components/atoms/form/auth/AuthWrapper';

function Register() {
  return (
    <div className="w-full py-28 px-14 mx-auto">
      <div className="flex flex-col gap-4  ">
        <div
          className={cn(
            'pt-18 mx-auto text-center mb-6',
            poppins_400.className
          )}
        >
          <h1 className={cn('text-[26px] mb-2', poppins_600.className)}>
            Welcome to <span className="text-primary"> Schholog+ </span>
          </h1>
          <p className={cn('text-gray text-sm', Inter_400.className)}>
            Lorem ipsum dolor sit amet consectetur. <br /> Sapien ipsum lorem
            volutpat magna tortor.
          </p>
        </div>

        <AuthWrapper>
          <form
            action=""
            className="mx-auto w-full xxs:px-2 tablet:px-10  laptop:px-28"
          >
            <Input
              id="fullname"
              label="Full name"
              type="text"
              labelClassName="label"
              className="mb-6 h-14 rounded-lg"
              name="fullname"
              placeholder="Input your name"
              // value={loginInfo.password}
              // handleChange={updateLoginInfo}
            />
            <Input
              id="email"
              label="Email address"
              type="email"
              labelClassName="label mt-4"
              className="input mb-6 h-14 rounded-lg"
              name="email"
              placeholder="Input email address"
              // value={loginInfo.password}
              // handleChange={updateLoginInfo}
            />

            <Input
              id="emailLogin-password"
              label="Password"
              type="password"
              labelClassName="label mt-6"
              name="password"
              className="mb-6 h-14 rounded-lg"
              placeholder="Password"
              // value={loginInfo.password}
              // handleChange={updateLoginInfo}
            />
            <Input
              id="emailLogin-password"
              label="Confirm password"
              type="password"
              labelClassName="label mt-6"
              name="password"
              className="mb-6 h-14 rounded-lg"
              placeholder="Password"
              // value={loginInfo.password}
              // handleChange={updateLoginInfo}
            />

            <Button round wide className="mt-12 rounded-full h-12 text-base">
              Sign up
            </Button>
          </form>
        </AuthWrapper>

        <div
          className={cn(
            'text-center mt-8 text-[#323232] text-sm',
            poppins_400.className
          )}
        >
          <p>
            {' '}
            Already have an account?{' '}
            <Link href="login" className="text-primary">
              Log in
            </Link>
          </p>
          <p className="mt-4">
            By Signing In, you agree to our{' '}
            <Link href="/" className="text-primary">
              terms of services
            </Link>
            <br />
            and that you have read our{' '}
            <Link href="/" className="text-primary">
              privacy policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
