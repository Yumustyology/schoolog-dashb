'use client';

import { debounce } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import Input from '@/components/atoms/form/Input';
import { cn } from '@/app/lib/utils';
import {
  Inter_400,
  poppins_400,
  poppins_600,
} from '@/app/lib/config/font.config';
import Button from '@/components/atoms/form/Button';
import AuthWrapper from '@/components/atoms/form/auth/AuthWrapper';
import Image from 'next/image';
import { registerSchema } from '@/app/lib/policy/auth.policy';
import { RegisterFormValues } from '@/app/lib/types/auth.types';
import {
  createNewSchool,
  generateSlugFromBackend,
} from '@/app/lib/actions/register-school.action';
import { CountrySelect, StateSelect } from 'react-country-state-city';
import { State, Country } from 'react-country-state-city/dist/esm/types';
import 'react-country-state-city/dist/react-country-state-city.css';
import { useRouter } from 'next/navigation';
import { signupEmail } from '@/app/lib/entities/auth.entity';

function Register() {
  const navigate = useRouter()
  const isAutoGeneratingSlug = useRef(false);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState<Country | null>(null);
  const [currentState, setCurrentState] = useState<State | null>(null);

  const formik = useFormik({
    initialValues: {
      schoolName: '',
      email: '',
      country: '',
      state: '',
      slug: '',
      firstname: '',
      lastname: '',
      password: '',
      confirmPassword: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: (values) => {
      const errors: Partial<Record<keyof RegisterFormValues, string>> = {};

      if (formik.touched.password || formik.touched.confirmPassword) {
        const { error } = registerSchema
          .fork(['password', 'confirmPassword'], (schema) => schema)
          .validate(values, { abortEarly: false });

        if (error) {
          error.details.forEach((err) => {
            const key = err.path[0] as keyof RegisterFormValues;
            errors[key] = err.message;
          });
        }
      }

      return errors;
    },
    onSubmit: async (values) => {
      const { error } = registerSchema.validate(values, { abortEarly: false });
      const errors: Partial<Record<keyof RegisterFormValues, string>> = {};

      if (error) {
        error.details.forEach((err) => {
          const key = err.path[0] as keyof RegisterFormValues;
          errors[key] = err.message;
        });
        formik.setErrors(errors);
        return;
      }
      setLoading(true);
      try {
        const resp = await createNewSchool({
          name: values.schoolName,
          slug: values.slug,
          email: values.email,
          country: values.country,
          state: values.state,
          adminFirstName: values.firstname,
          adminLastName: values.lastname,
          retryPassword: values.confirmPassword,
          password: values.password,
        });
        
        if (
          resp &&
          resp.data?.statusCode === 201 &&
          resp.data?.message == 'Verification email sent successfully'
        ) {
          signupEmail.set(values.email);
          navigate.push('/signup/otp')
        } else if (resp) {
          formik.setFieldError(
            'email',
            resp.data?.message || 'An error occurred'
          );
        } else {
          formik.setFieldError(
            'email',
            'Something went wrong. Please try again.'
          );
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleSlugGeneration = useCallback(
    debounce(async (schoolName: string) => {
      if (schoolName) {
        try {
          const resp = await generateSlugFromBackend({ schoolName });
          isAutoGeneratingSlug.current = true;
          formik.setFieldValue('slug', resp.slug);
        } catch (err) {
          console.error('Failed to generate slug:', err);
        }
      }
    }, 700),
    []
  );

  useEffect(() => {
    handleSlugGeneration(formik.values.schoolName);
  }, [formik.values.schoolName, handleSlugGeneration]);
  const debouncedCheckSlugAvailability = useRef(
    debounce(async (slug: string) => {
      try {
        const resp = await fetch(`/api/check-slug?slug=${slug}`);
        const data = await resp.json();
        if (!data.available) {
          formik.setFieldError('slug', 'Slug is already taken');
        }
      } catch (err) {
        console.error('Error checking slug availability', err);
      }
    }, 700)
  ).current;

  useEffect(() => {
    if (!formik.values.slug) return;
    if (isAutoGeneratingSlug.current) {
      isAutoGeneratingSlug.current = false;
    } else {
      debouncedCheckSlugAvailability(formik.values.slug);
    }
  }, [formik.values.slug, debouncedCheckSlugAvailability]);

  return (
    <div className="w-full py-8 px-14 mx-auto">
      <Image
        alt="logo"
        height={250}
        width={280}
        className="m-auto"
        src={'/assets/images/logo.png'}
      />
      <div className="flex flex-col gap-4">
        <div
          className={cn(
            'pt-18 mx-auto text-center mb-6',
            poppins_400.className
          )}
        >
          <h1 className={cn('text-[26px] mb-2', poppins_600.className)}>
            Let&apos;s onboard you
            <span className="text-primary"> swiftly </span>
          </h1>
          <p className={cn('text-gray text-sm max-w-md', Inter_400.className)}>
            Get your school set up in minutes. Register your institution and
            start managing everything from one powerful dashboard.
          </p>
        </div>

        <AuthWrapper>
          <form
            onSubmit={formik.handleSubmit}
            className="mx-auto w-full xxs:px-2 tablet:px-10 laptop:px-10 desktop:px-28"
          >
            <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4">
              <Input
                id="schoolName"
                label="School Name"
                type="text"
                name="schoolName"
                placeholder="Input School Name"
                className="input mb-6 h-14 rounded-lg"
                labelClassName="label mt-4"
                value={formik.values.schoolName}
                handleChange={formik.handleChange}
                errMsg={formik.errors.schoolName}
              />
              <Input
                id="email"
                label="Email Address"
                type="email"
                name="email"
                placeholder="Input Email Address"
                className="input mb-6 h-14 rounded-lg"
                labelClassName="label mt-4"
                value={formik.values.email}
                handleChange={formik.handleChange}
                errMsg={formik.errors.email}
              />
            </div>

            <div className="grid mt-4 grid-cols-1 laptop:grid-cols-2 gap-4">
              {/* <Input
                id="country"
                label="Country"
                type="text"
                name="country"
                placeholder="Input Country"
                className="input mb-6 h-14 rounded-lg"
                labelClassName="label mt-4"
                value={formik.values.country}
                handleChange={formik.handleChange}
                errMsg={formik.errors.country}
              /> */}
              <Input
                id="slug"
                label="Slug"
                type="text"
                name="slug"
                placeholder="e.g EHS"
                className="input mb-6 h-14 rounded-lg"
                labelClassName="label"
                value={formik.values.slug}
                handleChange={formik.handleChange}
                errMsg={formik.errors.slug}
              />
              <div>
                <label
                  htmlFor={'country'}
                  className={cn(
                    'label block text-left w-full font-nunito text-base mb-3'
                  )}
                >
                  Country
                </label>
                <CountrySelect
                  id="country"
                  containerClassName="form-group h-14"
                  inputClassName="form-input-group"
                  onChange={(selected: Country) => {
                    setCountry(selected);
                    formik.setFieldValue('country', selected.name);
                  }}
                  placeHolder="Select Country"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor={'country'}
                  className={cn(
                    'label block text-left w-full font-nunito text-base mb-3'
                  )}
                >
                  State
                </label>
                <StateSelect
                  countryid={country?.id as number}
                  containerClassName="form-group h-14"
                  inputClassName="form-input-group"
                  onChange={(selected: State) => {
                    setCurrentState(selected);
                    formik.setFieldValue('state', selected.name);
                  }}
                  defaultValue={currentState?.id?.toString()}
                  placeHolder="Select State"
                />
              </div>
              <Input
                id="firstname"
                label="First Name"
                type="text"
                name="firstname"
                placeholder="e.g. Ali"
                className="mb-6 h-14 rounded-lg"
                labelClassName="label"
                value={formik.values.firstname}
                handleChange={formik.handleChange}
                errMsg={formik.errors.firstname}
              />
            </div>

            <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4">
              <Input
                id="lastname"
                label="Full Name"
                type="text"
                name="lastname"
                placeholder="e.g. Dodo"
                className="mb-6 h-14 rounded-lg"
                labelClassName="label"
                value={formik.values.lastname}
                handleChange={formik.handleChange}
                errMsg={formik.errors.lastname}
              />
              <Input
                id="password"
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                className="mb-6 h-14 rounded-lg"
                labelClassName="label"
                value={formik.values.password}
                handleChange={formik.handleChange}
                errMsg={formik.errors.password}
              />
            </div>

            <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4">
              <Input
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Repeat your password"
                className="mb-6 h-14 rounded-lg"
                labelClassName="label"
                value={formik.values.confirmPassword}
                handleChange={formik.handleChange}
                errMsg={formik.errors.confirmPassword}
              />
            </div>

            <Button
              type="submit"
              round
              wide
              loading={loading}
              className="mt-12 rounded-full h-12 text-base"
            >
              Sign up
            </Button>
          </form>
        </AuthWrapper>

        <div
          className={cn(
            'text-center mt-8 text-[#323232] text-sm',
            poppins_400.className
          )}
        >
          <p>
            Already have an account?{' '}
            <Link href="login" className="text-primary">
              Log in
            </Link>
          </p>
          <p className="mt-4">
            By Signing In, you agree to our{' '}
            <Link href="/" className="text-primary">
              terms of services
            </Link>
            <br />
            and that you have read our{' '}
            <Link href="/" className="text-primary">
              privacy policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
