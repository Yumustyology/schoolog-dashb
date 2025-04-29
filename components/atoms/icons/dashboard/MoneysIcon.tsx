import React from 'react';

function MoneysIcon({ color = 'white' }: { color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M16.0831 6.60414V10.8958C16.0831 13.4625 14.6165 14.5625 12.4165 14.5625H5.09147C4.71647 14.5625 4.35813 14.5292 4.0248 14.4542C3.81647 14.4208 3.61647 14.3625 3.43314 14.2958C2.18314 13.8292 1.4248 12.7458 1.4248 10.8958V6.60414C1.4248 4.03747 2.89147 2.9375 5.09147 2.9375H12.4165C14.2831 2.9375 15.6248 3.72916 15.9831 5.5375C16.0415 5.87083 16.0831 6.21247 16.0831 6.60414Z"
        stroke={color}
        strokeWidth="1.3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.5837 9.1057V13.3974C18.5837 15.9641 17.1171 17.064 14.9171 17.064H7.59206C6.97539 17.064 6.41706 16.9807 5.93373 16.7974C4.94206 16.4307 4.26706 15.6724 4.02539 14.4557C4.35872 14.5307 4.71706 14.564 5.09206 14.564H12.4171C14.6171 14.564 16.0837 13.4641 16.0837 10.8974V6.6057C16.0837 6.21404 16.0504 5.86406 15.9837 5.53906C17.5671 5.8724 18.5837 6.98904 18.5837 9.1057Z"
        stroke={color}
        strokeWidth="1.3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.74884 10.9547C9.96387 10.9547 10.9489 9.96973 10.9489 8.7547C10.9489 7.53967 9.96387 6.55469 8.74884 6.55469C7.53381 6.55469 6.54883 7.53967 6.54883 8.7547C6.54883 9.96973 7.53381 10.9547 8.74884 10.9547Z"
        stroke={color}
        strokeWidth="1.3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.9834 6.92188V10.5886"
        stroke={color}
        strokeWidth="1.3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5176 6.92188V10.5886"
        stroke={color}
        strokeWidth="1.3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default MoneysIcon;
