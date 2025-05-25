import { entity, persistence } from 'simpler-state';
import { AudienceTypes } from '../types/audience-types';

type AuthStateType = {
  school_slug_id: string;
  audience_type: AudienceTypes | '';
  // user_slug_id: string;
};

export const authState = entity<AuthStateType>(
  {
    school_slug_id: 'AOM-431844',
    audience_type: '',
    // user_slug_id: '',
  },
  [persistence('authState')]
);

export const resetAuthState = () => {
  authState.set({
    school_slug_id: 'AOM-431844',
    audience_type: '',
    // user_slug_id: '',
  });
}
export const signupEmail = entity<string| null>(null,[persistence('signupEmail')]);
export const forgotPassordEmail = entity<string| null>(null,[persistence('forgotPassordEmail')]);
export const forgotPassordOTP = entity<string| null>(null,[persistence('forgotPassordOTP')]);

export const setAuthState = <K extends keyof AuthStateType>(
  key: K,
  value: AuthStateType[K]
) => {
  authState.set({
    ...authState.get(),
    [key]: value,
  });
};
