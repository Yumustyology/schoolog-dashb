import { cn } from '@/app/lib/utils';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { poppins_400 } from '@/app/lib/config/font.config';

interface Option {
  id: string;
  name: string;
}

interface SelectCompProps {
  label?: string;
  htmlFor?: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  loadingMessage?: string;
  error?: boolean;
  errorMessage?: string;
  options?: Option[];
  selectClasses?: string;
  triggerClasses?: string;
  labelClassName?: string;
  contentClasses?: string;
  className?: string;
}

const SelectComp: React.FC<SelectCompProps> = ({
  label,
  htmlFor,
  value,
  onValueChange,
  placeholder = 'Select an option',
  isLoading,
  loadingMessage = 'Loading options...',
  error,
  errorMessage = 'Failed to load options.',
  options = [],
  selectClasses = '',
  triggerClasses = '',
  contentClasses = '',
  labelClassName = '',
}) => {
  return (
    <div className={cn(selectClasses)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className={cn(
            'block text-left w-full text-base mb-2 text-gray6',
            labelClassName,
            poppins_400.className
          )}
        >
          {label}
        </label>
      )}

      <Select
        onValueChange={onValueChange}
        value={value}
        aria-label={label || 'Select'}
        required
      >
        <SelectTrigger
          className={cn(
            'bg-white rounded-lg w-full shadow-none h-[54px] border-[#E0E0E0]',
            triggerClasses
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent
          className={cn(
            'w-full border font-nunito text-sm bg-white',
            contentClasses
          )}
          style={{ zIndex: 1350 }}
        >
          {isLoading ? (
            <SelectItem value="loading" disabled>
              {loadingMessage}
            </SelectItem>
          ) : error ? (
            <SelectItem value="error" disabled>
              {errorMessage}
            </SelectItem>
          ) : (
            options.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectComp;
