'use client';

import { themeState } from '@/app/lib/entities/theme.entity';
import { themes } from '@/app/lib/themes/themeConfig';
import { darkenColor } from '@/app/lib/utils/darkenColor';
import { useEffect } from 'react';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = themeState.use();

  useEffect(() => {
    const selectedTheme = themes[theme];
    Object.entries(selectedTheme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
      if (key === 'primary') {
        document.documentElement.style.setProperty(
          '--color-primary-dark',
          darkenColor(value, 20)
        );
      }
    });
  }, [theme]);

  return <>{children}</>;
};
