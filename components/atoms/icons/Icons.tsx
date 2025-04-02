import React from 'react';

export function AdditionIcon({ color = "white" }: { color?: string }) {
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
    <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1H11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
export function EditIcon({ color = '#828282', size = "24" }: { color?: string, size?: string }) {
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
export function ExportIcon({ color = "#21B55A", size = "20" }: { color?: string, size?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.4987 14.1641V9.16406L5.83203 10.8307" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 9.16406L9.16667 10.8307" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.3346 8.33073V12.4974C18.3346 16.6641 16.668 18.3307 12.5013 18.3307H7.5013C3.33464 18.3307 1.66797 16.6641 1.66797 12.4974V7.4974C1.66797 3.33073 3.33464 1.66406 7.5013 1.66406H11.668" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.3346 8.33073H15.0013C12.5013 8.33073 11.668 7.4974 11.668 4.9974V1.66406L18.3346 8.33073Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  );
}

export function ArchiveIcon({ color = "#828282" }: { color?: string }) {
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
export function UnarchiveIcon({ color = "#828282" }: { color?: string }) {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.4833 10.0009C13.4833 11.6509 12.1499 12.9842 10.4999 12.9842C8.84993 12.9842 7.5166 11.6509 7.5166 10.0009C7.5166 8.35091 8.84993 7.01758 10.4999 7.01758C12.1499 7.01758 13.4833 8.35091 13.4833 10.0009Z" stroke="#21B55A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5001 16.8913C13.4418 16.8913 16.1834 15.1579 18.0918 12.1579C18.8418 10.9829 18.8418 9.00794 18.0918 7.83294C16.1834 4.83294 13.4418 3.09961 10.5001 3.09961C7.55845 3.09961 4.81678 4.83294 2.90845 7.83294C2.15845 9.00794 2.15845 10.9829 2.90845 12.1579C4.81678 15.1579 7.55845 16.8913 10.5001 16.8913Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  );
}
export function DeleteIcon({ color = '#D92D20' }: { color?: string }) {
  return (
    <svg
      width="24"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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

export function UploadIcon() {
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
        stroke="#21B55A"
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M2.91663 9.52474V5.23307C2.91663 2.39974 3.62496 1.69141 6.45829 1.69141H7.51663C8.57496 1.69141 8.81663 2.00807 9.21663 2.54141L10.275 3.95807C10.5416 4.30807 10.7 4.52474 11.4083 4.52474H13.5333C16.3666 4.52474 17.075 5.23307 17.075 8.06641V9.55807"
        stroke="#21B55A"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.8584 14.167H12.1417"
        stroke="#21B55A"
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

export const AddTeacherIcon = () => (
  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.9167 16.25H12.5834" stroke="#21B55A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.25 17.9173V14.584" stroke="#21B55A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.6333 9.05768C10.55 9.04935 10.45 9.04935 10.3583 9.05768C8.37496 8.99102 6.79996 7.36602 6.79996 5.36602C6.79162 3.32435 8.44996 1.66602 10.4916 1.66602C12.5333 1.66602 14.1916 3.32435 14.1916 5.36602C14.1916 7.36602 12.6083 8.99102 10.6333 9.05768Z" stroke="#21B55A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.4917 18.1741C8.97503 18.1741 7.4667 17.7908 6.3167 17.0241C4.30003 15.6741 4.30003 13.4741 6.3167 12.1324C8.60837 10.5991 12.3667 10.5991 14.6584 12.1324" stroke="#21B55A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

);

export const ChangeTeacherIcon = () => (
  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5 9.99935C12.8012 9.99935 14.6666 8.13387 14.6666 5.83268C14.6666 3.5315 12.8012 1.66602 10.5 1.66602C8.19879 1.66602 6.33331 3.5315 6.33331 5.83268C6.33331 8.13387 8.19879 9.99935 10.5 9.99935Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.5083 13.1162L13.5583 16.0662C13.4416 16.1829 13.3333 16.3995 13.3083 16.5579L13.1499 17.6828C13.0916 18.0912 13.375 18.3745 13.7833 18.3162L14.9083 18.1579C15.0666 18.1329 15.2916 18.0245 15.4 17.9079L18.3499 14.9579C18.8583 14.4495 19.0999 13.8579 18.3499 13.1079C17.6083 12.3662 17.0166 12.6079 16.5083 13.1162Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.0833 13.541C16.3333 14.441 17.0332 15.141 17.9332 15.391" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.34167 18.3333C3.34167 15.1083 6.55003 12.5 10.5 12.5C11.3667 12.5 12.2 12.625 12.975 12.8583" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

);

export const DeleteModalIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="24" fill="#EB5757" fill-opacity="0.06" />
    <path d="M33 17.9805C29.67 17.6505 26.32 17.4805 22.98 17.4805C21 17.4805 19.02 17.5805 17.04 17.7805L15 17.9805" stroke="#EB5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20.5 16.97L20.72 15.66C20.88 14.71 21 14 22.69 14H25.31C27 14 27.13 14.75 27.28 15.67L27.5 16.97" stroke="#EB5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30.8499 21.1406L30.1999 31.2106C30.0899 32.7806 29.9999 34.0006 27.2099 34.0006H20.7899C17.9999 34.0006 17.9099 32.7806 17.7999 31.2106L17.1499 21.1406" stroke="#EB5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22.3301 28.5H25.6601" stroke="#EB5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21.5 24.5H26.5" stroke="#EB5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const ArchiveModalIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="24" fill="#EB5757" fill-opacity="0.06" />
    <path d="M26.5299 21.4699L21.4699 26.5299C20.8199 25.8799 20.4199 24.9899 20.4199 23.9999C20.4199 22.0199 22.0199 20.4199 23.9999 20.4199C24.9899 20.4199 25.8799 20.8199 26.5299 21.4699Z" stroke="#EB5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M29.8201 17.7705C28.0701 16.4505 26.0701 15.7305 24.0001 15.7305C20.4701 15.7305 17.1801 17.8105 14.8901 21.4105C13.9901 22.8205 13.9901 25.1905 14.8901 26.6005C15.6801 27.8405 16.6001 28.9105 17.6001 29.7705" stroke="#EB5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20.4199 31.5297C21.5599 32.0097 22.7699 32.2697 23.9999 32.2697C27.5299 32.2697 30.8199 30.1897 33.1099 26.5897C34.0099 25.1797 34.0099 22.8097 33.1099 21.3997C32.7799 20.8797 32.4199 20.3897 32.0499 19.9297" stroke="#EB5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M27.5099 24.6992C27.2499 26.1092 26.0999 27.2592 24.6899 27.5192" stroke="#EB5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21.47 26.5293L14 33.9993" stroke="#EB5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M34 14L26.53 21.47" stroke="#EB5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

);
export const UnachiveModalIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="24" fill="#E9F8EF" />
    <path d="M27.5799 23.9999C27.5799 25.9799 25.9799 27.5799 23.9999 27.5799C22.0199 27.5799 20.4199 25.9799 20.4199 23.9999C20.4199 22.0199 22.0199 20.4199 23.9999 20.4199C25.9799 20.4199 27.5799 22.0199 27.5799 23.9999Z" stroke="#21B55A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M23.9998 32.2707C27.5298 32.2707 30.8198 30.1907 33.1098 26.5907C34.0098 25.1807 34.0098 22.8107 33.1098 21.4007C30.8198 17.8007 27.5298 15.7207 23.9998 15.7207C20.4698 15.7207 17.1798 17.8007 14.8898 21.4007C13.9898 22.8107 13.9898 25.1807 14.8898 26.5907C17.1798 30.1907 20.4698 32.2707 23.9998 32.2707Z" stroke="#21B55A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>


);
export const CancelDrawerIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="16" fill="#EB5757" fill-opacity="0.08" />
    <path d="M11.7578 20.2383L20.2431 11.753" stroke="#EB5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20.2431 20.247L11.7578 11.7617" stroke="#EB5757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


export const FilterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="12" fill="#F8F8F8" />
    <path d="M18.6667 8.33203H14.6667" stroke="#828282" strokeWidth="1.2" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.99998 8.33203H5.33331" stroke="#828282" strokeWidth="1.2" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.6666 10.6667C11.9553 10.6667 13 9.622 13 8.33333C13 7.04467 11.9553 6 10.6666 6C9.37798 6 8.33331 7.04467 8.33331 8.33333C8.33331 9.622 9.37798 10.6667 10.6666 10.6667Z" stroke="#828282" strokeWidth="1.2" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.6667 15.668H16" stroke="#828282" strokeWidth="1.2" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.33331 15.668H5.33331" stroke="#828282" strokeWidth="1.2" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.3333 17.9987C14.622 17.9987 15.6667 16.954 15.6667 15.6654C15.6667 14.3767 14.622 13.332 13.3333 13.332C12.0447 13.332 11 14.3767 11 15.6654C11 16.954 12.0447 17.9987 13.3333 17.9987Z" stroke="#828282" strokeWidth="1.2" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

);
export const GraduateIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.19495 8.26313V11.9906C3.19495 13.3556 3.19495 13.3556 4.48495 14.2256L8.03245 16.2731C8.56495 16.5806 9.43495 16.5806 9.96745 16.2731L13.5149 14.2256C14.8049 13.3556 14.8049 13.3556 14.8049 11.9906V8.26313C14.8049 6.89813 14.8049 6.89812 13.5149 6.02812L9.96745 3.98063C9.43495 3.67313 8.56495 3.67313 8.03245 3.98063L4.48495 6.02812C3.19495 6.89812 3.19495 6.89813 3.19495 8.26313Z" stroke="#828282" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.125 5.7225V3.75C13.125 2.25 12.375 1.5 10.875 1.5H7.125C5.625 1.5 4.875 2.25 4.875 3.75V5.67" stroke="#828282" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.47246 8.24125L9.89996 8.90875C9.96746 9.01375 10.1175 9.11875 10.23 9.14875L10.995 9.34375C11.4675 9.46375 11.595 9.86875 11.2875 10.2438L10.785 10.8513C10.71 10.9488 10.65 11.1213 10.6575 11.2413L10.7025 12.0288C10.7325 12.5163 10.3875 12.7638 9.93746 12.5838L9.20246 12.2912C9.08996 12.2462 8.90246 12.2462 8.78996 12.2912L8.05496 12.5838C7.60496 12.7638 7.25996 12.5088 7.28996 12.0288L7.33496 11.2413C7.34246 11.1213 7.28246 10.9413 7.20746 10.8513L6.70496 10.2438C6.39746 9.86875 6.52496 9.46375 6.99746 9.34375L7.76246 9.14875C7.88246 9.11875 8.03246 9.00625 8.09246 8.90875L8.51996 8.24125C8.78996 7.83625 9.20996 7.83625 9.47246 8.24125Z" stroke="#828282" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>


);
export const PromoteIcon = ({ size = '18' }: { size?: string }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.98999 4.87312L8.90999 2.95312L10.83 4.87312" stroke="#828282" strokeWidth="1.3" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.91003 10.6353V3.00781" stroke="#828282" strokeWidth="1.3" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 9C3 12.315 5.25 15 9 15C12.75 15 15 12.315 15 9" stroke="#828282" strokeWidth="1.3" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>


);
export const DemoteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.98999 8.76172L8.90999 10.6817L10.83 8.76172" stroke="#828282" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.91003 3V10.6275" stroke="#828282" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 9.13672C15 12.4517 12.75 15.1367 9 15.1367C5.25 15.1367 3 12.4517 3 9.13672" stroke="#828282" strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ViewProfileEyeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.58 12.0019C15.58 13.9819 13.98 15.5819 12 15.5819C10.02 15.5819 8.42004 13.9819 8.42004 12.0019C8.42004 10.0219 10.02 8.42188 12 8.42188C13.98 8.42188 15.58 10.0219 15.58 12.0019Z" stroke="#828282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 20.2688C15.53 20.2688 18.82 18.1887 21.11 14.5887C22.01 13.1787 22.01 10.8087 21.11 9.39875C18.82 5.79875 15.53 3.71875 12 3.71875C8.46997 3.71875 5.17997 5.79875 2.88997 9.39875C1.98997 10.8087 1.98997 13.1787 2.88997 14.5887C5.17997 18.1887 8.46997 20.2688 12 20.2688Z" stroke="#828282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

);

export const SuspendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 7.75V13" stroke="#828282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21.08 8.58003V15.42C21.08 16.54 20.4799 17.58 19.5099 18.15L13.5699 21.58C12.5999 22.14 11.3999 22.14 10.4199 21.58L4.47992 18.15C3.50992 17.59 2.90991 16.55 2.90991 15.42V8.58003C2.90991 7.46003 3.50992 6.41999 4.47992 5.84999L10.4199 2.42C11.3899 1.86 12.5899 1.86 13.5699 2.42L19.5099 5.84999C20.4799 6.41999 21.08 7.45003 21.08 8.58003Z" stroke="#828282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 16.1992V16.2992" stroke="#828282" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const NoStudentIcon = () => (
  <svg width="118" height="118" viewBox="0 0 118 118" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="59" cy="59" r="59" fill="#21B55A" fillOpacity="0.06" />
    <circle cx="59.0001" cy="59.2943" r="35.8997" fill="#E9F8EF" />
    <circle cx="59" cy="59.2937" r="39.9814" fill="#E9F8EF" stroke="white" strokeWidth="2.22634" />
    <mask id="mask0_3957_521545" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="20" y="20" width="78" height="78">
      <circle cx="59.0003" cy="59.292" r="38.6827" fill="white" />
    </mask>
    <g mask="url(#mask0_3957_521545)">
      <path d="M53.5001 40.668C48.6967 40.668 44.7917 44.573 44.7917 49.3763C44.7917 54.088 48.4767 57.9013 53.2801 58.0663C53.4267 58.048 53.5734 58.048 53.6834 58.0663C53.7201 58.0663 53.7384 58.0663 53.7751 58.0663C53.7934 58.0663 53.7934 58.0663 53.8117 58.0663C58.5051 57.9013 62.1901 54.088 62.2084 49.3763C62.2084 44.573 58.3034 40.668 53.5001 40.668Z" fill="#21B55A" />
      <path d="M62.8133 62.9403C57.6983 59.5303 49.3566 59.5303 44.2049 62.9403C41.8766 64.4986 40.5933 66.607 40.5933 68.862C40.5933 71.117 41.8766 73.207 44.1866 74.747C46.7533 76.4703 50.1266 77.332 53.4999 77.332C56.8733 77.332 60.2466 76.4703 62.8133 74.747C65.1233 73.1886 66.4066 71.0986 66.4066 68.8253C66.3883 66.5703 65.1233 64.4803 62.8133 62.9403Z" fill="#21B55A" />
      <path d="M73.6484 50.4572C73.9417 54.0138 71.4117 57.1305 67.9101 57.5522C67.8917 57.5522 67.8917 57.5522 67.8734 57.5522H67.8184C67.7084 57.5522 67.5984 57.5522 67.5067 57.5888C65.7284 57.6805 64.0967 57.1122 62.8684 56.0672C64.7567 54.3805 65.8384 51.8505 65.6184 49.1005C65.4901 47.6155 64.9767 46.2588 64.2067 45.1038C64.9034 44.7555 65.7101 44.5355 66.5351 44.4622C70.1284 44.1505 73.3367 46.8272 73.6484 50.4572Z" fill="#21B55A" />
      <path d="M77.3151 67.4131C77.1684 69.1915 76.0318 70.7315 74.1251 71.7765C72.2918 72.7848 69.9818 73.2615 67.6901 73.2065C69.0101 72.0148 69.7801 70.5298 69.9268 68.9531C70.1101 66.6798 69.0284 64.4981 66.8651 62.7565C65.6368 61.7848 64.2068 61.0148 62.6484 60.4465C66.7001 59.2731 71.7968 60.0615 74.9318 62.5915C76.6184 63.9481 77.4801 65.6531 77.3151 67.4131Z" fill="#21B55A" />
    </g>
  </svg>

);






