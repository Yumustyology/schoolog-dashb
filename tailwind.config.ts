const withMT = require('@material-tailwind/react/utils/withMT');
import defaultTheme from 'tailwindcss/defaultTheme';

module.exports = withMT({
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#21B55A',
        gray1: '#333333',
        gray: '#828282',
        gray2: '#D9DCE0',
        gray3: '#828282',
        gray4: '#F2F2F2',
        gray5: '#E0E0E0',
        gray6: '#4F4F4F',
        white: '#FFFFFF',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        rippling: 'rippling var(--duration) ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        meteor: 'meteor 5s linear infinite',
      },
      keyframes: {
        rippling: {
          '0%': {
            opacity: '1',
          },
          '100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
        'caret-blink': {
          '0%,70%,100%': {
            opacity: '1',
          },
          '20%,50%': {
            opacity: '0',
          },
        },
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: 1 },
          '70%': { opacity: 1 },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: 0,
          },
        },
      },
      screens: {
        xxs: '280px',
        vxs: '340px',
        xs: '405px',
        lxs: '480px',
        tablet: '565px',
        lgTablet: '768px',
        lgTablet1: '800px',
        xlgTablet: '900px',
        xxlgTablet: '920px',
        laptop: '1024px',
        desktop: '1280px',
        lgDesktop: '1400px',
        xlDesktop: '1600px',
        xlgDesktop: '1792px',
        xxlDesktop: '1800px',
        ...defaultTheme.screens,
      },
    },
  },

  plugins: [require('tailwindcss-animate')],
});
