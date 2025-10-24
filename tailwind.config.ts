// tailwind.config.ts
// Tailwind CSS v4 Configuration with shadcn/ui support
// Note: Tailwind v4 uses CSS-first configuration via @theme in CSS
// This file is mainly for content paths and plugins

import type { Config } from 'tailwindcss';

export default {
  // Content paths for Tailwind JIT to scan for class usage
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/components/ui/**/*.{js,ts,jsx,tsx}', // shadcn/ui components
  ],

  theme: {
    extend: {
      // TODO: Add custom theme extensions here
      // Note: With Tailwind v4, prefer using @theme in CSS for theme configuration

      // Example: Custom colors, fonts, spacing, breakpoints, etc.
      // colors: {
      //   primary: {
      //     50: '#f0f9ff',
      //     // ... add your brand colors
      //   },
      // },

      // fontFamily: {
      //   sans: ['Inter', 'sans-serif'],
      //   // ... add your custom fonts
      // },
    },
  },

  plugins: [
    require('tailwindcss-animate'), // Required for shadcn/ui animations
    // TODO: Add additional Tailwind plugins here
    // Examples: @tailwindcss/forms, @tailwindcss/typography, etc.
  ],
} satisfies Config;
