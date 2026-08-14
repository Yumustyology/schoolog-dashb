export interface ErrorLogPayload {
  message: string;
  file?: string;
  line?: number;
  column?: number;
  stack?: string;
  severity?: 'error' | 'warning' | 'info';
  context?: Record<string, unknown>;
}

export const logUtil = {
  logError: (payload: ErrorLogPayload) => {
    const { message, file, line, column, stack, severity = 'error', context = {} } = payload;
    console.error('[logUtil:error]', { message, file, line, column, severity, stack, ...context });
    // TODO: send to your analytics / monitoring service
  },

  logPageView: (pageTitle?: string, pagePath?: string) => {
    const title = pageTitle ?? (typeof document !== 'undefined' ? document.title : undefined);
    const path = pagePath ?? (typeof window !== 'undefined' ? window.location.pathname : undefined);
    console.info('[logUtil:pageView]', { title, path, timestamp: new Date().toISOString() });
    // TODO: send to your analytics / monitoring service
  },

  logEvent: (eventName: string, data?: Record<string, unknown>) => {
    console.info('[logUtil:event]', { eventName, ...data, timestamp: new Date().toISOString() });
    // TODO: send to your analytics / monitoring service
  },

  logUserAction: (action: string, metadata?: Record<string, unknown>) => {
    console.info('[logUtil:userAction]', {
      action,
      ...metadata,
      timestamp: new Date().toISOString(),
    });
    // TODO: send to your analytics / monitoring service
  },

  logUnhandledRejection: (reason: unknown) => {
    console.error('[logUtil:unhandledRejection]', {
      reason: reason instanceof Error ? reason.message : JSON.stringify(reason),
      severity: 'error',
      timestamp: new Date().toISOString(),
    });
    // TODO: send to your analytics / monitoring service
  },
};
