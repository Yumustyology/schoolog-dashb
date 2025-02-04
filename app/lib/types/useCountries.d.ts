declare module 'use-react-countries' {
  export interface Country {
    name: string;
    flags: {
      svg: string;
      png?: string;
    };
    [key: string]: unknown; 
  }

  export interface UseCountriesResult {
    countries: Country[];
  }

  export function useCountries(): UseCountriesResult;
}
