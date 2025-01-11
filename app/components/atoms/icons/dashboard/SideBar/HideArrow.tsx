import React from 'react';

function HideArrow({
  width = 24,
  height = 25,
  color = '#292D32',
}: {
  width?: number;
  height?: number;
  color?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 24 25`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.9201 9.44922L13.4001 15.9692C12.6301 16.7392 11.3701 16.7392 10.6001 15.9692L4.08008 9.44922"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default HideArrow;
