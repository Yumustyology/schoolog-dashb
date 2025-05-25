import logUtil from './log';
import showToast from './toast';

// const currentURL = () => {
//   if (typeof window !== 'undefined') {
//     return `"${window.location.href}"`;
//   }
//   return '';
// };

export const handleError = (error: Error | string | unknown) => {
  let errorMessage = 'An error occurred please try again!';
  if (error instanceof Error) {
    if (error && typeof error === 'object' && 'response' in error) {
      errorMessage = (error as any).response.data.message || error.message;
      console.error(errorMessage);
      if (typeof errorMessage == 'string') {
        if (errorMessage?.toLocaleLowerCase() !== 'unauthorized') {
          showToast(errorMessage, errorMessage, {
            type: 'error',
            theme: 'light',
          });
        }
      } else {
        logUtil('error', errorMessage);
      }
    } else {
      errorMessage = error.message;
      if (errorMessage.toLocaleLowerCase() !== 'unauthorized') {
        showToast(errorMessage, errorMessage, {
          type: 'error',
          theme: 'light',
        });
      }
    }
  } else if (typeof error === 'string') {
    errorMessage = error;
    showToast(errorMessage, 'error', {
      type: 'error',
      theme: 'light',
    });
  } else {
    console.error('An unknown error occurred.');
    if (errorMessage.toLocaleLowerCase() !== 'unauthorized') {
      showToast(errorMessage, 'unknown-error', {
        type: 'error',
        theme: 'colored',
      });
    }
  }
  return errorMessage;
};
