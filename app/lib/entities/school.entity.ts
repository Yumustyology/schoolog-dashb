import { entity, persistence } from 'simpler-state';

export type SchoolEntity = {
  _id?: string;
  name?: string;
  email?: string;
  address?: string;
  country?: string;
  city?: string;
  schoolImage?: string;
  slgId?: string;
  slug?: string;
  schoolSlugId?: string;
  postalCode?: string;
  createdAt?: string;
  updatedAt?: string;
  tenantDomain?: string;
};

export const schoolState = entity<SchoolEntity>({}, [persistence('schoolState')]);

export const setSchoolState = (s: Partial<SchoolEntity>) => {
  schoolState.set({
    ...schoolState.get(),
    ...s,
  });
};

export const resetSchoolState = () => {
  schoolState.set({});
};
