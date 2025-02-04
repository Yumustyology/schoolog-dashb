import React from 'react';

const StudentsIcon = ({ color = '#828282' }: { color?: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.63333 9.05768C7.55 9.04935 7.45 9.04935 7.35833 9.05768C5.375 8.99102 3.8 7.36602 3.8 5.36602C3.8 3.32435 5.45 1.66602 7.5 1.66602C9.54167 1.66602 11.2 3.32435 11.2 5.36602C11.1917 7.36602 9.61667 8.99102 7.63333 9.05768Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.675 3.33398C15.2917 3.33398 16.5917 4.64232 16.5917 6.25065C16.5917 7.82565 15.3417 9.10898 13.7833 9.16732C13.7167 9.15898 13.6417 9.15898 13.5667 9.16732"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.46667 12.134C1.45 13.484 1.45 15.684 3.46667 17.0257C5.75833 18.559 9.51667 18.559 11.8083 17.0257C13.825 15.6757 13.825 13.4757 11.8083 12.134C9.525 10.609 5.76667 10.609 3.46667 12.134Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.2833 16.666C15.8833 16.541 16.45 16.2993 16.9167 15.941C18.2167 14.966 18.2167 13.3577 16.9167 12.3827C16.4583 12.0327 15.9 11.7993 15.3083 11.666"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default StudentsIcon;
