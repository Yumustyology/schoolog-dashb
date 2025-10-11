# GitHub Copilot / Developer Note

Added `app/lib/actions/school-info.action.ts` to centralize public school list requests.

Usage example:

```ts
import { fetchPublicSchools } from '@/app/lib/actions/school-info.action';

// fetch first page, default limit
const data = await fetchPublicSchools();

// fetch with search and pagination
const data2 = await fetchPublicSchools({ search: 'greenwood', page: 2, limit: 5 });

if (data?.data) {
  const { items, total, page, limit } = data.data;
}
```

Notes:
- The API is public and requires no authentication.
- The action uses the existing `getRequest` helper in `app/lib/service/apiRequests.ts`.
- The response shape follows the backend envelope: `{ message, status, data, statusCode }` — this action returns `response.data` (the envelope) so callers can check `status` and `data`.

useSWR example:

```ts
import useSWR from 'swr';
import fetchPublicSchools from '@/app/lib/actions/school-info.action';

// fetcher expects the SWR key to provide the search term
const fetcher = async (_key: string, search: string) => {
  const res = await fetchPublicSchools({ search });
  return res;
};

const { data } = useSWR(['/school/public', searchTerm], fetcher);

// data?.data contains the paginated payload { items, total, page, limit }
```
