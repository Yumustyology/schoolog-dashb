import React from 'react';

function Attendance({
  height = '20',
  width = '20',
  color = '#828282',
  size = '20',
}: {
  height?: string;
  width?: string;
  color?: string;
  size?: string;
}) {
  return (
    <svg
      width={height || size}
      height={width || size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0352 15.876L13.3018 17.1427L15.8352 14.6094"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.1341 9.05964C10.0508 9.0513 9.95081 9.0513 9.85915 9.05964C7.87581 8.99297 6.30081 7.36797 6.30081 5.36797C6.29248 3.3263 7.95081 1.66797 9.99248 1.66797C12.0341 1.66797 13.6925 3.3263 13.6925 5.36797C13.6925 7.36797 12.1091 8.99297 10.1341 9.05964Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99219 18.176C8.47552 18.176 6.96719 17.7927 5.81719 17.026C3.80052 15.676 3.80052 13.476 5.81719 12.1344C8.10885 10.601 11.8672 10.601 14.1589 12.1344"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Attendance;
