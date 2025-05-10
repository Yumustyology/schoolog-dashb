'use client'
import { useSlgTheme } from '@/app/lib/hooks/useSlgTheme';
import React from 'react';

export function AdditionIcon({ color = 'white' }: { color?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 10H15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 15V5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function SubtractionIcon({ color }: { color?: string }) {
  return (
    <svg
      width="12"
      height="2"
      viewBox="0 0 12 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1H11"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OptionIcon() {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      className="cursor-pointer"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.33337 10C4.23337 10 3.33337 10.9 3.33337 12C3.33337 13.1 4.23337 14 5.33337 14C6.43337 14 7.33337 13.1 7.33337 12C7.33337 10.9 6.43337 10 5.33337 10Z"
        stroke="#828282"
        strokeWidth="1.5"
      />
      <path
        d="M19.3334 10C18.2334 10 17.3334 10.9 17.3334 12C17.3334 13.1 18.2334 14 19.3334 14C20.4334 14 21.3334 13.1 21.3334 12C21.3334 10.9 20.4334 10 19.3334 10Z"
        stroke="#828282"
        strokeWidth="1.5"
      />
      <path
        d="M12.3334 10C11.2334 10 10.3334 10.9 10.3334 12C10.3334 13.1 11.2334 14 12.3334 14C13.4334 14 14.3334 13.1 14.3334 12C14.3334 10.9 13.4334 10 12.3334 10Z"
        stroke="#828282"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function VIsibilityIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.58 11.9999C15.58 13.9799 13.98 15.5799 12 15.5799C10.02 15.5799 8.41998 13.9799 8.41998 11.9999C8.41998 10.0199 10.02 8.41992 12 8.41992C13.98 8.41992 15.58 10.0199 15.58 11.9999Z"
        stroke="#828282"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 20.2697C15.53 20.2697 18.82 18.1897 21.11 14.5897C22.01 13.1797 22.01 10.8097 21.11 9.39973C18.82 5.79973 15.53 3.71973 12 3.71973C8.47003 3.71973 5.18003 5.79973 2.89003 9.39973C1.99003 10.8097 1.99003 13.1797 2.89003 14.5897C5.18003 18.1897 8.47003 20.2697 12 20.2697Z"
        stroke="#828282"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function EditIcon({
  color = '#828282',
  size = 24,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.04 3.02025L8.16 10.9003C7.86 11.2003 7.56 11.7903 7.5 12.2203L7.07 15.2303C6.91 16.3203 7.68 17.0803 8.77 16.9303L11.78 16.5003C12.2 16.4403 12.79 16.1403 13.1 15.8403L20.98 7.96025C22.34 6.60025 22.98 5.02025 20.98 3.02025C18.98 1.02025 17.4 1.66025 16.04 3.02025Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.91 4.15039C15.58 6.54039 17.45 8.41039 19.85 9.09039"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function ExportIcon({
  color = '#21B55A',
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
        d="M7.4987 14.1641V9.16406L5.83203 10.8307"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 9.16406L9.16667 10.8307"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3346 8.33073V12.4974C18.3346 16.6641 16.668 18.3307 12.5013 18.3307H7.5013C3.33464 18.3307 1.66797 16.6641 1.66797 12.4974V7.4974C1.66797 3.33073 3.33464 1.66406 7.5013 1.66406H11.668"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3346 8.33073H15.0013C12.5013 8.33073 11.668 7.4974 11.668 4.9974V1.66406L18.3346 8.33073Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArchiveIcon({ color = '#828282' }: { color?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.53 9.46992L9.46998 14.5299C8.81998 13.8799 8.41998 12.9899 8.41998 11.9999C8.41998 10.0199 10.02 8.41992 12 8.41992C12.99 8.41992 13.88 8.81992 14.53 9.46992Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.82 5.77047C16.07 4.45047 14.07 3.73047 12 3.73047C8.47003 3.73047 5.18003 5.81047 2.89003 9.41047C1.99003 10.8205 1.99003 13.1905 2.89003 14.6005C3.68003 15.8405 4.60003 16.9105 5.60003 17.7705"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.41998 19.5297C9.55998 20.0097 10.77 20.2697 12 20.2697C15.53 20.2697 18.82 18.1897 21.11 14.5897C22.01 13.1797 22.01 10.8097 21.11 9.39969C20.78 8.87969 20.42 8.38969 20.05 7.92969"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.51 12.7002C15.25 14.1102 14.1 15.2602 12.69 15.5202"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.47 14.5303L2 22.0003"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 2L14.53 9.47"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UnarchiveIcon({
  color = '#828282',
  width = '21',
  height = '20',
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.4833 10.0009C13.4833 11.6509 12.1499 12.9842 10.4999 12.9842C8.84993 12.9842 7.5166 11.6509 7.5166 10.0009C7.5166 8.35091 8.84993 7.01758 10.4999 7.01758C12.1499 7.01758 13.4833 8.35091 13.4833 10.0009Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5001 16.8913C13.4418 16.8913 16.1834 15.1579 18.0918 12.1579C18.8418 10.9829 18.8418 9.00794 18.0918 7.83294C16.1834 4.83294 13.4418 3.09961 10.5001 3.09961C7.55845 3.09961 4.81678 4.83294 2.90845 7.83294C2.15845 9.00794 2.15845 10.9829 2.90845 12.1579C4.81678 15.1579 7.55845 16.8913 10.5001 16.8913Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DeleteIcon({
  color = '#D92D20',
  className,
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width="24"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.9391 1.39039C12.6523 0.546275 11.9075 0 11.0639 0H6.93592L6.779 0.00633149C5.9492 0.0734931 5.24111 0.668966 5.02304 1.50533L4.77543 2.76813L4.74642 2.87929C4.62785 3.23928 4.29636 3.48913 3.91772 3.48913H0.73139L0.632145 3.49598C0.275153 3.54564 0 3.85945 0 4.23916C0 4.65338 0.327455 4.98918 0.73139 4.98918L3.91772 4.98918H14.0821L17.2686 4.98918L17.3679 4.98234C17.7248 4.93267 18 4.61887 18 4.23916C18 3.82493 17.6725 3.48913 17.2686 3.48913H14.0821L13.9701 3.48177C13.6025 3.4332 13.2987 3.14872 13.2243 2.76783L12.9874 1.55209L12.9391 1.39039ZM11.9143 3.48913C11.881 3.40445 11.8522 3.31721 11.8282 3.22768L11.79 3.06208L11.5636 1.8928C11.5107 1.68991 11.3473 1.54138 11.1502 1.50742L11.0639 1.50006H6.93592C6.73071 1.50006 6.54829 1.62322 6.47252 1.77803L6.44682 1.84604L6.20979 3.06238C6.18087 3.21048 6.13899 3.35311 6.08551 3.48913H11.9143ZM15.9784 6.72017C16.3475 6.75069 16.6304 7.05716 16.65 7.42605L16.6405 7.63174L16.326 11.483L15.9961 15.2414C15.9263 15.9917 15.8638 16.6245 15.8099 17.1227C15.6225 18.8588 14.4955 19.9323 12.7966 19.9641C10.1494 20.013 7.60477 20.0125 5.13373 19.9591C3.48398 19.9244 2.37366 18.8393 2.18955 17.1297L2.0623 15.8702L1.83994 13.427L1.61216 10.7461L1.35172 7.52788C1.31935 7.11498 1.61951 6.75335 2.02215 6.72016C2.39123 6.68973 2.7183 6.94584 2.79519 7.30677L2.82511 7.60173L3.06966 10.6187L3.33669 13.7459C3.45646 15.0996 3.56034 16.1952 3.64346 16.9648C3.74838 17.939 4.26138 18.4404 5.16411 18.4593C7.61585 18.5124 10.1415 18.5129 12.7701 18.4643C13.7277 18.4464 14.2489 17.9499 14.356 16.9574L14.4827 15.7046C14.5198 15.3185 14.5594 14.8923 14.6014 14.4293L14.8686 11.3538L15.1906 7.4075C15.2204 7.02902 15.5192 6.7389 15.879 6.71882L15.9784 6.72017Z"
        fill={color}
      />
    </svg>
  );
}

export function UploadIcon({ color = '#21B55A' }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.0583 11.917L17.725 16.0837C17.6 17.3587 17.5 18.3337 15.2416 18.3337H4.7583C2.49997 18.3337 2.39997 17.3587 2.27497 16.0837L1.94163 11.917C1.87497 11.2253 2.09163 10.5837 2.4833 10.092C2.49163 10.0837 2.49163 10.0837 2.49997 10.0753C2.9583 9.51699 3.64997 9.16699 4.42497 9.16699H15.575C16.35 9.16699 17.0333 9.51699 17.4833 10.0587C17.4916 10.067 17.5 10.0753 17.5 10.0837C17.9083 10.5753 18.1333 11.217 18.0583 11.917Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M2.91663 9.52474V5.23307C2.91663 2.39974 3.62496 1.69141 6.45829 1.69141H7.51663C8.57496 1.69141 8.81663 2.00807 9.21663 2.54141L10.275 3.95807C10.5416 4.30807 10.7 4.52474 11.4083 4.52474H13.5333C16.3666 4.52474 17.075 5.23307 17.075 8.06641V9.55807"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.8584 14.167H12.1417"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Upload_Icon2({ color = '#21B55A' }: { color?: string }) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 17.5V11.5L7 13.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 11.5L11 13.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 10.5V15.5C22 20.5 20 22.5 15 22.5H9C4 22.5 2 20.5 2 15.5V9.5C2 4.5 4 2.5 9 2.5H14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 10.5H18C15 10.5 14 9.5 14 6.5V2.5L22 10.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon({ color = '#EB5757' }: { color?: string }) {
  return (
    <svg
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.98633 10.5088L11.0127 3.48246"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0127 10.5175L3.98633 3.49121"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const DragIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#828282"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="5" cy="8" r="1" />
    <circle cx="5" cy="16" r="1" />
    <circle cx="12" cy="8" r="1" />
    <circle cx="12" cy="16" r="1" />
    <circle cx="19" cy="8" r="1" />
    <circle cx="19" cy="16" r="1" />
  </svg>
);

export const AddTeacherIcon = ({ color = '#21B55A' }) => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.9167 16.25H12.5834"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.25 17.9173V14.584"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.6333 9.05768C10.55 9.04935 10.45 9.04935 10.3583 9.05768C8.37496 8.99102 6.79996 7.36602 6.79996 5.36602C6.79162 3.32435 8.44996 1.66602 10.4916 1.66602C12.5333 1.66602 14.1916 3.32435 14.1916 5.36602C14.1916 7.36602 12.6083 8.99102 10.6333 9.05768Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.4917 18.1741C8.97503 18.1741 7.4667 17.7908 6.3167 17.0241C4.30003 15.6741 4.30003 13.4741 6.3167 12.1324C8.60837 10.5991 12.3667 10.5991 14.6584 12.1324"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChangeTeacherIcon = () => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5 9.99935C12.8012 9.99935 14.6666 8.13387 14.6666 5.83268C14.6666 3.5315 12.8012 1.66602 10.5 1.66602C8.19879 1.66602 6.33331 3.5315 6.33331 5.83268C6.33331 8.13387 8.19879 9.99935 10.5 9.99935Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5083 13.1162L13.5583 16.0662C13.4416 16.1829 13.3333 16.3995 13.3083 16.5579L13.1499 17.6828C13.0916 18.0912 13.375 18.3745 13.7833 18.3162L14.9083 18.1579C15.0666 18.1329 15.2916 18.0245 15.4 17.9079L18.3499 14.9579C18.8583 14.4495 19.0999 13.8579 18.3499 13.1079C17.6083 12.3662 17.0166 12.6079 16.5083 13.1162Z"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.0833 13.541C16.3333 14.441 17.0332 15.141 17.9332 15.391"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.34167 18.3333C3.34167 15.1083 6.55003 12.5 10.5 12.5C11.3667 12.5 12.2 12.625 12.975 12.8583"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DeleteModalIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="24" fill="#EB5757" fill-opacity="0.06" />
    <path
      d="M33 17.9805C29.67 17.6505 26.32 17.4805 22.98 17.4805C21 17.4805 19.02 17.5805 17.04 17.7805L15 17.9805"
      stroke="#EB5757"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.5 16.97L20.72 15.66C20.88 14.71 21 14 22.69 14H25.31C27 14 27.13 14.75 27.28 15.67L27.5 16.97"
      stroke="#EB5757"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M30.8499 21.1406L30.1999 31.2106C30.0899 32.7806 29.9999 34.0006 27.2099 34.0006H20.7899C17.9999 34.0006 17.9099 32.7806 17.7999 31.2106L17.1499 21.1406"
      stroke="#EB5757"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.3301 28.5H25.6601"
      stroke="#EB5757"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.5 24.5H26.5"
      stroke="#EB5757"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const ArchiveModalIcon = ({ color = '#EB5757' }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="24" fill={color} fill-opacity="0.06" />
    <path
      d="M26.5299 21.4699L21.4699 26.5299C20.8199 25.8799 20.4199 24.9899 20.4199 23.9999C20.4199 22.0199 22.0199 20.4199 23.9999 20.4199C24.9899 20.4199 25.8799 20.8199 26.5299 21.4699Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M29.8201 17.7705C28.0701 16.4505 26.0701 15.7305 24.0001 15.7305C20.4701 15.7305 17.1801 17.8105 14.8901 21.4105C13.9901 22.8205 13.9901 25.1905 14.8901 26.6005C15.6801 27.8405 16.6001 28.9105 17.6001 29.7705"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.4199 31.5297C21.5599 32.0097 22.7699 32.2697 23.9999 32.2697C27.5299 32.2697 30.8199 30.1897 33.1099 26.5897C34.0099 25.1797 34.0099 22.8097 33.1099 21.3997C32.7799 20.8797 32.4199 20.3897 32.0499 19.9297"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M27.5099 24.6992C27.2499 26.1092 26.0999 27.2592 24.6899 27.5192"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.47 26.5293L14 33.9993"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M34 14L26.53 21.47"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const UnachiveModalIcon = ({
  color = { light: '#E9F8EF', primary: '#21B55A' },
}) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="24" fill={color.light} />
    <path
      d="M27.5799 23.9999C27.5799 25.9799 25.9799 27.5799 23.9999 27.5799C22.0199 27.5799 20.4199 25.9799 20.4199 23.9999C20.4199 22.0199 22.0199 20.4199 23.9999 20.4199C25.9799 20.4199 27.5799 22.0199 27.5799 23.9999Z"
      stroke={color.primary}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23.9998 32.2707C27.5298 32.2707 30.8198 30.1907 33.1098 26.5907C34.0098 25.1807 34.0098 22.8107 33.1098 21.4007C30.8198 17.8007 27.5298 15.7207 23.9998 15.7207C20.4698 15.7207 17.1798 17.8007 14.8898 21.4007C13.9898 22.8107 13.9898 25.1807 14.8898 26.5907C17.1798 30.1907 20.4698 32.2707 23.9998 32.2707Z"
      stroke={color.primary}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const CancelDrawerIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="32" rx="16" fill="#EB5757" fill-opacity="0.08" />
    <path
      d="M11.7578 20.2383L20.2431 11.753"
      stroke="#EB5757"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.2431 20.247L11.7578 11.7617"
      stroke="#EB5757"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FilterIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="12" fill="#F8F8F8" />
    <path
      d="M18.6667 8.33203H14.6667"
      stroke="#828282"
      strokeWidth="1.2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.99998 8.33203H5.33331"
      stroke="#828282"
      strokeWidth="1.2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.6666 10.6667C11.9553 10.6667 13 9.622 13 8.33333C13 7.04467 11.9553 6 10.6666 6C9.37798 6 8.33331 7.04467 8.33331 8.33333C8.33331 9.622 9.37798 10.6667 10.6666 10.6667Z"
      stroke="#828282"
      strokeWidth="1.2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.6667 15.668H16"
      stroke="#828282"
      strokeWidth="1.2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.33331 15.668H5.33331"
      stroke="#828282"
      strokeWidth="1.2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.3333 17.9987C14.622 17.9987 15.6667 16.954 15.6667 15.6654C15.6667 14.3767 14.622 13.332 13.3333 13.332C12.0447 13.332 11 14.3767 11 15.6654C11 16.954 12.0447 17.9987 13.3333 17.9987Z"
      stroke="#828282"
      strokeWidth="1.2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const GraduateIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.19495 8.26313V11.9906C3.19495 13.3556 3.19495 13.3556 4.48495 14.2256L8.03245 16.2731C8.56495 16.5806 9.43495 16.5806 9.96745 16.2731L13.5149 14.2256C14.8049 13.3556 14.8049 13.3556 14.8049 11.9906V8.26313C14.8049 6.89813 14.8049 6.89812 13.5149 6.02812L9.96745 3.98063C9.43495 3.67313 8.56495 3.67313 8.03245 3.98063L4.48495 6.02812C3.19495 6.89812 3.19495 6.89813 3.19495 8.26313Z"
      stroke="#828282"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.125 5.7225V3.75C13.125 2.25 12.375 1.5 10.875 1.5H7.125C5.625 1.5 4.875 2.25 4.875 3.75V5.67"
      stroke="#828282"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.47246 8.24125L9.89996 8.90875C9.96746 9.01375 10.1175 9.11875 10.23 9.14875L10.995 9.34375C11.4675 9.46375 11.595 9.86875 11.2875 10.2438L10.785 10.8513C10.71 10.9488 10.65 11.1213 10.6575 11.2413L10.7025 12.0288C10.7325 12.5163 10.3875 12.7638 9.93746 12.5838L9.20246 12.2912C9.08996 12.2462 8.90246 12.2462 8.78996 12.2912L8.05496 12.5838C7.60496 12.7638 7.25996 12.5088 7.28996 12.0288L7.33496 11.2413C7.34246 11.1213 7.28246 10.9413 7.20746 10.8513L6.70496 10.2438C6.39746 9.86875 6.52496 9.46375 6.99746 9.34375L7.76246 9.14875C7.88246 9.11875 8.03246 9.00625 8.09246 8.90875L8.51996 8.24125C8.78996 7.83625 9.20996 7.83625 9.47246 8.24125Z"
      stroke="#828282"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const PromoteIcon = ({ size = '18' }: { size?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.98999 4.87312L8.90999 2.95312L10.83 4.87312"
      stroke="#828282"
      strokeWidth="1.3"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.91003 10.6353V3.00781"
      stroke="#828282"
      strokeWidth="1.3"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 9C3 12.315 5.25 15 9 15C12.75 15 15 12.315 15 9"
      stroke="#828282"
      strokeWidth="1.3"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const DemoteIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.98999 8.76172L8.90999 10.6817L10.83 8.76172"
      stroke="#828282"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.91003 3V10.6275"
      stroke="#828282"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 9.13672C15 12.4517 12.75 15.1367 9 15.1367C5.25 15.1367 3 12.4517 3 9.13672"
      stroke="#828282"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ViewProfileEyeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.58 12.0019C15.58 13.9819 13.98 15.5819 12 15.5819C10.02 15.5819 8.42004 13.9819 8.42004 12.0019C8.42004 10.0219 10.02 8.42188 12 8.42188C13.98 8.42188 15.58 10.0219 15.58 12.0019Z"
      stroke="#828282"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 20.2688C15.53 20.2688 18.82 18.1887 21.11 14.5887C22.01 13.1787 22.01 10.8087 21.11 9.39875C18.82 5.79875 15.53 3.71875 12 3.71875C8.46997 3.71875 5.17997 5.79875 2.88997 9.39875C1.98997 10.8087 1.98997 13.1787 2.88997 14.5887C5.17997 18.1887 8.46997 20.2688 12 20.2688Z"
      stroke="#828282"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SuspendIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 7.75V13"
      stroke="#828282"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.08 8.58003V15.42C21.08 16.54 20.4799 17.58 19.5099 18.15L13.5699 21.58C12.5999 22.14 11.3999 22.14 10.4199 21.58L4.47992 18.15C3.50992 17.59 2.90991 16.55 2.90991 15.42V8.58003C2.90991 7.46003 3.50992 6.41999 4.47992 5.84999L10.4199 2.42C11.3899 1.86 12.5899 1.86 13.5699 2.42L19.5099 5.84999C20.4799 6.41999 21.08 7.45003 21.08 8.58003Z"
      stroke="#828282"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 16.1992V16.2992"
      stroke="#828282"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const NoBooksIcon = () => (
  <svg
    width="84"
    height="83"
    viewBox="0 0 84 83"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="42.0001" cy="41.2904" r="35.8997" fill="#E9F8EF" />
    <circle
      cx="42"
      cy="41.2898"
      r="39.9814"
      fill="#E9F8EF"
      stroke="white"
      strokeWidth="2.22634"
    />
    <mask
      id="mask0_3960_191829"
      maskUnits="userSpaceOnUse"
      x="3"
      y="2"
      width="78"
      height="78"
    >
      <circle cx="42.0003" cy="41.292" r="38.6827" fill="white" />
    </mask>
    <g mask="url(#mask0_3960_191829)">
      <path
        d="M60.3333 27.8924V49.6907C60.3333 51.4691 58.885 53.1007 57.1067 53.3207L56.5383 53.3941C53.5317 53.7974 49.2967 55.0441 45.8867 56.4741C44.695 56.9691 43.375 56.0707 43.375 54.7691V29.2674C43.375 28.5891 43.76 27.9657 44.365 27.6357C47.72 25.8207 52.7983 24.2074 56.245 23.9141H56.355C58.555 23.9141 60.3333 25.6924 60.3333 27.8924Z"
        fill="#21B55A"
      />
      <path
        d="M39.6351 27.6357C36.2801 25.8207 31.2018 24.2074 27.7551 23.9141H27.6268C25.4268 23.9141 23.6484 25.6924 23.6484 27.8924V49.6907C23.6484 51.4691 25.0968 53.1007 26.8751 53.3207L27.4434 53.3941C30.4501 53.7974 34.6851 55.0441 38.0951 56.4741C39.2868 56.9691 40.6068 56.0707 40.6068 54.7691V29.2674C40.6068 28.5707 40.2401 27.9657 39.6351 27.6357ZM29.1668 33.1907H33.2918C34.0434 33.1907 34.6668 33.8141 34.6668 34.5657C34.6668 35.3357 34.0434 35.9407 33.2918 35.9407H29.1668C28.4151 35.9407 27.7918 35.3357 27.7918 34.5657C27.7918 33.8141 28.4151 33.1907 29.1668 33.1907ZM34.6668 41.4407H29.1668C28.4151 41.4407 27.7918 40.8357 27.7918 40.0657C27.7918 39.3141 28.4151 38.6907 29.1668 38.6907H34.6668C35.4184 38.6907 36.0418 39.3141 36.0418 40.0657C36.0418 40.8357 35.4184 41.4407 34.6668 41.4407Z"
        fill="#21B55A"
      />
    </g>
  </svg>
);
export const NoStudentIcon = () => (
  <svg
    width="118"
    height="118"
    viewBox="0 0 118 118"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="59" cy="59" r="59" fill="#21B55A" fillOpacity="0.06" />
    <circle cx="59.0001" cy="59.2943" r="35.8997" fill="#E9F8EF" />
    <circle
      cx="59"
      cy="59.2937"
      r="39.9814"
      fill="#E9F8EF"
      stroke="white"
      strokeWidth="2.22634"
    />
    <mask
      id="mask0_3957_521545"
      maskUnits="userSpaceOnUse"
      x="20"
      y="20"
      width="78"
      height="78"
    >
      <circle cx="59.0003" cy="59.292" r="38.6827" fill="white" />
    </mask>
    <g mask="url(#mask0_3957_521545)">
      <path
        d="M53.5001 40.668C48.6967 40.668 44.7917 44.573 44.7917 49.3763C44.7917 54.088 48.4767 57.9013 53.2801 58.0663C53.4267 58.048 53.5734 58.048 53.6834 58.0663C53.7201 58.0663 53.7384 58.0663 53.7751 58.0663C53.7934 58.0663 53.7934 58.0663 53.8117 58.0663C58.5051 57.9013 62.1901 54.088 62.2084 49.3763C62.2084 44.573 58.3034 40.668 53.5001 40.668Z"
        fill="#21B55A"
      />
      <path
        d="M62.8133 62.9403C57.6983 59.5303 49.3566 59.5303 44.2049 62.9403C41.8766 64.4986 40.5933 66.607 40.5933 68.862C40.5933 71.117 41.8766 73.207 44.1866 74.747C46.7533 76.4703 50.1266 77.332 53.4999 77.332C56.8733 77.332 60.2466 76.4703 62.8133 74.747C65.1233 73.1886 66.4066 71.0986 66.4066 68.8253C66.3883 66.5703 65.1233 64.4803 62.8133 62.9403Z"
        fill="#21B55A"
      />
      <path
        d="M73.6484 50.4572C73.9417 54.0138 71.4117 57.1305 67.9101 57.5522C67.8917 57.5522 67.8917 57.5522 67.8734 57.5522H67.8184C67.7084 57.5522 67.5984 57.5522 67.5067 57.5888C65.7284 57.6805 64.0967 57.1122 62.8684 56.0672C64.7567 54.3805 65.8384 51.8505 65.6184 49.1005C65.4901 47.6155 64.9767 46.2588 64.2067 45.1038C64.9034 44.7555 65.7101 44.5355 66.5351 44.4622C70.1284 44.1505 73.3367 46.8272 73.6484 50.4572Z"
        fill="#21B55A"
      />
      <path
        d="M77.3151 67.4131C77.1684 69.1915 76.0318 70.7315 74.1251 71.7765C72.2918 72.7848 69.9818 73.2615 67.6901 73.2065C69.0101 72.0148 69.7801 70.5298 69.9268 68.9531C70.1101 66.6798 69.0284 64.4981 66.8651 62.7565C65.6368 61.7848 64.2068 61.0148 62.6484 60.4465C66.7001 59.2731 71.7968 60.0615 74.9318 62.5915C76.6184 63.9481 77.4801 65.6531 77.3151 67.4131Z"
        fill="#21B55A"
      />
    </g>
  </svg>
);
export const NoParentAddedIcon = () => (
  <svg
    width="84"
    height="83"
    viewBox="0 0 84 83"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="42.0001" cy="41.2904" r="35.8997" fill="#E9F8EF" />
    <circle
      cx="42"
      cy="41.2898"
      r="39.9814"
      fill="#E9F8EF"
      stroke="white"
      strokeWidth="2.22634"
    />
    {/* <mask id="mask0_3960_191154" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="3" y="2" width="78" height="78"> */}
    <mask
      id="mask0_3960_191154"
      maskUnits="userSpaceOnUse"
      x="3"
      y="2"
      width="78"
      height="78"
    >
      <circle cx="42.0003" cy="41.292" r="38.6827" fill="white" />
    </mask>
    <g mask="url(#mask0_3960_191154)">
      <path
        d="M55.7683 29.7224L44.8783 23.4341C43.0999 22.4074 40.8999 22.4074 39.1033 23.4341L28.2316 29.7224C26.4533 30.7491 25.3533 32.6557 25.3533 34.7274V47.2674C25.3533 49.3207 26.4533 51.2274 28.2316 52.2724L39.1216 58.5607C40.8999 59.5874 43.0999 59.5874 44.8966 58.5607L55.7866 52.2724C57.5649 51.2457 58.6649 49.3391 58.6649 47.2674V34.7274C58.6466 32.6557 57.5466 30.7674 55.7683 29.7224ZM41.9999 32.4541C44.3649 32.4541 46.2716 34.3607 46.2716 36.7257C46.2716 39.0907 44.3649 40.9974 41.9999 40.9974C39.6349 40.9974 37.7283 39.0907 37.7283 36.7257C37.7283 34.3791 39.6349 32.4541 41.9999 32.4541ZM46.9133 49.5407H37.0866C35.6016 49.5407 34.7399 47.8907 35.5649 46.6624C36.8116 44.8107 39.2316 43.5641 41.9999 43.5641C44.7683 43.5641 47.1883 44.8107 48.4349 46.6624C49.2599 47.8724 48.3799 49.5407 46.9133 49.5407Z"
        fill="#21B55A"
      />
    </g>
  </svg>
);
export const NoSuggestionIcon = () => (
  <svg
    width="118"
    height="118"
    viewBox="0 0 118 118"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="59" cy="59" r="59" fill="#21B55A" fill-opacity="0.06" />
    <circle cx="59.0001" cy="59.2904" r="35.8997" fill="#E9F8EF" />
    <circle
      cx="59"
      cy="59.2898"
      r="39.9814"
      fill="#E9F8EF"
      stroke="white"
      strokeWidth="2.22634"
    />
    <mask
      id="mask0_3960_193796"
      maskUnits="userSpaceOnUse"
      x="20"
      y="20"
      width="78"
      height="78"
    >
      <circle cx="59.0003" cy="59.292" r="38.6827" fill="white" />
    </mask>
    <g mask="url(#mask0_3960_193796)">
      <path
        d="M76.0501 59.4219H69.6701C67.8734 59.4219 66.2784 60.4119 65.4717 62.0252L63.9317 65.0685C63.5651 65.8019 62.8317 66.2602 62.0251 66.2602H56.0117C55.4434 66.2602 54.6367 66.1319 54.1051 65.0685L52.5651 62.0435C51.7584 60.4485 50.1451 59.4402 48.3667 59.4402H41.9501C41.2351 59.4402 40.6667 60.0085 40.6667 60.7235V66.7002C40.6667 73.3552 44.6634 77.3335 51.3367 77.3335H66.7001C72.9884 77.3335 76.8568 73.8869 77.3334 67.7635V60.7052C77.3334 60.0085 76.7651 59.4219 76.0501 59.4219Z"
        fill="#21B55A"
      />
      <path
        d="M60.375 40.6641C60.375 39.9124 59.7517 39.2891 59 39.2891C58.2483 39.2891 57.625 39.9124 57.625 40.6641V44.3307H60.375V40.6641Z"
        fill="#21B55A"
      />
      <path
        d="M77.3334 54.9876V56.8943C76.9301 56.7476 76.4901 56.6743 76.0501 56.6743H69.6701C66.8284 56.6743 64.2801 58.2509 63.0151 60.7809L61.6401 63.4943H56.3967L55.0217 60.7993C53.7567 58.2509 51.2084 56.6743 48.3667 56.6743H41.9501C41.5101 56.6743 41.0701 56.7476 40.6667 56.8943V54.9876C40.6667 48.3143 44.6451 44.3359 51.3184 44.3359H57.6251V50.1843L56.3051 48.8643C55.7734 48.3326 54.8934 48.3326 54.3617 48.8643C53.8301 49.3959 53.8301 50.2759 54.3617 50.8076L58.0284 54.4743C58.0467 54.4926 58.0651 54.4926 58.0651 54.5109C58.1934 54.6209 58.3217 54.7126 58.4684 54.7676C58.6517 54.8409 58.8167 54.8776 59.0001 54.8776C59.1834 54.8776 59.3484 54.8409 59.5134 54.7676C59.6784 54.7126 59.8434 54.6026 59.9717 54.4743L63.6384 50.8076C64.1701 50.2759 64.1701 49.3959 63.6384 48.8643C63.1067 48.3326 62.2267 48.3326 61.6951 48.8643L60.3751 50.1843V44.3359H66.6817C73.3551 44.3359 77.3334 48.3143 77.3334 54.9876Z"
        fill="#21B55A"
      />
    </g>
  </svg>
);

export const NoAnnouncementIcon = () => {
  const { theme } = useSlgTheme()
  return (
    // <svg
    //   width="84"
    //   height="83"
    //   viewBox="0 0 84 83"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <circle cx="42.0001" cy="41.2904" r="35.8997" fill={theme.light} />
    //   <circle
    //     cx="42"
    //     cy="41.2898"
    //     r="39.9814"
    //     fill={theme.light}
    //     stroke="white"
    //     strokeWidth="2.22634"
    //   />
    //   <mask
    //     id="mask0_3960_193212"
    //     maskUnits="userSpaceOnUse"
    //     x="3"
    //     y="2"
    //     width="78"
    //     height="78"
    //   >
    //     <circle cx="42.0003" cy="41.292" r="38.6827" fill="white" />
    //   </mask>
    //   <g mask="url(#mask0_3960_193212)">
    //     <path
    //       d="M49.6817 22.6641H34.3184C27.6451 22.6641 23.6667 26.6424 23.6667 33.3157V48.6791C23.6667 55.3524 27.6451 59.3307 34.3184 59.3307H49.6817C56.3551 59.3307 60.3334 55.3524 60.3334 48.6791V33.3157C60.3334 26.6424 56.3551 22.6641 49.6817 22.6641ZM38.2784 46.3141L34.1534 50.4391C33.8784 50.7141 33.5301 50.8424 33.1817 50.8424C32.8334 50.8424 32.4667 50.7141 32.2101 50.4391L30.8351 49.0641C30.2851 48.5324 30.2851 47.6524 30.8351 47.1207C31.3667 46.5891 32.2284 46.5891 32.7784 47.1207L33.1817 47.5241L36.3351 44.3707C36.8667 43.8391 37.7284 43.8391 38.2784 44.3707C38.8101 44.9024 38.8101 45.7824 38.2784 46.3141ZM38.2784 33.4807L34.1534 37.6057C33.8784 37.8807 33.5301 38.0091 33.1817 38.0091C32.8334 38.0091 32.4667 37.8807 32.2101 37.6057L30.8351 36.2307C30.2851 35.6991 30.2851 34.8191 30.8351 34.2874C31.3667 33.7557 32.2284 33.7557 32.7784 34.2874L33.1817 34.6907L36.3351 31.5374C36.8667 31.0057 37.7284 31.0057 38.2784 31.5374C38.8101 32.0691 38.8101 32.9491 38.2784 33.4807ZM52.1934 49.4674H42.5684C41.8167 49.4674 41.1934 48.8441 41.1934 48.0924C41.1934 47.3407 41.8167 46.7174 42.5684 46.7174H52.1934C52.9634 46.7174 53.5684 47.3407 53.5684 48.0924C53.5684 48.8441 52.9634 49.4674 52.1934 49.4674ZM52.1934 36.6341H42.5684C41.8167 36.6341 41.1934 36.0107 41.1934 35.2591C41.1934 34.5074 41.8167 33.8841 42.5684 33.8841H52.1934C52.9634 33.8841 53.5684 34.5074 53.5684 35.2591C53.5684 36.0107 52.9634 36.6341 52.1934 36.6341Z"
    //       fill={theme.primary}
    //     />
    //   </g>
    // </svg>
    <svg width="118" height="118" viewBox="0 0 118 118" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="59" cy="59" r="59" fill={theme.primary} fill-opacity="0.06" />
      <circle cx="59.0001" cy="59.2904" r="35.8997" fill={theme.light} />
      <circle cx="59" cy="59.2898" r="39.9814" fill={theme.light} stroke="white" strokeWidth="2.22634" />
      <mask id="mask0_3960_193210" mask-type="alpha" maskUnits="userSpaceOnUse" x="20" y="20" width="78" height="78">
        <circle cx="59.0003" cy="59.292" r="38.6827" fill="white" />
      </mask>
      <g mask="url(#mask0_3960_193210)">
        <path d="M66.6817 40.6641H51.3184C44.6451 40.6641 40.6667 44.6424 40.6667 51.3157V66.6791C40.6667 73.3524 44.6451 77.3307 51.3184 77.3307H66.6817C73.3551 77.3307 77.3334 73.3524 77.3334 66.6791V51.3157C77.3334 44.6424 73.3551 40.6641 66.6817 40.6641ZM55.2784 64.3141L51.1534 68.4391C50.8784 68.7141 50.5301 68.8424 50.1817 68.8424C49.8334 68.8424 49.4667 68.7141 49.2101 68.4391L47.8351 67.0641C47.2851 66.5324 47.2851 65.6524 47.8351 65.1207C48.3667 64.5891 49.2284 64.5891 49.7784 65.1207L50.1817 65.5241L53.3351 62.3707C53.8667 61.8391 54.7284 61.8391 55.2784 62.3707C55.8101 62.9024 55.8101 63.7824 55.2784 64.3141ZM55.2784 51.4807L51.1534 55.6057C50.8784 55.8807 50.5301 56.0091 50.1817 56.0091C49.8334 56.0091 49.4667 55.8807 49.2101 55.6057L47.8351 54.2307C47.2851 53.6991 47.2851 52.8191 47.8351 52.2874C48.3667 51.7557 49.2284 51.7557 49.7784 52.2874L50.1817 52.6907L53.3351 49.5374C53.8667 49.0057 54.7284 49.0057 55.2784 49.5374C55.8101 50.0691 55.8101 50.9491 55.2784 51.4807ZM69.1934 67.4674H59.5684C58.8167 67.4674 58.1934 66.8441 58.1934 66.0924C58.1934 65.3407 58.8167 64.7174 59.5684 64.7174H69.1934C69.9634 64.7174 70.5684 65.3407 70.5684 66.0924C70.5684 66.8441 69.9634 67.4674 69.1934 67.4674ZM69.1934 54.6341H59.5684C58.8167 54.6341 58.1934 54.0107 58.1934 53.2591C58.1934 52.5074 58.8167 51.8841 59.5684 51.8841H69.1934C69.9634 51.8841 70.5684 52.5074 70.5684 53.2591C70.5684 54.0107 69.9634 54.6341 69.1934 54.6341Z" fill={theme.primary} />
      </g>
    </svg>
  )
};

export const NoTeacherIcon = () => {
  const { theme } = useSlgTheme()
  return (
    <svg width="118" height="118" viewBox="0 0 118 118" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="59" cy="59" r="59" fill={theme.primary} fillOpacity="0.06" />
      <circle cx="59.0001" cy="59.2904" r="35.8997" fill={theme.light} />
      <circle cx="59" cy="59.2898" r="39.9814" fill={theme.light} stroke="white" strokeWidth="2.22634" />
      <mask id="mask0_3960_192549" mask-type="alpha" maskUnits="userSpaceOnUse" x="20" y="20" width="78" height="78">
        <circle cx="59.0003" cy="59.292" r="38.6827" fill="white" />
      </mask>
      <g mask="url(#mask0_3960_192549)">
        <path d="M69.1384 51.2424C69.0101 51.2241 68.8817 51.2241 68.7534 51.2424C65.9117 51.1507 63.6567 48.8224 63.6567 45.9624C63.6567 43.0474 66.0217 40.6641 68.9551 40.6641C71.8701 40.6641 74.2534 43.0291 74.2534 45.9624C74.2351 48.8224 71.9801 51.1507 69.1384 51.2424Z" fill={theme.primary} />
        <path d="M75.115 63.9468C73.0617 65.3218 70.1833 65.8352 67.525 65.4868C68.2217 63.9835 68.5883 62.3152 68.6067 60.5552C68.6067 58.7218 68.2033 56.9802 67.4333 55.4585C70.1467 55.0918 73.025 55.6052 75.0967 56.9802C77.9934 58.8868 77.9934 62.0218 75.115 63.9468Z" fill={theme.primary} />
        <path d="M48.8066 51.2424C48.935 51.2241 49.0633 51.2241 49.1916 51.2424C52.0333 51.1507 54.2883 48.8224 54.2883 45.9624C54.2883 43.0291 51.9233 40.6641 48.99 40.6641C46.075 40.6641 43.71 43.0291 43.71 45.9624C43.71 48.8224 45.965 51.1507 48.8066 51.2424Z" fill={theme.primary} />
        <path d="M49.0083 60.5555C49.0083 62.3338 49.3933 64.0205 50.09 65.5422C47.505 65.8172 44.81 65.2672 42.83 63.9655C39.9333 62.0405 39.9333 58.9055 42.83 56.9805C44.7916 55.6605 47.56 55.1288 50.1633 55.4222C49.4116 56.9622 49.0083 58.7038 49.0083 60.5555Z" fill={theme.primary} />
        <path d="M59.22 66.095C59.0734 66.0767 58.9084 66.0767 58.7434 66.095C55.37 65.985 52.675 63.2167 52.675 59.8067C52.6934 56.3233 55.4984 53.5 59 53.5C62.4834 53.5 65.3067 56.3233 65.3067 59.8067C65.2884 63.2167 62.6117 65.985 59.22 66.095Z" fill={theme.primary} />
        <path d="M53.2616 69.8937C50.4932 71.7454 50.4932 74.7888 53.2616 76.6221C56.4149 78.7304 61.5849 78.7304 64.7382 76.6221C67.5066 74.7704 67.5066 71.7271 64.7382 69.8937C61.6032 67.7854 56.4332 67.7854 53.2616 69.8937Z" fill={theme.primary} />
      </g>
    </svg>

  )
};
export const NoAttendanceIcon = () => {
  const { theme } = useSlgTheme()
  return (
    <svg width="118" height="118" viewBox="0 0 118 118" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="59" cy="59" r="59" fill={theme.primary} fill-opacity="0.06" />
      <circle cx="59.0001" cy="59.2904" r="35.8997" fill={theme.light} />
      <circle cx="59" cy="59.2898" r="39.9814" fill={theme.light} stroke="white" strokeWidth="2.22634" />
      <mask id="mask0_3960_190497" mask-type="alpha" maskUnits="userSpaceOnUse" x="20" y="20" width="78" height="78">
        <circle cx="59.0003" cy="59.292" r="38.6827" fill="white" />
      </mask>
      <g mask="url(#mask0_3960_190497)">
        <path d="M67.7084 43.5241V40.6641C67.7084 39.9124 67.0851 39.2891 66.3334 39.2891C65.5818 39.2891 64.9584 39.9124 64.9584 40.6641V43.4141H53.0418V40.6641C53.0418 39.9124 52.4184 39.2891 51.6668 39.2891C50.9151 39.2891 50.2918 39.9124 50.2918 40.6641V43.5241C45.3418 43.9824 42.9401 46.9341 42.5734 51.3157C42.5368 51.8474 42.9768 52.2874 43.4901 52.2874H74.5101C75.0418 52.2874 75.4818 51.8291 75.4268 51.3157C75.0601 46.9341 72.6584 43.9824 67.7084 43.5241Z" fill={theme.primary} />
        <path d="M73.6667 55.0391H44.3333C43.325 55.0391 42.5 55.8641 42.5 56.8724V68.1657C42.5 73.6657 45.25 77.3324 51.6667 77.3324H66.3333C72.75 77.3324 75.5 73.6657 75.5 68.1657V56.8724C75.5 55.8641 74.675 55.0391 73.6667 55.0391ZM53.885 70.3841C53.7933 70.4574 53.7017 70.5491 53.61 70.6041C53.5 70.6774 53.39 70.7324 53.28 70.7691C53.17 70.8241 53.06 70.8607 52.95 70.8791C52.8217 70.8974 52.7117 70.9157 52.5833 70.9157C52.345 70.9157 52.1067 70.8607 51.8867 70.7691C51.6483 70.6774 51.465 70.5491 51.2817 70.3841C50.9517 70.0357 50.75 69.5591 50.75 69.0824C50.75 68.6057 50.9517 68.1291 51.2817 67.7807C51.465 67.6157 51.6483 67.4874 51.8867 67.3957C52.2167 67.2491 52.5833 67.2124 52.95 67.2857C53.06 67.3041 53.17 67.3407 53.28 67.3957C53.39 67.4324 53.5 67.4874 53.61 67.5607C53.7017 67.6341 53.7933 67.7074 53.885 67.7807C54.215 68.1291 54.4167 68.6057 54.4167 69.0824C54.4167 69.5591 54.215 70.0357 53.885 70.3841ZM53.885 63.9674C53.5367 64.2974 53.06 64.4991 52.5833 64.4991C52.1067 64.4991 51.63 64.2974 51.2817 63.9674C50.9517 63.6191 50.75 63.1424 50.75 62.6657C50.75 62.1891 50.9517 61.7124 51.2817 61.3641C51.795 60.8507 52.6017 60.6857 53.28 60.9791C53.5183 61.0707 53.72 61.1991 53.885 61.3641C54.215 61.7124 54.4167 62.1891 54.4167 62.6657C54.4167 63.1424 54.215 63.6191 53.885 63.9674ZM60.3017 70.3841C59.9533 70.7141 59.4767 70.9157 59 70.9157C58.5233 70.9157 58.0467 70.7141 57.6983 70.3841C57.3683 70.0357 57.1667 69.5591 57.1667 69.0824C57.1667 68.6057 57.3683 68.1291 57.6983 67.7807C58.3767 67.1024 59.6233 67.1024 60.3017 67.7807C60.6317 68.1291 60.8333 68.6057 60.8333 69.0824C60.8333 69.5591 60.6317 70.0357 60.3017 70.3841ZM60.3017 63.9674C60.21 64.0407 60.1183 64.1141 60.0267 64.1874C59.9167 64.2607 59.8067 64.3157 59.6967 64.3524C59.5867 64.4074 59.4767 64.4441 59.3667 64.4624C59.2383 64.4807 59.1283 64.4991 59 64.4991C58.5233 64.4991 58.0467 64.2974 57.6983 63.9674C57.3683 63.6191 57.1667 63.1424 57.1667 62.6657C57.1667 62.1891 57.3683 61.7124 57.6983 61.3641C57.8633 61.1991 58.065 61.0707 58.3033 60.9791C58.9817 60.6857 59.7883 60.8507 60.3017 61.3641C60.6317 61.7124 60.8333 62.1891 60.8333 62.6657C60.8333 63.1424 60.6317 63.6191 60.3017 63.9674ZM66.7183 70.3841C66.37 70.7141 65.8933 70.9157 65.4167 70.9157C64.94 70.9157 64.4633 70.7141 64.115 70.3841C63.785 70.0357 63.5833 69.5591 63.5833 69.0824C63.5833 68.6057 63.785 68.1291 64.115 67.7807C64.7933 67.1024 66.04 67.1024 66.7183 67.7807C67.0483 68.1291 67.25 68.6057 67.25 69.0824C67.25 69.5591 67.0483 70.0357 66.7183 70.3841ZM66.7183 63.9674C66.6267 64.0407 66.535 64.1141 66.4433 64.1874C66.3333 64.2607 66.2233 64.3157 66.1133 64.3524C66.0033 64.4074 65.8933 64.4441 65.7833 64.4624C65.655 64.4807 65.5267 64.4991 65.4167 64.4991C64.94 64.4991 64.4633 64.2974 64.115 63.9674C63.785 63.6191 63.5833 63.1424 63.5833 62.6657C63.5833 62.1891 63.785 61.7124 64.115 61.3641C64.2983 61.1991 64.4817 61.0707 64.72 60.9791C65.05 60.8324 65.4167 60.7957 65.7833 60.8691C65.8933 60.8874 66.0033 60.9241 66.1133 60.9791C66.2233 61.0157 66.3333 61.0707 66.4433 61.1441C66.535 61.2174 66.6267 61.2907 66.7183 61.3641C67.0483 61.7124 67.25 62.1891 67.25 62.6657C67.25 63.1424 67.0483 63.6191 66.7183 63.9674Z" fill={theme.primary} />
      </g>
    </svg>
  )
};
export const NoEventIcon = () => {
  const { theme } = useSlgTheme()
  return (
    <svg width="118" height="118" viewBox="0 0 118 118" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="59" cy="59" r="59" fill={theme.primary} fill-opacity="0.06" />
      <circle cx="59.0001" cy="59.2904" r="35.8997" fill={theme.light} />
      <circle cx="59" cy="59.2898" r="39.9814" fill={theme.light} stroke="white" stroke-width="2.22634" />
      <mask id="mask0_3960_194921" mask-type="mask-type:alpha" maskUnits="userSpaceOnUse" x="20" y="20" width="78" height="78">
        <circle cx="59.0003" cy="59.292" r="38.6827" fill="white" />
      </mask>
      <g mask="url(#mask0_3960_194921)">
        <path d="M60.3441 73.6124C60.8157 73.7221 60.8596 74.3417 60.4006 74.496C60.3678 74.5071 60.3347 74.5181 60.3016 74.5292L57.4049 75.4825C50.1266 77.8292 46.2949 75.8675 43.9299 68.5892L41.5832 61.3475C39.2366 54.0692 41.1799 50.2192 48.4582 47.8725L50.2656 47.274C50.6684 47.1406 51.0526 47.5415 50.9226 47.9455C50.7229 48.5657 50.5402 49.238 50.3649 49.9625L48.5682 57.6442C46.5516 66.2792 49.5032 71.0458 58.1382 73.0992L60.3441 73.6124Z" fill={theme.primary} />
        <path d="M68.4783 42.8849L65.4166 42.1699C59.2933 40.7216 55.6449 41.9133 53.4999 46.3499C52.9499 47.4683 52.5099 48.8249 52.1433 50.3833L50.3466 58.0649C48.5499 65.7283 50.9149 69.5049 58.5599 71.3199L61.6399 72.0533C62.7033 72.3099 63.6933 72.4749 64.6099 72.5483C70.3299 73.0983 73.3733 70.4216 74.9133 63.8033L76.7099 56.1399C78.5066 48.4766 76.1599 44.6816 68.4783 42.8849ZM65.0316 61.4383C64.8666 62.0616 64.3166 62.4649 63.6933 62.4649C63.5833 62.4649 63.4733 62.4466 63.3449 62.4283L58.0099 61.0716C57.2766 60.8883 56.8366 60.1366 57.0199 59.4033C57.2033 58.6699 57.9549 58.2299 58.6883 58.4133L64.0233 59.7699C64.7749 59.9533 65.2149 60.7049 65.0316 61.4383ZM70.4033 55.2416C70.2383 55.8649 69.6883 56.2683 69.0649 56.2683C68.9549 56.2683 68.8449 56.2499 68.7166 56.2316L59.8249 53.9766C59.0916 53.7933 58.6516 53.0416 58.8349 52.3083C59.0183 51.5749 59.7699 51.1349 60.5033 51.3183L69.3949 53.5733C70.1466 53.7383 70.5866 54.4899 70.4033 55.2416Z" fill={theme.primary} />
      </g>
    </svg>

  )
};

