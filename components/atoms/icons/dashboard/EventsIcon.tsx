import React from 'react';

const EventsIcon = ({color= "#EB5757"}: {color?: string}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.05 8.70005L17.2333 12.1834C16.5333 15.1917 15.15 16.4084 12.55 16.1584C12.1333 16.125 11.6833 16.05 11.2 15.9334L9.79999 15.6C6.32499 14.775 5.24999 13.0584 6.06665 9.57505L6.88332 6.08338C7.04999 5.37505 7.24999 4.75838 7.49999 4.25005C8.47499 2.23338 10.1333 1.69171 12.9167 2.35005L14.3083 2.67505C17.8 3.49171 18.8667 5.21671 18.05 8.70005Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5498 16.1583C12.0331 16.5083 11.3831 16.8 10.5915 17.0583L9.2748 17.4917C5.96646 18.5583 4.2248 17.6667 3.1498 14.3583L2.08313 11.0667C1.01646 7.75833 1.8998 6.00833 5.20813 4.94167L6.5248 4.50833C6.86646 4.4 7.19146 4.30833 7.4998 4.25C7.2498 4.75833 7.0498 5.375 6.88313 6.08333L6.06646 9.575C5.2498 13.0583 6.3248 14.775 9.7998 15.6L11.1998 15.9333C11.6831 16.05 12.1331 16.125 12.5498 16.1583Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5332 7.10828L14.5749 8.13328"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.7168 10.3334L12.1335 10.95"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EventsIcon;
