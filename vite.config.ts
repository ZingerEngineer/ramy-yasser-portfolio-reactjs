// vite.config.ts
// Vite configuration for React + TypeScript + Tailwind CSS v4

import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { type ConfigEnv, defineConfig, loadEnv, type UserConfig } from 'vite';

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
	const ENV = loadEnv(mode, process.cwd(), '');
	const ENV_IS_PRODUCTION = command === 'build' || ENV.NODE_ENV === 'production';
	const ENV_PREVIEW_PORT = Number(ENV.PREVIEW_PORT);
	const ENV_DEV_PORT = Number(ENV.DEV_PORT);

	const SHARED_CONFIG = {
		publicDir: path.resolve(__dirname, 'public'),
		cacheDir: path.resolve(__dirname, 'node_modules/.vite_cache'),
		plugins: [react(), tailwindcss()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
		build: {
			sourcemap: false,
			target: 'esnext',
			minify: 'esbuild' as const,
			reportCompressedSize: true,
			emptyOutDir: true,
			outDir: path.resolve(__dirname, 'dist'),
			assetsDir: 'assets',
			rollupOptions: {
				output: {
					manualChunks: {
						react: ['react', 'react-dom', 'react-router', 'react-router-dom'],
						ui: ['lucide-react', '@radix-ui/react-slot', 'class-variance-authority', 'clsx'],
						i18n: ['react-i18next', 'i18next'],
						validation: ['zod'],
					},
				},
			},
		},
		preview: {
			port: ENV_PREVIEW_PORT,
			strictPort: true,
			open: true,
		},
	};
	if (ENV_IS_PRODUCTION) {
		return {
			publicDir: SHARED_CONFIG.publicDir,
			cacheDir: SHARED_CONFIG.cacheDir,
			build: SHARED_CONFIG.build,
			plugins: [
				...SHARED_CONFIG.plugins,
				visualizer({
					emitFile: true,
					filename: 'stats.html',
					template: 'treemap',
				}),
			],
			resolve: SHARED_CONFIG.resolve,
		};
	}
	return {
		...SHARED_CONFIG,
		server: {
			port: ENV_DEV_PORT,
			open: true,
		},
	};
});
