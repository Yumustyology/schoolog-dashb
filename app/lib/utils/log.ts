type LogType = 'log' | 'warn' | 'error';

const logUtil = (...args: unknown[]): void => {
  const type: LogType =
    typeof args[0] === 'string' && ['log', 'warn', 'error'].includes(args[0])
      ? (args.shift() as LogType)
      : 'log';

  if (process.env.NODE_ENV === 'development') {
    console[type](...args);
  }
};

export default logUtil;
