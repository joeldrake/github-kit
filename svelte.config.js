import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					// from https://github.com/octokit/octokit.js/issues/2126#issuecomment-1005023857
					'node-fetch': 'isomorphic-fetch'
				}
			}
		}
	}
};

export default config;
