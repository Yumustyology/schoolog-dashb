import React from 'react';

function Message({
  color = '#828282',
  size = '20',
}: {
  color?: string;
  size?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.08317 15.8334H6.6665C3.33317 15.8334 1.6665 15.0001 1.6665 10.8334V6.66675C1.6665 3.33341 3.33317 1.66675 6.6665 1.66675H13.3332C16.6665 1.66675 18.3332 3.33341 18.3332 6.66675V10.8334C18.3332 14.1667 16.6665 15.8334 13.3332 15.8334H12.9165C12.6582 15.8334 12.4082 15.9584 12.2498 16.1667L10.9998 17.8334C10.4498 18.5667 9.54984 18.5667 8.99984 17.8334L7.74984 16.1667C7.6165 15.9834 7.30817 15.8334 7.08317 15.8334Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3305 9.16667H13.338"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99607 9.16667H10.0036"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66209 9.16667H6.66957"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Message;
