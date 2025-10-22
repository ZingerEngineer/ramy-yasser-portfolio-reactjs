// tailwind.config.ts
// Tailwind CSS v4 Configuration (Optional)
// Note: Tailwind v4 uses CSS-first configuration and doesn't require this file for basic usage
// This file is useful for custom theme tokens, plugins, or advanced configuration

import type { Config } from 'tailwindcss';

export default {
  // Tailwind v4 uses auto-content detection via the Vite plugin
  // No need to manually specify content paths

  theme: {
    extend: {
      // TODO: Add custom theme extensions here
      // Examples: custom colors, fonts, spacing, breakpoints, etc.

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
    // TODO: Add Tailwind plugins here
    // Examples: @tailwindcss/forms, @tailwindcss/typography, etc.
  ],
} satisfies Config;
