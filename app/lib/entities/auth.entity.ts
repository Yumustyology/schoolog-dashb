import { entity, persistence } from 'simpler-state';
import { AudienceTypes } from '../types/audience-types';

type AuthStateType = {
  school_slug_id: string;
  audience_type: AudienceTypes | '';
  user_slug_id: string;
};

export const authState = entity<AuthStateType>(
  {
    school_slug_id: '',
    audience_type: '',
    user_slug_id: '',
  },
  [persistence('authState')]
);

export const setAuthState = <K extends keyof AuthStateType>(
  key: K,
  value: AuthStateType[K]
) => {
  authState.set({
    ...authState.get(),
    [key]: value,
  });
};
