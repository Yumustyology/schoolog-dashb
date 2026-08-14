'use client';

import {
  resendPasswordResetOtp,
  verifyForgotPasswordOtp,
} from '@/app/lib/actions/auth.action';
import {
  forgotPassordEmail,
  forgotPassordOTP,
} from '@/app/lib/entities/auth.entity';
import IsNotVerified from '@/components/molecules/auth/IsNotVerified';
import { useRouter } from 'next/navigation';
import React from 'react';

function Page() {
  const router = useRouter();
  const email = forgotPassordEmail.use();
  const otp = forgotPassordOTP.use();

  if (!email || !otp) {
    router.replace('/forgot-password');
    return null;
  }
  const handleResend = async () => {
    await resendPasswordResetOtp(email);
  };

  const handleVerify = async (otp: string) => {
    forgotPassordOTP.set(otp);
    const resp = await verifyForgotPasswordOtp({ email, otp });
    console.log('Response:', resp);
    if (resp?.status === 'success') {
      router.push('/reset-password');
    }
  };

  return (
    <div>
      <IsNotVerified
        handleResendFunc={handleResend}
        handleVerifyFunc={handleVerify}
        email={email || ''}
        title="Forgot Password"
      />
    </div>
  );
}

export default Page;
