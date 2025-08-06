import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Radix Colors - Gray scale
        gray: {
          1: 'var(--gray-1)',
          2: 'var(--gray-2)',
          3: 'var(--gray-3)',
          4: 'var(--gray-4)',
          5: 'var(--gray-5)',
          6: 'var(--gray-6)',
          7: 'var(--gray-7)',
          8: 'var(--gray-8)',
          9: 'var(--gray-9)',
          10: 'var(--gray-10)',
          11: 'var(--gray-11)',
          12: 'var(--gray-12)',
        },
        // Radix Colors - Blue scale (for accent colors)
        blue: {
          1: 'var(--blue-1)',
          2: 'var(--blue-2)',
          3: 'var(--blue-3)',
          4: 'var(--blue-4)',
          5: 'var(--blue-5)',
          6: 'var(--blue-6)',
          7: 'var(--blue-7)',
          8: 'var(--blue-8)',
          9: 'var(--blue-9)',
          10: 'var(--blue-10)',
          11: 'var(--blue-11)',
          12: 'var(--blue-12)',
        },
        // Radix Colors - Purple scale (primary brand color)
        purple: {
          1: 'var(--purple-1)',
          2: 'var(--purple-2)',
          3: 'var(--purple-3)',
          4: 'var(--purple-4)',
          5: 'var(--purple-5)',
          6: 'var(--purple-6)',
          7: 'var(--purple-7)',
          8: 'var(--purple-8)',
          9: 'var(--purple-9)',
          10: 'var(--purple-10)',
          11: 'var(--purple-11)',
          12: 'var(--purple-12)',
        },
        // Radix Colors - Mauve scale (neutral with warm undertone)
        mauve: {
          1: 'var(--mauve-1)',
          2: 'var(--mauve-2)',
          3: 'var(--mauve-3)',
          4: 'var(--mauve-4)',
          5: 'var(--mauve-5)',
          6: 'var(--mauve-6)',
          7: 'var(--mauve-7)',
          8: 'var(--mauve-8)',
          9: 'var(--mauve-9)',
          10: 'var(--mauve-10)',
          11: 'var(--mauve-11)',
          12: 'var(--mauve-12)',
        },
        // Semantic colors
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: 'var(--color-card)',
        'card-foreground': 'var(--color-card-foreground)',
        primary: 'var(--color-primary)',
        'primary-foreground': 'var(--color-primary-foreground)',
        secondary: 'var(--color-secondary)',
        'secondary-foreground': 'var(--color-secondary-foreground)',
        muted: 'var(--color-muted)',
        'muted-foreground': 'var(--color-muted-foreground)',
        accent: 'var(--color-accent)',
        'accent-foreground': 'var(--color-accent-foreground)',
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      screens: {
        'xs': '414px',
        'desktop': '1366px',
      },
    },
  },
  plugins: [],
};
export default config;