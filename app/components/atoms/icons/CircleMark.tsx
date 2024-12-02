import React from 'react';

function CircleMark() {
  return (
    <svg
      width="118"
      height="118"
      viewBox="0 0 118 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="59" cy="59" r="59" fill="#21B55A" fillOpacity="0.06" />
      <circle cx="58.9998" cy="59.2933" r="35.8997" fill="#E9F8EF" />
      <circle cx="58.9998" cy="59.2937" r="39.9814" fill="#E9F8EF" stroke="white" strokeWidth="2.22634" />
      <mask id="mask0_3_9337" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="20" y="20" width="78" height="78">
        <circle cx="59" cy="59.293" r="38.6827" fill="white" />
      </mask>
      <g mask="url(#mask0_3_9337)">
        <g filter="url(#filter0_d_3_9337)">
          <path
            d="M80.2471 59.1672C80.2471 60.8306 80.0257 62.4939 79.6935 64.0464C79.4721 65.0444 79.14 65.9315 78.8079 66.8186C76.7044 72.363 72.2761 76.7986 66.7407 78.9055C66.2979 79.0164 65.9658 79.2382 65.523 79.349C63.4195 80.0144 61.3161 80.347 58.9912 80.347C47.2562 80.347 37.7354 70.8106 37.7354 59.0563C37.7354 47.3021 47.2562 37.7656 58.9912 37.7656C70.7262 37.8765 80.2471 47.413 80.2471 59.1672Z"
            fill="url(#paint0_linear_3_9337)"
          />
          <path
            d="M65.4015 78.864L65.3867 78.8677L65.3722 78.8723C63.3177 79.5222 61.2651 79.847 58.9912 79.847C47.5331 79.847 38.2354 70.5352 38.2354 59.0563C38.2354 47.5782 47.5318 38.2669 58.9888 38.2656C70.4505 38.3752 79.7471 47.69 79.7471 59.1672C79.7471 60.7868 79.5314 62.4136 79.205 63.9398C78.9924 64.8975 78.6731 65.7524 78.34 66.6422C76.2903 72.0441 71.9781 76.3684 66.589 78.4282C66.3412 78.4932 66.1264 78.5855 65.9462 78.6628L65.9346 78.6678C65.7368 78.7527 65.5783 78.8197 65.4015 78.864Z"
            stroke="#E8EBEA"
          />
        </g>
        <path
          d="M55.3963 66.3959L55.379 66.3743L55.3595 66.3547L50.4883 61.4756C49.6868 60.6727 49.6868 59.4364 50.4883 58.6336C51.2894 57.8313 52.5222 57.8313 53.3233 58.6336L56.4231 61.7385L56.7769 62.0929L57.1308 61.7385L65.9874 52.8674C66.7884 52.065 68.0213 52.065 68.8223 52.8674C69.6238 53.6702 69.6238 54.9065 68.8223 55.7093L58.1944 66.3547L58.1749 66.3743L58.1576 66.3959C57.8354 66.7993 57.3359 66.9842 56.7769 66.9842C56.218 66.9842 55.7185 66.7993 55.3963 66.3959Z"
          fill="url(#paint1_linear_3_9337)"
          stroke="#E9F8EF"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_3_9337"
          x="29.7354"
          y="34.7656"
          width="58.5117"
          height="58.5815"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="5" />
          <feGaussianBlur stdDeviation="4" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.490196 0 0 0 0 0.113725 0 0 0 0 0.658824 0 0 0 0.12 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_9337" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3_9337" result="shape" />
        </filter>
        <linearGradient
          id="paint0_linear_3_9337"
          x1="39.8212"
          y1="37.7656"
          x2="116.475"
          y2="52.1209"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#21B55A" />
          <stop offset="1" stopColor="#0E4F27" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3_9337"
          x1="50.3948"
          y1="51.7656"
          x2="86.5513"
          y2="60.6266"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#21B55A" />
          <stop offset="1" stopColor="#0E4F27" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default CircleMark;
