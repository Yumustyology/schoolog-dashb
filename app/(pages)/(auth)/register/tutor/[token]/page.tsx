'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { poppins_400, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import Input from '@/components/atoms/form/Input';
import Button from '@/components/atoms/form/Button';
import showToast from '@/app/lib/utils/toast';
import staffInvitesActions, {
  InvitePreview,
} from '@/app/lib/actions/staff-invites.action';

const TutorRegisterPage = () => {
  const params = useParams<{ token: string }>();
  const token = params.token;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [invite, setInvite] = useState<InvitePreview | null>(null);
  const [inviteError, setInviteError] = useState<string | null>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (!token) return;
    staffInvitesActions
      .validateStaffInvite(token)
      .then((res) => {
        if (res.data) {
          setInvite(res.data);
          if (res.data.email) setEmail(res.data.email);
        }
      })
      .catch((err) => {
        setInviteError(
          err?.message || 'This invite link is invalid or has expired'
        );
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !phone || !password) {
      showToast('All fields are required', 'tutor-register-validation', {
        type: 'error',
      });
      return;
    }
    if (password.length < 8) {
      showToast('Password must be at least 8 characters', 'tutor-register-validation', {
        type: 'error',
      });
      return;
    }
    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'tutor-register-validation', {
        type: 'error',
      });
      return;
    }

    setSubmitting(true);
    try {
      await staffInvitesActions.registerViaStaffInvite(token, {
        firstName,
        lastName,
        email,
        phone,
        password,
      });
      setRegistered(true);
      setTimeout(() => router.push('/login'), 2500);
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-16 mx-auto w-full tablet:px-6 laptop:px-20 px-8">
      <div className="flex flex-col gap-4 justify-center w-full">
        <Image
          alt="logo"
          height={250}
          width={280}
          priority
          className="m-auto contain"
          src="/assets/images/logo.png"
        />

        {loading ? (
          <p
            className={cn(
              'text-center text-gray6 text-sm',
              poppins_400.className
            )}
          >
            Checking your invite link…
          </p>
        ) : inviteError ? (
          <div className="text-center">
            <h1 className={cn('text-xl mb-2 text-red-600', poppins_600.className)}>
              Invite link unavailable
            </h1>
            <p className={cn('text-gray3 text-sm', poppins_400.className)}>
              {inviteError}
            </p>
          </div>
        ) : registered ? (
          <div className="text-center">
            <h1 className={cn('text-xl mb-2', poppins_600.className)}>
              You&apos;re all set 🎉
            </h1>
            <p className={cn('text-gray3 text-sm', poppins_400.className)}>
              Your account has been created. Redirecting you to log in…
            </p>
          </div>
        ) : (
          <>
            <div className={cn('pt-4 mx-auto text-center mb-6', poppins_400.className)}>
              <h1 className={cn('text-[26px] mb-2', poppins_600.className)}>
                Join <span className="text-primary">{invite?.schoolName}</span>
              </h1>
              <p className={cn('text-gray3 text-sm max-w-[470px]', poppins_400.className)}>
                You&apos;ve been invited as a {invite?.role?.toLowerCase()}. Create
                your account to get started.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="mx-auto w-full xxs:px-2 tablet:px-10 laptop:px-10 desktop:px-28"
            >
              <Input
                id="firstName"
                label="First name"
                type="text"
                labelClassName="label"
                className="input h-14 rounded-lg"
                name="firstName"
                placeholder="First name"
                value={firstName}
                handleChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                id="lastName"
                label="Last name"
                type="text"
                labelClassName="label mt-6"
                className="input h-14 rounded-lg"
                name="lastName"
                placeholder="Last name"
                value={lastName}
                handleChange={(e) => setLastName(e.target.value)}
              />
              <Input
                id="email"
                label="Email Address"
                type="email"
                labelClassName="label mt-6"
                className="input h-14 rounded-lg"
                name="email"
                placeholder="Enter your e‑mail address"
                value={email}
                disabled={!!invite?.email}
                handleChange={(e) => setEmail(e.target.value)}
              />
              <Input
                id="phone"
                label="Phone number"
                type="tel"
                labelClassName="label mt-6"
                className="input h-14 rounded-lg"
                name="phone"
                placeholder="Phone number"
                value={phone}
                handleChange={(e) => setPhone(e.target.value)}
              />
              <Input
                id="password"
                label="Password"
                type="password"
                labelClassName="label mt-6"
                className="h-14 rounded-lg"
                name="password"
                placeholder="Password"
                value={password}
                handleChange={(e) => setPassword(e.target.value)}
              />
              <Input
                id="confirmPassword"
                label="Confirm password"
                type="password"
                labelClassName="label mt-6"
                className="h-14 rounded-lg"
                name="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                handleChange={(e) => setConfirmPassword(e.target.value)}
              />

              <Button
                round
                wide
                className="mt-12 rounded-full h-12 text-base"
                type="submit"
                disabled={submitting}
                loading={submitting}
              >
                Create account
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default TutorRegisterPage;
