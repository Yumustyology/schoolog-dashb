'use client';

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Input from '@/components/atoms/form/Input';
// import { cn } from '@/app/lib/utils';
// import {
//   Inter_400,
//   poppins_400,
//   poppins_600,
// } from '@/app/lib/config/font.config';
import Button from '@/components/atoms/form/Button';
// import AuthWrapper from '@/components/atoms/form/auth/AuthWrapper';
import { setSchoolPasswordSchema } from '@/app/lib/policy/auth.policy';
// import { SetPassowrdFormValues } from '@/app/lib/types/auth.types';
import { setPasswordSchool } from '@/app/lib/actions/register-school.action';
import 'react-country-state-city/dist/react-country-state-city.css';
import PasswordStrengthBar, {
  calculatePasswordStrength,
} from '@/components/atoms/form/PasswordStrengthBar';
import AuthWrapper from '@/components/atoms/form/auth/AuthWrapper';
import {
  Inter_400,
  poppins_400,
  poppins_600,
} from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { useRouter } from 'next/navigation';
import { signupEmail } from '@/app/lib/entities/auth.entity';
import { handleError } from '@/app/lib/utils/handleError';
import { replaceProfileState } from '@/app/lib/entities/profile.entity';
import localforage from 'localforage';
import { LockOutlineIcon } from '@/components/atoms/icons/Icons';

interface FormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

// TODO: Move this to a separate file if it grows larger
export interface PasswordStrength {
  score: number;
  strength: string;
  color: string;
  checks: {
    length: boolean;
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    symbols: boolean;
  };
}

function CreatePasswordForm(): JSX.Element {
  const navigate = useRouter();
  const email = signupEmail.use();

  const [loading, setLoading] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength | null>(null);

  const formik = useFormik<FormData>({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: (values: FormData): FormErrors => {
      const errors: FormErrors = {};

      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }

      return errors;
    },
    onSubmit: async (values: FormData): Promise<void> => {
      const { error } = setSchoolPasswordSchema.validate(values, {
        abortEarly: false,
      });
      if (error) {
        const schemaErrors: FormErrors = {};
        error.details.forEach((err) => {
          const key = err.path[0] as keyof FormData;
          schemaErrors[key] = err.message;
        });
        formik.setErrors(schemaErrors);
        return;
      }

      setLoading(true);
      try {
        const resp = await setPasswordSchool({
          retryPassword: values.confirmPassword,
          password: values.password,
          email,
        });

        if (
          resp &&
          resp.data &&
          resp.message === 'Password set successfully'
        ) {
          await localforage.setItem('accessToken', resp.data.token);
          if (resp.data.refreshToken) {
            await localforage.setItem('refreshToken', resp.data.refreshToken);
          }

          replaceProfileState({
            slgId: resp.data?.slgId || '',
            schoolId: resp.data?.schoolId || '',
            slugId: resp.data?.slugId || '',
            audience: resp.data?.audience || '',
            slug: resp.data?.slug || '',
            schoolSlugId: resp.data?.schoolSlugId || '',
            firstName: resp.data?.firstName || '',
            lastName: resp.data?.lastName || '',
            email: resp.data?.email || '',
          });

          navigate.push('/signup/select-plan');
        }
      } catch (err) {
        const errorMsg = handleError(err);
        console.error('Error setting password:', errorMsg);
        if (
          errorMsg.toLocaleLowerCase() ===
          'Password-setup window has expired. Use “Reset password” instead.'.toLocaleLowerCase()
        ) {
          signupEmail.set(null);
          navigate.replace('/forgot-password');
        }
      } finally {
        setLoading(false);
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
    if (!email) {
      navigate.replace('/signup');
    }
  }, []);

  if (!email) {
    return <p></p>;
  }

  return (
    <div className="w-full pb-10 px-14 mt-[120px] mx-auto">
      <div className="w-16 h-16 bg-primary1 scale-125 rounded-full flex items-center justify-center mx-auto mb-5">
        <LockOutlineIcon className="w-8 h-8 text-primary" />
      </div>
      <div className="flex flex-col gap-4">
        <div
          className={cn(
            'pt-18 mx-auto text-center mb-6',
            poppins_400.className
          )}
        >
          <h1 className={cn('text-[26px] mb-2', poppins_600.className)}>
            Set a <span className="text-primary">secure password</span>
          </h1>
          <p className={cn('text-gray text-sm max-w-md', Inter_400.className)}>
            For your protection, create a strong password that combines letters,
            numbers, and special characters. This helps keep your account and
            data safe.
          </p>
        </div>
      </div>

      <AuthWrapper>
        <form
          onSubmit={formik.handleSubmit}
          className="mx-auto w-full xxs:px-2 tablet:px-10 laptop:px-10 desktop:px-28"
        >
          <Input
            id="password"
            label="Create Password"
            type="password"
            name="password"
            placeholder="Enter a strong password"
            value={formik.values.password}
            handleChange={formik.handleChange}
            errMsg={formik.errors.password}
            className="input mb-6 h-14 rounded-lg"
            labelClassName="label mt-4"
          />

          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Repeat your password"
            value={formik.values.confirmPassword}
            handleChange={formik.handleChange}
            errMsg={formik.errors.confirmPassword}
          />
          <br />
          <PasswordStrengthBar password={formik.values.password} />
          <Button
            type="submit"
            round
            wide
            loading={loading}
            className={`mt-12 rounded-full h-12 text-base ${!isStrongPassword && formik.values.password ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
          >
            {!isStrongPassword && formik.values.password
              ? 'Set Weak Password'
              : 'Continue'}
          </Button>
        </form>
      </AuthWrapper>
    </div>
  );
}

export default CreatePasswordForm;
