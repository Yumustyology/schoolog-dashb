import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useCallback } from 'react';

interface UseUrlFilterOptions {
  paramName: string;
  defaultValue?: string;
  setDefaultWhenEmpty?: boolean;
  disableUrlSync?: boolean;
}

export function useUrlFilter({ 
  paramName, 
  defaultValue,
  setDefaultWhenEmpty = true,
  disableUrlSync = false 
}: UseUrlFilterOptions) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get current value from URL
  const currentValue = searchParams.get(paramName) || undefined;

  // Set value in URL
  const setValue = useCallback((value: string | undefined) => {
    if (disableUrlSync) return;
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }
    
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname, paramName, disableUrlSync]);

  // Set default value if URL is empty and default is provided
  useEffect(() => {
    if (setDefaultWhenEmpty && !currentValue && defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue, currentValue, setValue, setDefaultWhenEmpty]);

  return {
    value: currentValue,
    setValue,
  };
}