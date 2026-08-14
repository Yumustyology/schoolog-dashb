## API Response Format

All API responses now follow a consistent format:

```typescript
{
  data: T;                    // The actual data (array or object)
  message: string;            // Human-readable message
  status: 'success' | 'error'; // Request status
  statusCode: number;         // HTTP status code
  meta?: {                    // Optional pagination metadata
    count?: number;           // Total count of items
    page?: string | number;   // Current page
    limit?: string | number;  // Items per page
    totalPages?: number;      // Total pages available
    hasNextPage?: boolean;    // Whether there's a next page
    hasPrevPage?: boolean;    // Whether there's a previous page
  };
}
```

### Using ApiResponse Types

All response types should extend or use `ApiResponse<T>`:

```typescript
// Single item responses
type GetSchoolResponse = ApiResponse<School>;

// List responses (automatically wraps T[] in ApiResponse)
type GetSchoolsResponse = ApiListResponse<School>;  // = ApiResponse<School[]>
```

### Example: Implementing a New Endpoint

```typescript
// 1. Define the response type
export type GetTeachersResponse = ApiListResponse<Teacher>;

// 2. Create the action
export const getTeachers = async (
  query?: Record<string, string | number>
): Promise<AxiosResponse<GetTeachersResponse> | void> => {
  return getRequest<GetTeachersResponse>('/teachers', query);
};

// 3. Use in component
const { data: response } = useSWR('/teachers', () => getTeachers({ page: 1, limit: 10 }));

// 4. Access the data
const teachers = response?.data || [];        // List of teachers
const meta = response?.meta || {};            // Pagination metadata
const total = meta.count;                     // Total items
const hasNext = meta.hasNextPage;             // Check if more pages
```

### Files Updated

- Created: `app/lib/types/api-response.types.ts` - Generic response type
- Updated: `app/lib/types/school-info.types.ts` - Uses ApiResponse
- Updated: `app/lib/actions/school-info.action.ts` - Updated fetchPublicSchools
- Updated: `components/organisms/SelectSchool.tsx` - Uses new response format
- Updated: `app/lib/types/index.ts` - Exports ApiResponse types

### Next Steps for Full Implementation

Update these action/response pairs to use the ApiResponse format:

1. **Academic Year/Terms**: `academicYear.types.ts`, `term-session.actions.ts`
2. **Classes**: `class.types.ts`, `class-grade.actions.ts`
3. **Subjects**: `subject.types.ts`, `subjects.action.ts`
4. **Students**: `student.types.ts`, `student.actions.ts`
5. **Curriculum**: `curriculum.types.ts`, `curriculum.actions.ts`
6. **Guardians**: `guardian.types.ts`, `guardian.actions.ts`

This ensures all API responses are consistent and pagination metadata is always available.
