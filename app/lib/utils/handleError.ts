import { logUtil } from './logUtil';
import showToast from './toast';
import type { ResponseType } from '../types/api-response.types';

type ErrorWithResponse = {
  response?: {
    status?: number;
    data?: {
      message?: string | string[];
    };
  };
};

// Messages that indicate the response interceptor is already handling a
// session-expiry redirect (see axios.config.ts) — don't also toast for these.
const AUTH_REDIRECT_MESSAGES = ['unauthorized', 'invalid token', 'token expired'];

const isResponseType = (error: unknown): error is ResponseType => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    'message' in error &&
    'status' in error
  );
};

export const handleError = (error: Error | string | unknown) => {
  let errorMessage = 'An error occurred please try again!';

  if (isResponseType(error)) {
    errorMessage = Array.isArray(error.message)
      ? error.message.join(', ')
      : typeof error.message === 'string'
      ? error.message
      : String(error.message);

    logUtil.logError({
      message: errorMessage,
      severity: error.status === 'error' ? 'error' : 'warning',
      context: {
        statusCode: error.statusCode,
        status: error.status,
      },
    });

    if (!AUTH_REDIRECT_MESSAGES.includes(errorMessage.toLowerCase())) {
      showToast(errorMessage, 'error', { type: 'error' });
    }
  } else if (error instanceof Error) {
    if (typeof error === 'object' && 'response' in error) {
      const resp = (error as ErrorWithResponse).response;
      const rawMessage = resp?.data?.message || error.message;
      errorMessage = Array.isArray(rawMessage)
        ? rawMessage.join(', ')
        : typeof rawMessage === 'string'
        ? rawMessage
        : String(rawMessage);

      logUtil.logError({
        message: errorMessage,
        stack: error.stack,
        severity: 'error',
        context: {
          hasResponse: true,
          responseData: resp?.data,
        },
      });

      showToast(errorMessage, 'error', { type: 'error' });
    } else {
      errorMessage = error.message;

      logUtil.logError({
        message: errorMessage,
        stack: error.stack,
        severity: 'error',
      });

      showToast(errorMessage, 'error', { type: 'error' });
    }
  } else if (typeof error === 'string') {
    errorMessage = error;

    logUtil.logError({
      message: errorMessage,
      severity: 'error',
    });

    showToast(errorMessage, 'error', { type: 'error' });
  } else {
    logUtil.logError({
      message: 'Unknown error occurred',
      severity: 'error',
      context: { error },
    });

    showToast(errorMessage, 'error', { type: 'error' });
  }

  return errorMessage;
};
