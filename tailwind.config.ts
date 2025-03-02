import type { Config } from 'tailwindcss';
import { safelistConfig } from 'wcf-component-lib/styles/tailwind-safelist';

const config: Config = {
  safelist: safelistConfig,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        Sarabun: ['Sarabun', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
