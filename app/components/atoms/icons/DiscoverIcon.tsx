import React from 'react';

const DiscoverIcon = ({
  height = '14',
  width = '14',
  color = '#828282',
}: {
  height?: string;
  width?: string;
  color?: string;
}) => {
  return (
    <svg
      width={height}
      height={width}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.99984 12.8327C10.2082 12.8327 12.8332 10.2077 12.8332 6.99935C12.8332 3.79102 10.2082 1.16602 6.99984 1.16602C3.7915 1.16602 1.1665 3.79102 1.1665 6.99935C1.1665 10.2077 3.7915 12.8327 6.99984 12.8327Z"
        stroke={color}
        strokeMiterlimit="10"
      />
      <path
        d="M7.87484 4.66602C6.10734 4.66602 4.6665 6.11268 4.6665 7.87435C4.6665 8.67352 5.31984 9.33268 6.12484 9.33268C7.8865 9.33268 9.33317 7.88602 9.33317 6.12435C9.33317 5.32518 8.674 4.66602 7.87484 4.66602Z"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DiscoverIcon;
