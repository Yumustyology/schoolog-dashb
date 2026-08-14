import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

// Get country code by full name
export function getCountryCode(countryName: string): string | null {
  if (!countryName) return null;

  const code = countries.getAlpha2Code(countryName, "en");
  return code ?? null;
}

export const countryMap = countries.getNames("en", { select: "official" });
