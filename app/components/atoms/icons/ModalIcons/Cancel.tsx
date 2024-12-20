import React from 'react';

function Cancel({ strokeColor = "#4F4F4F" }: { strokeColor?: string }) {
  return (
    <svg
      width="43"
      height="44"
      viewBox="0 0 43 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.1992 27.2969L26.8058 16.6903"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.8058 27.3097L16.1992 16.7031"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Cancel;


