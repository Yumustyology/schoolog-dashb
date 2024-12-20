import React from 'react';
type SearchProps = {
  placeholderName: string;
};

function Search({ placeholderName }: SearchProps) {
  return (
    <div className="flex justify-start items-center gap-3 bg-[#F9FAFB] rounded-full py-2 px-4 w-full border border-gray4">
      <svg
        width="14"
        height="14"
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
        placeholder={placeholderName}
        className="bg-transparent outline-none  text-gray1 text-sm w-full"
      />
    </div>
  );
}

export default Search;
