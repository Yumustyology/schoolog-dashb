'use client';
import React from 'react';
import { useFormik } from 'formik';

import Button from '@/components/atoms/form/Button';
import Review from '@/components/atoms/icons/ModalIcons/Review';
import Modal from '@/components/molecules/Modal';
import AccountName from '@/components/molecules/auth/AccountName';
import Input from '@/components/atoms/form/Input';
import StudentPageNumber from '@/components/molecules/auth/StudentPageNumber';
import AuthWrapper from '@/components/atoms/form/auth/AuthWrapper';
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

export default function Page() {
  const navigate = useRouter();
  const { audience_type } = authState.use();

  const [loginMethod, setLoginMethod] = React.useState<'id' | 'email'>('id');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // resetAuthState();

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
    <AuthWrapper>
      <main className="w-full min-h-screen py-20 px-36 mx-auto">
        <StudentPageNumber />
        <br />
        <div className="flex flex-col items-center justify-center mx-auto max-w-xl w-full">
          <div className="mb-7 text-center">
            <h1
              className={cn(
                'text-black1 mb-2 text-3xl leading-10',
                poppins_600.className
              )}
            >
              {loginMethod === 'id' ? (
                <>
                  Input your{' '}
                  <span className="text-primary">{audience_type} ID</span> to
                  access your profile
                </>
              ) : (
                <>
                  Input your <span className="text-primary">Email</span> to
                  access your profile
                </>
              )}
            </h1>
            <p
              className={cn(
                'text-[#828282] text-base mt-4',
                poppins_400.className
              )}
            >
              Enter your credentials to verify your account and access your
              personalized dashboard.
            </p>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 w-full"
          >
            <div className="mb-4">
              <AccountName small />
            </div>

            <Input
              label={
                loginMethod === 'id' ? `${audience_type} ID` : 'Email Address'
              }
              placeholder={
                loginMethod === 'id'
                  ? `Input your ${audience_type} ID`
                  : 'Enter your e‑mail address'
              }
              name="identifier"
              value={formik.values.identifier}
              handleChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errMsg={formik.touched.identifier ? formik.errors.identifier : ''}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              name="password"
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
              wide
              round
              className="h-12 mt-8"
              type="submit"
              disabled={isLoading || !formik.isValid}
              loading={isLoading}
            >
              Continue
            </Button>
          </form>

          {/* Success modal – only after mock API resolves */}
          {isModalOpen && (
            <Modal isOpen onClose={() => setIsModalOpen(false)} title="Review">
              <div className="flex flex-col items-center justify-center">
                <div className="mb-8">
                  <Review />
                </div>
                <h3 className={cn('text-lg', Inter_600.className)}>
                  ID Verified
                </h3>
                <p
                  className={cn(
                    'text-center text-gray3 mt-4',
                    Inter_400.className
                  )}
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
          )}
        </div>
      </main>
    </AuthWrapper>
  );
}

function mockApi(values: { identifier: string; password: string }) {
  return new Promise<void>((resolve) => {
    // simulate 1.5‑second latency
    setTimeout(() => resolve(), 1500);
    console.log('Mock API called with:', values);
  });
}
