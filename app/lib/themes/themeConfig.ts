export const themes = {
  green: {
    primary: '#21B55A',
    deep: '#0E4F27', // deeper green
    light: '#E9F8EF',
    primary1: 'rgba(33, 181, 90, 0.12)',
  },
  orange: {
    primary: '#F97316',
    deep: '#9A3E08', // deeper orange
    light: '#FFF4E5',
    primary1: 'rgba(249, 115, 22, 0.12)',
  },
  brown: {
    primary: '#A0522D',
    deep: '#5B3015', // deeper brown
    light: '#F9F3EF',
    primary1: 'rgba(160, 82, 45, 0.12)',
  },
  purple: {
    primary: '#7C3AED',
    deep: '#4C1D95', // deep purple
    light: '#F3EBFE',
    primary1: 'rgba(124, 58, 237, 0.12)',
  },
  blue: {
    primary: '#3B82F6',
    deep: '#1E3A8A', // deep blue
    light: '#E7F0FE',
    primary1: 'rgba(59, 130, 246, 0.12)',
  },
};

export type ThemeKey = keyof typeof themes;
