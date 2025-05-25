'use client';

import { Inter_400, Inter_800 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import showToast from '@/app/lib/utils/toast';
import AuthWrapper from '@/components/atoms/form/auth/AuthWrapper';
import Button from '@/components/atoms/form/Button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import React from 'react';

type IsNotVerifiedProps = {
  title: string;
  email: string;
  handleVerifyFunc: (otp: string) => Promise<void>;  // async function expected
  handleResendFunc: () => Promise<void>;             // async function expected
};

function IsNotVerified({
  title,
  email,
  handleVerifyFunc,
  handleResendFunc,
}: IsNotVerifiedProps) {
  const [otp, setOtp] = React.useState('');
  const [resendTimer, setResendTimer] = React.useState(30);
  const [isResendDisabled, setIsResendDisabled] = React.useState(true);
  
  const [verifyLoading, setVerifyLoading] = React.useState(false);
  const [resendLoading, setResendLoading] = React.useState(false);

  React.useEffect(() => {
    if (resendTimer === 0) {
      setIsResendDisabled(false);
      return;
    }
    const timerId = setTimeout(() => {
      setResendTimer(resendTimer - 1);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [resendTimer]);

  const resendButtonDisabled = isResendDisabled || resendLoading;

  const otpString = otp.split('').join('');

  const handleVerify = async () => {
    if (otpString.length < 5) {
      showToast('Please enter a 5-digit OTP', 'please enter a 5-digit OTP', {
        type: 'warning',
      });
      return;
    }

    try {
      setVerifyLoading(true);
      await handleVerifyFunc(otpString);
      console.log('Verifying OTP:', otpString, 'for email:', email);
    } catch (error) {
      console.error('Verify error:', error);
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendButtonDisabled) return;

    try {
      setResendLoading(true);
      await handleResendFunc();
      console.log('Resending OTP to:', email);
      setIsResendDisabled(true);
      setResendTimer(30);
    } catch (error) {
      console.error('Resend error:', error);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <div className="w-full py-28 px-14 mx-auto">
        <div className="flex flex-col gap-6 mx-auto w-full xxs:px-2 tablet:px-10 laptop:px-10">
          <div>
            <h2
              className={cn('text-[#101928] text-xl laptop:text-2xl mb-6', Inter_800.className)}
            >
              {title}
            </h2>
            <p className={cn('text-[#101928] text-sm', Inter_400.className)}>
              Enter verification code sent{' '}
              <span className="text-primary">to {email}</span>
            </p>
          </div>

          <div>
            <InputOTP
              value={otp}
              onChange={(value) => setOtp(value)}
              maxLength={5}
              disabled={verifyLoading}
            >
              <InputOTPGroup className="flex laptop:gap-4 gap-2">
                {[0, 1, 2, 3, 4].map((index) => (
                  <InputOTPSlot
                    key={index}
                    className="border border-[#E7E7E7] text-lg laptop:text-xl h-[50px] w-[50px] laptop:h-[80px] laptop:w-[80px] bg-[#F9F9F9]"
                    index={index}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="text-left">
            <p
              className={cn('text-[#101928] text-sm mb-6', Inter_400.className)}
            >
              Didn’t get the code?{' '}
              <button
                type="button"
                onClick={handleResend}
                disabled={resendButtonDisabled}
                className={cn(
                  'text-primary hover:underline',
                  resendButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
                )}
              >
                {resendLoading ? 'Resending...' : 'Resend'}
              </button>
            </p>
            <p className={cn('text-primary text-sm', Inter_400.className)}>
              {isResendDisabled ? `${resendTimer} secs` : ''}
            </p>
          </div>

          <Button
            round
            wide
            className="mt-6 rounded-full h-[56px] text-base"
            onClick={handleVerify}
            loading={verifyLoading}
            disabled={verifyLoading}
          >
            Verify Account
          </Button>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default IsNotVerified;
