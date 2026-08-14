import type { ApiResponse } from './api-response.types';

export type SchoolPublic = {
  _id?: string;
  name: string;
  slug: string;
  country: string;
  schoolImage?: string | null;
  address?: string;
  state?: string;
  postalCode?: string;
  fullAddress?: string;
  studentCount?: number;
};

export type PublicSchoolsResponse = ApiResponse<SchoolPublic[]>;
