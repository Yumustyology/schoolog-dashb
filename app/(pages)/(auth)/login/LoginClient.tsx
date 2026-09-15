"use client";
import React from 'react';
import { useFormik } from 'formik';
import AuthWrapper from '@/components/atoms/form/auth/AuthWrapper';
import Button from '@/components/atoms/form/Button';
import Input from '@/components/atoms/form/Input';
import Modal from '@/components/molecules/Modal';
import VerifiedRedirect from '@/components/molecules/VerifiedRedirect';
import { authState } from '@/app/lib/entities/auth.entity';
import { poppins_400, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { validateWithJoi } from '@/app/lib/policy/auth.policy';
import { login, LoginPayload } from '@/app/lib/actions/auth.action';
import { AudienceTypes } from '@/app/lib/types/audience-types';
import localforage from 'localforage';
import { schoolState, SchoolEntity, setSchoolState } from '@/app/lib/entities/school.entity';
import { replaceProfileState } from '@/app/lib/entities/profile.entity';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { setAuthCookies } from '@/app/lib/utils/authCookies';

type Props = {
  initialLogo: string;
  initialSchool?: Partial<SchoolEntity> | null;
};

export default function LoginClient({ initialLogo, initialSchool }: Props) {
  const { audienceType } = authState.use();

  const [loginMethod, setLoginMethod] = React.useState<'id' | 'email'>('id');
  const [rememberMe, setRememberMe] = React.useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // read persisted school entity (simpler-state persistence)
  const currentSchool = schoolState.use();

  // persist initialSchool when provided (server-side prefetch)
  React.useEffect(() => {
    try {
      if (initialSchool && Object.keys(initialSchool).length > 0) {
        setSchoolState(initialSchool as Partial<SchoolEntity>);
      }
    } catch {
      // ignore malformed payloads
    }
  }, [initialSchool]);

  const [logoSrc, setLogoSrc] = React.useState<string>(initialLogo ?? '/assets/images/logo.png');
  // don't show the logo until the page is fully loaded to avoid subtle flashes
  const [showLogo, setShowLogo] = React.useState<boolean>(() => {
    try {
      return typeof window !== 'undefined' && document.readyState === 'complete';
    } catch {
      return false;
    }
  });

  const toggleMethod = () => setLoginMethod((m) => (m === 'id' ? 'email' : 'id'));

  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: '',
    },
    validate: (values) => {
      const joiErrors = validateWithJoi(values, loginMethod, audienceType);
      // Also validate that schoolSlugId is set
      const schoolSlugId = authState.get()?.schoolSlugId || '';
      if (!schoolSlugId) {
        return { ...joiErrors, schoolSlugId: 'Please select a school first' };
      }
      return joiErrors;
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const schoolSlugId = authState.get()?.schoolSlugId || '';
        if (!schoolSlugId) {
          throw new Error('School not selected. Please go back and select a school.');
        }
        const payload = {
          audienceType: audienceType as AudienceTypes,
          password: values.password,
          schoolSlugId,
          ...(loginMethod === 'email' ? { email: values.identifier } : { userId: values.identifier }),
        } satisfies LoginPayload;
        const resp = await login(payload);
        if (resp && resp.data && resp.message === 'Login successful') {
          await localforage.setItem('accessToken', resp.data.token);
          if (resp.data.refreshToken) {
            await localforage.setItem('refreshToken', resp.data.refreshToken);
          }

          // Persist HttpOnly & SameSite auth cookies for seamless token refresh & Remember Me
          setAuthCookies(resp.data.token, resp.data.refreshToken, rememberMe);

          replaceProfileState({
            slgId: resp.data.user?.slgId || '',
            schoolId: resp.data?.user?.schoolId || '',
            slugId: resp.data?.user?.slugId || '',
            audience: resp.data?.user?.audience || audienceType || '',
            slug: resp.data?.user?.slug || '',
            schoolSlugId: resp.data?.user?.schoolSlugId || '',
            firstName: resp.data?.user?.firstName || '',
            lastName: resp.data?.user?.lastName || '',
            email: resp.data?.user?.email || '',
          });

          // VerifiedRedirect (opened below) routes to the correct portal for
          // this audience via getDashboardPathForAudience — don't race it
          // with a hardcoded redirect here.
          setIsModalOpen(true);
        }
      } finally {
        setIsLoading(false);
      }
    },
    enableReinitialize: true,
  });

  React.useEffect(() => {
    // if the persisted school entity contains an image, use it as logo
    const cs = currentSchool as SchoolEntity | undefined;
    const img =
      cs?.schoolImage ?? null;

    try {
      if (img) {
        const src = typeof img === 'string' && img.startsWith('http') ? img : `${window.location.origin}${img}`;
        // only update when different to avoid flashing/extra renders
        setLogoSrc((prev) => (prev === src ? prev : src));
      }
    } catch {
      // ignore malformed values
    }
  }, [currentSchool]);

  React.useEffect(() => {
    if (showLogo) return; // already shown
    const onLoad = () => setShowLogo(true);
    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        setShowLogo(true);
        return;
      }
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }
    return undefined;
  }, [showLogo]);

  return (
    <div className="py-16 mx-auto w-full tablet:px-6 laptop:px-20 px-8 ">
      <div className="flex flex-col gap-4 justify-center w-full ">
        {/* Keep a same-size shimmer skeleton until the page loads to avoid flashes */}
        {showLogo ? (
          <Image alt="logo" height={250} width={280} priority className="m-auto contain" src={logoSrc} />
        ) : (
          <Skeleton className="m-auto w-[280px] h-[150px] rounded-md" />
        )}
        <div className={cn('pt-18 mx-auto text-center mb-6 -mt-3', poppins_400.className)}>
          <h1 className={cn('text-[26px] mb-2', poppins_600.className)}>
            Welcome <span className="text-primary"> Back👋</span>
          </h1>
          <p className={cn('text-gray3 text-sm max-w-[470px]', poppins_400.className)}>
            Sign in to access your classes, assignments, progress and more!, your journey continues here.
          </p>
        </div>

        <AuthWrapper>
          <form onSubmit={formik.handleSubmit} className="mx-auto w-full xxs:px-2 tablet:px-10 laptop:px-10 desktop:px-28">
            <Input
              id="email"
              label={loginMethod === 'id' ? `${audienceType} ID` : 'Email Address'}
              type={loginMethod === 'id' ? 'text' : 'email'}
              labelClassName="label"
              className="input h-14 rounded-lg"
              name="identifier"
              placeholder={loginMethod === 'id' ? `Input your ${audienceType} ID` : 'Enter your e‑mail address'}
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

            <div className="flex items-center justify-between mt-3 mb-1">
              <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary accent-primary cursor-pointer"
                />
                <span className={poppins_400.className}>Remember me</span>
              </label>

              <p className={cn("text-xs text-right", poppins_400.className)}>
                {loginMethod === 'id' ? 'Prefer using e‑mail?' : 'Prefer using ID?'}{' '}
                <button type="button" className="text-primary underline font-medium" onClick={toggleMethod}>
                  {loginMethod === 'id' ? 'Use Email' : 'Use ID'}
                </button>
              </p>
            </div>

            <Button round wide className="mt-8 rounded-full h-12 text-base" type="submit" disabled={isLoading || !formik.isValid} loading={isLoading}>
              Continue
            </Button>
          </form>
        </AuthWrapper>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Review">
          <VerifiedRedirect audience={audienceType} onClose={() => setIsModalOpen(false)} initialSeconds={4} />
        </Modal>
      </div>
    </div>
  );
}
