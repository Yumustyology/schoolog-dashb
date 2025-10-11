export type SchoolPublic = {
  _id?: string;
  name: string;
  slug: string;
  country: string;
  school_image?: string | null;
};

export type PublicListResponse = {
  items: SchoolPublic[];
  total: number;
  page: number;
  limit: number;
};
