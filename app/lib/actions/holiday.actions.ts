import { getRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

/**
 * Shape of a holiday item as returned by the Calendarific-backed
 * `/holidays/:country/:year/public` endpoint (see
 * schoolog-backend `CalendarificHolidayType`).
 */
export interface HolidayApiItem {
  name: string;
  description?: string;
  country?: { id: string; name: string };
  date: {
    iso: string;
    datetime?: { year?: number; month?: number; day?: number };
  };
  type?: string[];
  primaryType?: string;
  canonicalUrl?: string;
  urlId?: string;
  locations?: string;
  states?:
    | string
    | Array<{
        id: number;
        abbrev: string;
        name: string;
        exception?: string;
        notes?: string;
      }>;
}

export async function fetchHolidays(
  country: string,
  year: number,
  startISO: string,
  endISO: string
): Promise<ResponseType<HolidayApiItem[]>> {
  return getRequest<HolidayApiItem[]>(`/holidays/${country}/${year}/public`, {
    startDate: startISO,
    endDate: endISO,
  });
}

export async function fetchHolidaysBetween(
  country: string,
  startISO: string,
  endISO: string
): Promise<HolidayApiItem[]> {
  if (!country || !startISO || !endISO) return [];
  const startYear = new Date(startISO).getUTCFullYear();
  const endYear = new Date(endISO).getUTCFullYear();

  const gatherHolidays = async (year: number) => {
    const response = await fetchHolidays(country, year, startISO, endISO);
    return response.data ?? [];
  };

  let results: HolidayApiItem[] = [];
  if (startYear === endYear) {
    results = await gatherHolidays(startYear);
  } else {
    results = [
      ...(await gatherHolidays(startYear)),
      ...(await gatherHolidays(endYear)),
    ];
  }

  console.log('Fetched holidays:', results);
  const seen = new Set<string>();
  const deduped: HolidayApiItem[] = [];
  for (const item of results) {
    const key = item.date.iso;
    if (key && !seen.has(key)) {
      seen.add(key);
      deduped.push(item);
    }
  }
  deduped.sort((a, b) => a.date.iso.localeCompare(b.date.iso));
  return deduped;
}
