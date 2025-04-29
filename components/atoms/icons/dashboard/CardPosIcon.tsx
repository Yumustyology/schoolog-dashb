import React from 'react';

function CardPosIcon({ color = 'white' }: { color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M3.27441 13.2318L13.2327 3.27344"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.25098 15.2344L10.251 14.2344"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.4941 12.9917L13.4858 11"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.00138 8.53649L8.53472 3.00315C10.3014 1.23649 11.1847 1.22815 12.9347 2.97815L17.0264 7.06982C18.7764 8.81982 18.7681 9.70315 17.0014 11.4698L11.4681 17.0032C9.70138 18.7698 8.81805 18.7782 7.06805 17.0282L2.97638 12.9365C1.22638 11.1865 1.22638 10.3115 3.00138 8.53649Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.66699 18.3281H18.3337"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CardPosIcon;
