import { entity, persistence } from 'simpler-state';
import { ThemeKey } from '../themes/themeConfig';

export const themeState = entity<ThemeKey>('green', [persistence('slgTheme')]);

export const setTheme = (theme: ThemeKey) => {
  themeState.set(theme);
};
