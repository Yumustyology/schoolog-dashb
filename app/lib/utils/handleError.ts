import logUtil from './log';

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
  errorMessage = ((error as unknown) as { response?: { data?: { message?: string } } }).response?.data?.message || error.message;
      console.error(errorMessage);
      if (typeof errorMessage == 'string') {
        if (errorMessage?.toLocaleLowerCase() !== 'unauthorized') {
          // Only attempt to show client toasts when running in a browser environment.
          if (typeof window !== 'undefined') {
            import('./toast').then((m) => {
              try {
                m.default(errorMessage, errorMessage, { type: 'error', theme: 'light' });
              } catch {
                /* swallow toast errors on client */
              }
            });
          }
        }
      } else {
        logUtil('error', errorMessage);
      }
    } else {
      errorMessage = error.message;
      if (errorMessage.toLocaleLowerCase() !== 'unauthorized') {
        if (typeof window !== 'undefined') {
          import('./toast').then((m) => {
              try {
                m.default(errorMessage, errorMessage, { type: 'error', theme: 'light' });
              } catch {
                /* swallow */
              }
          });
        }
      }
    }
  } else if (typeof error === 'string') {
    errorMessage = error;
    if (typeof window !== 'undefined') {
      import('./toast').then((m) => {
        try {
          m.default(errorMessage, 'error', { type: 'error', theme: 'light' });
        } catch {
          /* swallow */
        }
      });
    }
  } else {
    console.error('An unknown error occurred.');
    if (errorMessage.toLocaleLowerCase() !== 'unauthorized') {
      if (typeof window !== 'undefined') {
        import('./toast').then((m) => {
          try {
            m.default(errorMessage, 'unknown-error', { type: 'error', theme: 'colored' });
          } catch {
            /* swallow */
          }
        });
      }
    }
  }
  return errorMessage;
};
