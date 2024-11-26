import { default as cloudflare } from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	
	// Svelte compiler options. See https://svelte.dev/docs/svelte-compiler#types-compileoptions
	compilerOptions: {
		runes: true,
	},

	vitePlugin: {
		dynamicCompileOptions({ filename }) {
			if (filename.includes('node_modules')) {
				return { runes: undefined }; // or false, check what works
			}
			return {};
		},
	},

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: cloudflare({
			// See below for an explanation of these options
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			},
			platformProxy: {
				configPath: 'wrangler.toml',
				environment: undefined,
				experimentalJsonConfig: false,
				persist: false
			}
		}),

		typescript: {
			// Mutate tsconfig.json
			config: (config) => {
				// Include additional files to match the scope of eslint

				config['include'].push(
					'../*.ts',
					'../*.js',
					'../static/*.js',
				);

				const additionalCompilerOptions = {
					// Module
					module: 'ESNext',
					moduleResolution: 'Bundler',
					// resolveJsonModule: true,
					verbatimModuleSyntax: true, // new module syntax, deprecating importsNotUsedAsValues and preserveValueImports

					// Interop
					esModuleInterop: true,
					allowSyntheticDefaultImports: true,

					// Strictness
					// See https://stackoverflow.com/questions/43727889/is-it-a-good-idea-to-always-set-alwaysstrict-to-true-in-tsconfig-json
					strict: true,
					alwaysStrict: true,
					noImplicitAny: true,
					noImplicitThis: true,
					strictBindCallApply: true,
					strictNullChecks: true,
					strictFunctionTypes: true,
					strictPropertyInitialization: true,
					useUnknownInCatchVariables: true,
					// noPropertyAccessFromIndexSignature: true,
					noUncheckedIndexedAccess: true,
					noUnusedLocals: true,
					noUnusedParameters: true,
					noImplicitOverride: true,
					noImplicitReturns: true,

					// NON-strictness
					exactOptionalPropertyTypes: false, // Complex to comply with and flexibility is nice
					noFallthroughCasesInSwitch: false, // Use for a better alternative to 'or-ing'
				};

				// Combine the compiler options of the default config used for all TS files
				config['compilerOptions'] = {
					...config['compilerOptions'],
					...additionalCompilerOptions,
				};

				return config;
			},
		},
	}
};

export default config;
