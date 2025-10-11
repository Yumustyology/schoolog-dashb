export type SchoolPublic = {
  _id?: string;
  name: string;
  slug: string;
  country: string;
  school_image?: string | null;
  address?: string;
  state?: string;
  postal_code?: string;
  fullAddress?: string;
  studentCount?: number;
};

export type PublicListResponse = {
  items: SchoolPublic[];
  total: number;
  page: number;
  limit: number;
};
