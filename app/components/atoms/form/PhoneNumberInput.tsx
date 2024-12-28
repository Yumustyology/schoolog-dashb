import { poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import the necessary styles for the phone input

export function PhoneNumberInput({
  label,
  id,
  labelClassName = '',
  className,
}: {
  label?: string;
  id?: string;
  labelClassName?: string;
  className?: string;
}) {
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
  };

  return (
    <div className={cn('w-full', poppins_400.className)}>
      <label
        htmlFor={id}
        className={cn(
          'block text-left w-full text-base mb-2 text-[#4F4F4F]',
          labelClassName,
          poppins_400.className
        )}
      >
        {label}
      </label>
      <ReactPhoneInput
        value={phoneNumber}
        onChange={handlePhoneChange}
        containerClass="border border-[#D9DCE0] rounded-lg w-full outline-none flex items-center h-[54px]"
        // enableSearch
        // defaultCountry="us"  // Default country code (change as needed)
        // countryCodeEditable={false}
        inputClass={cn('w-full bg-transparent w-full outline-none', className)}
        // buttonClass="!w-[50px]"
        placeholder="234 000 000 000"
        dropdownStyle={
          {
            // boxShadow: 'none',
          }
        }
        inputStyle={{
          height: '100%',
          width: '90%',
          color: '#333333',
          border: 'none',
          padding: '0 2em 0 5em',
        }}
        buttonStyle={{
          border: 'none',
          padding: '0 4px 0 4px',
          marginLeft: '2px',
          background: 'transparent',
          borderRight: '1px solid #DDE2E5',
          height: '30px',
          marginTop: '10px',
          paddingRight: '10px',
        }}
        buttonClass=""
      />
    </div>
  );
}
