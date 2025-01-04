import React from 'react';

const SuggestionBoxIcon = ({
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
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 1.66797V7.5013L11.6667 5.83464"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.0002 7.4987L8.3335 5.83203"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M1.6499 10.832H5.3249C5.64157 10.832 5.9249 11.007 6.06657 11.2904L7.04157 13.2404C7.3249 13.807 7.8999 14.1654 8.53324 14.1654H11.4749C12.1082 14.1654 12.6832 13.807 12.9666 13.2404L13.9416 11.2904C14.0832 11.007 14.3749 10.832 14.6832 10.832H18.3166"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.83317 3.44141C2.88317 3.87474 1.6665 5.60807 1.6665 9.16641V12.4997C1.6665 16.6664 3.33317 18.3331 7.49984 18.3331H12.4998C16.6665 18.3331 18.3332 16.6664 18.3332 12.4997V9.16641C18.3332 5.60807 17.1165 3.87474 14.1665 3.44141"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default SuggestionBoxIcon;
