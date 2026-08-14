'use client';

import React, { useEffect } from 'react';
import { signupEmail } from '@/app/lib/entities/auth.entity';
import IsNotVerified from '@/components/molecules/auth/IsNotVerified';
import { useRouter } from 'next/navigation';
import { resendLoginOtp, verifyEmail } from '@/app/lib/actions/auth.action';

function Page() {
  const email = signupEmail.use();
  const router = useRouter();

  useEffect(() => {
    if (!email) {
      router.replace('/signup');
    }
  }, [email, router]);

  if (!email) {
    return <p></p>;
  }

  const handleResend = async () => {
    await resendLoginOtp(email);
  };

  const handleVerify = async (otp: string) => {
    const resp = await verifyEmail({ email, otp, type: 'signup' });
    if (resp?.status === 'success') {
      router.push('/signup/set-password');
    }
  };

  return (
    <IsNotVerified
      email={email}
      handleResendFunc={handleResend}
      handleVerifyFunc={handleVerify}
      title="Verify School Email"
    />
  );
}

export default Page;
