import React from 'react';

function Annoucement({
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
        d="M16.6668 6.87508V15.0001C16.6668 17.5001 15.1752 18.3334 13.3335 18.3334H6.66683C4.82516 18.3334 3.3335 17.5001 3.3335 15.0001V6.87508C3.3335 4.16675 4.82516 3.54175 6.66683 3.54175C6.66683 4.05841 6.87514 4.52508 7.21681 4.86675C7.55847 5.20841 8.02516 5.41675 8.54183 5.41675H11.4585C12.4918 5.41675 13.3335 4.57508 13.3335 3.54175C15.1752 3.54175 16.6668 4.16675 16.6668 6.87508Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3332 3.54175C13.3332 4.57508 12.4915 5.41675 11.4582 5.41675H8.5415C8.02484 5.41675 7.55815 5.20841 7.21648 4.86674C6.87481 4.52508 6.6665 4.05841 6.6665 3.54175C6.6665 2.50841 7.50817 1.66675 8.5415 1.66675H11.4582C11.9748 1.66675 12.4415 1.87508 12.7832 2.21675C13.1249 2.55842 13.3332 3.02508 13.3332 3.54175Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.6665 10.8333H9.99984"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.6665 14.1667H13.3332"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Annoucement;
