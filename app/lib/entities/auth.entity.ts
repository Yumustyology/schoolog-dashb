import { entity, persistence } from 'simpler-state';
import { AudienceTypes } from '../types/audience-types';

type AuthStateType = {
  schoolSlugId: string;
  audienceType: AudienceTypes | '';
  // userSlugId: string;
};

export const authState = entity<AuthStateType>(
  {
    schoolSlugId: 'AOM-431844',
    audienceType: '',
    // userSlugId: '',
  },
  [persistence('authState')]
);

export const resetAuthState = () => {
  authState.set({
    schoolSlugId: 'AOM-431844',
    audienceType: '',
    // userSlugId: '',
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
