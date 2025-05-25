'use client';

import AuthWrapper from '@/components/atoms/form/auth/AuthWrapper';
import Button from '@/components/atoms/form/Button';
import Input from '@/components/atoms/form/Input';
import { Inter_400, Inter_800 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React, { useEffect, useState } from 'react';
import {
  forgotPassordEmail,
  forgotPassordOTP,
} from '@/app/lib/entities/auth.entity';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import logUtil from '@/app/lib/utils/log';
import { resetPassword } from '@/app/lib/actions/auth.action';
import PasswordStrengthBar, {
  calculatePasswordStrength,
} from '@/components/atoms/form/PasswordStrengthBar';
import { PasswordStrength } from '../signup/set-password/page';

function ResetPassword() {
  const router = useRouter();
  const email = forgotPassordEmail.use();
  const otp = forgotPassordOTP.use();

  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength | null>(null);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: (values) => {
      const errors: { password?: string; confirmPassword?: string } = {};

      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords don't match";
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        const resp = await resetPassword({
          email: email || '',
          confirmPassword: values.confirmPassword,
          newPassword: values.password,
          otp: otp || '',
        });
        console.log('Response:', resp);
        forgotPassordEmail.set(null);
        forgotPassordOTP.set(null);
        // TODO: route to school specific login page
        router.replace('/login');
      } catch (error) {
        logUtil(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (formik.values.password) {
      setPasswordStrength(calculatePasswordStrength(formik.values.password));
    } else {
      setPasswordStrength(null);
    }
  }, [formik.values.password]);

  const isStrongPassword: boolean =
    passwordStrength !== null && passwordStrength.score >= 60;

  useEffect(() => {
    if (!email || !otp) {
      router.replace('/forgot-password');
    }
  }, []);

  return (
    <AuthWrapper>
      <div className="w-full py-28 px-14 mx-auto">
        <div className="flex flex-col gap-4">
          <div className="mx-auto w-full xxs:px-2 tablet:px-10 --laptop:px-28">
            <h2
              className={cn('text-black1 text-2xl mb-4', Inter_800.className)}
            >
              Reset Password
            </h2>
            <p className={cn('text-[#667185] text-sm', Inter_400.className)}>
              Enter New Password
            </p>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="mx-auto w-full xxs:px-2 tablet:px-10 laptop:px-10 desktop:px-28"
          >
            <Input
              id="password"
              label="Password"
              type="password"
              labelClassName="label"
              name="password"
              className="h-14 rounded-lg"
              placeholder="Password"
              value={formik.values.password}
              handleChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errMsg={formik.errors.password}
            />

            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              labelClassName="label mt-6"
              name="confirmPassword"
              className="h-14 rounded-lg"
              placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              handleChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errMsg={formik.errors.confirmPassword}
            />

            <br />
            <PasswordStrengthBar password={formik.values.password} />

            <Button
              round
              wide
              className="mt-12 rounded-full h-12 text-base"
              loading={formik.isSubmitting}
              type="submit"
              disabled={formik.isSubmitting}
            >
              {!isStrongPassword && formik.values.password
                ? 'Set Weak Password'
                : 'Proceed'}
            </Button>
          </form>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default ResetPassword;
