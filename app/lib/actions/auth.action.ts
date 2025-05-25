import { AxiosResponse } from 'axios';
import { postRequest } from '../service/apiRequests';
import showToast from '../utils/toast';
import { AudienceTypes } from '../types/audience-types';

type VerifyEmailResponse = {
  message: string;
  statusCode: number;
  status: string;
};

type LoginResponse = {
  message: string;
  status: string;
  statusCode: number;
  data: {
    token?: string;
    user?: {
      slg_id: string;
      school_id: string;
      slug_id: string;
      school_slug_id: string;
      user_type: AudienceTypes;
      audience: string;
      slug: string;
      firstName: string;
      lastName: string;
      email?: string;
    };
  };
};

export type LoginPayloadBase = {
  password: string;
  audience_type: AudienceTypes;
  school_slug_id: string;
};

export type LoginWithEmail = LoginPayloadBase & {
  email: string;
  user_id?: never;
};
export type LoginWithUserId = LoginPayloadBase & {
  user_id: string;
  email?: never;
};

export type LoginPayload = LoginWithEmail | LoginWithUserId;

export const login = async (
  payload: LoginPayload
): Promise<AxiosResponse<LoginResponse> | void> => {
  const response = await postRequest<LoginResponse>('auth/login', payload);
  if (response?.data?.message) {
    showToast(response.data.message, response.data.message, {
      type: response.data.status === 'success' ? 'success' : 'error',
    });
  }
  return response;
};

export const forgotPassword = async (
  email: string
): Promise<AxiosResponse<VerifyEmailResponse> | void> => {
  const response = await postRequest<VerifyEmailResponse>(
    'auth/forgot-password',
    { email }
  );
  if (response?.data?.message) {
    showToast(response.data.message, response.data.message, {
      type: response.data.status === 'success' ? 'success' : 'error',
    });
    return response;
  }
  return;
};

export const resetPassword = async (payload: {
  email: string;
  confirmPassword: string;
  newPassword: string;
  otp: string;
}): Promise<AxiosResponse<VerifyEmailResponse> | void> => {
  const response = await postRequest<VerifyEmailResponse>(
    'auth/reset-password',
    payload
  );

  if (response?.data?.message) {
    showToast(response.data.message, response.data.message, {
      type: response.data.status === 'success' ? 'success' : 'error',
    });
    return response;
  }
  return;
};

export const verifyEmail = async (payload: {
  email: string;
  otp: string;
  type?: 'signup' | string;
}): Promise<AxiosResponse<VerifyEmailResponse> | void> => {
  const response = await postRequest<VerifyEmailResponse>(
    'auth/verify-email',
    payload
  );

  if (response?.data?.message) {
    showToast(response.data.message, response.data.message, {
      type: response.data.status == 'success' ? 'success' : 'error',
    });
  }
  return response;
};

export const verifyForgotPasswordOtp = async (payload: {
  email: string;
  otp: string;
  type?: 'signup' | string;
}): Promise<AxiosResponse<VerifyEmailResponse> | void> => {
  const response = await postRequest<VerifyEmailResponse>(
    'auth/verify-forgot-password-otp',
    payload
  );

  if (response?.data?.message) {
    showToast(response.data.message, response.data.message, {
      type: response.data.status == 'success' ? 'success' : 'error',
    });
    return response;
  }
  return;
};

export const resendPasswordResetOtp = async (
  email: string
): Promise<AxiosResponse<VerifyEmailResponse> | void> => {
  const response = await postRequest<VerifyEmailResponse>(
    'auth/forgot-password-resend-otp',
    { email }
  );
  if (response?.data?.message) {
    showToast(response.data.message, response.data.message, {
      type: response.data.status == 'success' ? 'success' : 'error',
    });
  }
  return response;
};

export const resendLoginOtp = async (
  email: string
): Promise<AxiosResponse<VerifyEmailResponse> | void> => {
  const response = await postRequest<VerifyEmailResponse>(
    'auth/resend-login-otp',
    { email }
  );
  if (response?.data?.message) {
    showToast(response.data.message, response.data.message, {
      type: response.data.status == 'success' ? 'success' : 'error',
    });
  }
  return response;
};
