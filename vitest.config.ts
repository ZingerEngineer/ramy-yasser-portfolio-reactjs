import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	test: {
		globals: true,
		css: true,
		setupFiles: './src/tests/setup.ts',
		environment: 'jsdom',
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html', 'lcov'],
			exclude: [
				'node_modules/',
				'dist/',
				'*.config.{js,ts}',
				'**/*.d.ts',
				'**/types.ts',
				'src/main.tsx',
			],
		},
		include: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}'],
	},
});
