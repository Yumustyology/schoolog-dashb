import withMT from '@material-tailwind/react/utils/withMT';
import defaultTheme from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';

module.exports = withMT({
  darkMode: ['class', 'class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-primary':
          'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))',
      },
      colors: {
        success: '#21B55A',
        lightSuccess: '#E9F8EF',
        // primary1: 'rgba(33, 181, 90, 0.12)',
        primary: 'var(--color-primary)',
        light: 'var(--color-light)',
        primary1: 'var(--color-primary1)',
        black1: '#101828',
        black2: '#071E3B',
        gray1: '#333333',
        gray2: '#D9DCE0',
        gray3: '#828282',
        'gray-line': '#EAECF0',
        gray4: '#F2F2F2',
        gray5: '#E0E0E0',
        gray6: '#4F4F4F',
        gray7: '#F4F4F4',
        gray: '#1D4241',
        gray8: '#1D4241',
        gray9: '#434343',
        gray10: '#667085',
        gray11: '#F8F8F8',
        r: '#EB5757',
        r2: '#D92D20',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
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
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
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
          '0%': {
            transform: 'rotate(215deg) translateX(0)',
            opacity: '1',
          },
          '70%': {
            opacity: '1',
          },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0',
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

  plugins: [tailwindAnimate],
} satisfies Config);
