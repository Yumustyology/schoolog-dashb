export const themes = {
  green: {
    primary: '#21B55A',
    deep: '#0E4F27',
    light: '#E9F8EF',
    light1: '#00B59566',
    primary1: 'rgba(33, 181, 90, 0.12)',
  },
  orange: {
    primary: '#F97316',
    deep: '#9A3E08',
    light: '#FFF4E5',
    light1: '#F9731666',
    primary1: 'rgba(249, 115, 22, 0.12)',
  },
  brown: {
    primary: '#A0522D',
    deep: '#5B3015',
    light: '#F9F3EF',
    light1: '#A0522D66',
    primary1: 'rgba(160, 82, 45, 0.12)',
  },
  purple: {
    primary: '#7C3AED',
    deep: '#4C1D95',
    light: '#F3EBFE',
    light1: '#7C3AED66',
    primary1: 'rgba(124, 58, 237, 0.12)',
  },
  blue: {
    primary: '#3B82F6',
    deep: '#1E3A8A',
    light: '#E7F0FE',
    light1: '#3B82F666',
    primary1: 'rgba(59, 130, 246, 0.12)',
  },
  violet: {
    primary: '#652FED',
    deep: '#3E1C8A',
    light: '#F1EBFE',
    light1: '#652FED66',
    primary1: 'rgba(101, 47, 237, 0.12)',
  },
  amethyst: {
    primary: '#9B51E0',
    deep: '#5C2493',
    light: '#F6EDFC',
    light1: '#9B51E066',
    primary1: 'rgba(155, 81, 224, 0.12)',
  },
  navy: {
    primary: '#1726B0',
    deep: '#0D156B',
    light: '#E7E9FB',
    light1: '#1726B066',
    primary1: 'rgba(23, 38, 176, 0.12)',
  },
  magenta: {
    primary: '#C70FC1',
    deep: '#750C72',
    light: '#FAE7FA',
    light1: '#C70FC166',
    primary1: 'rgba(199, 15, 193, 0.12)',
  },
  midnight: {
    primary: '#010C3D',
    deep: '#000820',
    light: '#E5E7F6',
    light1: '#010C3D66',
    primary1: 'rgba(1, 12, 61, 0.12)',
  },
};

export type ThemeKey = keyof typeof themes;
