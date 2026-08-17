import { publicPostRequest } from '../service/apiRequests';
import showToast from '../utils/toast';
import { AudienceTypes } from '../types/audience-types';
import type { ResponseType } from '@/app/lib/types/api-response.types';

type VerifyEmailResponse = { otp?: string };

type LoginResponse = {
  token?: string;
  refreshToken?: string;
  user?: {
    slgId: string;
    schoolId: string;
    slugId: string;
    schoolSlugId: string;
    userType: AudienceTypes;
    audience: string;
    audienceRole?: string;
    slug: string;
    firstName: string;
    lastName: string;
    email?: string;
  };
};

export type LoginPayloadBase = {
  password: string;
  audienceType: AudienceTypes;
  schoolSlugId: string;
};

export type LoginWithEmail = LoginPayloadBase & {
  email: string;
  userId?: never;
};
export type LoginWithUserId = LoginPayloadBase & {
  userId: string;
  email?: never;
};

export type LoginPayload = LoginWithEmail | LoginWithUserId;

export const login = async (
  payload: LoginPayload
): Promise<ResponseType<LoginResponse>> => {
  const response = await publicPostRequest<LoginResponse>('auth/login', payload);
  if (response?.message) {
    showToast(response.message, response.message, {
      type: response.status === 'success' ? 'success' : 'error',
    });
  }
  return response;
};

export const forgotPassword = async (
  email: string
): Promise<ResponseType<VerifyEmailResponse>> => {
  const response = await publicPostRequest<VerifyEmailResponse>(
    'auth/forgot-password',
    { email }
  );
  if (response?.message) {
    showToast(response.message, response.message, {
      type: response.status === 'success' ? 'success' : 'error',
    });
  }
  return response;
};

export const resetPassword = async (payload: {
  email: string;
  confirmPassword: string;
  newPassword: string;
  otp: string;
}): Promise<ResponseType<VerifyEmailResponse>> => {
  const response = await publicPostRequest<VerifyEmailResponse>(
    'auth/reset-password',
    payload
  );

  if (response?.message) {
    showToast(response.message, response.message, {
      type: response.status === 'success' ? 'success' : 'error',
    });
  }
  return response;
};

export const verifyEmail = async (payload: {
  email: string;
  otp: string;
  type?: 'signup' | string;
}): Promise<ResponseType<VerifyEmailResponse>> => {
  const response = await publicPostRequest<VerifyEmailResponse>(
    'auth/verify-email',
    payload
  );

  if (response?.message) {
    showToast(response.message, response.message, {
      type: response.status == 'success' ? 'success' : 'error',
    });
  }
  return response;
};

export const verifyForgotPasswordOtp = async (payload: {
  email: string;
  otp: string;
  type?: 'signup' | string;
}): Promise<ResponseType<VerifyEmailResponse>> => {
  const response = await publicPostRequest<VerifyEmailResponse>(
    'auth/verify-forgot-password-otp',
    payload
  );

  if (response?.message) {
    showToast(response.message, response.message, {
      type: response.status == 'success' ? 'success' : 'error',
    });
  }
  return response;
};

export const resendPasswordResetOtp = async (
  email: string
): Promise<ResponseType<VerifyEmailResponse>> => {
  const response = await publicPostRequest<VerifyEmailResponse>(
    'auth/forgot-password-resend-otp',
    { email }
  );
  if (response?.message) {
    showToast(response.message, response.message, {
      type: response.status == 'success' ? 'success' : 'error',
    });
  }
  return response;
};

export const resendLoginOtp = async (
  email: string
): Promise<ResponseType<VerifyEmailResponse>> => {
  const response = await publicPostRequest<VerifyEmailResponse>(
    'auth/resend-login-otp',
    { email }
  );
  if (response?.message) {
    showToast(response.message, response.message, {
      type: response.status == 'success' ? 'success' : 'error',
    });
  }
  return response;
};
