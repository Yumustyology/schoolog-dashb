'use client';
import AuthWrapper from '@/components/atoms/form/auth/AuthWrapper';
import Button from '@/components/atoms/form/Button';
import Input from '@/components/atoms/form/Input';
import { Inter_400, Inter_800 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React, { useState } from 'react';
import logUtil from '@/app/lib/utils/log';
import { forgotPassordEmail } from '@/app/lib/entities/auth.entity';
import { forgotPassword } from '@/app/lib/actions/auth.action';
import showToast from '@/app/lib/utils/toast';
import { useRouter } from 'next/navigation';

function ForgotPassword() {
   const router = useRouter();
  const [loading, setLoading] = useState(false);
  const email = forgotPassordEmail.use();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      showToast('Please enter your email address', 'Email is required', {
        type: 'warning',
      });
      return;
    }

    setLoading(true);

    try {
      const resp = await forgotPassword(email);
      console.log('Response:', resp);
      router.push('/forgot-password/otp/');
    } catch (err) {
      logUtil(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <div className="mx-auto w-full xxs:px-2 tablet:px-10 laptop:px-10 desktop:px-28">
        <div className="flex flex-col gap-4">
          <div className="mx-auto w-full xxs:px-2 tablet:px-10 laptop:px-28">
            <h2
              className={cn('text-black1 text-2xl mb-4', Inter_800.className)}
            >
              Forgot Password
            </h2>
            <p className={cn('text-[#667185] text-sm', Inter_400.className)}>
              Enter your registered email address.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto w-full xxs:px-2 tablet:px-10 laptop:px-28"
          >
            <Input
              id="email"
              label="Email Address"
              type="email"
              labelClassName="label"
              className="input h-14 rounded-lg"
              name="email"
              placeholder="Email Address"
              value={email || ''}
              handleChange={(e) => forgotPassordEmail.set(e.target.value)}
            />

            <Button
              round
              wide
              className="mt-8 rounded-full h-12 text-base"
              loading={loading}
              type="submit"
              disabled={loading}
            >
              Proceed
            </Button>
          </form>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default ForgotPassword;
