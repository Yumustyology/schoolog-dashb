import React from 'react';
import Link from 'next/link';
import Input from '@/app/components/atoms/form/Input';
import { cn } from '@/lib/utils';
import { poppins_400, poppins_600 } from '@/app/lib/config/font.config';
import Button from '@/app/components/atoms/form/Button';

function Register() {
  return (
    <div className="w-full py-28 px-14 mx-auto">
      <div className="flex flex-col gap-4  ">
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
            id="fullname"
            label="Full Name"
            type="text"
            labelClassName="label"
            className="input"
            name="fullname"
            placeholder="Input your name"
            // value={loginInfo.password}
            // handleChange={updateLoginInfo}
          />
          <Input
            id="email"
            label="Email Address"
            type="email"
            labelClassName="label mt-4"
            className="input"
            name="email"
            placeholder="Input email address"
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
          <Input
            id="confirm-password"
            label="Confirm Password"
            type="password"
            labelClassName="label mt-4"
            name="confirm-password"
            placeholder="**************"
            // value={loginInfo.password}
            // handleChange={updateLoginInfo}
          />

          <div className="mt-16">
            <Button wide>Register</Button>
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
            Already have an account?{' '}
            <Link href="login" className="text-primary">
              {' '}
              Log in{' '}
            </Link>{' '}
          </p>
          <p className="mt-4">
            By Signing In, you agree to our{' '}
            <Link href="/" className="text-primary">
              {' '}
              terms of services{' '}
            </Link>{' '}
            <br />
            and that you have read our{' '}
            <Link href="/" className="text-primary">
              {' '}
              privacy policy{' '}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
