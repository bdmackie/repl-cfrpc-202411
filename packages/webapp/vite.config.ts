import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
// import type { PluginOption } from 'vite';
// import { visualizer } from 'rollup-plugin-visualizer';

// eslint-disable-next-line @typescript-eslint/require-await
export default async ({ mode }: { mode: string }) => {
	// Vite mode will be used for local env var overrides
	// using the .env.<mode> files. We'll have to do the
	// overriding at runtime because of Cloudflare's
	// use of .dev.vars.
	console.log('Vite mode:', mode);

	const env = loadEnv(mode, process.cwd());

	// https://vitejs.dev/config/
	return defineConfig({
		plugins: [sveltekit()],
		// plugins: [sveltekit(), visualizer({ emitFile: true, filename: 'stats.html' }) as PluginOption],
		server: {
			port: 8798, // likely overridden in package.json scripts
		},
		test: {
			globals: false,
			environment: 'node',
			env,
			include: ['./src/**/**.test.ts'],
			reporters: 'verbose',
			setupFiles: ['./src/testing/vitest-setup.ts'],
			isolate: true,
			testTimeout: 5000,
			pool: 'forks',
			poolOptions: {
				forks: {
					minForks: 1,
					maxForks: 1,
				},
			},
		},
	});
};
