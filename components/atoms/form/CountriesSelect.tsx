import React, { useState } from 'react';
import { useCountries } from 'use-react-countries';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import Image from 'next/image';

export function CountriesSelect({
  labelClassName,
  id,
}: {
  labelClassName?: string;
  id?: string;
}) {
  const { countries } = useCountries();
  const [country, setCountry] = useState<string>('');

  return (
    <div className="w-full">
      <label
        htmlFor="country-select"
        className="text-left font-semibold text-cdial-black-500 w-full font-nunito text-base mb-2 flex items-center"
      ></label>
      <label
        htmlFor={id}
        className={cn(
          'block text-left w-full text-base mb-2 text-gray6',
          labelClassName,
          poppins_400.className
        )}
      >
        Select a Country
      </label>

      <Select
        required
        onValueChange={(value) => setCountry(value)}
        value={country}
      >
        <SelectTrigger className="bg-white rounded-lg w-full shadow-none h-[54px] border-[#E0E0E0]">
          <SelectValue
            placeholder="Choose One"
            className="font-nunito text-base text-cdial-black-100 placeholder:font-nunito placeholder:text-base placeholder:text-cdial-black-100"
          />
        </SelectTrigger>

        <SelectContent
          className="w-full border font-nunito text-sm bg-white"
          style={{ zIndex: 1350 }}
        >
          {countries.map(
            ({ name, flags }: { name: string; flags: { svg: string } }) => (
              <SelectItem key={name} value={name}>
                <div className="flex items-center gap-2">
                  <Image
                    alt={`${name}-flag`}
                    src={flags.svg}
                    height={20}
                    width={20}
                    className="h-5 w-5 rounded-full object-cover"
                  />
                  {name}
                </div>
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
