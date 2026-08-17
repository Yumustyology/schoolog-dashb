import { entity, persistence } from 'simpler-state';

export type Audience = 'Admin' | 'Student' | 'Teacher' | 'Parent' | string;

export type ProfileState = {
  slgId: string; // e.g. "SLG-431844"
  schoolId: string; // e.g. Mongo _id
  slugId: string; // e.g. "AOM-ADM-290Y479"
  audience: Audience; // defaults to "Admin"
  // The specific role within `audience` (e.g. 'Platform_Admin' for a
  // cross-school platform operator whose broad `audience` is still 'Admin')
  // — distinct from `audience`, which only tells you the general account
  // category.
  audienceRole?: string;
  // token?: string;
  schoolSlugId: string; // e.g. "AOM-ADM-290Y479"
  slug: string;
  firstName: string;
  lastName: string;
  email?: string; // optional, if needed
};

export const profileState = entity<ProfileState>(
  {
    slgId: '',
    schoolId: '',
    slugId: '',
    audience: '',
    audienceRole: '',
    slug: '',
    schoolSlugId: '', // e.g. "AOM-ADM-290Y479"
    firstName: '',
    lastName: '',
  },

  [persistence('profileState')]
);

export const setProfileState = <K extends keyof ProfileState>(
  key: K,
  value: ProfileState[K]
) => {
  profileState.set({
    ...profileState.get(),
    [key]: value,
  });
};

export const replaceProfileState = (next: ProfileState) => {
  profileState.set(next);
};

export const resetProfileState = () => {
  profileState.set({
    slgId: '',
    schoolId: '',
    slugId: '',
    audience: '',
    audienceRole: '',
    slug: '',
    schoolSlugId: '', // e.g. "AOM-ADM-290Y479",
    firstName: '',
    lastName: '',
  });
};
