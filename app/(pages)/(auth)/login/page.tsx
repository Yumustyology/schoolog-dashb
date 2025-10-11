'use client';
import React from 'react';
import { useFormik } from 'formik';
import AuthWrapper from '@/components/atoms/form/auth/AuthWrapper';
import Button from '@/components/atoms/form/Button';
import Input from '@/components/atoms/form/Input';
import Review from '@/components/atoms/icons/ModalIcons/Review';
import Modal from '@/components/molecules/Modal';
import { authState } from '@/app/lib/entities/auth.entity';
import {
  Inter_400,
  Inter_600,
  poppins_400,
  poppins_600,
} from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { validateWithJoi } from '@/app/lib/policy/auth.policy';
import { login, LoginPayload } from '@/app/lib/actions/auth.action';
import { AudienceTypes } from '@/app/lib/types/audience-types';
import localforage from 'localforage';
import { replaceProfileState } from '@/app/lib/entities/profile.entity';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Login() {
  const navigate = useRouter();
  const { audience_type } = authState.use();

  const [loginMethod, setLoginMethod] = React.useState<'id' | 'email'>('id');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const toggleMethod = () =>
    setLoginMethod((m) => (m === 'id' ? 'email' : 'id'));

  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: '',
    },
    validate: (values) => validateWithJoi(values, loginMethod, audience_type),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const payload = {
          audience_type: audience_type as AudienceTypes,
          password: values.password,
          school_slug_id: authState.get()?.school_slug_id || '',
          ...(loginMethod === 'email'
            ? { email: values.identifier }
            : { user_id: values.identifier }),
        } satisfies LoginPayload;
        const resp = await login(payload);
        if (resp && resp.data && resp.data?.message === 'Login successful') {
          await localforage.setItem('accessToken', resp.data.data.token);

          delete resp.data.data.token;
          replaceProfileState({
            slg_id: resp.data.data.user?.slg_id || '',
            school_id: resp.data.data?.user?.school_id || '',
            slug_id: resp.data.data?.user?.slug_id || '',
            audience: resp.data.data?.user?.audience || audience_type || '',
            slug: resp.data.data?.user?.slug || '',
            school_slug_id: resp.data.data?.user?.school_slug_id || '',
            firstName: resp.data.data?.user?.firstName || '',
            lastName: resp.data.data?.user?.lastName || '',
            email: resp.data.data?.user?.email || '',
          });

          navigate.replace('/school/');
        }
        setIsModalOpen(true);
      } finally {
        setIsLoading(false);
      }
    },
    enableReinitialize: true,
  });

  return (
    <div className="py-16 mx-auto w-full tablet:px-6 laptop:px-20 px-8 ">
      <div className="flex flex-col gap-4 justify-center w-full ">
        <Image
          alt="logo"
          height={250}
          width={280}
          className="m-auto"
          src={'/assets/images/logo.png'}
        />
        <div
          className={cn(
            'pt-18 mx-auto text-center mb-6 -mt-5',
            poppins_400.className
          )}
        >
          <h1 className={cn('text-[26px] mb-2', poppins_600.className)}>
            Welcome <span className="text-primary"> Back👋</span>
          </h1>
          <p
            className={cn(
              'text-gray3 text-sm max-w-[470px]',
              Inter_400.className
            )}
          >
            Sign in to access your classes, assignments, progress and more!,
            your journey continues here.
          </p>
        </div>

        <AuthWrapper>
          <form
            onSubmit={formik.handleSubmit}
            className="mx-auto w-full xxs:px-2 tablet:px-10 laptop:px-10 desktop:px-28"
          >
            <Input
              id="email"
              label={
                loginMethod === 'id' ? `${audience_type} ID` : 'Email Address'
              }
              type={loginMethod === 'id' ? 'text' : 'email'}
              labelClassName="label"
              className="input h-14 rounded-lg"
              name="identifier"
              placeholder={
                loginMethod === 'id'
                  ? `Input your ${audience_type} ID`
                  : 'Enter your e‑mail address'
              }
              value={formik.values.identifier}
              handleChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errMsg={formik.touched.identifier ? formik.errors.identifier : ''}
            />

            <Input
              id="emailLogin-password"
              label="Password"
              type="password"
              labelClassName="label mt-6"
              name="password"
              className="h-14 rounded-lg"
              placeholder="Password"
              value={formik.values.password}
              handleChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errMsg={formik.touched.password ? formik.errors.password : ''}
            />

            <p className="text-sm mt-1 self-end">
              {loginMethod === 'id'
                ? 'Prefer using e‑mail?'
                : 'Prefer using ID?'}{' '}
              <button
                type="button"
                className="text-primary underline"
                onClick={toggleMethod}
              >
                {loginMethod === 'id' ? 'Use Email Login' : 'Use ID Login'}
              </button>
            </p>

            <Button
              round
              wide
              className="mt-12 rounded-full h-12 text-base"
              type="submit"
              disabled={isLoading || !formik.isValid}
              loading={isLoading}
            >
              Continue
            </Button>
          </form>
        </AuthWrapper>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Review"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="mb-8">
              <Review />
            </div>
            <h3 className={cn('text-lg', Inter_600.className)}>ID Verified</h3>
            <p
              className={cn('text-center text-gray3 mt-4', Inter_400.className)}
            >
              Your identity has been verified successfully! Proceed to your
              dashboard to view your details.
            </p>
          </div>

          <Button
            wide
            to={audience_type == 'Admin' ? '/school' : '/'}
            round
            className="h-12 mt-7"
            onClick={() => {}}
          >
            Proceed to dashboard
          </Button>
        </Modal>
      </div>
    </div>
  );
}
