'use client';
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
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { Button } from '@/app/components/atoms/form/Button';
import Link from 'next/link';
import CircleMark from '@/app/components/atoms/icons/CircleMark';
import IsVerified from '@/app/components/molecules/auth/IsVerified';
import IsNotVerified from '@/app/components/molecules/auth/IsNotVerified';

function Verification() {
  const [verify, setVerify] = useState(true);

  if (verify) {
    return <IsVerified />;
  }

  return (
    <div className="py-28 px-14 mx-auto w-full">
      <IsNotVerified title="Verify your account" />
    </div>
  );
}

export default Verification;
