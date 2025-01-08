import { cn } from '@/lib/utils';
import React from 'react';
type SearchProps = {
  placeholder: string;
  className?: string;
};

function SearchInput({ placeholder, className }: SearchProps) {
  return (
    <div
      className={cn(
        'flex justify-start items-center gap-3 bg-white rounded-full py-2 px-4 pl-3 placeholder:text-base w-full border border-gray4',
        className
      )}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke="#828282"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 22L20 20"
          stroke="#828282"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <input
        type="search"
        placeholder={placeholder}
        className="placeholder-poppins bg-transparent outline-none  text-gray1 text-sm w-full"
      />
    </div>
  );
}

export default SearchInput;
