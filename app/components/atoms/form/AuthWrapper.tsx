import React, { ReactNode } from 'react';

type AuthWrapperProp = {
  children: ReactNode; // The children component to be rendered within the AuthWrapper.
};

function AuthWrapper({ children }: AuthWrapperProp) {
  return <div className="w-full mx-auto max-w-[50rem]">{children}</div>;
}

export default AuthWrapper;
