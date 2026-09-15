import React from 'react';

function LogoutModalICon({ size = 64 }: { size?: number | string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="24" fill="#EB5757" fillOpacity="0.06" />
      <path
        d="M20.8999 19.5583C21.2099 15.9583 23.0599 14.4883 27.1099 14.4883H27.2399C31.7099 14.4883 33.4999 16.2783 33.4999 20.7483V27.2683C33.4999 31.7383 31.7099 33.5283 27.2399 33.5283H27.1099C23.0899 33.5283 21.2399 32.0783 20.9099 28.5383"
        stroke="#EB5757"
        strokeWidth="1.5"
      />
      <path d="M27.0001 24H15.6201" stroke="#EB5757" strokeWidth="1.5" />
      <path
        d="M17.85 20.6484L14.5 23.9984L17.85 27.3484"
        stroke="#EB5757"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default LogoutModalICon;
