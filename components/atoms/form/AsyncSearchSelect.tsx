'use client';

import * as React from 'react';
import useSWR from 'swr';
import debounce from 'lodash/debounce';
import { Check, ChevronDown, Loader2 } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Inter_400 } from '@/app/lib/config/font.config';

export type SearchSelectOption = {
  id: string;
  label: string;
  subLabel?: string;
};

type Props = {
  value: SearchSelectOption | null;
  onChange: (option: SearchSelectOption | null) => void;
  /** Called with the debounced search text (empty string = show the default/unfiltered list). */
  fetchOptions: (query: string) => Promise<SearchSelectOption[]>;
  placeholder?: string;
  emptyText?: string;
  label?: string;
  labelClassName?: string;
  disabled?: boolean;
  className?: string;
  /** Cache key namespace — set this when multiple instances on the same page fetch different data (e.g. student vs. staff). */
  cacheKey?: string;
};

/**
 * Generic async searchable select — one Popover + cmdk Command instance
 * reused everywhere a "search and pick a person/record" field is needed
 * (teachers, borrowers, guardians, ...), instead of every feature
 * reimplementing its own debounced-fetch dropdown from scratch.
 */
export default function AsyncSearchSelect({
  value,
  onChange,
  fetchOptions,
  placeholder = 'Search...',
  emptyText = 'No results found.',
  label,
  labelClassName,
  disabled,
  className,
  cacheKey = 'default',
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    const d = debounce((v: string) => setQuery(v), 300);
    d(search);
    return () => d.cancel();
  }, [search]);

  const { data: options, isLoading } = useSWR(
    open ? ['async-search-select', cacheKey, query] : null,
    () => fetchOptions(query)
  );

  return (
    <div className="w-full">
      {label && (
        <label
          className={cn('block text-left w-full text-sm mb-2 text-gray6', Inter_400.className, labelClassName)}
        >
          {label}
        </label>
      )}
      <Popover
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setSearch('');
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              'w-full justify-between h-11 rounded-lg border border-gray4 bg-white text-sm text-gray1 px-3 hover:bg-white hover:border-primary',
              !value && 'text-gray6',
              className
            )}
          >
            <span className="truncate">{value ? value.label : placeholder}</span>
            <ChevronDown className="opacity-50 h-4 w-4 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 rounded-lg">
          <Command shouldFilter={false}>
            <CommandInput
              value={search}
              onValueChange={setSearch}
              placeholder={placeholder}
            />
            <CommandList>
              {isLoading ? (
                <div className="flex items-center justify-center gap-2 py-6 text-sm text-gray6">
                  <Loader2 className="h-4 w-4 animate-spin" /> Searching...
                </div>
              ) : (
                <>
                  <CommandEmpty>{emptyText}</CommandEmpty>
                  <CommandGroup>
                    {(options || []).map((option) => (
                      <CommandItem
                        key={option.id}
                        value={option.id}
                        onSelect={() => {
                          onChange(value?.id === option.id ? null : option);
                          setOpen(false);
                        }}
                        className={cn(
                          'cursor-pointer rounded-lg px-3 py-2 my-0.5 text-gray1',
                          'aria-selected:bg-light aria-selected:text-primary',
                          value?.id === option.id && 'text-primary font-medium'
                        )}
                      >
                        <div className="flex flex-col min-w-0">
                          <span className="truncate">{option.label}</span>
                          {option.subLabel && (
                            <span className="text-xs text-gray6 truncate">{option.subLabel}</span>
                          )}
                        </div>
                        <Check
                          className={cn(
                            'ml-auto shrink-0 text-primary',
                            value?.id === option.id ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
