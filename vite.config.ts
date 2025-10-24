// vite.config.ts
// Vite configuration for React + TypeScript + Tailwind CSS v4

import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(), // React plugin for JSX/TSX support and Fast Refresh
		tailwindcss(), // Tailwind CSS v4 Vite plugin
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'), // Path alias: @/ → src/
		},
	},
	// TODO: Add any additional Vite configuration options here
	// Examples: server port, build options, environment variables, etc.
});
