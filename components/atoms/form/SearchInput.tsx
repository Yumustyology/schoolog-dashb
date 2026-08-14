import { poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import { SearchOutlineIcon } from '@/components/atoms/icons/Icons';

type SearchProps = React.InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function SearchInput({ placeholder, className, value, onChange, ...rest }: SearchProps) {
  return (
    <div
      className={cn(
        'flex justify-start items-center gap-3 bg-white rounded-full py-2 px-4 pl-3 placeholder:text-base w-full border border-gray4 h-[46px]',
        className
      )}
    >
      <SearchOutlineIcon />

      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          'placeholder-poppins accent-primary placeholder:text-sm placeholder:text-gray3 bg-transparent outline-none text-gray1 text-sm w-full',
          poppins_400.className
        )}
        {...rest}
      />
    </div>
  );
}

export default SearchInput;
