import { entity, persistence } from 'simpler-state';

export type Audience = 'Admin' | 'Student' | 'Teacher' | 'Parent' | string;

export type ProfileState = {
  slg_id: string; // e.g. "SLG-431844"
  school_id: string; // e.g. Mongo _id
  slug_id: string; // e.g. "AOM-ADM-290Y479"
  audience: Audience; // defaults to "Admin"
  // token?: string;
  school_slug_id: string; // e.g. "AOM-ADM-290Y479"
  slug: string;
  firstName: string;
  lastName: string;
  email?: string; // optional, if needed
};

export const profileState = entity<ProfileState>(
  {
    slg_id: '',
    school_id: '',
    slug_id: '',
    audience: '',
    slug: '',
    school_slug_id: '', // e.g. "AOM-ADM-290Y479"
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
    slg_id: '',
    school_id: '',
    slug_id: '',
    audience: '',
    slug: '',
    school_slug_id: '', // e.g. "AOM-ADM-290Y479",
    firstName: '',
    lastName: '',
  });
};
