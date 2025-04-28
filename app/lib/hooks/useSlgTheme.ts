import { themeState } from '@/app/lib/entities/theme.entity';
import { themes } from '@/app/lib/themes/themeConfig';

export const useSlgTheme = () => {
  const themeKey = themeState.use();
  const theme = themes[themeKey];

  return { themeKey, theme };
};
