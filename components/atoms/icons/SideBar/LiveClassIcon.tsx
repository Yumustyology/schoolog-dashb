import React from 'react';

const LiveClassIcon = ({
  color = '#828282',
  size = '20',
}: {
  color?: string;
  size?: string;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.6668 1.66797C13.3335 1.66797 14.1668 2.50964 14.1668 4.19297V10.068C14.1668 11.7263 12.9918 12.368 11.5502 11.5013L10.4502 10.8346C10.2002 10.6846 9.80016 10.6846 9.55016 10.8346L8.45016 11.5013C7.0085 12.368 5.8335 11.7263 5.8335 10.068V4.19297C5.8335 2.50964 6.66683 1.66797 8.3335 1.66797H11.6668Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.68317 4.15781C2.8415 4.63281 1.6665 6.38281 1.6665 9.91615V12.4411C1.6665 16.6495 3.33317 18.3328 7.49984 18.3328H12.4998C16.6665 18.3328 18.3332 16.6495 18.3332 12.4411V9.91615C18.3332 6.32448 17.1165 4.56615 14.1665 4.13281"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LiveClassIcon;
